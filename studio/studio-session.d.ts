export const studioSession: {
  token(): string;
  save(token: string, remember: boolean, expiresAt: string, identifier: string): void;
  clear(): void;
  identifier(): string;
};
