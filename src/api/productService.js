export async function fetchProduct(productId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${productId}`,
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
    return {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}
