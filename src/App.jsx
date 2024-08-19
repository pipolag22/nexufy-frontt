import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList from "./components/Categories/CategoryList";
import FeaturedProduct from "./components/Products/FeaturedProduct";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
