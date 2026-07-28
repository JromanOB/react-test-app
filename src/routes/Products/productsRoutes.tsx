import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '../rootRoute';
import UpdateProduct from '../../modules/Product/Components/UpdateProduct';
import CreateProduct from '../../modules/Product/Components/createProduct';

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "products",
  component: lazyRouteComponent(() => import("../../modules/Product/Components/productsTable/ProductsTable")),
  // beforeLoad: async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     disconnectAppSocket();
  //     throw redirect({ to: "/login" });
  //   }

  //   try {
  //     await ValidateToken(token);
  //   } catch {
  //     disconnectAppSocket();
  //     localStorage.removeItem("token");
  //     throw redirect({ to: "/login" });
  //   }
  // },
});

export const updateProductRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "/update-product/$productId",
  component: UpdateProduct,
});

export const createProductRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "create-product",
  component: CreateProduct,
});