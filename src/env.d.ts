interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly RESEND_FROM_EMAIL: string;
  readonly OFFICIAL_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
