export async function registerAdminUser(formData, token) {
  try {
    const response = await fetch("http://localhost:8081/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluir token JWT
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al registrarse");
    }
    return {};
  } catch (error) {
    console.log("Error al registrar usuario por admin", error);
    throw error;
  }
}
