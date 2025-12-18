// Wait for the page to fully load, then run the sorting script
function sortAndHighlightItems() {
  // 1. Select all food cards
  const items = Array.from(document.querySelectorAll('.mui-7k36v'));

  // 2. Filter items that have a price
  const foodItems = items.filter(item => item.querySelector('.mui-yif414'));

  if (foodItems.length === 0) {
    return false;
  }

  // 3. Sort items by price (High to Low)
  foodItems.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.mui-yif414').innerText) || 0;
    const priceB = parseFloat(b.querySelector('.mui-yif414').innerText) || 0;
    return priceB - priceA;
  });

  // 4. Identify the container
  const container = foodItems[0].parentElement;

  // 5. Apply styling and re-order
  foodItems.forEach(item => {
    const priceElement = item.querySelector('.mui-yif414');
    const price = parseFloat(priceElement.innerText);

    if (price > 13) {
      // Apply red highlight style
      item.style.border = "3px solid red";
      item.style.borderRadius = "8px";
      priceElement.style.color = "red";
      priceElement.style.fontWeight = "bold";
    } else {
      // Reset styles for cheaper items (in case you run it twice)
      item.style.border = "";
      priceElement.style.color = "";
    }

    // Move to new position
    container.appendChild(item);
  });

  console.log("Feedr Price Sorter: Sorted High to Low. Items over 13.00 are highlighted red.");
  return true;
}

// Run with retry since the page may load content dynamically
function runWithRetry(attempts = 10, delay = 500) {
  if (sortAndHighlightItems()) {
    return;
  }

  if (attempts > 0) {
    setTimeout(() => runWithRetry(attempts - 1, delay), delay);
  }
}

// Start the script
runWithRetry();
