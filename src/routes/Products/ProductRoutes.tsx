import { createRoute, lazyRouteComponent, Outlet, redirect } from '@tanstack/react-router';
import { rootRoute } from '../rootRoute';
import { ValidateToken } from '../../modules/Auth/Services/authSv';

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "products",
  component: Outlet,
 beforeLoad: async () => {
   const token = localStorage.getItem("token");
   if (!token) {
     throw redirect({ to: "/" });
   }

   try {
     await ValidateToken(token);
   } catch {
     localStorage.removeItem("token");
     throw redirect({ to: "/" });
   }
 },
});

export const productIndexRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../../modules/Product/Pages/ProductPage")),
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