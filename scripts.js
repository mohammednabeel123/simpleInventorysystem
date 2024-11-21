document.addEventListener("DOMContentLoaded", function () {
  const itemIDInput = document.getElementById("item-id-input");
  const itemNameInput = document.getElementById("item-name-input");
  const descriptionInput = document.getElementById("description");
  const categoryInput = document.getElementById("category");
  const quantityInput = document.getElementById("item-quantity");
  const priceInput = document.getElementById("price");
  const submitButton = document.getElementById("add-item-button");
  const searchButton = document.getElementById("search");
  const resultDiv = document.getElementById("result");
  const searchInput = document.getElementById("search-input");

  // Function to generate a random ID
  function generateRandomId() {
    return Math.trunc(Math.random() * 1000000);
  }

  itemIDInput.value = generateRandomId();

  if (submitButton) {
    submitButton.addEventListener("click", function (e) {
      e.preventDefault();

      const itemID = itemIDInput.value;
      const itemName = itemNameInput.value.trim();
      const description = descriptionInput.value.trim();
      const category = categoryInput.value;
      const quantity = quantityInput.value.trim();
      const price = priceInput.value.trim();

      // Validation
      if (
        !itemName ||
        !description ||
        !category ||
        !quantity ||
        !price ||
        isNaN(quantity) ||
        isNaN(price) ||
        quantity <= 0 ||
        price <= 0
      ) {
        alert("Please fill all the fields with valid values.");
        return;
      }

      const inventoryItem = {
        id: itemID,
        name: itemName,
        description: description,
        category: category,
        quantity: Number(quantity),
        price: Number(price),
        timestamp: new Date().toLocaleString(),
      };

      console.log("Adding item:", inventoryItem);

      // Retrieve the current inventory
      let currentInventory = JSON.parse(localStorage.getItem("inventory"));
      if (!Array.isArray(currentInventory)) {
        currentInventory = [];
      }

      console.log("Current Inventory Before Adding:", currentInventory);

      // Add the new item
      currentInventory.push(inventoryItem);

      // Save back to localStorage
      localStorage.setItem("inventory", JSON.stringify(currentInventory));

      console.log(
        "Current Inventory After Adding:",
        JSON.parse(localStorage.getItem("inventory"))
      );

      // Alert the user
      alert("Item added successfully!");

      // Print the input values
      printInputs(inventoryItem);

      // Clear the form
      itemIDInput.value = generateRandomId();
      itemNameInput.value = "";
      descriptionInput.value = "";
      categoryInput.value = "";
      quantityInput.value = "";
      priceInput.value = "";
    });
  }

  function printInputs(inventoryItem) {
    const { id, name, description, category, quantity, price } = inventoryItem;

    const content = `
      <h3>Item Reference</h3>
      <p><strong>ID:</strong> ${id}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Price:</strong> $${price}</p>
    `;

    // Open the print dialog
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(
      "<html><head><title>Print Input Values</title></head><body>"
    );
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  }

  if (searchButton) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();

      const query = searchInput.value.trim().toLowerCase(); // Get the value from the search input
      const currentInventory =
        JSON.parse(localStorage.getItem("inventory")) || [];

      const searchResults = currentInventory.filter((item) => {
        return item.id.toString().toLowerCase().includes(query); // Convert ID to string and filter
      });

      console.log(searchResults); // Log search results for debugging

      // Display search results
      if (searchResults.length === 0) {
        resultDiv.innerHTML = "No matching items found.";
      } else {
        resultDiv.innerHTML = ""; // Clear previous results
        searchResults.forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.innerHTML = `
            <p><strong>ID:</strong> ${item.id}</p>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            <p><strong>Price:</strong> $${item.price}</p>
          `;
          resultDiv.appendChild(itemDiv);
        });
      }
    });
  }
});
