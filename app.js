document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let fullName = document.getElementById("fullName").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let phone = document.getElementById("phone").value;

    let checkBox = document.querySelectorAll('input[name="orderType"]:checked');

    let ch = [];
    for (let i = 0; i < checkBox.length; i++) {
      ch.push(checkBox[i].value);
    }

    let orderOption = document.querySelector('input[name="orderOption"]:checked').value;

    let Customer = new C1(
      fullName,
      password,
      dob,
      gender,
      phone,
      ch,
      orderOption
    );
    const toLocalStorage =
      JSON.parse(localStorage.getItem("toLocalStorage")) || [];
    toLocalStorage.push(Customer);

    localStorage.setItem("toLocalStorage", JSON.stringify(toLocalStorage));

    renderCustomer(Customer);
  });

function C1(fullName, password, dob, gender, phone, ch, orderOption) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.ch = ch;
  this.orderOption = orderOption;
}
function renderCustomer(customer) {
  const container = document.getElementById("cardsContainer");

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>${customer.fullName}</h3>
    <p><strong>Gender:</strong> ${customer.gender}</p>
    <p><strong>Order:</strong> ${customer.ch.join(", ")}</p>
    <p><strong>Option:</strong> ${customer.orderOption}</p>
    <p><strong>Phone:</strong> ${customer.phone}</p>
  `;

  container.appendChild(card);
}

function loadExistingCustomers() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.forEach((order) => renderCustomer(order));
}

loadExistingCustomers();
