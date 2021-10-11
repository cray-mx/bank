fetch("http://localhost:3000/customerData")
  .then((res) => res.json())
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      let node = document.createElement("div");
      let image = document.createElement("img");
      let p_name = document.createElement("p");
      let p_email = document.createElement("p");
      image.src = `https://robohash.org/${i}`;
      p_name.innerHTML = result[i].firstName + " " + result[i].lastName;
      p_name.classList.add("name");
      p_email.innerHTML = result[i].email;
      p_email.classList.add("email");
      node.appendChild(image);
      node.appendChild(p_name);
      node.appendChild(p_email);
      node.classList.add("card");
      node.addEventListener("click", (e) => {
        document.getElementsByClassName("modal")[0].style.display = "flex";
        document.getElementsByClassName("modal_name")[0].innerHTML =
          p_name.innerHTML;
        document.getElementsByClassName("modal_email")[0].innerHTML =
          p_email.innerHTML;
      });
      document.getElementsByClassName("inner-container")[0].appendChild(node);
    }
  })
  .catch((err) => console.log(err));

document.getElementsByClassName("close")[0].addEventListener("click", (e) => {
  document.getElementsByClassName("modal")[0].style.display = "none";
});

document.getElementsByClassName("send")[0].addEventListener("click", (e) => {});
