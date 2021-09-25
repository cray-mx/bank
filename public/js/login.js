const [username, password] = document.getElementsByTagName("input");

fetch("/login", {
  method: "POST",
  body: JSON.stringify({ username, password }),
})
  .then((res) => res.json())
  .then((result) => {
    if (result === "success") {
      window.location.href = "/home";
    } else {
      alert("Incorrect details!");
    }
  })
  .catch((err) => console.log("Error in logging in"));
