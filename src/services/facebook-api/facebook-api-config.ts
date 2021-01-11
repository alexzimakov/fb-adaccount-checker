import { Locale } from '../../types';
import { ApiConfig } from '../../stores/session-store';

class FacebookApiConfig implements ApiConfig {
  private _accessToken: string = '';
  private _locale: string = '';

  get accessToken(): string {
    return this._accessToken;
  }

  get locale(): string {
    return this._locale;
  }

  setAccessToken(accessToken: string): void {
    this._accessToken = accessToken;
  }

  setLocale(locale: Locale): void {
    this._locale = locale.replace('-', '_');
  }
}

export const facebookApiConfig = new FacebookApiConfig();
