import express from "express";
import CakesController from "../Controllers/CakesController.js";

const router = express.Router();

router.get('/list', async (req, res) => {
    await CakesController.getAllCakes().then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getById', async (req, res) => {
    const id = req.query.id;
    await CakesController.getCakeById(id).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByName', async (req, res) => {
    const name = req.query.name;
    await CakesController.getCakeByName(name).then((result) => {
        res.status(result.status).send(result);
    });
});

router.get('/getByIdType', async (req, res) => {
    const id = req.query.id;
    await CakesController.getCakeByIdType(id).then((result) => {
        res.status(result.status).send(result);
    });
});

export default router;