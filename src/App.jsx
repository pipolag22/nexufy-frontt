import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Layout from "./components/home/Layout";
import ProductItem from "./components/ProductPage/ProductItem";
import CategoryPage from "./components/CategoryPage/CategoryPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "product/:id",
          element: <ProductItem />,
        },
        {
          path: "product/category/:id",
          element: <CategoryPage />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
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
