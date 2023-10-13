const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const userModel = require("../models/user");
const ErorrHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Homepage" });
});

exports.currentuser =
  catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findById(req.id).exec();
    res.json({ user });
  });

exports.usersignup = catchAsyncErrors(async (req, res, next) => {
  const user = await new userModel(req.body).save();
  sendtoken(user, 201, res);
});

exports.userlogin = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!user)
    return next(
      new ErorrHandler("User Not Found With This Email Address", 404)
    );

  const isMatch = user.comparepassword(req.body.password);
  if (!isMatch) return next(new ErorrHandler("Worng Password", 500));

  sendtoken(user, 200, res);
});

exports.userlogout = catchAsyncErrors(async (req, res, next) => {
  req.clearcookie = "token";
  res.json({ message: "Signout Done!" });
});
