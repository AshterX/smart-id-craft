
declare module 'file-saver' {
  export function saveAs(data: Blob | string, filename?: string, options?: { 
    type?: string; 
    autoBom?: boolean;
  }): void;
}
