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
        // Obtener todos los carritos de la base de datos
        const carts = await Cart.findAll();

        if (!carts || carts.length === 0) {
            throw new Error('No se encontraron carritos en la base de datos.');
        }

        // Inicializar el total de ventas
        let totalSales = 0;

        // Recorrer cada carrito
        for (let i = 0; i < carts.length; i++) {
            const cart = carts[i];
            console.log(`Procesando carrito con ID: ${cart.id_cart}`);

            // Asegurarse de que product_list es un array válido
            if (!Array.isArray(cart.product_list)) {
                console.warn(`El carrito con ID ${cart.id_cart} tiene un product_list no válido:`, cart.product_list);
                continue;
            }

            // Inicializar el total del carrito
            let cartTotal = 0;

            // Recorrer cada producto del carrito
            for (let j = 0; j < cart.product_list.length; j++) {
                const product = cart.product_list[j];
                console.log(`Procesando producto: ${JSON.stringify(product)}`);

                // Calcular el total del producto (precio * cantidad vendida)
                const productTotal = product.price * product.sold;
                console.log(`Subtotal del producto: ${productTotal}`);

                // Acumular el total del carrito
                cartTotal += productTotal;
            }

            console.log(`Total del carrito con ID ${cart.id_cart}: ${cartTotal}`);
            // Sumar el total del carrito al total general
            totalSales += cartTotal;
        }

        console.log(`Ventas totales calculadas: ${totalSales}`);
        return totalSales;
    } catch (error) {
        console.error('Error al calcular el total de ventas:', error);
        throw new Error(`Error al calcular el total de ventas: ${error.message}`);
    }
};












