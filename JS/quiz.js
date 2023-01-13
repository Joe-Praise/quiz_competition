const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit_btn");
const continue_btn = info_box.querySelector(".buttons .next_btn");
const quiz_container = document.querySelector(".quiz_container");
const next_btn = quiz_container.querySelector(".next_btn");
const options_list = document.querySelector(".btn_grid");
const result_box = document.querySelector(".result_box");
const quit_btn = result_box.querySelector(".quit_btn");
const user = JSON.parse(localStorage.getItem("loggedAcc"));
const time_exit_btn = quiz_container.querySelector(".exit_btn");

// if quit button is clicked
quit_btn.addEventListener("click", function () {
  // window.location.reload();
  window.location.href = "./leaderboard.html";
});

// if Start Quiz button is clicked
start_btn.addEventListener("click", function () {
  info_box.classList.add("activeInfo");
  // let { name_of_school, first_name, last_name } = user[0];
  // sname.innerHTML = `${name_of_school}`;
  // uname.innerHTML = `${first_name} ${last_name}`;
});

// if exit button is clicked
exit_btn.addEventListener("click", function () {
  info_box.classList.remove("activeInfo");
});

// if next button is clicked
continue_btn.addEventListener("click", function () {
  info_box.classList.remove("activeInfo"); //hide the info box
  quiz_container.classList.add("activequiz"); //show the quiz box
  showQuestions(0);
  bottomQuestionCounter(1);
  setTimer();
});

function questionsContainer() {
  const questions = [
    {
      no: 1,
      ask: "Which one is correct team name in NBA?",
      options: [
        "New York Bulls",
        "Los Angeles Kings",
        "Golden State Warriros",
        "Houston Rocket",
      ],
      answer: "Houston Rocket",
    },
    {
      no: 2,
      ask: "5 + 7 = ?",
      options: ["10", "11", "12", "13"],
      answer: "12",
    },
    {
      no: 3,
      ask: "12 - 8 = ?",
      options: ["1", "2", "3", "4"],
      answer: "4",
    },
    {
      no: 4,
      ask: "Who is the Greatest footballer in the history of the game?",
      options: ["Pele", "Ronaldinho", "Lionel Messi", "Diego Maradona"],
      answer: "Lionel Messi",
    },
    {
      no: 5,
      ask: "Which country won the 2014 World Cup?",
      options: ["France", "Argentina", "Germany", "Nigeria"],
      answer: "Germany",
    },
    {
      no: 6,
      ask: "Which country won the 2022 World Cup played in Qatar?",
      options: ["Portugal", "France", "Argentina", "Brazil"],
      answer: "Argentina",
    },
    {
      no: 7,
      ask: "How many sides does a heptadecagon have?",
      options: ["10", "17", "16", "13"],
      answer: "17",
    },
    {
      no: 8,
      ask: "How many bones have a shark?",
      options: ["5", "10", "8", "0"],
      answer: "0",
    },
    {
      no: 9,
      ask: "Inside which HTML element do we put the JavaScript?",
      options: ["scripting", "script", "head", "body"],
      answer: "script",
    },
    {
      no: 10,
      ask: "How can you detect the client's browser name?",
      options: [
        "client.navName",
        "navigator.appName",
        "browser.name",
        "Pc.browserName",
      ],
      answer: "navigator.appName",
    },
  ];
  return questions;
}

let question_count = 0;
let question_number = 1;
let counter;
let user_score = 0;

function nextQuestion() {
    if (question_count < questionsContainer().length - 1) {
      question_count++;
      question_number++;
      showQuestions(question_count);
      bottomQuestionCounter(question_number);
      next_btn.style.display = "none";
    } else {
      console.log("Questions completed");
      showResultBox();
    }
}


//getting questions and options from questions array
function showQuestions(index) {
  const q_text = document.querySelector("#question");
  // const options_list = document.querySelector(".btn_grid");
  let q_ele = `<h3>${questionsContainer()[index].ask}</h3>`;
  let option_ele = ` 
                <button class="btn btn_opt">${
                  questionsContainer()[index].options[0]
                }</button>
                <button class="btn btn_opt">${
                  questionsContainer()[index].options[1]
                }</button>
                <button class="btn btn_opt">${
                  questionsContainer()[index].options[2]
                }</button>
                <button class="btn btn_opt">${
                  questionsContainer()[index].options[3]
                }</button>
    `;
  q_text.innerHTML = q_ele;
  options_list.innerHTML = option_ele;
  const option = options_list.querySelectorAll(".btn_opt");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questionsContainer()[question_count].answer;
//   let allButtons = options_list.children.length;
  if (userAnswer == correctAnswer) {
    user_score += 1;
    answer.classList.add("correct");
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else {
      answer.classList.add("wrong");
      setTimeout(() => {
        nextQuestion();   
    }, 1000);
    // if answeris wrong automatically select correct answer
    // for (let i = 0; i < allButtons; i++) {
    //   if (options_list.children[i].textContent == correctAnswer) {
    //     options_list.children[i].setAttribute("class", "btn correct");
    //   }
    // }
  }

  // once user selects option disable all buttons
//   for (let i = 0; i < allButtons; i++) {
//     options_list.children[i].classList.add("disabled");
//   }
//   next_btn.style.display = "block";
}

function showResultBox() {
  let userPoints = [];
  let storedData = JSON.parse(localStorage.getItem("leaderBoard"));

  info_box.classList.remove("activeInfo"); //hide the info box
  quiz_container.classList.remove("activequiz"); //hide the quiz box
  result_box.classList.add("activeresult"); //show the quiz box
  const score_text = result_box.querySelector(".score_text");
  let percent = (user_score * 100) / questionsContainer().length;
  let { name_of_school, first_name, last_name } = user[0];

  let quiz_details = {
    school_name: name_of_school,
    name: first_name + " " + last_name,
    score: percent,
  };
  if (storedData) {
    userPoints = storedData;
  }
  userPoints.push(quiz_details);
  localStorage.setItem("leaderBoard", JSON.stringify(userPoints));


  let score_ele = `
            <span>${name_of_school}, ${first_name} ${last_name}, ${percent}%</span>
        `;
  score_text.innerHTML = score_ele;
}

function setTimer() {
  let min = 2;
  let sec = 0;
  let m;
  let s;
  timer = setInterval(() => {
    sec -= 1;
    if (sec == -1) {
      min -= 1;
      sec = 59;
    }
    m = min < 10 ? "0" + min : min;
    s = sec < 10 ? "0" + sec : sec;
    clock.innerHTML = m + ":" + s;
    if (min == 0 && sec == 0) {
      clearInterval(timer);
      clock.textContent = `00:00`;

      let correctAnswer = questionsContainer()[question_count].answer;
      let allButtons = options_list.children.length;
      for (let i = 0; i < allButtons; i++) {
        if (options_list.children[i].textContent == correctAnswer) {
          options_list.children[i].setAttribute("class", "btn correct");
        }
      }
      for (let i = 0; i < allButtons; i++) {
        options_list.children[i].classList.add("disabled");
      }
      time_exit_btn.style.display = "block";
      time_exit_btn.addEventListener("click", showResultBox);
    }
  }, 1000);
}

function bottomQuestionCounter(index) {
  const bottom_ques_counter = quiz_container.querySelector(".totalQ");
  let totalQCount_ele = `
    <span><p>${index}</p>of<p>${questionsContainer().length}</p>Questions</span>
`;
  bottom_ques_counter.innerHTML = totalQCount_ele;
}

let logOut = document.getElementById("logout");

logOut.addEventListener("click", function () {
  localStorage.removeItem("loggedAcc");
  window.location.href = "./login.html";
    setTimeout(() => {
        window.location.reload();
    }, 3000); 
});
