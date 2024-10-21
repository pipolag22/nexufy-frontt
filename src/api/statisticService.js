// api/statisticService.js
export const fetchStats = async (token) => {
  const response = await fetch(
    "http://localhost:8081/api/reports/customers/stats/details", // Ruta actualizada
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
    } else {
      const errorText = await response.text();
      throw new Error(`Error del servidor: ${errorText}`);
    }
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    const text = await response.text();
    throw new Error(`Respuesta no es JSON: ${text}`);
  }
};

export const downloadCustomerReport = async (token) => {
  const response = await fetch(
    "http://localhost:8081/api/reports/customers/download", // Esta ruta sigue igual
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
    } else {
      const errorText = await response.text();
      throw new Error(`Error del servidor: ${errorText}`);
    }
  }

  const blob = await response.blob();
  return blob;
};
