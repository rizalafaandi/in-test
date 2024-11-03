const catchAsyncFunction =
  (fn, onError) =>
  async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      if (onError) {
        return await onError(err, ...args);
      }
      throw err;
    }
  };

module.exports = catchAsyncFunction;
