import { ProviderOptions } from '@ionic-enterprise/auth';

const auth0Config: ProviderOptions = {
  // audience value is required for auth0's config. If it doesn't exist, the jwt payload will be empty
  audience: 'https://io.ionic.demo.ac',
  clientId: 'yLasZNUGkZ19DGEjTmAITBfGXzqbvd00',
  discoveryUrl: 'https://dev-2uspt-sz.us.auth0.com/.well-known/openid-configuration',
  redirectUri: 'msauth://login',
  logoutUrl: 'msauth://login',
  scope: 'openid email picture profile',
};

const awsConfig: ProviderOptions = {
  clientId: '64p9c53l5thd5dikra675suvq9',
  discoveryUrl: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_YU8VQe29z/.well-known/openid-configuration',
  scope: 'openid email profile',
  redirectUri: 'msauth://login',
  logoutUrl: 'msauth://login',
  audience: '',
};

const azureConfig: ProviderOptions = {
  clientId: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  scope: 'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  redirectUri: 'myapp://callback',
  logoutUrl: 'myapp://callback?logout=true',
  audience: 'https://api.myapp.com',
};

const webRedirects = {
  redirectUri: 'http://localhost:8100/login',
  logoutUrl: 'http://localhost:8100/login',
};

export const environment = {
  auth0Config,
  awsConfig,
  azureConfig,
  webRedirects,
  production: true,
  dataService: 'https://cs-demo-api.herokuapp.com',
};
