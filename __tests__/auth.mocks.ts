import { SETTINGS } from '../src/settings';

export const authMock = `Basic ${Buffer.from(`${SETTINGS.LOGIN}:${SETTINGS.PASSWORD}`).toString('base64')}`;
