import { Router } from 'express';
import { CreateCategoryController } from '../controllers/CreateCategoryController';
import { DeleteCtegoryController } from '../controllers/DeleteCtegoryController';
import { GetCategoriesController } from '../controllers/GetCategoriesController';

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();
const deleteCtegoryController = new DeleteCtegoryController();
const getCategoriesController = new GetCategoriesController();

categoryRoutes.post('/', createCategoryController.handle);
categoryRoutes.delete('/delete/:id', deleteCtegoryController.handle);
categoryRoutes.get('/', getCategoriesController.handle);

export default categoryRoutes;