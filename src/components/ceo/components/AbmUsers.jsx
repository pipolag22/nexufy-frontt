import { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import { useOutletContext, Navigate } from "react-router-dom";
import { getAllCustomers } from "../../../api/customerService";

const AbmUsers = () => {
  const { user } = useOutletContext();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllCustomers = async () => {
      if (user && user.id) {
        try {
          const token = localStorage.getItem("token");
          const customers = await getAllCustomers(token);
          setData(customers);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllCustomers();
  }, [user]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  return (
    <div>
      <p>AbmUsers</p>
      <CustomTable input={data} />
    </div>
  );
};

export default AbmUsers;
