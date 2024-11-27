const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { name, last_name, user_name, mail, password, date_birth } = req.body;

        // Llama al servicio para crear el usuario
        const newUser = await userService.registerUser({
            name,
            last_name,
            user_name,
            mail,
            password,  // No hagas el hash aquí, lo maneja el servicio
            date_birth
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};







exports.login = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        // Llama al servicio para autenticar al usuario
        const { token, id_user } = await userService.loginUser(user_name, password);

        // Enviar el token JWT y el id_user al cliente
        res.json({ accessToken: token, id_user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};


// Controlador para obtener usuarios paginados
exports.getUsersPaginated = async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query; // Valores predeterminados
        const users = await userService.getUsersPaginated(Number(page), Number(pageSize));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Controlador para obtener un usuario por ID
exports.getUserById = async (req, res) => {
    const { id_user } = req.params; // Obtiene el ID del usuario desde los parámetros de la ruta

    try {
        const user = await userService.getUserById(id_user); // Llama al servicio

        // Retorna el usuario encontrado
        res.status(200).json(user);
    } catch (error) {
        // Si ocurre un error (usuario no encontrado), responde con un error
        res.status(404).json({ message: error.message });
    }
};