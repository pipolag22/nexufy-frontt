import React, { useContext, useState, useEffect } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import {
  fetchStats,
  downloadCustomerReport,
  downloadProductReport,
} from "../../../api/statisticService";
import { LanguageContext } from "../../themes/LanguageContext";
import translations from "../../themes/translations";

const Statistics = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [customerRegistrationsByMonth, setCustomerRegistrationsByMonth] =
    useState([]);
  const [productsByMonth, setProductsByMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const monthMap = {
    JANUARY: t.months.JANUARY,
    FEBRUARY: t.months.FEBRUARY,
    MARCH: t.months.MARCH,
    APRIL: t.months.APRIL,
    MAY: t.months.MAY,
    JUNE: t.months.JUNE,
    JULY: t.months.JULY,
    AUGUST: t.months.AUGUST,
    SEPTEMBER: t.months.SEPTEMBER,
    OCTOBER: t.months.OCTOBER,
    NOVEMBER: t.months.NOVEMBER,
    DECEMBER: t.months.DECEMBER,
  };

  const defaultMonths = [
    t.months.AUGUST,
    t.months.SEPTEMBER,
    t.months.OCTOBER,
    t.months.NOVEMBER,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const data = await fetchStats(token);
        setTotalCustomers(data.totalCustomers || 0);
        setTotalProducts(data.totalProducts || 0);

        const filledCustomerData = defaultMonths.map(
          (month) =>
            data.customerRegistrationsByMonth?.[
              Object.keys(monthMap).find((key) => monthMap[key] === month)
            ] || 0
        );
        const filledProductData = defaultMonths.map(
          (month) =>
            data.productsByMonth?.[
              Object.keys(monthMap).find((key) => monthMap[key] === month)
            ] || 0
        );

        setCustomerRegistrationsByMonth(filledCustomerData);
        setProductsByMonth(filledProductData);
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

  // Configuración de las dimensiones y escalas para VisX
  const xMax = 300;
  const yMax = 200;
  const maxCustomers = Math.max(...customerRegistrationsByMonth, 1); // Máximo dinámico para eje Y
  const maxProducts = Math.max(...productsByMonth, 1); // Máximo dinámico para eje Y

  // Función para generar ticks de enteros
  const generateTicks = (maxValue) => {
    const ticks = [];
    for (let i = 1; i <= maxValue; i++) {
      ticks.push(i);
    }
    return ticks;
  };

  const xScale = scaleBand({
    domain: defaultMonths,
    range: [0, xMax],
    padding: 0.4,
  });
  const yScaleCustomer = scaleLinear({
    domain: [0, maxCustomers],
    range: [yMax, 0],
  });
  const yScaleProduct = scaleLinear({
    domain: [0, maxProducts],
    range: [yMax, 0],
  });

  if (loading) return <p>{t.loadingStatistics}</p>;
  if (error)
    return (
      <div>
        <p>{`${t.error}: ${error}`}</p>
        <button onClick={() => window.location.reload()}>{t.retry}</button>
      </div>
    );

  return (
    <div className="container mx-3 h-100 mb-0">
      <h2 className="text-body-tertiary fs-4">{t.statistics}</h2>
      <div className="w-100 p-3 py-2 d-flex justify-content-around bg-dark-subtle text-dark-emphasis rounded">
        <div className="d-flex flex-column w-50 align-items-start ms-2">
          <p className="fw-semibold text-body-tertiary">
            {t.totalRegisteredCustomers}
          </p>
          <p className="fs-1">{totalCustomers}</p>
        </div>
        <div className="d-flex w-50 flex-column align-items-start">
          <p className="fw-semibold text-body-tertiary">
            {t.totalPublishedProducts}
          </p>
          <p className="fs-1">{totalProducts}</p>
        </div>
      </div>
      <div className="w-100 mt-2 d-flex">
        {/* Gráfico de Clientes */}
        <div className="w-50 bg-light rounded p-3 me-1">
          <h3 className="fs-4 text-body-tertiary">
            {t.customersRegisteredPerMonth}
          </h3>
          <svg width={xMax + 50} height={yMax + 50}>
            <Group top={20} left={40}>
              {customerRegistrationsByMonth.map((d, i) => (
                <React.Fragment key={`bar-customer-${i}`}>
                  <Bar
                    x={xScale(defaultMonths[i])}
                    y={yScaleCustomer(d)}
                    width={xScale.bandwidth()}
                    height={yMax - yScaleCustomer(d)}
                    fill="rgba(75, 192, 192, 0.6)"
                  />
                  {/* Valor dentro de la barra */}
                  <Text
                    x={xScale(defaultMonths[i]) + xScale.bandwidth() / 2}
                    y={yScaleCustomer(d) + 15}
                    fill="white"
                    fontSize={12}
                    textAnchor="middle"
                  >
                    {d}
                  </Text>
                </React.Fragment>
              ))}
              <AxisBottom
                scale={xScale}
                top={yMax}
                label={t.monthsLabel}
                tickLabelProps={() => ({
                  fill: "#333",
                  fontSize: 12,
                  textAnchor: "middle",
                })}
              />
              <AxisLeft
                scale={yScaleCustomer}
                label={t.clientsRegistered}
                tickValues={generateTicks(maxCustomers)} // Valores específicos para ticks en el eje Y
                tickLabelProps={() => ({
                  fill: "#333",
                  fontSize: 12,
                  textAnchor: "end",
                })}
              />
            </Group>
          </svg>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleDownloadCustomerReport}
            >
              {t.downloadCustomerReport}
            </button>
          </div>
        </div>

        {/* Gráfico de Productos */}
        <div className="w-50 bg-light rounded p-3">
          <h3 className="fs-4 text-body-tertiary">
            {t.productsPublishedPerMonth}
          </h3>
          <svg width={xMax + 50} height={yMax + 50}>
            <Group top={20} left={40}>
              {productsByMonth.map((d, i) => (
                <React.Fragment key={`bar-product-${i}`}>
                  <Bar
                    x={xScale(defaultMonths[i])}
                    y={yScaleProduct(d)}
                    width={xScale.bandwidth()}
                    height={yMax - yScaleProduct(d)}
                    fill="rgba(153, 102, 255, 0.6)"
                  />
                  {/* Valor dentro de la barra */}
                  <Text
                    x={xScale(defaultMonths[i]) + xScale.bandwidth() / 2}
                    y={yScaleProduct(d) + 15}
                    fill="white"
                    fontSize={12}
                    textAnchor="middle"
                  >
                    {d}
                  </Text>
                </React.Fragment>
              ))}
              <AxisBottom
                scale={xScale}
                top={yMax}
                label={t.monthsLabel}
                tickLabelProps={() => ({
                  fill: "#333",
                  fontSize: 12,
                  textAnchor: "middle",
                })}
              />
              <AxisLeft
                scale={yScaleProduct}
                label={t.productsPublished}
                tickValues={generateTicks(maxProducts)} // Valores específicos para ticks en el eje Y
                tickLabelProps={() => ({
                  fill: "#333",
                  fontSize: 12,
                  textAnchor: "end",
                })}
              />
            </Group>
          </svg>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleDownloadProductReport}
            >
              {t.downloadProductReport}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
