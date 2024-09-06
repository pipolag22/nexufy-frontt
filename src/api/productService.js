// const env = import.meta.env.VITE_API_HOST;

// Servicios de Productos
export async function getProduct(productId) {
  try {
    const response = await fetch(
      "http://localhost:8081/api/product/" + productId,
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

// Servicios de comentarios
export async function getComments(productId) {
  try {
    const response = await fetch(
      "http://localhost:8081/api/rating-comments/product/" + productId,
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
    return { data };
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
}

export async function postComments(commentData) {
  try {
    const response = await fetch("http://localhost:8081/api/rating-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("Error en el envío del comentario");
    }
  } catch (error) {
    console.log("Failed to send Comment ", error);
  }
}
