export async function registerAdminUser(formData, token) {
  try {
    const response = await fetch(
      "https://nexufy-2.onrender.com/api/superadmin/customers/create",
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

export async function suspendCustomer(id, days, token) {
  try {
    const response = await fetch(
      `https://nexufy-2.onrender.com/api/superadmin/customers/suspend/${id}?days=${days}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Error al suspender al usuario");
    }
  } catch (error) {
    console.log("Error al suspender usuario", error);
    throw error;
  }
}

export async function unsuspendCustomer(id, token) {
  try {
    const response = await fetch(
      `https://nexufy-2.onrender.com/api/superadmin/customers/unsuspend/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        errorData || "Error al levantar la suspensión del cliente"
      );
    }
    return {};
  } catch (error) {
    console.log("Error al levantar la suspensión del cliente", error);
    throw error;
  }
}

export async function deleteCustomer(id, token) {
  try {
    const response = await fetch(
      `https://nexufy-2.onrender.com/api/superadmin/customers/delete/${id}`,
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
      throw new Error(errorData || "Error al eliminar el cliente");
    }
    return {};
  } catch (error) {
    console.log("Error al eliminar el cliente", error);
    throw error;
  }
}

export async function searchData(searchQuery, token, table){
  try{
    const response = await fetch(`https://nexufy-2.onrender.com/api/admin/${table}/search?name=${searchQuery}`,{
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if(!response.ok){
      throw new Error("Error en la búsqueda!")
    }
    const data = await response.json();
    return data;
  }catch(err){
    console.log("Error en la búsqueda", err);
    return [];
  }
}

