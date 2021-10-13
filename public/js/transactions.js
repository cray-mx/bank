let table = document.getElementById("table-content");

const tableEntry = () => {
  fetch("http://127.0.0.1:3000/transferData")
    .then((res) => res.json())
    .then((result) => {
      let rowIndex = 1;
      for (let i = 0; i < result.length; i++) {
        let row = table.insertRow(rowIndex++);
        let sender = row.insertCell(0);
        let senderEmail = row.insertCell(1);
        let recipient = row.insertCell(2);
        let recipientEmail = row.insertCell(3);
        let amount = row.insertCell(4);
        let date = row.insertCell(5);
        sender.innerHTML = result[i].sender;
        senderEmail.innerHTML = result[i].senderEmail;
        recipient.innerHTML = result[i].recipient;
        recipientEmail.innerHTML = result[i].recipientEmail;
        amount.innerHTML = result[i].amount;
        const d = new Date(result[i].createdAt);
        date.innerHTML = d.toDateString() + " " + d.toLocaleTimeString();
      }
    });
};

tableEntry();
