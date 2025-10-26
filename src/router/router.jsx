import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import SignIn from "../pages/Auth/SignIn";
import ItemDetails from "../pages/Items/ItemDetails";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/Shared/NotFound";
import LostFoundItems from "../pages/Items/LostFoundItems";
import AddItems from "../pages/Items/AddItems";
import MyProfile from "../pages/User/MyProfile";
import MyItems from "../pages/User/MyItems";
import UpdateItem from "../pages/User/UpdateItem";
import MyRecoveredItems from "../pages/User/MyRecoveredItems";
import RecoveredItems from "../pages/RecoveredItems/RecoveredItems";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";

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
