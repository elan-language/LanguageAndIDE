var acc = document.getElementsByClassName("acc-title");
var i;
for (const item of acc) {
  item.addEventListener("click", function() { 
    item.parentElement.classList.toggle("active");
  });
}
