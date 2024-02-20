import {CakeImages} from '../Models/CakeImages.js';
import connection from '../Config/index.js';
const sequelize = await connection();

const CakeImagesService = {
    getAllImage: () => {
        return CakeImages(sequelize).findAll();
    },
    getImageByIdCake: (id) => {
        return CakeImages(sequelize).findByPk(id);
    }
};

export default CakeImagesService;