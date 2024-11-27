const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/slider-users', userController.getUsersPaginated);

router.get('/:id_user', userController.getUserById); // Usamos params para obtener el ID

module.exports = router;
