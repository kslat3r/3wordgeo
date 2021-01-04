const getWords = require('../helpers/get-words');
const getLatLon = require('../helpers/get-lat-lon');

const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// doesn't consistently work :(

test('e2e encoding and decoding within expected error threshold', () => {
  let numTests = 10;

  while (numTests > 0) {
    const lat = getRandomInRange(-90, 90, 5);
    const lon = getRandomInRange(-180, 180, 5);
    
    const words = getWords(lat, lon);
    const latLon = getLatLon(words);

    const latLower = latLon.lat - latLon.threshold.lat;
    const latHigher = latLon.lat + latLon.threshold.lat;
    const lonLower = latLon.lon - latLon.threshold.lon;
    const lonHigher = latLon.lon + latLon.threshold.lon;

    expect(lat).toBeGreaterThanOrEqual(latLower);
    expect(lat).toBeLessThan(latHigher);
    expect(lon).toBeGreaterThanOrEqual(lonLower);
    expect(lon).toBeLessThan(lonHigher);

    numTests--;
  }
});