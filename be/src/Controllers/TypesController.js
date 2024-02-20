import CakeTypesService from '../Services/CakeTypesService.js';
import responseObj from '../ResponseObj/index.js';

const TypesController = {
    getAllTypes: async () => {
        const types = await CakeTypesService.getAllTypes();
        return responseObj(200, "Success", types);
    },
    getTypeById: async (id) => {
        const type = await CakeTypesService.getTypeById(id);
        if(type == null) 
            return responseObj(404, "Type is not exist", null);
        return responseObj(200, "Success", type);
    }
};

export default TypesController;