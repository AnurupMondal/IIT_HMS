const container = document.querySelector(".container");
const signUpBtn = document.querySelector(".green-bg button");

signUpBtn.addEventListener("click", () => {
  container.classList.toggle("change");
});

const numberField = document.getElementById('numberField');

numberField.addEventListener('input', function() {
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
});