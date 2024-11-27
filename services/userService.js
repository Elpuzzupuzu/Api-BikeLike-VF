const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;  // Asegúrate de que coincida con .env


// Registro de usuario
exports.registerUser = async (userData) => {
    const { name, last_name, user_name,mail, password, date_birth } = userData;

    // Verifica si el usuario o email ya existe
    const userExists = await User.findOne({ where: { user_name } });
    const emailExists = await User.findOne({ where: { mail } });
    if (userExists || emailExists) {
        throw new Error('El nombre de usuario o el correo ya están en uso');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crea el usuario
    const user = await User.create({
        name,
        last_name,
        user_name,
        mail,
        password: hashedPassword,
        date_birth
    });

    return user;
};



exports.loginUser = async (user_name, password) => {
    const user = await User.findOne({ where: { user_name } });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar el token JWT
    const token = jwt.sign({ id_user: user.id_user, user_name: user.user_name }, jwtSecret, { expiresIn: '1h' });

    // Retornar el token y el id_user
    return { token, id_user: user.id_user };
};

// Obtener usuarios con paginación
exports.getUsersPaginated = async (page, pageSize) => {
    const offset = (page - 1) * pageSize; // Calcular el desplazamiento
    const limit = pageSize; // Número de usuarios por página

    // Obtener usuarios con paginación
    const { count, rows: users } = await User.findAndCountAll({
        offset,
        limit,
        attributes: { exclude: ['password'] } // Excluir contraseña de la respuesta
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(count / pageSize);

    return {
        currentPage: page,
        totalPages,
        totalUsers: count,
        users
    };
};