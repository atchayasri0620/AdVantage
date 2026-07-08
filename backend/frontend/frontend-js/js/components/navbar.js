// Vanilla JS port of src/components/layout/Navbar.jsx
// React Router <Link>/useNavigate are replaced with plain <a href="..."> /
// window.location.href page navigation.

function roleHomePage(role) {
  if (role === "CLIENT") return "campaigns.html";
  if (role === "ADMANAGER") return "dashboard.html";
  if (role === "AUDIENCE") return "audience.html";
  return "index.html";
}

function navLinksHtml(role) {
  if (role === "CLIENT") {
    return `
      <a href="campaigns.html">Campaigns</a>
      <a href="create-campaign.html">Create Campaign</a>
    `;
  }

  if (role === "ADMANAGER") {
    return `
      <a href="dashboard.html">Dashboard</a>
      <a href="manager-campaigns.html">Campaigns</a>
      <a href="roi.html">ROI</a>
    `;
  }

  if (role === "AUDIENCE") {
    return `
      <a href="audience.html">Audience</a>
    `;
  }

  return "";
}

export function renderNavbar(containerId = "navbar-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const role = localStorage.getItem("role");

  container.innerHTML = `
    <nav class="navbar">
      <h2 id="navbar-brand">AdVantage</h2>

      <div class="nav-links">
        ${navLinksHtml(role)}
      </div>

      <div class="user-info">
        <span>${role ?? ""}</span>
        <button id="navbar-logout-btn">Logout</button>
      </div>
    </nav>
  `;

  const brand = document.getElementById("navbar-brand");
  brand.addEventListener("click", () => {
    window.location.href = roleHomePage(role);
  });

  const logoutBtn = document.getElementById("navbar-logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}
