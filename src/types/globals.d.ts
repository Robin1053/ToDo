// src/types/globals.d.ts
export {};

declare global {
  interface CredentialResponse {
    credential?: string;
    select_by?: string;
  }

  interface Window {
    handleCredentialResponse: (response: CredentialResponse) => void;
  }
}