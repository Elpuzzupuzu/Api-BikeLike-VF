const Cart = require('../models/Cart');

exports.getCartByUserId = async (userId) => {
    return await Cart.findOne({ where: { id_user: userId } });
};

exports.createCart = async (data) => {
    try {
        const cart = await Cart.create(data);  // Crear el carrito con los datos proporcionados
        return cart;
    } catch (error) {
        throw new Error(`Error al crear el carrito: ${error.message}`);
    }
};

// Obtener todos los carritos
exports.getAllCarts = async () => {
    try {
        // Buscar todos los carritos en la base de datos
        const carts = await Cart.findAll();
        return carts;
    } catch (error) {
        throw new Error(`Error al obtener todos los carritos: ${error.message}`);
    }
};


exports.emptyCart = async (userId) => {
    return await Cart.destroy({ where: { id_user: userId } });
};


exports.calculateTotalSales = async () => {
    try {
        const carts = await Cart.findAll();
        const totalSales = carts.reduce((total, cart) => {
            const cartTotal = cart.product_list.reduce((sum, product) => {
                return sum + (product.price * product.sold);
            }, 0);
            return total + cartTotal;
        }, 0);

        return totalSales;
    } catch (error) {
        throw new Error(`Error al calcular el total de ventas: ${error.message}`);
    }
};











