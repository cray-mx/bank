document.getElementById("customers").addEventListener("click", (e) => {
  window.location.href = "/customers";
});

document.getElementById("transactions").addEventListener("click", (e) => {
  window.location.href = "/transactions";
});

document.getElementById("transfer").addEventListener("click", (e) => {
  window.location.href = "/transfer";
});

document.getElementById("logout").addEventListener("click", (e) => {
  document.cookie = document.cookie + "; expires=" + new Date().toUTCString();
  window.location.href = "/login";
});
