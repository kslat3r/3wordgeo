const geohash = require('ngeohash');
const wordlist = require('../data/wordlist.json');
const symbols = require('../data/symbols.json');

module.exports = (words) => {
  const ints = words.map(word => wordlist.indexOf(word));
  let int = (ints[0] * (2**30)) + (ints[1] * (2**15)) + (ints[2]);

  const base = symbols.length;
  let hash = [];

  while (int > 0) {
    hash.push(symbols[int % base]);
    
    int = Math.floor(int / base);
  }

  hash = hash.reverse();
  
  const latlng = geohash.decode(hash);
  const minMaxLatlng = geohash.decode_bbox(hash);

  return Object.assign({}, {
    lat: latlng.latitude,
    lon: latlng.longitude,
    error: {
      lat: latlng.error.latitude,
      lon: latlng.error.longitude
    },
    box: minMaxLatlng,
    words
  });
};