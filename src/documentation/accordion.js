  var accordions = document.getElementsByclassName("acc-title");
  for (const item of accordions) {
    item.addEventListener("click", function() {
      item.parentElement.classList.toggle("active");
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        item.parentElement.classList.toggle("active");
      }
    });
  }
