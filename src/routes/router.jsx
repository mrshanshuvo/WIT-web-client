import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Register from "../pages/auth/Register";
import SignIn from "../pages/auth/SignIn";
import ItemDetails from "../pages/items/ItemDetails";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/Shared/NotFound";
import LostFoundItems from "../pages/items/LostFoundItems";
import AddItems from "../pages/items/AddItems";
import MyProfile from "../pages/user/MyProfile";
import MyItems from "../pages/user/MyItems";
import UpdateItem from "../pages/user/UpdateItem";
import MyRecoveredItems from "../pages/user/MyRecoveredItems";
import RecoveredItems from "../pages/recovered-items/RecoveredItems";
import Blog from "../pages/blog/Blog";
import Contact from "../pages/contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      // 🏠 Public routes
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "lost-found-items", element: <LostFoundItems /> },
      { path: "inventory/:id", element: <ItemDetails /> },
      { path: "recovered-items", element: <RecoveredItems /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },

      // 🔐 Protected (user) routes
      {
        path: "add-item",
        element: (
          <PrivateRoute>
            <AddItems />
          </PrivateRoute>
        ),
      },
      {
        path: "my-items",
        element: (
          <PrivateRoute>
            <MyItems />
          </PrivateRoute>
        ),
      },
      {
        path: "my-recovered-items",
        element: (
          <PrivateRoute>
            <MyRecoveredItems />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "update-item/:id",
        element: (
          <PrivateRoute>
            <UpdateItem />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
