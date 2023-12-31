const validateCard = (cardNumber) => {
  let nDigits = cardNumber.length;

  let nSum = 0;
  let isSecond = false;
  for (let i = nDigits - 1; i >= 0; i--) {
    let d = cardNumber[i].charCodeAt() - "0".charCodeAt();

    if (isSecond == true) d = d * 2;

    nSum += parseInt(d / 10, 10);
    nSum += d % 10;

    isSecond = !isSecond;
  }
  return nSum % 10 == 0;
};

module.exports = { validateCard };
