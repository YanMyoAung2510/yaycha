const api = import.meta.env.VITE_API;

function getToken() {
  return localStorage.getItem("token");
}

export async function fetchPosts() {
  const res = await fetch(`${api}/content/posts`);
  return res.json();
}

export async function fetchComments(id) {
  const res = await fetch(`${api}/content/posts/${id}`);
  return res.json();
}

export async function postPost(content) {
  const token = getToken();
  const res = await fetch(`${api}/content/posts`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Error: Check Network Log");
}

export async function addComment(content, postId) {
  const token = getToken();
  const res = await fetch(`${api}/content/comments`, {
    method: "POST",
    body: JSON.stringify({ content, postId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Error: Check Network Log");
}

export async function postUser(data) {
  const res = await fetch(`${api}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Error: Check Network Log");
}

export async function postLogin(username, password) {
  const res = await fetch(`${api}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Incorrect username or password");
}

/**
 ** check login and verify user
 */
export async function fetchVerify() {
  const token = getToken();
  const res = await fetch(`${api}/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    return res.json();
  }

  return false;
}

/**
 ** fetch user
 */
export async function fetchUser(id) {
  const token = getToken();
  const res = await fetch(`${api}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

/**
 ** delete post
 */
export async function deletePost(id) {
  const token = getToken();
  const res = await fetch(`${api}/content/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.text();
}

/**
 ** delete comment
 */
export async function deleteComment(id) {
  const token = getToken();
  const res = await fetch(`${api}/content/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.text();
}

/**
 * * add postLike
 */
export async function addPostLike(id) {
  const token = getToken();
  const res = await fetch(`${api}/reaction/like/posts/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "applicatcon/json",
    },
  });
  if (res.ok) {
    return res.json();
  }
}

/**
 * * add commentLike
 */
export async function addCommentLike(id) {
  const token = getToken();

  const res = await fetch(`${api}/reaction/like/comments/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "applicatcon/json",
    },
  });

  return res.json();
}

/**
 * * delete postLike
 */
export async function deletePostLike(id) {
  const token = getToken();
  const res = await fetch(`${api}/reaction/unlike/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

/**
 * * delete commentLike
 */
export async function deleteCommentLike(id) {
  const token = getToken();
  const res = await fetch(`${api}/reaction/unlike/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

/**
 ** fetcch post like
 */
export async function fetchPostLikes(id) {
  const res = await fetch(`${api}/reaction/like/posts/${id}`);
  return res.json();
}

/**
 ** fetch comment like
 */
export async function fetchCommentLikes(id) {
  const res = await fetch(`${api}/reaction/like/comments/${id}`);
  return res.json();
}

/**
 ** add follow
 */
export async function addFollow(id) {
  const token = getToken();
  const res = await fetch(`${api}/follow/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function deleteFollow(id) {
  const token = getToken();
  const res = await fetch(`${api}/unfollow/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// export const fetchSearch = async (q) => {
//   const res = fetch(`${api}/search?q=${q}`);

//   return res.json();
// };

export async function fetchSearch(q) {
  const res = await fetch(`${api}/search?q=${q}`);

  return res.json();
}

/**
 ** fetch following posts
 */

export async function fetchFollowingPosts() {
  const token = getToken();
  const res = await fetch(`${api}/content/following/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function fetchNotis() {
  const token = getToken();
  const res = await fetch(`${api}/notis`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
export async function putAllNotisRead() {
  const token = getToken();
  const res = await fetch(`${api}/notis/read`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
export async function putNotiRead(id) {
  const token = getToken();
  const res = await fetch(`${api}/notis/read/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
