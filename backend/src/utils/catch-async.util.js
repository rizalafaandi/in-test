const catchAsync = (fn, onError) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(async (err) => {
    if (onError) {
      try {
        await onError(req, res, next, err);
      } catch (errorHandlingErr) {
        return next(errorHandlingErr);
      }
    }
    return next(err);
  });
};

module.exports = catchAsync;
