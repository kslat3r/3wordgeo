const geohash = require('ngeohash');
const symbols = require('../data/symbols.json');
const wordlist = require('../data/wordlist.json');

module.exports = (lat, lon) => {
  const hash = geohash.encode(lat, lon);
  const base = symbols.length;
  
  let int = 0;
  hash.split('').forEach(char => int = int * base + symbols.indexOf(char));
  
  const fifteenBits = 0b111111111111111;
  const ints = [(int / (2**30)) & fifteenBits, (int / (2**15)) & fifteenBits, int & fifteenBits];

  return ints.map(i => wordlist[i]);
};