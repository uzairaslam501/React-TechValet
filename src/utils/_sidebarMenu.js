export const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
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
        path: "/users-list/customer",
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
        path: "/users-list/valet",
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
      { title: "SEO List", path: "/users-list/seo", icon: "bi bi-list-task" },
    ],
  },
  {
    title: "Manage Categories",
    icon: "bi bi-journal",
    subItems: [
      {
        title: "Add Category",
        path: "/add-categories",
        icon: "bi bi-plus-circle",
      },
      {
        title: "Categories List",
        path: "/categories",
        icon: "bi bi-list-task",
      },
    ],
  },
];
