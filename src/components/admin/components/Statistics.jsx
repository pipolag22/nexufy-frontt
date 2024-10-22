import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  fetchStats,
  downloadCustomerReport,
} from "../../../api/statisticService";
import "chart.js/auto"; // Importación necesaria para Chart.js

const Statistics = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
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

  const handleDownloadReport = async () => {
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

  // Preparar datos para los gráficos de barras
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

  return (
    <div>
      <h2>Estadísticas</h2>
      <p>Total de clientes registrados: {totalCustomers}</p>

      {/* Gráfico de barras para clientes registrados */}
      <h3>Clientes Registrados por Mes</h3>
      <Bar data={customerData} />

      {/* Gráfico de barras para productos publicados */}
      <h3>Productos Publicados por Mes</h3>
      <Bar data={productData} />

      <button onClick={handleDownloadReport}>
        Descargar Reporte de Clientes
      </button>
    </div>
  );
};

export default Statistics;
