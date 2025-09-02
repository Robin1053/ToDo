// src/types/globals.d.ts
export { };

declare global {
  interface CredentialResponse {
    credential?: string;
    select_by?: string;
  }

  interface Window {
    handleCredentialResponse: (response: CredentialResponse) => void;
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement | null, config: any) => void;
          prompt: (callback?: ((notification: any) => void) | undefined) => void;
        };
      };
    };
  }
  interface renderButton {
    initialize: (config: any) => void;
    prompt: (callback?: ((notification: any) => void) | undefined) => void;
  }
}