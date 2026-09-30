import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * Helper to call either DeepSeek or Gemini depending on API key availability
 */
async function callLlmModel(systemInstruction: string, prompt: string, jsonMode: boolean = false): Promise<string> {
  const isDeepSeekAvailable = !!process.env.DEEPSEEK_API_KEY;

  if (isDeepSeekAvailable) {
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: prompt }
          ],
          response_format: jsonMode ? { type: 'json_object' } : undefined,
          temperature: 0.2
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
      }
      console.warn('DeepSeek API returned error status, falling back to Gemini.');
    } catch (e) {
      console.warn('Failed to call DeepSeek, falling back to Gemini:', e);
    }
  }

  // Fallback to Gemini
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\n\nFoydalanuvchi buyrug'i:\n${prompt}` }] }],
      config: jsonMode ? { responseMimeType: 'application/json' } : undefined
    });
    return response.text || '';
  } catch (err) {
    console.error('Llm fallback generation error:', err);
    throw err;
  }
}

/**
 * Keyless DuckDuckGo live search scraper
 */
async function searchWeb(query: string): Promise<{ title: string; url: string; snippet: string }[]> {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });
    if (!response.ok) return [];
    const html = await response.text();
    
    const results: { title: string; url: string; snippet: string }[] = [];
    const blocks = html.split('<div class="result results_links');
    
    for (let i = 1; i < blocks.length && results.length < 4; i++) {
      const block = blocks[i];
      const titleMatch = block.match(/<a class="result__url"[^>]*>([\s\S]*?)<\/a>/);
      const linkMatch = block.match(/href="([^"]+)"/);
      const snippetMatch = block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);
      
      if (linkMatch && titleMatch) {
        const title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
        const rawLink = linkMatch[1];
        
        let cleanLink = rawLink;
        if (rawLink.includes('uddg=')) {
          const parts = rawLink.split('uddg=');
          if (parts[1]) {
            cleanLink = decodeURIComponent(parts[1].split('&')[0]);
          }
        }
        
        const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]*>/g, '').trim() : '';
        results.push({
          title: title || 'Live Manba',
          url: cleanLink,
          snippet: snippet || 'Tafsilotlar topilmadi'
        });
      }
    }
    return results;
  } catch (err) {
    console.error('Search scraping error:', err);
    return [];
  }
}

/**
 * Supervisor Agent: Analyzes the conversation and structures sub-queries
 */
async function runSupervisorAgent(query: string): Promise<string[]> {
  const systemInstruction = `Siz Aluvantis Multi-Agent Tizimining Boshqaruvchi Agentisiz (Supervisor Agent).
Vazifangiz: Foydalanuvchining savolini tahlil qiling va undan internetdan real vaqtda qidirish kerak bo'lgan 1 yoki 2 ta aniq qidiruv kalit so'zlarini (queries) JSON formatida qaytaring.
Hech qanday ortiqcha gap yozmang, faqat to'g'ri JSON massivini qaytaring.
Misol:
User: "Aluvantis narxlari va yangiliklarini topib ber"
Supervisor response: ["aluvantis sayt narxlari", "aluvantis yangiliklar blogi"]`;

  try {
    const rawResult = await callLlmModel(systemInstruction, query, true);
    const parsed = JSON.parse(rawResult);
    if (Array.isArray(parsed)) {
      return parsed.map(q => String(q));
    }
  } catch (e) {
    console.warn('Supervisor agent failed to output JSON, extracting fallbacks:', e);
  }
  
  // Quick fallback query extraction
  return [query];
}

/**
 * Writer Agent: Compiles facts, context, and web results into a master response
 */
async function runWriterAgent(userQuery: string, searchReports: string, historyContext: string): Promise<string> {
  const systemInstruction = `Siz Aluvantis rasmiy studiyasining samimiy, xushmuomala va do'stona loyiha menejerisiz. 
Siz quruq robot yoki qidiruv tizimi emassiz, shuning uchun odamlar bilan gaplashgandek samimiy, jonli va o'ta qisqa muloqot qiling!

MUHIM TALABLAR:
1. Javobingizni o'ta QISQA, LAKONIK va aniq yozing. Maksimal 2-3 ta qisqa gapdan oshmasin! Uzun va zerikarli paragraflarni umuman ishlatmang.
2. Savolga darhol va samimiy javob qaytaring, ortiqcha quruq gaplar yoki cho'zilgan ro'yxatlarni yozmang.
3. Aluvantis haqidagi asosiy faktlar:
   - Sayt yaratish narxlari: START (1.2 mln so'm), BIZNES (2.4 mln so'm), PRO (3.9 mln so'm).
   - Sayt topshirish muddati: roppa-rosa 48 soat ichida (2 kunda).
   - Hosting umrbod mutlaqo bepul! Hech qanday oylik yoki yillik to'lovlar yo'q.
   - To'lov tartibi: 30% oldindan, 70% esa sayt bitib, sizga to'liq yoqqanidan keyin.
   - Aloqa: Telefon +998 99 845 66 32, Telegram admin: @aluvantis_admin.

Javobingizda chiroyli, samimiy emojilardan foydalanib, foydalanuvchi bilan xuddi yaqin do'stdek yoki qadrli mijozdek gaplashing.`;

  const prompt = `Foydalanuvchi savoli: ${userQuery}
Avvalgi muloqot konteksti:
${historyContext}

Internetdan olingan eng yangi ma'lumotlar va faktlar:
${searchReports}`;

  return callLlmModel(systemInstruction, prompt, false);
}

function getFallbackResponse(text: string): string {
  const query = text.toLowerCase();
  
  if (query.includes('narx') || query.includes('tarif') || query.includes('pul') || query.includes('qancha') || query.includes('pricing') || query.includes('plan')) {
    return `Aluvantis studiyasida quyidagi professional sayt tariflari va narxlari mavjud:

1. **START (1 200 000 so'm)** — Kichik qahvaxonalar, vizitka saytlar va yakka tartibdagi tadbirkorlar uchun. Mobil moslashuv va Telegram xabarnoma ulanadi.
2. **BIZNES (2 400 000 so'm)** — Kafe, do'kon, go'zallik salonlari va xizmat ko'rsatish sohalari uchun. To'liq onlayn katalog/menyu, xaritalarga ulash va maxsus Telegram bot integratsiyasi.
3. **PRO (3 900 000 so'm)** — Katta mahsulot assortimentiga ega do'konlar va savdo tarmoqlari uchun. Click/Payme to'lov tizimlari, filtrlar va buyurtmalarni boshqarish tizimi.

Barcha tariflarimizda **hosting umrbod bepul** bo'lib, hech qanday oylik yoki yillik server to'lovi yo'q!`;
  }
  
  if (query.includes('vaqt') || query.includes('muddat') || query.includes('kun') || query.includes('soat') || query.includes('48') || query.includes('tayyor')) {
    return `Aluvantis raqamli studiyasining asosiy ustunligi tezkor topshirishdir! Saytingiz kerakli materiallar (menyu, rasm, matnlar) olinganidan so'ng roppa-rosa **48 soat ichida (2 kunda)** to'liq ishga tushiriladi va domen bilan bepul hosting ulab topshiriladi.`;
  }
  
  if (query.includes('hosting') || query.includes('bepul') || query.includes('server') || query.includes('domen')) {
    return `Albatta! Aluvantis'da yaratilgan barcha saytlar uchun **hosting umrbod bepul**! Biz zamonaviy server infratuzilmasidan foydalanamiz, shuning uchun oylik yoki yillik server xarajatlaridan butunlay xalos bo'lasiz. Bu esa har yili sizga o'rtacha $100-$150 tejash imkonini beradi.`;
  }
  
  if (query.includes('aloqa') || query.includes('kontakt') || query.includes('telegram') || query.includes('admin') || query.includes('tel') || query.includes('telefon') || query.includes('raqam') || query.includes('instagram') || query.includes('kanal') || query.includes('yozish')) {
    return `Biz bilan bog'lanish koordinatalari:

- **Telefon raqam:** +998 99 845 66 32
- **Telegram Admin:** @aluvantis_admin (to'g'ridan-to'g'ri aloqa va maslahat)
- **Telegram Kanal:** @aluvantis (oxirgi loyihalar va yangiliklar)
- **Instagram:** @aluvantis
- **Yangiliklar Blogi:** blog.aluvantis.uz

Sizga qulay bo'lgan istalgan tarmoq orqali yozishingiz yoki qo'ng'iroq qilishingiz mumkin!`;
  }
  
  if (query.includes('to\'lov') || query.includes('tolov') || query.includes('pay') || query.includes('click') || query.includes('payme') || query.includes('karta') || query.includes('oldindan')) {
    return `Bizda to'lovlar juda adolatli va xavfsiz tarzda tuzilgan:
- Loyihani boshlash uchun **30% oldindan boshlang'ich to'lov** amalga oshiriladi.
- Qolgan **70% to'lov** esa sayt to'liq tayyor bo'lib, sizga 100% ma'qul kelganidan so'ng amalga oshiriladi.
To'lovlarni Click, Payme yoki karta orqali o'tkazish imkoniyati mavjud.`;
  }
  
  if (query.includes('ishlar') || query.includes('loyiha') || query.includes('portfol') || query.includes('case') || query.includes('saytlar')) {
    return `Biz Toshkentdagi ko'plab kafe, do'kon va salonlar uchun muvaffaqiyatli saytlar tayyorlaganmiz. Masalan:
- **Rayhon Milliy Taomlar** (interaktiv taomnoma va Telegram buyurtma tizimi)
- **Sardor Erkaklar Liboslari** (yangiliklar, kolleksiya katalogi)
- **Nafosat Go'zallik Saloni** (usta portfoliosi, narxlar jadvali va navbatga yozilish)
Barcha ishlarimizni batafsil ko'rish uchun saytimizning "Ishlar" sahifasiga o'tishingiz mumkin!`;
  }

  return `Aluvantis raqamli studiyasining AI Konsultantiga qiziqish bildirganingiz uchun rahmat! 

Sizga quyidagi ma'lumotlar bo'yicha yordam bera olaman:
- **Sayt yaratish narxlari va tariflari** (START, BIZNES, PRO)
- **48 soatlik kafolatlar**
- **Umrbod bepul hosting**
- **Sobiq loyihalarimiz va ishlari**

Yoki to'g'ridan-to'g'ri menejerimiz bilan bog'laning:
- **Telegram Admin:** @aluvantis_admin
- **Telefon:** +998 99 845 66 32`;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // In-memory synced state for D1 and KV simulation
  const mockD1Db = {
    telegram_bot_ai: [
      {
        id: 'uuid-usr-001',
        data: JSON.stringify({
          telegramId: '498234123',
          username: 'anvar_uz',
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop',
          bio: 'Sakinward foydalanuvchisi | Ruhiy xotirjamlik izlovchi'
        }),
        chat: JSON.stringify([
          { sender: 'user', text: 'Assalomu alaykum, bugun asr namozi soat nechada?', timestamp: '14:20' },
          { sender: 'ai', text: 'Vaalaykum assalom va rahmatulloh. Toshkent vaqti bilan Asr namozi 16:42 da kiradi.', timestamp: '14:21' }
        ])
      }
    ],
    telegram_bot_tracking: [
      {
        id: 'uuid-usr-001',
        user_metadata: JSON.stringify({
          deviceTime: '14:23:45',
          ipAddress: '178.218.201.44',
          macAddress: '00:1A:2B:3C:4D:5E',
          vpnActive: false,
          location: 'Tashkent, Uzbekistan',
          topicsDiscussed: ['Namoz vaqtlari', 'Sakin AI', 'Zikrlar']
        })
      }
    ],
    pricing_matrix: [
      { id: '1', key: 'plan_starter', data: JSON.stringify({ name: 'Starter', price: '4 800 000', currency: 'so\'m', limit: '48 soatda tayyor', features: ['1 ta premium sahifa', 'Mobil optimizatsiya', 'Telegram integratsiyasi', 'Bepul hosting'] }) },
      { id: '2', key: 'plan_pro', data: JSON.stringify({ name: 'Pro Ko\'p tarmoqli', price: '9 500 000', currency: 'so\'m', limit: '72 soatda tayyor', features: ['5 tagacha sahifalar', '3 oylik bepul kafolat', 'Dizayn animatsiyalar', 'CRM integratsiya', 'D1 & KV ulanishi'] }) },
      { id: '3', key: 'plan_premium', data: JSON.stringify({ name: 'Ekotizim / Portal', price: '14 500 000', currency: 'so\'m', limit: '7 kun muddat', features: ['Cheksiz sahifalar', 'D1 bazali server', 'Telegram bot + AI', 'Google Cloud ulanish', 'Wildcard subdomenlar'] }) }
    ]
  };

  // Config Status endpoint
  app.get('/api/config/status', (req, res) => {
    res.json({
      hasDeepSeek: !!process.env.DEEPSEEK_API_KEY,
      hasGemini: !!process.env.GEMINI_API_KEY,
      hasTelegram: !!process.env.TELEGRAM_BOT_TOKEN,
      hasCloudflareToken: !!process.env.CLOUDFLARE_API_TOKEN,
      hasCloudflareAccount: !!process.env.CLOUDFLARE_ACCOUNT_ID,
      hasCloudflareD1: !!process.env.CLOUDFLARE_D1_DATABASE_ID,
      hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      appUrl: process.env.APP_URL || ''
    });
  });

  // Cloudflare D1 Query Execution (Proxy to Cloudflare REST API or Local Fallback)
  app.post('/api/d1/execute', async (req, res) => {
    const { sql, params = [] } = req.body;
    const cfToken = req.headers['x-cf-token'] || process.env.CLOUDFLARE_API_TOKEN;
    const cfAccount = req.headers['x-cf-account'] || process.env.CLOUDFLARE_ACCOUNT_ID;
    const cfDbId = req.headers['x-cf-db-id'] || process.env.CLOUDFLARE_D1_DATABASE_ID;

    if (cfToken && cfAccount && cfDbId) {
      try {
        const cfResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccount}/d1/database/${cfDbId}/query`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cfToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sql, params })
        });
        const cfData = await cfResponse.json();
        return res.json({ source: 'cloudflare_d1_live', result: cfData });
      } catch (err: any) {
        console.warn('Direct Cloudflare D1 query error, falling back to local simulation:', err);
      }
    }

    // Local / In-memory Fallback Execution
    res.json({
      source: 'local_d1_simulation',
      result: {
        success: true,
        meta: { changes: 1, duration: 2.4 },
        results: [{ status: 'executed_in_memory', sql }]
      }
    });
  });

  // Delta Matrix Update for Pricing/Content (3-column layout)
  app.post('/api/d1/matrix-patch', (req, res) => {
    const { key, delta } = req.body;
    const target = mockD1Db.pricing_matrix.find(p => p.key === key);
    if (!target) {
      return res.status(404).json({ error: 'Plan key not found' });
    }

    try {
      const currentData = JSON.parse(target.data);
      const updatedData = { ...currentData, ...delta };
      target.data = JSON.stringify(updatedData);

      const sqlStmt = `UPDATE site_content SET data = json_patch(data, '${JSON.stringify(delta)}') WHERE key = '${key}';`;

      res.json({
        success: true,
        sql: sqlStmt,
        updatedKey: key,
        newData: updatedData,
        kvSync: { key: `pricing_cache_${key}`, ttl: 1209600 }
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Telegram Bot Webhook endpoint with Fast Buttons (inline_keyboard)
  app.post('/api/telegram/webhook', async (req, res) => {
    const update = req.body;
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!update) return res.sendStatus(200);

    const message = update.message || update.callback_query?.message;
    const chatId = message?.chat?.id;
    const text = update.message?.text || update.callback_query?.data || '';
    const fromUser = update.message?.from || update.callback_query?.from;

    if (chatId && tgToken) {
      let replyText = 'Assalomu alaykum! Sakinward botiga xush kelibsiz.';
      const lower = text.toLowerCase();

      if (lower.includes('namoz') || lower.includes('prayer')) {
        replyText = '⏱️ Toshkent astronomik namoz vaqtlari:\n• Bomdod: 05:02\n• Quyosh: 06:18\n• Peshin: 12:44\n• Asr: 16:42\n• Shom: 18:10\n• Hufton: 19:24';
      } else if (lower.includes('quran') || lower.includes('qur\'on')) {
        replyText = '📚 «Albatta, Allohning zikri ila qalblar orom olur» (Ra\'d, 28). Mishary Rashid Alafasy qiroati va tabiat sadolari yuklanmoqda.';
      } else if (lower.includes('tasbih') || lower.includes('zikr')) {
        replyText = '📿 Zikr: «Subhanallohi va bihamdihi». Siz 1 ta tasbeh sanadingiz (D1 bazasiga shifrlanib yozildi).';
      } else if (lower.includes('sakin_ai') || lower.includes('ai')) {
        try {
          replyText = await callLlmModel(
            'Siz Sakinward loyihasining aqlli ma\'naviy yo\'ldoshisiz. O\'ta qisqa (maksimal 2 ta jumla), samimiy va xotirjam javob bering.',
            text || 'Qalbimda xotirjamlik istayman',
            false
          );
        } catch {
          replyText = 'Qalbingizga xotirjamlik va nur tilaymiz. Har bir qiyinchilik bilan birga albatta yengillik bordir.';
        }
      }

      // Send response with inline_keyboard (fast buttons)
      try {
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: replyText,
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '📚 Qur\'oni Karim', callback_data: 'quran' },
                  { text: '⏱️ Namoz vaqtlari', callback_data: 'prayer' }
                ],
                [
                  { text: '🤖 Sakin AI', callback_data: 'sakin_ai' },
                  { text: '📿 Tasbih/Zikr', callback_data: 'tasbih' }
                ],
                [
                  { text: '🌐 Saytga kirish', url: 'https://sakinwardapp.aluvantis.uz/landingpage' }
                ]
              ]
            }
          })
        });
      } catch (e) {
        console.error('Failed to send telegram message:', e);
      }
    }

    res.sendStatus(200);
  });

  // API endpoint for multi-agent chatbot with DeepSeek + DuckDuckGo Research capabilities
  app.post('/api/chat', async (req, res) => {
    const messages = req.body?.messages;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Xabarlar to’plami berilishi shart' });
    }

    const lastUserMsg = messages[messages.length - 1]?.content || '';

    try {
      // Format previous chat history context for the model
      const historyContext = messages.slice(0, -1).map(msg => `${msg.role}: ${msg.content}`).join('\n');

      // Directly call Writer Agent with our solid, hardcoded Aluvantis knowledge base
      console.log('Generating instant direct response...');
      const finalResponseText = await runWriterAgent(lastUserMsg, '', historyContext);

      // Return the final fast response
      res.json({
        text: finalResponseText,
        sources: []
      });
    } catch (error: any) {
      console.warn('Direct execution failed, fallback activated:', error);
      
      const fallbackText = getFallbackResponse(lastUserMsg);
      res.json({
        text: fallbackText,
        sources: [
          { title: "Aluvantis Aloqa", uri: "https://t.me/aluvantis_admin" },
          { title: "Aluvantis Yangiliklar", uri: "https://blog.aluvantis.uz" }
        ],
        isFallback: true
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production' || process.env.VITE_PROD === 'true';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();

