
declare module 'html-to-image' {
  export function toPng(node: HTMLElement, options?: {
    quality?: number;
    pixelRatio?: number;
    backgroundColor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: (node: HTMLElement) => boolean;
    canvasWidth?: number;
    canvasHeight?: number;
  }): Promise<string>;

  export function toJpeg(node: HTMLElement, options?: {
    quality?: number;
    pixelRatio?: number;
    backgroundColor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: (node: HTMLElement) => boolean;
    canvasWidth?: number;
    canvasHeight?: number;
  }): Promise<string>;

  export function toBlob(node: HTMLElement, options?: {
    quality?: number;
    pixelRatio?: number;
    backgroundColor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: (node: HTMLElement) => boolean;
    canvasWidth?: number;
    canvasHeight?: number;
  }): Promise<Blob>;

  export function toCanvas(node: HTMLElement, options?: {
    quality?: number;
    pixelRatio?: number;
    backgroundColor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: (node: HTMLElement) => boolean;
    canvasWidth?: number;
    canvasHeight?: number;
  }): Promise<HTMLCanvasElement>;

  export function toSvg(node: HTMLElement, options?: {
    quality?: number;
    pixelRatio?: number;
    backgroundColor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: (node: HTMLElement) => boolean;
    canvasWidth?: number;
    canvasHeight?: number;
  }): Promise<string>;
}
