export const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Manage Users",
    icon: "bi bi-person-circle",
    subItems: [
      { title: "Add User", path: "/add-user", icon: "bi bi-plus-circle" },
      { title: "Users List", path: "/users-list", icon: "bi bi-list-task" },
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
