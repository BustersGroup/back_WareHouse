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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /backWarehouse/v1/user:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/user/updatePassword/{uid}:
 *   patch:
 *     summary: Actualizar la contraseña de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/user/updateUser/{uid}:
 *   put:
 *     summary: Actualizar información de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/user/updateProfilePicture/{uid}:
 *   patch:
 *     summary: Actualizar la foto de perfil de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/user/updateRole/{uid}:
 *   put:
 *     summary: Actualizar el rol de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol del usuario actualizado exitosamente.
 */

/**
 * @swagger
 * /backWarehouse/v1/user/deleteUser/{uid}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 */