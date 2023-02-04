function createFormatter(separator, symbol, symbolFirst, func) {
    return value => func(separator, symbol, symbolFirst, value)
}

function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2,2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

createFormatter(',', '$', true, currencyFormatter);

