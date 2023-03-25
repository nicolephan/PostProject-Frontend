import TableList from "./views/TableList.js";
import NewOrder from "./views/NewOrder.js";

// Routes list
// For use with dynamic route system

const dashboardRoutes = [
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/neworder",
    name: "New Order",
    icon: "nc-icon nc-circle-09",
    component: NewOrder,
    layout: "/admin",
  },
];

export default dashboardRoutes;
