module.exports.expectToCompare = async function(actualResult, expectedResult, comment='') {
    if (actualResult !== expectedResult) {
        await expect(actualResult).toEqual(expectedResult);
        throw new Error(`expected result '${expectedResult}' doesn't match the actual '${actualResult}' \n ${comment}`);
    }else{
        await expect(actualResult).toEqual(expectedResult);
    }
};