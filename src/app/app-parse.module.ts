import { NgModule, InjectionToken } from '@angular/core';
import { Parse } from 'parse';

export interface ParseConfig {
  appId: string;
  javascriptKey: string;
  serverURL: string;
}

export const parseConfigToken = new InjectionToken<ParseConfig>('parse.config');

export class ParseProvide { }

export function initialize(config: ParseConfig) {
  Parse.initialize(config.appId, config.javascriptKey);
  Parse.serverURL = config.serverURL;
}

@NgModule({
  providers: [
    {
      provide: ParseProvide,
      useFactory: initialize,
      deps: [parseConfigToken]
    }
  ]
})
export class AppParseModule {

  constructor(private provide: ParseProvide) { }

  static initialize(config: ParseConfig) {
    return {
      ngModule: AppParseModule,
      providers: [
        { provide: parseConfigToken, useValue: config },
      ]
    };
  }

}
