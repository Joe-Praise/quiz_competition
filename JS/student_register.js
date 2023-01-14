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

let schools = JSON.parse(localStorage.getItem("registeredSchools"));
function registeredSchoolsInfo(res) {
  let option = "";
  let select = document.getElementById("nos");
  res.forEach((school) => {
    option += `
            <option value="${school.name_of_school}">${school.name_of_school}</option>
        `;
  });
  select.innerHTML = option;
}
registeredSchoolsInfo(schools);

function generateId() {
  let d = new Date().getTime().toString();
  return d;
}

let registeredStudents = [];
let storedData = JSON.parse(localStorage.getItem("registeredStudents"));

function studentInfo(ele) {
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let name_of_school = document.getElementById("nos").value;
  let pwd = document.getElementById("pwd").value;
    
  let profile = {
    id: ele(),
    fname: fname,
    lname: lname,
    email: email,
    name_of_school: name_of_school,
    pwd: pwd,
  };

    console.log(profile);
  if (storedData) {
    registeredStudents = storedData;
  }

  registeredStudents.push(profile);
  localStorage.setItem("registeredStudents", JSON.stringify(registeredStudents));
}

function blockSubmit() {
    if (inputs[4].value === "" || inputs[4].value === null) {
		alert("Complete registration required");
		return;
    } else {
      alert("Next: Login");
	}
}
registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formValidation();
  blockSubmit();
  studentInfo(generateId);
});
