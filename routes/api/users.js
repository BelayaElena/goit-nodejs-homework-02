const express = require("express");
const controllers = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/singup", controllers.singup);
router.post("/login", controllers.login);
router.get("/current", authenticate, controllers.getCurrent);
router.get("/logout", authenticate, controllers.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
