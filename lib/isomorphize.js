/**
 * load non critical css async
 */
function loadNonCriticalCSS (href) {
  var link = window.document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  window.document.getElementsByTagName('head')[0].appendChild(link);
}

module.exports = function (isomorphize) {
  if (typeof window !== 'undefined') {
    if (isomorphize.nonCriticalCSS) {
      loadNonCriticalCSS(isomorphize.nonCriticalCSS);
    }
    var router = require('./router');
    router.start();
    if (isomorphize.componentPath && isomorphize.data) {
      router.serverToClient(isomorphize.componentPath, isomorphize.data);
    }
  }
};
