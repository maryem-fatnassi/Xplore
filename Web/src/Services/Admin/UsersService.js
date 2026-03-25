const API_URL = "http://localhost:5000/api/admin/users";

export async function getUsers({ page = 1, limit = 5, role = "users", sortBy = "createdAt", sortOrder = 'desc'}) {
  try {
    const url = new URL(API_URL);

    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    url.searchParams.append("role", role);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("sortOrder", sortOrder);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getRolesCount() {
  const res = await fetch(API_URL + "/roles_count");

  if (!res.ok) {
    throw new Error("Failed to fetch role stats");
  }

  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(
    API_URL + `/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
}

export async function getUserById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// CREATE
export async function createUser(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: data
  });

  return res.json();
}

// UPDATE
export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: data
  });

  return res.json();
}