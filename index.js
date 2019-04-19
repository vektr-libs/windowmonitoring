function createLib (execlib) {
  'use strict';

  var lib = execlib.lib;

  return {
    onResize: require('./windowmonitoringcreator')(lib)
  };
}

module.exports = createLib;
