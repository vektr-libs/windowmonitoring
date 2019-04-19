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
