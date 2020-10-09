const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        path: "table",
        name: "table",
        component: () => import("pages/OrderPage.vue")
      },
      {
        path: "user",
        name: "user",
        component: () => import("components/User.vue")
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("components/Cart.vue")
      },
      {
        path: "bill",
        name: "bill",
        component: () => import("components/Bill.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
