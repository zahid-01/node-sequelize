const User = require("../Models").user;
const Profile = require("../Models").userProfile;
const { catchAsync } = require("../Utils/catchAsync");
const AppError = require("../Utils/error");
const { sendOtp, createVerificationCheck } = require("../Utils/messaging");
const { successResponse, errorResponse } = require("./responseHandler");
const { createSendToken, getTokenData } = require("../Utils/authUtils");

//Generate OTP for login/signup
exports.genOtp = catchAsync(async (req, res, next) => {
  const { countryCode, phone } = req.body;

  // const verification = await sendOtp(`${countryCode}${phone}`);

  successResponse(res, `OTP sent to ${countryCode}${phone}`, {
    message: "True",
    // verification,
  });
});

exports.verifyOtp = catchAsync(async (req, res, next) => {
  const { countryCode, phone, otp } = req.body;

  if (!countryCode || !phone || !otp)
    return next(new AppError(400, "Provide all the required fields"));

  // const verification = await createVerificationCheck(
  //   otp,
  //   `${countryCode}${phone}`
  // );

  // if (verification.status === "pending") {
  //   return errorResponse(res, "Incorrect OTP", null, 401);
  // }

  const user = await User.findOne({ where: { phone }, include: Profile });

  if (!user) {
    const user = await User.create({ phone });
    const token = createSendToken(res, req, user.dataValues);
    return successResponse(res, "New User", {
      navigateTo: "/newUserRegistration",
      token,
    });
  }

  if (!user.UserProfile?.dataValues) {
    const token = await createSendToken(res, req, user.dataValues);
    return successResponse(res, "Profile Incomplete", {
      navigateTo: "/newUserRegistration",
      token,
    });
  }

  const token = await createSendToken(res, req, user.dataValues);

  successResponse(res, "Verified successfully", {
    user,
    navigateTo: "/homePage",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const tokenUser = getTokenData(req).data;

  if (!tokenUser) return next(new AppError(401, "Login to continue!"));

  let user;

  if (tokenUser.phone) {
    user = await User.findOne({
      where: { phone: tokenUser.phone },
      include: Profile,
    });
  } else if (tokenUser.phone) {
    user = await User.findOne({
      where: { email: tokenUser.phone },
      include: Profile,
    });
  }

  req.user = user;

  next();
});
