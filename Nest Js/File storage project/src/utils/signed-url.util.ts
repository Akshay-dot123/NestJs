import * as crypto from 'crypto';

const SECRET = process.env.SIGNED_URL_SECRET || 'your-very-secure-secret';

export function generateSignedUrl(fileId: string, expiresInSeconds: number): string {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const payload = `${fileId}:${expiresAt}`;
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(payload)
    .digest('hex');

  return `/files/download/${fileId}?expires=${expiresAt}&signature=${signature}`;
}
