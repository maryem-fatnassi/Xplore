const API_URL = "http://localhost:5000/api/admin/posts";

export async function getPosts({ page = 1, limit = 5, status = "pending" , sortBy = "createdAt", sortOrder = 'desc'}) {
  try {
    const url = new URL(API_URL);

    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    url.searchParams.append("status", status);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("sortOrder", sortOrder);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function acceptPost(postId) {
  try {
    const response = await fetch(`${API_URL}/${postId}/accept`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Failed to accept post");
    }

    return await response.json();

  } catch (error) {
    console.error("Error accepting post:", error);
    throw error;
  }
}

export async function rejectPost(postId) {
  try {
    const response = await fetch(`${API_URL}/${postId}/reject`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Failed to reject post");
    }

    return await response.json();

  } catch (error) {
    console.error("Error rejecting post:", error);
    throw error;
  }
}