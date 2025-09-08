export const SESSION_COOKIE = 'auth_session';
export const PASSWORD_SALT_ROUNDS = 10;
export const PASSWORD_MIN_LENGTH = 8;
export const GENERATE_USER_IMAGE = `https://robohash.org/${new Date().getTime()}`;
export const AUTH_SESSION_EXPIRES_IN = 60 * 60 * 24 * 30; // 30 days
export const AUTH_SESSION_UPDATE_AGE = 60 * 60 * 24 * 7; // 7 days