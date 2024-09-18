import type { Options } from '@wdio/types';

require('dotenv').config();

export const config: Options.Testrunner = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    before: async function (capabilities, specs) {
        await browser.url('/');
        await browser.maximizeWindow(); 
    },

    specs: [
        './test/specs/**/*.ts'
    ],
  
    exclude: [
      
    ],
 
    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome', // or "firefox", "microsoftedge", "safari"
        'goog:chromeOptions': {
            args: ['headless', 'disable-gpu'],
        },
        acceptInsecureCerts: true,
    }],

    logLevel: 'info',

    bail: 0,
    
    baseUrl: 'https://dev.rentzila.com.ua/',
    waitforTimeout: 12000,

    connectionRetryTimeout: 120000,
 
    connectionRetryCount: 3,
    
    framework: 'mocha',
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 150000 
    },
}
