// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,

    // 路由配置
    router: {
        useHash: false,
        enableTracing: false
    },

    // Parse服务
    parse: {
        appId: '7afa28e6-ff85-11e6-9766-0242ac110002',
        javascriptKey: '7b004cd0-ff85-11e6-9766-0242ac110002',
        serverURL: 'http://api.demo.wangdong.io/test',
    }
};
