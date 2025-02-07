export const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Manage Customers",
    icon: "bi bi-person-circle",
    subItems: [
      {
        title: "Add Customer",
        path: "/add-user/customer",
        icon: "bi bi-plus-circle",
      },
      {
        title: "Customer List",
        path: "/user-list/customer",
        icon: "bi bi-list-task",
      },
    ],
  },
  {
    title: "Manage Valets",
    icon: "bi bi-person-circle",
    subItems: [
      {
        title: "Add Valet",
        path: "/add-user/valet",
        icon: "bi bi-plus-circle",
      },
      {
        title: "Valet List",
        path: "/user-list/valet",
        icon: "bi bi-list-task",
      },
    ],
  },
  {
    title: "Manage SEO Users",
    icon: "bi bi-person-circle",
    subItems: [
      {
        title: "Add SEO User",
        path: "/add-user/seo",
        icon: "bi bi-plus-circle",
      },
      { title: "SEO List", path: "/user-list/seo", icon: "bi bi-list-task" },
    ],
  },
  {
    title: "View Packages",
    icon: "bi bi-journal",
    path: "/view-packages",
  },
  {
    title: "PapPal GateWay",
    icon: "bi bi-paypal",
    subItems: [
      {
        title: "Orders Detail",
        path: "/paypal-order-detail",
        icon: "bi bi-list-task",
      },
      {
        title: "Transaction Record",
        path: "/paypal-transaction-record",
        icon: "bi bi-credit-card",
      },
      {
        title: "Unclaimed Payments",
        path: "/paypal-unclaimed-payment",
        icon: "bi bi-dash-circle-fill",
      },
    ],
  },
  {
    title: "View Stripe Orders",
    icon: "bi bi-stripe",
    path: "/order-record",
  },
  {
    title: "View Feedbacks",
    path: "/view-feedbacks",
    icon: "bi bi-journal-text",
  },
];
