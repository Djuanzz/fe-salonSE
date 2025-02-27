import { createBrowserRouter } from "react-router-dom";

import NotFound from "../views/NotFound";
import Home from "../views/Home";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import Reservation from "../views/Reservation";
import Review from "../views/Review";
import AdminDashboard from "../views/admin/AdminDashboard";

const router = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Home /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/reservation", element: <Reservation /> },
  { path: "/reviews", element: <Review /> },
  { path: "/admin", element: <AdminDashboard /> },
]);

export default router;
