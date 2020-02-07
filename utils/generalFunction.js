module.exports.pearsonChiSquareTest = function (valueDiceObj, cntFaceDice, cnt ) {
    let sum = 0;
    const E = 1/cntFaceDice * cnt;
    let start = (cntFaceDice === 12 ) ? 2:1;
    for(let i = start; i < cntFaceDice+1; i++){
        sum +=  Math.pow(valueDiceObj[i.toString()] - E , 2) / E
    }
    return Math.sqrt(sum);
};