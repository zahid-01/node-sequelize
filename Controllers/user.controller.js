const db = require("../Models");
const { uploadProfile } = require("../Utils/aws_S3");
const { catchAsync } = require("../Utils/catchAsync");
const AppError = require("../Utils/error");
const {
  verifyPaymentOrder,
  createPaymentOrder,
} = require("../Utils/rzpayPayment");
const { successResponse } = require("./responseHandler");

const Profile = db.userProfile;
const User = db.user;

exports.createProfile = catchAsync(async (req, res, next) => {
  const {
    name,
    bio,
    gender,
    dateOfBirth,
    timeOfBirth,
    birthCity,
    preferredLanguages,
  } = req.body;

  const newProfile = await Profile.create({
    name,
    gender,
    bio,
    dateOfBirth,
    timeOfBirth,
    birthCity,
    preferredLanguages,
    userId: req.user.id,
  });

  successResponse(res, "Profile successfully created", newProfile);
});

exports.getMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findOne({
    where: { id },
    attributes: ["phone", "role", "isActive"],
    include: {
      model: Profile,
      attributes: [
        "id",
        "name",
        "gender",
        "dateOfBirth",
        "timeOfBirth",
        "birthCity",
        "preferredLanguages",
      ],
    },
  });

  successResponse(res, "My Profile", { user });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findOne({
    where: { id },
    attributes: ["phone", "role", "isActive"],
    include: {
      model: Profile,
      attributes: [
        "id",
        "name",
        "gender",
        "dateOfBirth",
        "timeOfBirth",
        "birthCity",
        "preferredLanguages",
      ],
    },
  });

  successResponse(res, "My Profile", { user });
});

exports.updateProfilePhoto = catchAsync(async (req, res, next) => {
  const image = await uploadProfile(req.files.image);
  const profileUrl = `${process.env.S3_BASE_URI}/${image}`;

  let affectedRows;
  if (profileUrl) {
    affectedRows = await Profile.update(
      { profilePicture: profileUrl },
      {
        where: { userId: req.user.id },
      }
    );
  }

  if (affectedRows > 0)
    return successResponse(res, "Updated profile photo", { profileUrl });
});

exports.setConsultantAvailibility = catchAsync(async (req, res, next) => {
  const { avail_voice, avail_video, avail_chat } = req.body;
  const { id } = req.user;

  if (!avail_voice && !avail_video && !avail_chat)
    return next(new AppError(401, "Provide atleast one setting option"));

  const allowableValues = ["avail_voice", "avail_video", "avail_chat"];

  let settings = {};

  for (let setting in req.body) {
    if (allowableValues.includes(setting))
      settings[setting] = req.body[setting];
  }

  const affectedRows = await Profile.update(settings, {
    where: { userId: id },
  });

  if (affectedRows > 0) {
    return successResponse(res, "Settings updated", { settings });
  }

  successResponse(res, "Nothing to update", { settings });
});

exports.initaiteWalletRefill = catchAsync(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) return next(new AppError(401, "Provide the amount"));

  const options = {
    receipt: "rb_receipt",
    userId: req.user.id,
    purpose: "Wallet Refill",
  };

  const order = await createPaymentOrder(amount, options);

  successResponse(res, "Order initiated successfully!", {
    order,
  });
});

exports.verifyWalletRefill = catchAsync(async (req, res, next) => {
  const verified = req.transaction;

  await Profile.increment("wallet_balance", {
    by: verified.amount,
    where: { userId: verified.notes.user },
  });

  res.status(200).redirect("http://localhost:3000");
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const consultants = await User.findAll({
    where: { role: "consultant" },
    include: {
      model: Profile,
    },
  });

  successResponse(res, "Success", { consultants });
});
