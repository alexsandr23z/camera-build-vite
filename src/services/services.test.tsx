import { getToken, saveToken, dropToken, AUTH_TOKEN_KEY_NAME } from './token';

describe('getToken', () => {
  it('returns the token from localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, 'testToken');
    expect(getToken()).toBe('testToken');
  });

  it('returns an empty string if token is not in localStorage', () => {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
    expect(getToken()).toBe('');
  });
});

describe('saveToken', () => {
  it('saves the token to localStorage', () => {
    saveToken('testToken');
    expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBe('testToken');
  });
});

describe('dropToken', () => {
  it('removes the token from localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, 'testToken');
    dropToken();
    expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBeNull();
  });
});
