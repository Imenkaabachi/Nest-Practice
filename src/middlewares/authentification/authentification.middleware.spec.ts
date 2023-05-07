import { AuthentificationMiddleware } from './authentification.middleware';

describe('AuthentificationMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthentificationMiddleware()).toBeDefined();
  });
});
