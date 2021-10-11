let table = document.getElementById("table-content");

const tableEntry = () => {
  fetch("http://127.0.0.1:3000/customerData")
    .then((res) => res.json())
    .then((result) => {
      let rowIndex = 1;
      for (let i = 0; i < result.length; i++) {
        let row = table.insertRow(rowIndex++);
        let name = row.insertCell(0);
        let email = row.insertCell(1);
        let balance = row.insertCell(2);

        name.innerHTML = result[i].firstName + " " + result[i].lastName;
        email.innerHTML = result[i].email;
        balance.innerHTML = result[i].balance;
      }
    });
};

tableEntry();
