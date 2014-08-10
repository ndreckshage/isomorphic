require('isomorphic').isomorphize(window.isomorphize);
// @TODO improve upon this big time
window.isomorphicPerformance = function () {
  var t = window.performance.timing;
  window.console.log('Server Time: ', t.responseEnd - t.navigationStart, 'ms');
  window.console.log('Client Time: ', t.domContentLoadedEventEnd - t.domLoading, 'ms');
  window.console.log('Total Time: ', t.domContentLoadedEventEnd - t. navigationStart, 'ms');
};
