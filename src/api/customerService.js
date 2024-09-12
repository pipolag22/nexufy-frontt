// get products by customer service

export async function getProductsByCustomerId(customerId) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/customer/${customerId}/products`,

      {
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}
export async function getCustomerById(customerId) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/customer/${customerId}`,

      {
        headers: {
          accept: "application/json",
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
