const registerBtn = document.getElementById("registerBtn");
const inputs = document.querySelectorAll(".input");
const email_regex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function formValidation() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "" || inputs[i].value == null) {
      inputs[i].nextElementSibling.innerHTML =
        inputs[i].previousElementSibling.innerHTML + " is Required";
      inputs[i].classList.add("error");
    } else if (inputs[i].type == "email") {
      if (email_regex.test(email.value)) {
        inputs[i].nextElementSibling.innerHTML = "";
        inputs[i].classList.remove("error");
      } else {
        inputs[i].nextElementSibling.innerHTML = "Enter Valid Email";
        inputs[i].classList.add("error");
      }
    } else {
      inputs[i].nextElementSibling.innerHTML = "";
      inputs[i].classList.remove("error");
    }
  }
}

function generateId() {
  let d = new Date().getTime().toString();
  return d;
}

let registeredSchools = [];
let storedData = JSON.parse(localStorage.getItem("registeredSchools"));

function schoolInfo(ele) {
  let name_of_school = document.getElementById("nos").value;
  let email = document.getElementById("email").value;
  let date = document.getElementById("date").value;
  let pwd = document.getElementById("pwd").value;
  let profile = {
    id: ele(),
    name_of_school: name_of_school,
    email: email,
    date: date,
    pwd: pwd,
  };

  if (storedData) {
    registeredSchools = storedData;
  }

  registeredSchools.push(profile);
  localStorage.setItem("registeredSchools", JSON.stringify(registeredSchools));
}

registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formValidation();
  schoolInfo(generateId);
});
