fetch("http://localhost:3000/customerData")
  .then((res) => res.json())
  .then((result) => {
    const payload = document.cookie.split("=")[1].split(".")[1];
    const user = JSON.parse(window.atob(payload));
    for (let i = 0; i < result.length; i++) {
      if (result[i].email === user.email) {
        continue;
      }
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
  document.getElementById("amount").value = "";
});

document.getElementsByClassName("send")[0].addEventListener("click", (e) => {
  const amount = document.getElementById("amount").value;
  document.getElementById("amount").value = "";
  if (isNaN(Number(amount))) {
    const node = document.getElementsByClassName("modal-content")[0];
    const failure_msg = document.createElement("p");
    failure_msg.innerHTML = `Please enter a valid amount!`;
    failure_msg.classList.add("failure_msg");
    node.appendChild(failure_msg);
    setTimeout(() => {
      node.removeChild(document.getElementsByClassName("failure_msg")[0]);
    }, 1500);
    return;
  }
  const payload = document.cookie.split("=")[1].split(".")[1];
  const user = JSON.parse(window.atob(payload));
  const sender = user.name;
  const senderEmail = user.email;
  const recipient = document.getElementsByClassName("modal_name")[0].innerHTML;
  const recipientEmail =
    document.getElementsByClassName("modal_email")[0].innerHTML;
  fetch(`http://localhost:3000/balance/${user.email}`)
    .then((res) => res.json())
    .then((result) => {
      if (result.balance < amount) {
        const node = document.getElementsByClassName("modal-content")[0];
        const failure_msg = document.createElement("p");
        failure_msg.innerHTML = "Insufficient balance!";
        failure_msg.classList.add("failure_msg");
        node.appendChild(failure_msg);
        setTimeout(() => {
          node.removeChild(document.getElementsByClassName("failure_msg")[0]);
        }, 1500);
      } else {
        fetch("http://localhost:3000/transfer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: sender,
            senderEmail: senderEmail,
            recipient: recipient,
            recipientEmail: recipientEmail,
            amount: amount,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.msg === "success") {
              const node = document.getElementsByClassName("modal-content")[0];
              const success_msg = document.createElement("p");
              success_msg.innerHTML = `Transfered ₹${amount} sucessfully!`;
              success_msg.classList.add("success_msg");
              node.appendChild(success_msg);
              setTimeout(() => {
                node.removeChild(
                  document.getElementsByClassName("success_msg")[0]
                );
              }, 1500);
            } else {
              const node = document.getElementsByClassName("modal-content")[0];
              const failure_msg = document.createElement("p");
              failure_msg.innerHTML = `Transfer failed`;
              failure_msg.classList.add("failure_msg");
              node.appendChild(failure_msg);
              setTimeout(() => {
                node.removeChild(
                  document.getElementsByClassName("failure_msg")[0]
                );
              }, 1500);
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});
