import { hash, verify } from "argon2";
import User from "./user.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));  

export const crearAdministrador = async () => {
    try {
        const adminExist = await User.findOne({ role: "ADMIN_ROLE" });

        if (!adminExist) {
            const encryptedPassword = await hash("Abc123**");

            const admin = new User({
                name: "Admin",
                surname: "Admin",
                username: "admin",
                email: "admin@gmail.com",
                password: encryptedPassword,
                phone: "12345678", 
                role: "ADMIN_ROLE"
            });

            await admin.save();
        }
    } catch (err) {
        console.log(`Error al crear al administrador: ${err}`);
    }
};


export const getUsers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        });
    }
};


export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { currentPassword ,newPassword } = req.body;

        if (req.usuario.id !== uid) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para actualizar la contraseña de este usuario",
            });
        }

        const user = await User.findById(uid);

        const CurrentPasswor = await verify(user.password, currentPassword);
        if (!CurrentPasswor) {
            return res.status(400).json({
                success: false,
                message: "La contraseña actual es incorrecta",
            });
        }

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const requester = req.usuario;
        
        if (requester.id !== uid) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para actualizar este usuario",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                msg: 'No se proporcionó una nueva foto de perfil',
            });
        }

        const user = await User.findById(uid);

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Foto de perfil actualizada',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto de perfil',
            error: err.message
        });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const { role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(uid, { role }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Rol actualizado exitosamente",
            user: updatedUser,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el rol",
            error: err.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const requester = req.usuario; 
        const { confirmDelete } = req.body;

        if (!requester) {
            return res.status(401).json({
                success: false,
                message: "No autorizado, usuario no autenticado"
            });
        }

        const userToDelete = await User.findById(uid);
        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (requester.role === "EMPLOYEE_ROLE" && requester.id.toString() !== uid) {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para desactivar a otro usuario"
            });
        }

        if (requester.role === "ADMIN_ROLE" && userToDelete.role === "ADMIN_ROLE" && requester.id.toString() !== uid) {
            return res.status(403).json({
                success: false,
                message: "No puedes desactivar a otro administrador"
            });
        }

        if (confirmDelete === "no") {
            return res.status(400).json({
                success: false,
                message: "Desactivación cancelada por el usuario"
            });
        }

        if (confirmDelete !== "yes") {
            return res.status(400).json({
                success: false,
                message: "Debes confirmar la desactivación 'yes' o 'no'"
            });
        }

        userToDelete.status = false;
        await userToDelete.save();

        return res.status(200).json({
            success: true,
            message: "Usuario desactivado correctamente",
            user: userToDelete
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al desactivar el usuario",
            error: err.message
        });
    }
};

