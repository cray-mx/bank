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

const greet = () => {
  const date = new Date();
  const payload = document.cookie.split("=")[1].split(".")[1];
  const user = JSON.parse(window.atob(payload));
  if (date.getHours() < 12) {
    document.getElementById("greeting").innerHTML =
      "Good Morning, " + user.name;
  } else if (date.getHours() < 18) {
    document.getElementById("greeting").innerHTML =
      "Good Afternoon, " + user.name;
  } else {
    document.getElementById("greeting").innerHTML =
      "Good Evening, " + user.name;
  }
};

greet();
