/// <reference types="vite/client" />

declare module "*.css";

declare module "jquery" {
  interface JQuery {
    bootstrapTable(method?: string, ...args: any[]): any;
  }
}

export {};
