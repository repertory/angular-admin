const https = require('https');
const Parse = require('parse/node');

class Dingtalk {

    /*
    @param appIds: the specified app ids in the configuration
    @param authData: the client provided authData
    @returns a promise that resolves if the applicationId is valid
     */
    validateAppId() {
        return Promise.resolve({});
    }

    /*
    @param authData: the client provided authData
    @param options: additional options
     */
    validateAuthData(authData) {
        const graphRequest = function (snsToken) {
            return new Promise(function (resolve, reject) {
                https.get('https://oapi.dingtalk.com/sns/getuserinfo?sns_token=' + snsToken, function (res) {
                    let data = '';
                    res.on('data', function (chunk) {
                        data += chunk;
                    });
                    res.on('end', function () {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {
                            return reject(e);
                        }
                        data.errcode == 0 ? resolve(data) : reject(data);
                    });
                }).on('error', function () {
                    reject('Failed to validate this sns token with dingtalk.');
                });
            });
        };

        return graphRequest(authData.sns_token).then(function (data) {
            if (data && data.user_info && data.user_info.unionid == authData.id) {
                return;
            }
            throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'dingtalk auth is invalid for this user.');
        });
    }
}

exports.Dingtalk = Dingtalk;
exports.default = Dingtalk;