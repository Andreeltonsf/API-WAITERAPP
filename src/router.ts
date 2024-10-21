import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';
import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProductsByCategories } from './app/useCases/categories/listProductsByCategories';
import { changeOrder } from './app/useCases/Orders/changeOrderStatus';
import { createOrder } from './app/useCases/Orders/createOrder';
import { listOrders } from './app/useCases/Orders/listOrders';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { cancelOrder } from './app/useCases/Orders/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback){
    callback(null, path.resolve(__dirname, '..','uploads'));
    },
    filename(req, file, callback){
      callback(null,`${Date.now()}-${file.originalname}`);
    },
  })
});


router.get('/categories',listCategories);


//Create category

router.post('/categories', createCategory);


//List products

router.get('/products',listProducts);


//Create product
router.post('/products',upload.single('image') ,createProduct);

//Get products by categories

router.get('/categories/:categoryId/products',listProductsByCategories)

//List orders

router.get('/orders',listOrders);

//Create order

router.post('/orders',createOrder);

//Change order status

router.patch('/orders/:orderId',changeOrder);

//Delete/cancel order

router.delete('/orders/:orderId',cancelOrder);

