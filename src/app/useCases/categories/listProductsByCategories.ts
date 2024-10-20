import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function listProductsByCategories(req: Request,res: Response){
  try{
    const { categoryId } = req.params;
    const products = await Category.find().where('category').equals(categoryId);

    res.json(products)
  } catch (error){
    res.sendStatus(500);
  }
}
