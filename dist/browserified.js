(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var lr = ALLEX.execSuite.libRegistry;
lr.register('vektr_windowmonitoringlib',
  require('./index')(
    ALLEX
  )
);

},{"./index":2}],2:[function(require,module,exports){
function createLib (execlib) {
  'use strict';

  var lib = execlib.lib;

  return {
    onResize: require('./windowmonitoringcreator')(lib)
  };
}

module.exports = createLib;

},{"./windowmonitoringcreator":3}],3:[function(require,module,exports){
function createWindowMonitoring(lib){
  'use strict';
  window.onresize = vektrOnWindowResize;
  var onResizeTimeout = null;
  var onResizeWait = null;
  var onResize = new lib.HookCollection();
  function recheckSize(){
    onResize.fire();
    onResizeWait*=2;
    if(onResizeWait>1000){
      return;
    }
    onResizeTimeout = lib.runNext(recheckSize,onResizeWait);
  }
  function vektrOnWindowResize(){
    if(onResizeTimeout){
      clearTimeout(onResizeTimeout);
    }
    onResize.fire();
    onResizeWait = 20;
    onResizeTimeout = lib.runNext(recheckSize,onResizeWait);
  }
  vektrOnWindowResize();

  return onResize;
}

module.exports = createWindowMonitoring;

},{}]},{},[1]);
