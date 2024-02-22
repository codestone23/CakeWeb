import OrdersService from '../Services/OrdersService.js';
import responseObj from '../ResponseObj/index.js';

const OrdersController = {
    createOrder: async (order) => {
        const result = await OrdersService.createOrder(order);
        if (result == null) return responseObj(400, "Bad request", null);
        return responseObj(200, "Success", null);
    },
    updateOrder: async (order) => {
        const getOrder = await OrdersService.getOrderById(order.id);
        if (getOrder == null) return responseObj(404, "Order is not exist", null);
        const result = await OrdersService.updateOrder(order);
        if (result == null) return responseObj(400, "Bad request", null);
        return responseObj(200, "Success", null);
    },
    deleteOrder: async (id) => {
        const order = await OrdersService.getOrderById(id);
        if (order == null) return responseObj(404, "Order is not exist", null);
        try{
            await OrdersService.deleteOrder(id);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Delete failed", null);
        }
    }
};

export default OrdersController;