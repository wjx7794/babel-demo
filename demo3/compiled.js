import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.unscopables.flat.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
var fn = function fn(num) {
  return num + 2;
};
var promise = Promise.resolve('ok');
[1, [2, [3]]].flat();
