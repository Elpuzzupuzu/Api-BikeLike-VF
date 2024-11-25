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
        // Obtener todos los carritos
        const carts = await Cart.findAll();

        let totalSales = 0;

        carts.forEach(cart => {
            const productList = cart.product_list; // Obtener la lista de productos

            // Validar que la lista no sea nula y sea un array
            if (productList && Array.isArray(productList)) {
                productList.forEach(product => {
                    if (product.sold && product.price) {
                        totalSales += product.sold * product.price; // Calcular el total
                    }
                });
            }
        });

        return totalSales; // Devolver el total calculado
    } catch (error) {
        throw new Error(`Error al calcular el total de ventas: ${error.message}`);
    }
};











