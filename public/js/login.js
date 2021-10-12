document.getElementById("submit").addEventListener("click", () => {
  const [email, password] = document.getElementsByTagName("input");
  const details = JSON.stringify({
    email: email.value,
    password: password.value,
  });
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: details,
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.msg == "success") {
        window.location.href = "/home";
      } else {
        document.getElementsByClassName("modal")[0].style.display = "flex";
      }
    })
    .catch((err) => console.log("Error in logging in"));
});

document.getElementsByClassName("close")[0].addEventListener("click", (e) => {
  document.getElementsByClassName("modal")[0].style.display = "none";
});
