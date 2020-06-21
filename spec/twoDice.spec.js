const expectCustom = require('../customFuncForTest/expect');
const twoDiceFun = require('../utils/twoDiceFunction');
const objForTest = require('../data/objectDice');
const generalFunction = require('../utils/generalFunction');
let AllureReporter = require('jasmine-allure-reporter');
jasmine.getEnv().addReporter(new AllureReporter({
    resultsDir: 'allure-results'
}));

let originalTimeout;

describe("Test with two dice", () => {
    beforeAll(()=>{
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    it("[ID2_1] Test with 1000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueTwoDice);
        // let objReq ={
        //     endpoint: generalData.endpointForRandomValue,
        //     apiKey: generalData.apiKey,
        //     id: 4,
        //     count: 1000,
        //     minValue: 2,
        //     maxValue: 12};
        //
        ////1-2
        // await twoDiceFun.getDiceValueFromArray(valueDice, objReq);
        await twoDiceFun.getRandomValueDice(valueDice, 1000);
        //3
        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 12, 1000);
        //4
        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest = ${pearsonChiSquareTest}`);
    });

    it("[ID2_2] Test with 5000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueTwoDice);
        // let objReq ={
        //     endpoint: generalData.endpointForRandomValue,
        //     apiKey: generalData.apiKey,
        //     id: 5,
        //     count: 5000,
        //     minValue: 2,
        //     maxValue: 12};
        //
        ////1-2
        // await twoDiceFun.getDiceValueFromArray(valueDice, objReq);
        await twoDiceFun.getRandomValueDice(valueDice, 5000);
        //3
        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 12, 5000);
        //4
        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest = ${pearsonChiSquareTest}`);
    });

    it("[ID2_3] Test with 10 000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueTwoDice);
        // let objReq ={
        //     endpoint: generalData.endpointForRandomValue,
        //     apiKey: generalData.apiKey,
        //     id: 6,
        //     count: 10000,
        //     minValue: 2,
        //     maxValue: 12};
        //
        ////1-2
        // await twoDiceFun.getDiceValueFromArray(valueDice, objReq);
        await twoDiceFun.getRandomValueDice(valueDice, 10000);
        //3
        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 12, 10000);
        //4
        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest = ${pearsonChiSquareTest}`);
    });

    afterAll(()=>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});