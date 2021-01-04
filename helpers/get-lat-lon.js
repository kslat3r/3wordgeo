const geohash = require('ngeohash');
const wordlist = require('../data/wordlist.json');
const symbols = require('../data/symbols.json');

module.exports = (words) => {
  const ints = words.map(word => wordlist.indexOf(word));

  let int = (ints[0] * (2**30)) + (ints[1] * (2**15)) + (ints[2]);

  const base = symbols.length;
  const hash = [];

  while (int > 0) {
    hash.push(symbols[int % base]);
    int = Math.floor(int / base);
  }

  const reversedHash = hash.reverse();
  const latlng = geohash.decode(reversedHash);
  const minMaxLatlng = geohash.decode_bbox(reversedHash);

  return Object.assign({}, {
    words,
    lat: latlng.latitude,
    lon: latlng.longitude,
    box: minMaxLatlng,
    threshold: {
      lat: latlng.error.latitude,
      lon: latlng.error.longitude
    }
  });
};