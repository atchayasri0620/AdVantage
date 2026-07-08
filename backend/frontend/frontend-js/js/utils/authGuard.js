// Vanilla JS port of src/pages/ProtectedRoute.jsx
// React Router's <Navigate to="/" /> becomes a plain redirect to index.html (Login page).
// Call this at the very top of every protected page's script, before doing anything else.

export function requireAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "index.html";
    return false;
  }

  return true;
}
