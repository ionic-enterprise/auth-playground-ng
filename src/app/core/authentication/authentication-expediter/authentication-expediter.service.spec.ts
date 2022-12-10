import { TestBed } from '@angular/core/testing';
import { AuthProvider } from '@app/models';
import { SessionVaultService } from '../../session-vault/session-vault.service';
import { createSessionVaultServiceMock } from '../../testing';
import { BasicAuthenticationService } from '../basic-authentication/basic-authentication.service';
import { createBasicAuthenticationServiceMock } from '../basic-authentication/basic-authentication.service.mock';
import { OIDCAuthenticationService } from '../oidc-authentication/oidc-authentication.service';
import { createOIDCAuthenticationServiceMock } from '../oidc-authentication/oidc-authentication.service.mock';
import { AuthenticationExpediterService } from './authentication-expediter.service';

describe('AuthenticationExpediterService', () => {
  let service: AuthenticationExpediterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OIDCAuthenticationService, useFactory: createOIDCAuthenticationServiceMock },
        { provide: BasicAuthenticationService, useFactory: createBasicAuthenticationServiceMock },
        { provide: SessionVaultService, useFactory: createSessionVaultServiceMock },
      ],
    });
    service = TestBed.inject(AuthenticationExpediterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  ['Auth0', 'AWS', 'Azure'].forEach((provider: AuthProvider) => {
    describe(`when using ${provider}`, () => {
      beforeEach(() => {
        const vault = TestBed.inject(SessionVaultService);
        (vault.getAuthProvider as any).and.returnValue(Promise.resolve(provider));
      });

      describe('login', () => {
        it('sets up the OIDC service', async () => {
          const oidc = TestBed.inject(OIDCAuthenticationService);
          await service.login(provider);
          expect(oidc.setAuthProvider).toHaveBeenCalledTimes(1);
          expect(oidc.setAuthProvider).toHaveBeenCalledWith(provider);
        });

        it('calls the OIDC login', async () => {
          const oidc = TestBed.inject(OIDCAuthenticationService);
          await service.login(provider);
          expect(oidc.login).toHaveBeenCalledTimes(1);
        });

        it('saves the auth provider', async () => {
          const vault = TestBed.inject(SessionVaultService);
          await service.login(provider);
          expect(vault.setAuthProvider).toHaveBeenCalledTimes(1);
          expect(vault.setAuthProvider).toHaveBeenCalledWith(provider);
        });
      });

      describe('logout', () => {
        it('sets up the OIDC service to', async () => {
          const oidc = TestBed.inject(OIDCAuthenticationService);
          await service.logout();
          expect(oidc.setAuthProvider).toHaveBeenCalledTimes(1);
          expect(oidc.setAuthProvider).toHaveBeenCalledWith(provider);
        });

        it('calls the OIDC logout', async () => {
          const oidc = TestBed.inject(OIDCAuthenticationService);
          await service.logout();
          expect(oidc.logout).toHaveBeenCalledTimes(1);
        });
      });

      describe('get access token', () => {
        it('sets up the OIDC service', async () => {
          const oidc = TestBed.inject(OIDCAuthenticationService);
          await service.getAccessToken();
          expect(oidc.setAuthProvider).toHaveBeenCalledTimes(1);
          expect(oidc.setAuthProvider).toHaveBeenCalledWith(provider);
        });

        it('gets the OIDC access token', async () => {
          const oidc = TestBed.inject(OIDCAuthenticationService);
          await service.getAccessToken();
          expect(oidc.getAccessToken).toHaveBeenCalledTimes(1);
        });
      });

      describe('is authenticated', () => {
        it('sets up the OIDC service', async () => {
          const oidc = TestBed.inject(OIDCAuthenticationService);
          await service.isAuthenticated();
          expect(oidc.setAuthProvider).toHaveBeenCalledTimes(1);
          expect(oidc.setAuthProvider).toHaveBeenCalledWith(provider);
        });

        it('checks with OIDC if the user is authenticated', async () => {
          const oidc = TestBed.inject(OIDCAuthenticationService);
          await service.isAuthenticated();
          expect(oidc.isAuthenticated).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('when using Basic', () => {
    beforeEach(() => {
      const vault = TestBed.inject(SessionVaultService);
      (vault.getAuthProvider as any).and.returnValue(Promise.resolve('Basic'));
    });

    describe('login', () => {
      it('calls the Basic login', async () => {
        const basic = TestBed.inject(BasicAuthenticationService);
        await service.login('Basic', { email: 'fred.rogers@thehood.org', password: 'Mak3Be!ieve' });
        expect(basic.login).toHaveBeenCalledTimes(1);
        expect(basic.login).toHaveBeenCalledWith('fred.rogers@thehood.org', 'Mak3Be!ieve');
      });

      it('saves the auth provider', async () => {
        const vault = TestBed.inject(SessionVaultService);
        await service.login('Basic', { email: 'fred.rogers@thehood.org', password: 'Mak3Be!ieve' });
        expect(vault.setAuthProvider).toHaveBeenCalledTimes(1);
        expect(vault.setAuthProvider).toHaveBeenCalledWith('Basic');
      });
    });

    describe('logout', () => {
      it('calls the Basic logout', async () => {
        const basic = TestBed.inject(BasicAuthenticationService);
        await service.logout();
        expect(basic.logout).toHaveBeenCalledTimes(1);
      });
    });

    describe('get access token', () => {
      it('gets the Basic access token', async () => {
        const basic = TestBed.inject(BasicAuthenticationService);
        await service.getAccessToken();
        expect(basic.getAccessToken).toHaveBeenCalledTimes(1);
      });
    });

    describe('is authenticated', () => {
      it('checks with Basic if the user is authenticated', async () => {
        const basic = TestBed.inject(BasicAuthenticationService);
        await service.isAuthenticated();
        expect(basic.isAuthenticated).toHaveBeenCalledTimes(1);
      });
    });
  });
});
