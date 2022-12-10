import { Injectable } from '@angular/core';
import { AuthProvider } from '@app/models';
import { SessionVaultService } from '../../session-vault/session-vault.service';
import { Authenticator } from '../authenticator';
import { BasicAuthenticationService } from '../basic-authentication/basic-authentication.service';
import { OIDCAuthenticationService } from '../oidc-authentication/oidc-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationExpediterService {
  constructor(
    private oidc: OIDCAuthenticationService,
    private basic: BasicAuthenticationService,
    private vault: SessionVaultService
  ) {}

  async login(provider: AuthProvider, credentials?: { email: string; password: string }): Promise<void> {
    await this.vault.setAuthProvider(provider);
    const auth = this.getAuthService(provider);
    if (auth) {
      if (credentials) {
        return auth.login(credentials.email, credentials.password);
      } else {
        return auth.login();
      }
    }
    return Promise.reject(new Error(`Invalid provider: ${provider}`));
  }

  async logout(): Promise<void> {
    const provider = await this.vault.getAuthProvider();
    const auth = this.getAuthService(provider);
    if (auth) {
      return auth.logout();
    }
    return Promise.reject(new Error(`Invalid provider: ${provider}`));
  }

  async getAccessToken(): Promise<string | void> {
    const provider = await this.vault.getAuthProvider();
    const auth = this.getAuthService(provider);
    if (auth) {
      return auth.getAccessToken();
    }
    return Promise.reject(new Error(`Invalid provider: ${provider}`));
  }

  async isAuthenticated(): Promise<boolean> {
    const provider = await this.vault.getAuthProvider();
    const auth = this.getAuthService(provider);
    return !!auth && (await auth.isAuthenticated());
  }

  private getAuthService(provider: AuthProvider): Authenticator | null {
    switch (provider) {
      case 'Auth0':
      case 'AWS':
      case 'Azure':
        this.oidc.setAuthProvider(provider);
        return this.oidc;

      case 'Basic':
        return this.basic;

      default:
        return null;
    }
  }
}
