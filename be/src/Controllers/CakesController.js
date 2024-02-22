import CakesService from '../Services/CakesService.js';
import CakeSizesService from '../Services/CakeSizesService.js';
import CakeImagesService from '../Services/CakeImagesService.js';
import responseObj from '../ResponseObj/index.js';

const CakesController = {
    mergerAttribute: (cakes, cakeSizes, cakeImages) => {
        const rs = [];
        cakes.forEach(cake => {
            const newCake = {
                id: cake.id,
                name: cake.name,
                id_type: cake.id_type,
                price: cake.price,
                description: cake.description,
                image: cake.image,
                list_size: [],
                list_image: []
            };
            cakeSizes.forEach(size => {  
                if (size.id_cake == cake.id) {
                    newCake.list_size.push({
                        size: size.size,
                        price: size.price,
                        old_price: size.old_price
                    });
                }
            });
            cakeImages.forEach(image => {
                if (image.id_cake == cake.id) {
                    newCake.list_image.push({
                        image: image.path
                    });
                }
            });
            rs.push(newCake);
        });
        return rs;
    },

    getAllCakes: async () => {
        const cakes = await CakesService.getAllCakes()
        const cakeSizes = await CakeSizesService.getAllSize();
        const cakeImages = await CakeImagesService.getAllImage();
        return responseObj(200, "Success", CakesController.mergerAttribute(cakes, cakeSizes, cakeImages));
    },

    getCakeById: async (id) => {
        const cakes = await CakesService.getCakeById(id);
        if(cakes == null) {
            return responseObj(404, "Cake is not exist", null);
        }
        const cakeSizes = await CakeSizesService.getSizeByIdCake(id);
        const cakeImages = await CakeImagesService.getImageByIdCake(id);
        return responseObj(200, "Success", CakesController.mergerAttribute([cakes], [cakeSizes], [cakeImages]));
    },

    getCakeByName: async (name) => {
        const cakes = await CakesService.getCakeByName(name);
        if(cakes == null) {
            return responseObj(404, "Cake is not exist", null);
        }
        const cakeSizes = await CakeSizesService.getAllSize();
        const cakeImages = await CakeImagesService.getAllImage();
        return responseObj(200, "Success", CakesController.mergerAttribute(cakes, cakeSizes, cakeImages));
    },

    getCakeByIdType: async (id) => {
        const cakes = await CakesService.getCakeByIdType(id);
        if(cakes == null) {
            return responseObj(404, "Cake is not exist", null);
        }
        const cakeSizes = await CakeSizesService.getAllSize();
        const cakeImages = await CakeImagesService.getAllImage();  
        return responseObj(200, "Success", CakesController.mergerAttribute(cakes, cakeSizes, cakeImages));
    },
};

export default CakesController;