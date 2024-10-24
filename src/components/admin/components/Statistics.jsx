import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  fetchStats,
  downloadCustomerReport,
  downloadProductReport, // Importar la nueva función para productos
} from "../../../api/statisticService";
import "chart.js/auto";

const Statistics = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [customerRegistrationsByMonth, setCustomerRegistrationsByMonth] =
    useState({});
  const [productsByMonth, setProductsByMonth] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const data = await fetchStats(token);
        setTotalCustomers(data.totalCustomers);
        setTotalProducts(data.totalProducts);
        setCustomerRegistrationsByMonth(data.customerRegistrationsByMonth);
        setProductsByMonth(data.productsByMonth);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadCustomerReport = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const blob = await downloadCustomerReport(token);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "customer_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownloadProductReport = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const blob = await downloadProductReport(token);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "product_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      setError(error.message);
    }
  };

  const customerData = {
    labels: Object.keys(customerRegistrationsByMonth),
    datasets: [
      {
        label: "Clientes Registrados",
        data: Object.values(customerRegistrationsByMonth),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const productData = {
    labels: Object.keys(productsByMonth),
    datasets: [
      {
        label: "Productos Publicados",
        data: Object.values(productsByMonth),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  if (loading) {
    return <p>Cargando estadísticas...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{`Error: ${error}`}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        min: 0,
        max: Math.max(...Object.values(productsByMonth), 5),
      },
    },
    barThickness: 40,
    responsive: true,
  };

  return (
    <div>
      <h2>Estadísticas</h2>
      <p>Total de clientes registrados: {totalCustomers}</p>
      <p>Total de productos publicados: {totalProducts}</p>

      <h3>Clientes Registrados por Mes</h3>
      <div style={{ width: "600px", height: "400px", margin: "0 auto" }}>
        <Bar data={customerData} options={options} />
      </div>

      <h3>Productos Publicados por Mes</h3>
      <div style={{ width: "600px", height: "400px", margin: "0 auto" }}>
        <Bar data={productData} options={options} />
      </div>

      <button onClick={handleDownloadCustomerReport}>
        Descargar Reporte de Clientes
      </button>

      <button onClick={handleDownloadProductReport}>
        Descargar Reporte de Productos
      </button>
    </div>
  );
};

export default Statistics;
