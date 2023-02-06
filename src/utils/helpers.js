// const pick = (object, keys) => {
//   return keys.reduce((obj, key) => {
//     if (object && Object.prototype.hasOwnProperty.call(object, key)) {
//       obj[key] = object[key];
//     }
//     return obj;
//   }, {});
// };

function pick(obj, keys) {
  const ret = {};
  for (const key of keys) {
    ret[key] = obj[key];
  }
  return ret;
}

function isObjectEmpty(obj) {
  // return Object.entries(obj).length === 0;

  return Object.values(obj).length === 0 && obj.constructor === Object;
}

const defined = (object) =>
  Object.entries(object).every(
    ([key, value]) => !["", "null", "undefined"].includes(key) && value
  );

export { pick, isObjectEmpty, defined };
