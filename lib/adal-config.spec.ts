import { AdalConfig } from './adal-config';

describe('AdalConfig', () => {
    it('has loginResource', () => {
        const config = new AdalConfig();
        config.loginResource = 'defaultResource';
        expect(config.loginResource).toBe('defaultResource');
    });

    it('has clientId', () => {
        const config = new AdalConfig();
        config.clientId = 'e9a5a8b6-8af7-4719-9821-0deef255f68e';
        expect(config.clientId).toBe('e9a5a8b6-8af7-4719-9821-0deef255f68e');
    })
});