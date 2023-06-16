import type { Router } from "@lightningjs/sdk";
import Home from "../Pages/Home";

export const routes: Router.Config = {
  root: "home",
  routes: [
    {
      path: "home",
      component: Home,
    },
  ],
};

// Add the widgets to to all routes
const widgets: Lowercase<string>[] = ["menu"];

routes.routes.forEach((route) => {
  route.widgets = widgets;
});

export default routes;
