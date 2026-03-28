export const appConfig = () => ({
  appName: process.env.APP_NAME || 'Axtella Backend',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
});
