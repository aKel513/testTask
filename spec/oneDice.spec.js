const expectCustom = require('../customFuncForTest/expect');
const oneDiceFun = require('../utils/oneDiceFunction');
const objForTest = require('../data/objectDice');
const generalData = require('../data/generalData');
const generalFunction = require('../utils/generalFunction');
let AllureReporter = require('jasmine-allure-reporter');
jasmine.getEnv().addReporter(new AllureReporter({
    resultsDir: 'allure-results'
}));

let originalTimeout;

describe("[ID1] Tests suit with one dice", () => {
    beforeAll(()=>{
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    it("[ID1_1] Test with 1000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueOneDice);
        // let objReq ={
        //     endpoint: generalData.endpointForRandomValue,
        //     apiKey: generalData.apiKey,
        //     id: 1,
        //     count: 1000,
        //     minValue: 1,
        //     maxValue: 6};
        //
        ////1-2
        // await oneDiceFun.getDiceValueFromArray(valueDice, objReq);
        await a
        await oneDiceFun.getRandomValueDice(valueDice, 1000);
        //3
        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 6, 1000);
        //4
        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest = ${pearsonChiSquareTest}`);
    });

    it("[ID1_2] Test with 5000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueOneDice);
        // let objReq ={
        //     endpoint: generalData.endpointForRandomValue,
        //     apiKey: generalData.apiKey,
        //     id: 2,
        //     count: 5000,
        //     minValue: 1,
        //     maxValue: 6};
        //
        ////1-2
        // await oneDiceFun.getDiceValueFromArray(valueDice, objReq);
        await oneDiceFun.getRandomValueDice(valueDice, 5000);
        //3
        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 6, 5000);
        //4
        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest ${pearsonChiSquareTest}`);
    });

    it("[ID1_3] Test with 10 000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueOneDice);
        // let objReq ={
        //     endpoint: generalData.endpointForRandomValue,
        //     apiKey: generalData.apiKey,
        //     id: 2,
        //     count: 5000,
        //     minValue: 1,
        //     maxValue: 6};
        //
        ////1-2
        // await oneDiceFun.getDiceValueFromArray(valueDice, objReq);
        await oneDiceFun.getRandomValueDice(valueDice, 10000);
        //3
        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 6, 10000);
        //4
        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest ${pearsonChiSquareTest}`);
    });

    afterAll(()=>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});