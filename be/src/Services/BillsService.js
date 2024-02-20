import {Bills} from '../Models/Bills.js';
import { Op } from 'sequelize';
import connection from '../Config/index.js';
const sequelize = await connection();

const BillsService = {
    getAllBills: () => {
        return Bills(sequelize).findAll();
    },
    getBillById: (id) => {
        return Bills(sequelize).findByPk(id);
    },
    getBillByIdClient: (id_client) => {
        const result = Bills(sequelize).findAll({
            where: {
                id_client: id_client
            }
        });
        return result;
    },
    getBillByDeliveryDate: (startDate, endDate) => {
        const result = Bills(sequelize).findAll({
            where: {
                delivery_date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        return result;
    },
    getBillByCreatedDate: (startDate, endDate) => {
        const result = Bills(sequelize).findAll({
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        return result;
    },
    createBill: (bill) => {
        return Bills(sequelize).create(bill);
    },
    updateBill: (bill) => { 
        const newBill = {
            id_client: bill.id_client,
            notice: bill.notice,
            delivery_date: bill.delivery_date,
            created_date: bill.created_at,
            updated_date: bill.updated_at
        }
        return Bills(sequelize).update(newBill, {
            where: {
                id: bill.id
            }
        });
    },
    deleteBill: (id) => {
        return Bills(sequelize).destroy({
            where: {
                id: id
            }
        });
    }
};

export default BillsService;