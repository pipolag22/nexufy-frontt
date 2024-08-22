import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/LoginForm";
import Register from "./components/register/Register";
import Layout from "./components/home/Layout";
import ProductItem from "./components/ProductPage/ProductItem";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Usamos el Layout como contenedor
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "product",
          element: <ProductItem />,
        }
      ]},
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
