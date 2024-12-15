const upload = require("multer")();

const { protect } = require("../Controllers/auth.controller");
const {
  createProfile,
  getMe,
  setConsultantAvailibility,
  initaiteWalletRefill,
  updateProfilePhoto,
  verifyWalletRefill,
  getUsers,
} = require("../Controllers/user.controller");

const UserRouter = require("express").Router();

UserRouter.route("/verifyPayment").post(verifyWalletRefill);
UserRouter.use(protect);
UserRouter.route("/astrologer");
UserRouter.route("/profile")
  .post(createProfile)
  .get(getMe)
  .patch(upload.fields([{ name: "image", maxCount: 1 }]), updateProfilePhoto);
UserRouter.route("/settings").patch(setConsultantAvailibility);
UserRouter.route("/walletRefill").post(initaiteWalletRefill);
UserRouter.route("/type").get(getUsers);

module.exports = UserRouter;
