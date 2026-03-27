const API_URL = "http://localhost:5000/api/admin/rare-places";

export async function getRarePlaces({ page = 1, limit = 10, sortBy = "createdAt", sortOrder = 'desc'}) {
  try {
    const url = new URL(API_URL);

    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("sortOrder", sortOrder);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch rare places");
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error fetching rare places:", error);
    return [];
  }
}

export async function deleteRarePlace(id) {
  const res = await fetch(
    API_URL + `/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete rare place");
  }

  return res.json();
}

export async function getRarePlaceById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// CREATE
export async function createRarePlace(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: data
  });

  return res.json();
}

// UPDATE
export async function updateRarePlace(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: data
  });

  return res.json();
}
