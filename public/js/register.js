let [firstName, lastName, email, password, confirmPassword] =
  document.getElementsByTagName("input");
console.log(firstName);
firstName = firstName.value;
lastName = lastName.value;
email = email.value;
password = password.value;
confirmPassword = confirmPassword.value;

fetch("http://127.0.0.1:3000/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ firstName, lastName, email, password }),
})
  .then((res) => res.json())
  .then((result) => {
    if (result === "success") {
      window.location.href = "/home";
    } else {
      alert("Cannot Register User");
    }
  })
  .catch((err) => console.log("Error in registering"));
