import express from "express";
import OrdersController from "../Controllers/OrdersController.js";

const router = express.Router();

router.post('/create', async (req, res) => {
    const order = req.body;
    await OrdersController.createOrder(order).then((result) => {
        res.status(result.status).send(result);
    });
});

router.post('/update', async (req, res) => {
    const order = req.body;
    await OrdersController.updateOrder(order).then((result) => {
        res.status(result.status).send(result);
    });
});

router.delete('/delete', async (req, res) => {
    const id = req.query.id;
    await OrdersController.deleteOrder(id).then((result) => {
        res.status(result.status).send(result);
    });
});


export default router;