import {CakeSizes} from '../Models/CakeSizes.js';
import {Op} from 'sequelize';
import connection from '../Config/index.js';
const sequelize = await connection();

const CakeSizesService = {
    getAllSize: () => {
        return CakeSizes(sequelize).findAll();
    },
    getSizeByIdCake: (id) => {
        return CakeSizes(sequelize).findByPk(id);
    },
    getSizeByPrice: (min,max) => {
        const result = CakeSizes(sequelize).findAll({
            where: {
                price: {
                    [Op.between]: [min, max]
                }
            }
        });
        return result;
    },
    getPrizeByIdCakeNSize: (id,size) => {
        const result = CakeSizes(sequelize).findOne({
            where: {
                id_cake: id,
                size: size
            }
        });
        return result;
    },

};

export default CakeSizesService;