export interface ClientProfileRow {
  id: number;
  name: string;
  date_of_birth: string | null;
  address: string | null;
  medical_provider_name: string | null;
  medical_provider_address: string | null;
}

export interface ClientProfileInsert {
  name: string;
  date_of_birth: string | null;
  address: string | null;
  medical_provider_name: string | null;
  medical_provider_address: string | null;
}

declare global {
  interface Window {
    // Exposed by preload.js via contextBridge; only present when running inside Electron.
    sqlite?: {
      clientProfiles: {
        readAllProfiles(): ClientProfileRow[];
        insertProfile(profile: ClientProfileInsert): number;
      };
    };
  }
}
