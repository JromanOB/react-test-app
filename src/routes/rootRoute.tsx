import { createRootRoute, createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { createProductRoute, updateProductRoute } from "./Products/productsRoutes";

export const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../modules/Product/Components/productsTable/ProductsTable")),
});

export const routeTree = rootRoute.addChildren([
    indexRoute,
    updateProductRoute,
    createProductRoute,
]);