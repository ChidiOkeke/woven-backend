function pick(obj, keys) {
  const ret = {};
  for (const key of keys) {
    ret[key] = obj[key];
  }
  return ret;
}

function isObjectEmpty(obj) {
  return Object.values(obj).length === 0 && obj.constructor === Object;
}

const defined = (object) =>
  Object.entries(object).every(
    ([key, value]) => !["", "null", "undefined"].includes(key) && value
  );

export { pick, isObjectEmpty, defined };
