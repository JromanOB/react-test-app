import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { productsRoute, createProductRoute, productIndexRoute, updateProductRoute } from "./Products/ProductRoutes";
import { rootRoute } from "./rootRoute";

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