export async function registerAdminUser(formData, token) {
  try {
    const response = await fetch(
      "http://localhost:8081/api/superadmin/customers/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

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

export async function deleterAdminUser(id, token) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/superadmin/customers/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al borrar");
    }
    return {};
  } catch (error) {
    console.log("Error al borrar usuario por admin", error);
    throw error;
  }
}