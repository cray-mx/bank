document.getElementById("submit").addEventListener("click", () => {
  let [firstName, lastName, email, password, confirmPassword] =
    document.getElementsByTagName("input");
  firstName = firstName.value;
  lastName = lastName.value;
  email = email.value;
  password = password.value;
  confirmPassword = confirmPassword.value;

  if (password !== confirmPassword) {
    document.getElementsByClassName("modal")[0].style.display = "flex";
    document.getElementsByClassName("error_msg")[0].innerHTML =
      "Passwords do not match";
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
      } else if (result.msg === "email_failure") {
        document.getElementsByClassName("modal")[0].style.display = "flex";
        document.getElementsByClassName("error_msg")[0].innerHTML =
          "User already registered";
      } else {
        document.getElementsByClassName("modal")[0].style.display = "flex";
        document.getElementsByClassName("error_msg")[0].innerHTML =
          "Something Went Wrong!";
      }
    })
    .catch((err) => console.log("Error in registering"));
});

document.getElementsByClassName("close")[0].addEventListener("click", (e) => {
  document.getElementsByClassName("modal")[0].style.display = "none";
});
