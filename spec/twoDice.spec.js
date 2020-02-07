const expectCustom = require('../customFuncForTest/expect');
const twoDiceFun = require('../utils/twoDiceFunction');
const objForTest = require('../data/objectDice');
const generalFunction = require('../utils/generalFunction');

let originalTimeout;

describe("Test with two dice", () => {
    beforeAll(()=>{
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    it("[ID2_1] Test with 1000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueTwoDice);

        await twoDiceFun.getRandomValueDice(valueDice, 1000);

        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 12, 1000);

        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest = ${pearsonChiSquareTest}`);
    });

    it("[ID2_2] Test with 5000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueTwoDice);

        await twoDiceFun.getRandomValueDice(valueDice, 5000);

        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 12, 5000);

        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest = ${pearsonChiSquareTest}`);
    });

    it("[ID2_3] Test with 10 000 rolls", async()=> {
        let valueDice = Object.assign({}, objForTest.objForValueTwoDice);

        await twoDiceFun.getRandomValueDice(valueDice, 10000);

        let pearsonChiSquareTest = generalFunction.pearsonChiSquareTest(valueDice, 12, 10000);

        await expectCustom.expectToCompare(pearsonChiSquareTest < 5, true,
            `check pearsonChiSquareTest = ${pearsonChiSquareTest}`);
    });

    afterAll(()=>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});