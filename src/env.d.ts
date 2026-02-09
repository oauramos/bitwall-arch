/// <reference types="vite/client" />

declare global {
  interface Window {
    bitwall: import('../electron/preload').BitwallAPI
  }
}

export {}
