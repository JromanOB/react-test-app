import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '../rootRoute';
import UpdateProduct from '../../modules/Product/Components/UpdateProduct';
import CreateProduct from '../../modules/Product/Components/createProduct';

export const updateProductRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/update-product/$productId",
  component: UpdateProduct,
});

export const createProductRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "create-product",
  component: CreateProduct,
});