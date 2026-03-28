export const storageConfig = () => ({
  provider: process.env.STORAGE_PROVIDER || 'local',
  bucket: process.env.STORAGE_BUCKET || '',
  region: process.env.STORAGE_REGION || '',
});
