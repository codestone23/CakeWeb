import BillsService from "../Services/BillsService.js";    
import OrdersService from "../Services/OrdersService.js";
import ClientsService from "../Services/ClientsService.js";
import CakeSizesService from "../Services/CakeSizesService.js";
import responseObj from '../ResponseObj/index.js';
import CakesService from "../Services/CakesService.js";
import CakeImagesService from "../Services/CakeImagesService.js";

const BillsController = {
    mergerAttributes: async (bills, orders, cakeSizes) => {
        const clientRel = await ClientsService.getClientById(bills[0].dataValues.id_client);
        const rs = [];

        for (const bill of bills) {
            const clientRel = await ClientsService.getClientById(bill.id_client);
            const newBill = {
                id: bill.id,
                id_client: bill.id_client,
                name_client: clientRel.name,
                notice: bill.notice,
                delivery_date: bill.delivery_date,
                created_date: bill.created_at,
                updated_date: bill.updated_at,
                list_order: [],
                total_price: 0,
                total_old_price: 0
            };

            await Promise.all(orders.map(async order => {
                if (order.id_bill === bill.id) {
                    const orderRel = await CakesService.getCakeById(order.id_cake);
                    const imgCake = await CakeImagesService.getImageByIdCake(order.id_cake);
                    const size = cakeSizes.find(size => size.id_cake === order.id_cake && size.size === order.size);
                    newBill.list_order.push({
                        id: order.id,
                        id_cake: order.id_cake,
                        name_cake: orderRel.name,
                        img_cake:imgCake.path,
                        size: order.size,
                        quantity: order.quantity,
                        price: size.price,
                        old_price: size.old_price
                    });
                    newBill.total_price += size.price * order.quantity;
                    newBill.total_old_price += size.old_price * order.quantity;
                }
            }));

            rs.push(newBill);
        }

        console.log(rs);
        return rs;
    },

    getAllBills: async () => {
        const bills = await BillsService.getAllBills();
        const orders = await OrdersService.getAllOrders();
        const cakeSizes = await CakeSizesService.getAllSize();
        return responseObj(200, "Success", await BillsController.mergerAttributes(bills, orders, cakeSizes));
    },
    getBillById: async (id) => {    
        const bills = await BillsService.getBillById(id);
        console.log(bills);
        if(bills == null) return responseObj(200, "Bill is not exist", null);
        const orders = await OrdersService.getOrderByIdBill(id);
        const cakeSizes = await CakeSizesService.getAllSize();
        console.log(orders)
        return responseObj(200, "Success", await BillsController.mergerAttributes([bills], orders, cakeSizes));
    },
    getBillByIdClient: async (id_client) => {
        const bills = await BillsService.getBillByIdClient(id_client);
        if(bills == null) return responseObj(404, "Bill is not exist", null);
        const orders = await OrdersService.getAllOrders();
        const cakeSizes = await CakeSizesService.getAllSize();
        return responseObj(200, "Success", await BillsController.mergerAttributes(bills, orders, cakeSizes));
    },
    getBillByDeliveryDate: async (startDate, endDate) => {
        const bills = await BillsService.getBillByDeliveryDate(startDate, endDate);
        if(bills == null) return responseObj(404, "Bill is not exist", null);
        const orders = await OrdersService.getAllOrders();
        const cakeSizes = await CakeSizesService.getAllSize();
        return responseObj(200, "Success", await BillsController.mergerAttributes(bills, orders, cakeSizes));
    },
    getBillByCreatedDate: async (startDate, endDate) => {
        const bills = await BillsService.getBillByCreatedDate(startDate, endDate);
        if(bills == null) return responseObj(404, "Bill is not exist", null);
        const orders = await OrdersService.getAllOrders();
        const cakeSizes = await CakeSizesService.getAllSize();
        return responseObj(200, "Success", await BillsController.mergerAttributes(bills, orders, cakeSizes));
    },
    createTotal: async (total) => {
        let totalBill = total;
    
        // create client
        const namePattern = /[a-zA-Z]/i;
        const phoneNumberPattern = /[0-9]/i;
        const addressPattern = /[a-zA-Z0-9]/i;
    
        let client = {
            name: totalBill.name,
            phone_number: totalBill.phone_number,
            address: totalBill.address
        }
    
        const name = client.name;
        if (name == null || name == "" || name.length < 6 || name.length > 50 || !namePattern.test(name)) {
            return responseObj(400, "Name is required", null);
        }
    
        const phoneNumber = client.phone_number;
        if (phoneNumber == null || phoneNumber == "" || !phoneNumberPattern.test(phoneNumber)) {
            return responseObj(400, "Phone number is required", null);
        }
    
        const address = client.address;
        if (address == null || address == "" || !addressPattern.test(address)) {
            return responseObj(400, "Address is required", null);
        }
    
        client = await ClientsService.createClient(client);
    
        // create bill
        let bill = {
            id_client: client.id,
            notice: totalBill.notice,
            delivery_date: totalBill.delivery_date
        }
    
        const noticePattern = /[a-zA-Z0-9]/i;
        const notice = bill.notice;
        if (notice == null || notice == "" || !noticePattern.test(notice)) {
            return responseObj(400, "Notice is required", null);
        }
    
        bill = await BillsService.createBill(bill);
    
        // create order
        const listOrder = totalBill.list_order;
        for (const order of listOrder) {
            const newOrder = {
                id_bill: bill.id,
                id_cake: order.id_cake,
                name_cake: order.name_cake,
                size: order.size,
                quantity: order.quantity
            }
            await OrdersService.createOrder(newOrder);
        }
    
        const cakeSizes = await CakeSizesService.getAllSize();
        let rs = []
        const newBill = {
            id: bill.id,
            id_client: bill.id_client,
            name_client: totalBill.name,
            notice: bill.notice,
            delivery_date: bill.delivery_date,
            created_date: bill.created_at,
            updated_date: bill.updated_at,
            list_order: [],
            total_price: 0,
            total_old_price: 0
        };
    
        for (const order of listOrder) {
            const size = cakeSizes.find(size => size.id_cake == order.id_cake && size.size == order.size);
            const orderRel = await CakesService.getCakeById(order.id_cake);
            const imgCake = await CakeImagesService.getImageByIdCake(order.id_cake);
            newBill.list_order.push({
                id: order.id,
                id_cake: order.id_cake,
                name_cake: orderRel.name,
                img_cake: imgCake.path,
                size: order.size,
                quantity: order.quantity,
                price: size.price,
                old_price: size.old_price
            });
            newBill.total_price += size.price * order.quantity;
            newBill.total_old_price += size.old_price * order.quantity;
        }
        rs.push(newBill);
    
        return responseObj(200, "Success", rs);
    },
    createBill: async (bill) => {
        const noticePattern = /[a-zA-Z0-9]/i;
        const notice = bill.notice;
        if(notice == null || notice == "" || !noticePattern.test(notice)) 
            return responseObj(400, "Notice is required", null);
        
        BillsService.createBill(bill);
        return responseObj(200, "Success", null);
    },
    updateBill: async (bill) => {
        const getBill = await BillsService.getBillById(bill.id);
        if(getBill == null) 
            return responseObj(404, "Bill is not exist", null);
        
        if(bill.id_client == getBill.id_client && bill.notice == getBill.notice && bill.delivery_date == getBill.delivery_date) 
            return responseObj(400, "Bill is not changed", null);

        BillsService.updateBill(bill)
        return responseObj(200, "Success", null);
    },
    deleteBill: async (id) => {
        const getBill = await BillsService.getBillById(id);
        if(getBill == null) return responseObj(404, "Bill is not exist", null);
        try{
            await BillsService.deleteBill(id);
            return responseObj(200, "Success", null);
        }
        catch(error) {
            return responseObj(400, "Delete failed", null);
        }
    }
};

export default BillsController;