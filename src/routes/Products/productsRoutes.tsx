import { createRoute, lazyRouteComponent, Outlet } from '@tanstack/react-router';
import { rootRoute } from '../rootRoute';

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "products",
  component: Outlet,
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

export const productIndexRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../../modules/Product/Components/BootstrapTable/ProductsBootstrapTable")),
});

export const updateProductRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "update/$productId",
  component: lazyRouteComponent(() => import("../../modules/Product/Components/UpdateProduct")),
});

export const createProductRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "create",
  component: lazyRouteComponent(() => import("../../modules/Product/Components/CreateProduct")),
});