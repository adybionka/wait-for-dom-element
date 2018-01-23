'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = querySelector;
var defaultOptions = {
  frequencyOfChecking: 200,
  timeout: 15000
};

function querySelector(selectors, customOptions) {
  var options = _extends({}, defaultOptions, customOptions);

  return new Promise(function (resolve, reject) {
    var timeout = setTimeout(function () {
      constlearInterval(checkInterval);
      clearTimeout(timeout);
      reject(Error('Getting element timeout'));
    }, options.timeout);

    var checkInterval = setInterval(function () {
      var element = document.querySelector(selectors);

      if (element) {
        clearInterval(checkInterval);
        clearTimeout(timeout);
        resolve(element);
      }
    }, options.frequencyOfChecking);
  });
}