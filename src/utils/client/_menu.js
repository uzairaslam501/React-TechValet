export const valetMenu = [
  {
    href: "/",
    iconClass: "bi bi-house-check me-2",
    className: "",
    label: "Home",
    title: "Home",
  },
  {
    href: "/appointment",
    iconClass: "bi bi-envelope me-2",
    className: "",
    label: "Appointments",
    title: "Manage Appointments",
  },
  {
    href: "/earnings",
    iconClass: "bi bi-cash-coin me-2",
    className: "",
    label: "Earnings",
    title: "Manage Earnings",
  },
  {
    href: "/preview-profile",
    iconClass: "bi bi-eye me-2",
    className: "",
    label: "Preview Profile",
    title: "Preview Profile",
  },
  {
    href: "/scheduled-appointment",
    iconClass: "bi bi-calendar-event me-2",
    className: "",
    label: "Schedule",
    title: "Scheduled Appointments",
  },
  {
    href: "#referal",
    iconClass: "",
    className: "btn ms-3 py-1 px-3 bg-white border-0 text-black",
    label: "Referal",
    title: "Share your Referal",
  },
];

export const customerMenu = [
  {
    href: "/",
    iconClass: "bi bi-house-check me-2",
    className: "",
    label: "Home",
    title: "Home",
  },
  {
    href: "/request-service",
    iconClass: "bi bi-list-task me-2",
    className: "",
    label: "Request Service",
    title: "Request Service",
  },
  {
    href: "#",
    iconClass: "bi bi-boxes me-2",
    className: "package-dropdown",
    label: "Packages",
    title: "Packages",
    submenu: [
      {
        href: "/packages",
        iconClass: "bi bi-cart-dash me-2",
        className: "text-dark border-bottom border-grey",
        label: "Buy Packages",
        title: "Buy Packages",
      },
      {
        href: "/package-details",
        iconClass: "bi bi-eye me-2",
        className: "text-dark",
        label: "View Packages",
        title: "View Packages",
      },
    ],
  },
  {
    href: "/scheduled-appointment",
    iconClass: "bi bi-calendar-event me-2",
    className: "",
    label: "Schedules",
    title: "Scheduled Appointments",
  },
  {
    href: "/appointment",
    iconClass: "bi bi-envelope me-2",
    className: "",
    label: "Appointments",
    title: "Manage Appointments",
  },
  {
    href: "/register/valet",
    iconClass: "bi bi-tropical-storm me-2",
    className: "",
    label: "Switch to Valet",
    title: "Switch to Valet",
  },
  {
    href: "#referal",
    iconClass: "",
    className: "btn ms-3 py-1 px-3 bg-white text-black",
    label: "Referal",
    title: "Share your Referal",
  },
];

export const seoMenu = [
  {
    href: "/",
    iconClass: "bi bi-house-check me-2",
    className: "",
    label: "Home",
    title: "Home",
  },
  {
    href: "#",
    iconClass: "bi bi-boxes me-2",
    className: "package-dropdown",
    label: "Blogs",
    title: "Blogs",
    submenu: [
      {
        href: "/add-article",
        iconClass: "bi bi-cart-dash me-2",
        className: "text-dark border-bottom border-grey",
        label: "Write Blog",
        title: "Write Blog",
      },
      {
        href: "/article-list",
        iconClass: "bi bi-eye me-2",
        className: "text-dark",
        label: "View Blogs",
        title: "View Blogs",
      },
    ],
  },
  {
    href: "#",
    iconClass: "bi bi-boxes me-2",
    className: "package-dropdown",
    label: "Skill Content",
    title: "Skill Content",
    submenu: [
      {
        href: "/add-content",
        iconClass: "bi bi-cart-dash me-2",
        className: "text-dark border-bottom border-grey",
        label: "Write Skill Content",
        title: "Write Skill Content",
      },
      {
        href: "/content-list",
        iconClass: "bi bi-eye me-2",
        className: "text-dark",
        label: "View Skill Content",
        title: "View Skill Content",
      },
    ],
  },
];
