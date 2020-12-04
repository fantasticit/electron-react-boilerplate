declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

declare const PACKAGE_JSON;
declare const RUNTIME_CONFIG;
declare const DEV_RENDERER_PORT;
