import { URL } from 'node:url';
import * as dotenv from 'dotenv';
dotenv.config();

type AppConfig = {
  host: string;
  protocol: string;
  port: string;
  webAppUrl: string;
  webhookUrl: string;
  appEnv: string;
  isDev: boolean;
  postgresDatabase: string;
  postgresPort: number;
  postgresHost: string;
  postgresUsername: string;
  postgresPassword?: string;
  version: string;
  postgresEnableSsl: boolean;
  baseUrl: string;
  encryptionKey: string;
  webhookSecretKey: string;
  appSecretKey: string;
  serveWebAppSeparately: boolean;
  redisHost: string;
  redisPort: number;
  redisUsername: string;
  redisPassword: string;
  redisTls: boolean;
  enableBullMQDashboard: boolean;
  bullMQDashboardUsername: string;
  bullMQDashboardPassword: string;
  telemetryEnabled: boolean;
};

const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';
const port = process.env.PORT || '3000';
const serveWebAppSeparately =
  process.env.SERVE_WEB_APP_SEPARATELY === 'true' ? true : false;

let apiUrl = (new URL(`${protocol}://${host}:${port}`)).toString();
apiUrl = apiUrl.substring(0, apiUrl.length - 1);

// use apiUrl by default, which has less priority over the following cases
let webAppUrl = apiUrl;

if (process.env.WEB_APP_URL) {
  // use env. var. if provided
  webAppUrl = (new URL(process.env.WEB_APP_URL)).toString();
  webAppUrl = webAppUrl.substring(0, webAppUrl.length - 1);
} else if (serveWebAppSeparately) {
  // no env. var. and serving separately, sign of development
  webAppUrl = 'http://localhost:3001'
}

let webhookUrl = (new URL(process.env.WEBHOOK_URL || apiUrl)).toString();
webhookUrl = webhookUrl.substring(0, webhookUrl.length - 1);

const appEnv = process.env.APP_ENV || 'development';

const appConfig: AppConfig = {
  host,
  protocol,
  port,
  appEnv: appEnv,
  isDev: appEnv === 'development',
  version: process.env.npm_package_version,
  postgresDatabase: process.env.POSTGRES_DATABASE || 'automatisch_development',
  postgresPort: parseInt(process.env.POSTGRES_PORT || '5432'),
  postgresHost: process.env.POSTGRES_HOST || 'localhost',
  postgresUsername:
    process.env.POSTGRES_USERNAME || 'automatisch_development_user',
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresEnableSsl: process.env.POSTGRES_ENABLE_SSL === 'true',
  encryptionKey: process.env.ENCRYPTION_KEY || '',
  webhookSecretKey: process.env.WEBHOOK_SECRET_KEY || '',
  appSecretKey: process.env.APP_SECRET_KEY || '',
  serveWebAppSeparately,
  redisHost: process.env.REDIS_HOST || '127.0.0.1',
  redisPort: parseInt(process.env.REDIS_PORT || '6379'),
  redisUsername: process.env.REDIS_USERNAME,
  redisPassword: process.env.REDIS_PASSWORD,
  redisTls: process.env.REDIS_TLS === 'true',
  enableBullMQDashboard: process.env.ENABLE_BULLMQ_DASHBOARD === 'true',
  bullMQDashboardUsername: process.env.BULLMQ_DASHBOARD_USERNAME,
  bullMQDashboardPassword: process.env.BULLMQ_DASHBOARD_PASSWORD,
  baseUrl: apiUrl,
  webAppUrl,
  webhookUrl,
  telemetryEnabled: process.env.TELEMETRY_ENABLED === 'false' ? false : true,
};

if (!appConfig.encryptionKey) {
  throw new Error('ENCRYPTION_KEY environment variable needs to be set!');
}

if (!appConfig.webhookSecretKey) {
  throw new Error('WEBHOOK_SECRET_KEY environment variable needs to be set!');
}

export default appConfig;
