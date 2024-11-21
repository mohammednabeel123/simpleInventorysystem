const x = document.getElementById("itemsInventory");

function displayInventory() {
  const values = JSON.parse(localStorage.getItem("inventory")) || [];

  console.log(values);

  // Clear existing rows in the table
  x.innerHTML = "";

  if (values.length === 0) {
    x.innerHTML = "<tr><td colspan='8'>No items found.</td></tr>";
  } else {
    values.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
        <td>${item.timestamp}</td>
        <td><button class="delete-button" data-id="${item.id}">Delete</button></td>
      `;
      x.appendChild(row); // Add the row to the table
    });

    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = button.getAttribute("data-id");
        const updatedValues = values.filter((item) => item.id !== itemId);
        localStorage.setItem("inventory", JSON.stringify(updatedValues));
        displayInventory(); // Refresh the table
      });
    });
  }
}

displayInventory();
