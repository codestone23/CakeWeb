import {CakeTypes} from '../Models/CakeTypes.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const CakeTypesService = {
    getAllTypes: () => {
        return CakeTypes(sequelize).findAll();
    },
    getTypeById: (id) => {
        return CakeTypes(sequelize).findByPk(id);
    }
};

export default CakeTypesService;