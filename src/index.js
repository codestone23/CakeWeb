import express from 'express';
import CakesRouter from './routes/cakesRouter.js';
import ClientRouter from './Routes/ClientsRouter.js';
import BillsRouter from './routes/billsRouter.js';
import OrdersRouter from './routes/ordersRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/cakes", CakesRouter);
app.use("/clients", ClientRouter);
app.use("/bills", BillsRouter);
app.use("/orders", OrdersRouter);

app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
});