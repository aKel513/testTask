const http = require('request');

module.exports.getMethod = function (endpoint) {
    return  new Promise((resolve, reject) => {
        http.get(endpoint, (err, res, body) => {
            resolve(body);
        });
    });
};

module.exports.postMethodForRndNumber = function (endpoint, apiKey, id, count, minValue, maxValue) {
    return  new Promise((resolve, reject) => {
        http.post(
            {
                url: baseUrl + endpoint,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "jsonrpc": "2.0",
                    "method": "generateIntegers",
                    "params": {
                        "apiKey": apiKey,
                        "n": count,
                        "min": minValue,
                        "max": maxValue,
                        "replacement": true
                    },
                    "id": id
                }),
            },
            async (err, res, body) => {
                await checkOnError(body);
                resolve(JSON.parse(body));
            },
        );
    });

};

function checkOnError(body) {
    if(body.includes('error')){
        throw new Error(`request returned an error: ${body}`);
    }

}
