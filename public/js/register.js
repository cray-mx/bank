document.getElementById("submit").addEventListener("click", () => {
  let [firstName, lastName, email, password, confirmPassword] =
    document.getElementsByTagName("input");
  firstName = firstName.value;
  lastName = lastName.value;
  email = email.value;
  password = password.value;
  confirmPassword = confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  const details = JSON.stringify({ firstName, lastName, email, password });
  fetch("/register", {
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
        alert("Cannot Register User");
      }
    })
    .catch((err) => console.log("Error in registering"));
});
