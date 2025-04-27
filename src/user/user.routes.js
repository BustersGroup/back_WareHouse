import { Router } from "express";
import {getUsers,updatePassword,updateUser,updateProfilePicture,updateUserRole, deleteUser } from "./user.controller.js";
import {updatePasswordValidator,updateUserValidator,updateProfilePictureValidator,updateUserRoleValidator, deleteUserValidator} from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.get("/", getUsers);

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

router.put("/updateUser/:uid", updateUserValidator, updateUser);

router.patch(
  "/updateProfilePicture/:uid",
  uploadProfilePicture.single("profilePicture"),
  updateProfilePictureValidator,
  updateProfilePicture
);

router.put("/updateRole/:uid",updateUserRoleValidator,updateUserRole);

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

export default router;
