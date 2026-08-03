import { createRootRoute, createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { createProductRoute, productIndexRoute, productsRoute, updateProductRoute } from "./Products/productsRoutes";

export const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../modules/Auth/Pages/Login")),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute.addChildren([
    createProductRoute,
    productIndexRoute,
    updateProductRoute,
  ])
]);