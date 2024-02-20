import {Clients} from '../Models/Clients.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const ClientsService = {
    getAllClients: () => {
        return Clients(sequelize).findAll();
    },
    getClientById: (id) => {
        return Clients(sequelize).findByPk(id);
    },
    getClientByName: (name) => {
        const result = Clients(sequelize).findAll({
            where: {
                name:  sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
            }
        });
        return result;
    },
    getClientByPhoneNumber:  (phoneNumber) => {
        const result = Clients(sequelize).findAll({
            where: {
                phone_number: phoneNumber   
            }
        });
        return result;
    },
    getClientByAddress:  (address) => {
        const result = Clients(sequelize).findAll({
            where: {
                address: sequelize.where(sequelize.fn('LOWER', sequelize.col('address')), 'LIKE', '%' + address.toLowerCase() + '%')
            }
        });
        return result;
    },
    createClient: (client) => {
        return Clients(sequelize).create(client);
    },
    updateClient: (client) => {
        const newClient = {
            name: client.name,
            phone_number: client.phone_number,
            address: client.address
        }
        return Clients(sequelize).update(newClient, {
            where: {
                id: client.id
            }
        });
    },
    deleteClient: (id) => {
        return Clients(sequelize).destroy({
            where: {
                id: id
            }
        });
    }
};

export default ClientsService;