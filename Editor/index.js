const multilineString = `1234 13234 test.com 324311.test 12345 223445abcd1234`;

const p = multilineString.split(/[^0-9]+/);
const legths = p.filter((p) => p.length == 6);
console.log(legths.length);
