// get products by customer service

export async function getProductsByCustomerId(customerId,token) {
  try {
    const response = await fetch(`http://localhost:8081/api/customer/${customerId}/products`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Asegúrate de que la respuesta no esté vacía antes de intentar parsearla
    const text = await response.text();
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function getCustomerById(customerId, token) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/customer/${customerId}`,

      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}
