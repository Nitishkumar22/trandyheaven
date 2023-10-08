const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Homepage" });
});
