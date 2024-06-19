// Icon Imports
import { FaProductHunt } from "react-icons/fa";
import { lazy } from "react";
const Books = lazy(() => import("./views/admin/books"));
const BooksWrapper = lazy(() => import("./providers/BooksWrapper"));

const routes = [
  {
    name: "Books",
    layout: "/admin",
    path: "default",
    icon: <FaProductHunt className="w-5 h-5" />,
    component: <BooksWrapper />,
    children: [
      {
        path: "",
        component: <Books />,
      },
    ],
  },
];
export default routes;
