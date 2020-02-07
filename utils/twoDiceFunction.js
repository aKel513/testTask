const http = require('../utils/httpFun');

module.exports.getHttpAsyncValueDice = async function (endpoint, valueDice, countRolls) {
    let promiseArray=[];
    for(let i = 0; i< countRolls; i++){
        promiseArray.push(http.getMethod(endpoint)
            .then(result => valueDice[getValueTwoDice(result)]++));
    }
    await Promise.all(promiseArray)
        .then(()=>console.log(valueDice));
};

//for this method we need to change the increase  jasmine.DEFAULT_TIMEOUT_INTERVAL;
module.exports.getHttpValueDice = async function (endpoint, valueDice, countRolls) {
    for(let i = 0; i< countRolls; i++){
        let getResponseHtml = await http.getMethod(endpoint);
        let diceValue = getValueTwoDice(getResponseHtml);
        valueDice[diceValue]++;
    }
};

module.exports.getRandomValueDice = function (valueDice, cnt) {
    for (let i = 0; i < cnt; i++){
        let rndNumber = Math.floor(Math.random() * (11)) + 2;
        valueDice[rndNumber.toString()]++;
    }
};

function getValueTwoDice (htmlText) {
    let result = (htmlText.match(/dice+[0-9]+.png/g))
        .reduce((previousValue, currentValue)=>{
            return +currentValue.match(/[0-9]/)[0] + previousValue
        }, 0);
    if (result.includes('error') || result.includes('NaN')){
        throw new Error(`The answer contains an error. ${result}`);
    }else {
        return result;
    }
};
