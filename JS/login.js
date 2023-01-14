let loginBtn = document.getElementById("loginBtn");
let logoutBtn = document.getElementById("logout");

class User {
  constructor(id, firstName, lastName, nameOfSchool, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.nameOfSchool = nameOfSchool;
    this.password = password;
  }
  login() {
    alert(
      `the student ${this.firstName} ${this.lastName} exists and the password is ${this.password}`
    );

    let loggedAcc = [];
    let profile = {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      name_of_school: this.nameOfSchool,
      pwd: this.password,
    };
    loggedAcc.push(profile);
    localStorage.setItem("loggedAcc", JSON.stringify(loggedAcc));
    window.location.href = "./quiz.html";
  }
}

function loginCheck() {
  let students = JSON.parse(localStorage.getItem("registeredStudents"));
  let name_of_school = document.getElementById("nos").value;
  let pwd = document.getElementById("pwd").value;
  students.forEach((user) => {
    if (user.name_of_school == name_of_school && user.pwd == pwd) {
      let loggedStudent = new User(
        user.id,
        user.fname,
        user.lname,
        user.name_of_school,
        user.pwd
      ).login();
      return loggedStudent;
    } else {
      return;
    }
  });
}

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loginCheck();
});
