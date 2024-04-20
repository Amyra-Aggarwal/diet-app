const CryptoJS = require('crypto-js');
const oauth1a = require('oauth-1.0a');

const CONSUMERKEY = '7923bb89015b44aebcaa124a7e2531a6';
const CONSUMERSECRET = 'd86bb0f848e4406dbe6fad05664d61b9';

class Oauth1Helper {
    static getAuthHeaderForRequest(request) {
        const oauth = oauth1a({
            consumer: { key: CONSUMERKEY, secret: CONSUMERSECRET },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
            },
        })

        const authorization = oauth.authorize(request);

        return oauth.toHeader(authorization);
    }
}

module.exports = Oauth1Helper;
