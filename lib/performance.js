var SafePromise = require('es6-promise').Promise;

module.exports = new SafePromise(function (resolve, reject) {
  if (typeof window === 'undefined') {
    resolve();
  } else {
    var t = window.performance.timing;
    if (t.domContentLoadedEventEnd > 0) {
      resolve(t);
    } else {
      window.onload = function () {
        resolve(t);
      }
    }
  }
}).then(function (t) {
  var stats = {};
  if (t) {
    stats.server = t.responseEnd - t.navigationStart;
    stats.client = t.domContentLoadedEventEnd - t.responseEnd;
    stats.total = stats.server + stats.client;
  }
  return stats;
});
