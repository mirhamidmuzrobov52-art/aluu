declare module 'animejs' {
  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    finished: Promise<void>;
  }

  interface AnimeParams {
    targets?: any;
    duration?: number | ((el: any, i: number, l: number) => number);
    delay?: number | ((el: any, i: number, l: number) => number);
    endDelay?: number;
    elasticity?: number;
    round?: number | boolean;
    loop?: number | boolean;
    autoplay?: boolean;
    direction?: 'normal' | 'reverse' | 'alternate';
    easing?: string | number[] | Function;
    complete?: (anim: AnimeInstance) => void;
    begin?: (anim: AnimeInstance) => void;
    update?: (anim: AnimeInstance) => void;
    [key: string]: any;
  }

  function anime(params: AnimeParams): AnimeInstance;

  namespace anime {
    function random(min: number, max: number): number;
    function stagger(val: number | [number, number], options?: any): any;
  }

  export default anime;
}
