document.addEventListener("DOMContentLoaded", () => {
    const addItemButton = document.getElementById("addItem");
    const itemsContainer = document.getElementById("itemsContainer");
    const totalAmountElement = document.getElementById("totalAmount");
    const taxAmountElement = document.getElementById("taxAmount");
    const grandTotalElement = document.getElementById("grandTotal");
  
    let totalAmount = 0;
  
    // Function to update the total, tax, and grand total
    function updateSummary() {
      const taxRate = 0.1; // 10% tax
      const taxAmount = totalAmount * taxRate;
      const grandTotal = totalAmount + taxAmount;
  
      taxAmountElement.innerText = taxAmount.toFixed(2);
      grandTotalElement.innerText = grandTotal.toFixed(2);
    }
  
    // Function to handle adding a new item
    addItemButton.addEventListener("click", () => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
  
      itemDiv.innerHTML = `
        <input type="text" placeholder="Item Name" class="item-name">
        <input type="number" placeholder="Quantity" class="item-quantity">
        <input type="number" placeholder="Price" class="item-price">
        <button type="button" class="remove-item">Remove</button>
      `;
      itemsContainer.appendChild(itemDiv);
  
      // Remove item functionality
      itemDiv.querySelector(".remove-item").addEventListener("click", () => {
        itemsContainer.removeChild(itemDiv);
        calculateTotal();
      });
  
      // Recalculate total when an item changes
      const quantityInput = itemDiv.querySelector(".item-quantity");
      const priceInput = itemDiv.querySelector(".item-price");
  
      quantityInput.addEventListener("input", calculateTotal);
      priceInput.addEventListener("input", calculateTotal);
    });
  
    // Function to calculate total
    function calculateTotal() {
      totalAmount = 0;
  
      const items = document.querySelectorAll(".item");
      items.forEach(item => {
        const quantity = parseFloat(item.querySelector(".item-quantity").value) || 0;
        const price = parseFloat(item.querySelector(".item-price").value) || 0;
  
        totalAmount += quantity * price;
      });
  
      totalAmountElement.innerText = totalAmount.toFixed(2);
      updateSummary();
    }
  
    // Form submission to generate invoice
    document.getElementById("invoiceForm").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const invoiceNumber = document.getElementById("invoiceNumber").value;
      const date = document.getElementById("date").value;
  
      // In a real application, you might save this information or display it as a PDF.
      alert(`Invoice #${invoiceNumber} generated for ${date}.\nTotal: $${totalAmount.toFixed(2)}\nTax: $${taxAmountElement.innerText}\nGrand Total: $${grandTotalElement.innerText}`);
    });
  });
  