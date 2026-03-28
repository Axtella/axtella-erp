"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageConfig = void 0;
const storageConfig = () => ({
    provider: process.env.STORAGE_PROVIDER || 'local',
    bucket: process.env.STORAGE_BUCKET || '',
    region: process.env.STORAGE_REGION || '',
});
exports.storageConfig = storageConfig;
//# sourceMappingURL=storage.config.js.map