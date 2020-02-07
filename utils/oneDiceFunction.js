const http = require('../utils/httpFun');
const expectCustom = require('../customFuncForTest/expect');

module.exports.getHttpAsyncValueDice = async function (endpoint, valueDice, countRolls) {
    let promiseArray=[];
    for(let i = 0; i<countRolls; i++){
        promiseArray.push(http.getMethod(endpoint)
            .then(result => valueDice[getValueOneDice(result)]++));
    }
    await Promise.all(promiseArray)
        .then(()=>console.log(valueDice));
};

//for this method we need to change the increase  jasmine.DEFAULT_TIMEOUT_INTERVAL;
module.exports.getHttpValueDice = async function (endpoint, valueDice, countRolls) {
    for(let i = 0; i< countRolls; i++){
        let getResponseHtml = await http.getMethod(endpoint);
        let diceValue = getValueOneDice(getResponseHtml);
        valueDice[diceValue]++;
    }
};

module.exports.getRandomValueDice = function (valueDice, cnt) {
    for (let i = 0; i<cnt; i++){
        let rndNumber = Math.floor(Math.random() * (6)) +1;
        valueDice[rndNumber.toString()]++;
    }
};

module.exports.getDiceValueFromArray = async function (valueDiceObj, objReq ) {
    let arrayValueDice = await http.postMethodForRndNumber(objReq.endpoint, objReq.apiKey,
                                    objReq.id, objReq.count, objReq.minValue, objReq.maxValue);

    await expectCustom.expectToCompare( arrayValueDice.result.random.data.length,
        objReq.count,'check count element in response');

    for (let i = 0; i < arrayValueDice.result.random.data.length; i++){
        valueDiceObj[ arrayValueDice.result.random.data[i].toString()]++;
    }
};

function getValueOneDice(htmlText, startTag='<img src="dice', endTag= '.png" alt="') {
    let result = htmlText.substring(htmlText.toString().indexOf(startTag)+startTag.length,
        htmlText.toString().indexOf(endTag));
    if (result.includes('error')){
        throw new Error(`The answer contains an error. ${result}`);
    }else {
        return result;
    }
};
