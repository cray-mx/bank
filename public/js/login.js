document.getElementById("submit").addEventListener("click", () => {
  const [email, password] = document.getElementsByTagName("input");
  const details = JSON.stringify({
    email: email.value,
    password: password.value,
  });
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: details,
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.msg === "success") {
        window.location.href = "/home";
      } else {
        alert("Incorrect details!");
      }
    })
    .catch((err) => console.log("Error in logging in"));
});
