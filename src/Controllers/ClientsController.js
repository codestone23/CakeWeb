import ClientsService from "../Services/ClientsService.js";
import responseObj from '../ResponseObj/index.js';

const ClientsController = {
    getAllClients: async () => {
        return responseObj(200, "Success", await ClientsService.getAllClients());
    },
    getClientById: async (id) => {
        const client = await ClientsService.getClientById(id);
        if(client == null) 
            return responseObj(404, "Client is not exist", null);
        return responseObj(200, "Success", client);
    },
    getClientByName: async (name) => {
        const client = await ClientsService.getClientByName(name);
        if(client == null) 
            return responseObj(404, "Client is not exist", null);
        return responseObj(200, "Success", client);
    },
    getClientByPhoneNumber: async (phoneNumber) => {
        const client = await ClientsService.getClientByPhoneNumber(phoneNumber);
        if(client == null) 
            return responseObj(404, "Client is not exist", null);
        return responseObj(200, "Success", client);
    },
    getClientByAddress: async (address) => {
        const client = await ClientsService.getClientByAddress(address);
        if(client == null) 
            return responseObj(404, "Client is not exist", null);
        return responseObj(200, "Success", client);
    },
    createClient: async (client) => {
        const namePattern = /[a-zA-Z]/i;
        const phoneNumberPattern = /[0-9]/i;
        const addressPattern = /[a-zA-Z0-9]/i;

        const name = client.name;

        console.log(namePattern.test(name));
        if(name == null || name == "" || name.length < 6 || name.length > 50 || !namePattern.test(name)) {
            return responseObj(400, "Name is required", null);
        }

        const phoneNumber = client.phone_number;
        if(phoneNumber == null || phoneNumber == "" || phoneNumber.length != 10 || !phoneNumberPattern.test(phoneNumber)) {
            return responseObj(400, "Phone number is required", null);
        }

        const address = client.address;
        if(address == null || address == "" || !addressPattern.test(address)) {
            return responseObj(400, "Address is required", null);
        }

        ClientsService.createClient(client);
        return responseObj(200, "Success", null);
    },
    updateClient: async (client) => {
        const getClient = await ClientsService.getClientById(client.id);
        if(getClient == null) {
            return responseObj(404, "Client is not exist", null);
        }
        
        if(client.name == getClient.name && client.phone_number == getClient.phone_number && client.address == getClient.address) {
            return responseObj(400, "Client is not changed", null);
        }

        const namePattern = /[a-zA-Z]/i;
        const phoneNumberPattern = /[0-9]/i;
        const addressPattern = /[a-zA-Z0-9]/i;

        const name = client.name;
        if(name == null || name == "" || name.length < 6 || name.length > 50 || !namePattern.test(name)) {
            return responseObj(400, "Name is required", null);
        }
        
        const phoneNumber = client.phone_number;
        if(phoneNumber == null || phoneNumber == "" || phoneNumber.length < 10 || phoneNumber.length > 11 || !phoneNumberPattern.test(phoneNumber)) {
            return responseObj(400, "Phone number is required", null);
        }

        const address = client.address;
        if(address == null || address == "" || !addressPattern.test(address)) {
            return responseObj(400, "Address is required", null);
        }
            
        console.log(ClientsService.updateClient(client));
        return responseObj(200, "Success", null);
    },
    deleteClient: async (id) => {
        const getClient = await ClientsService.getClientById(id);
        if(getClient == null) {
            return responseObj(404, "Client is not exist", null);
        }
        try{
            await ClientsService.deleteClient(id);
            return responseObj(200, "Success", await ClientsService.deleteClient(id));
        } 
        catch(err) {
            return responseObj(400, "Delete failed", null);
        }
    }
};

export default ClientsController;