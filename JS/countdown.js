
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();

const deadline_time = new Date(`feburary 19 ${currentYear} 00:00:00`);

function updateCountdownTime() {
    const currentTime = new Date();
    const diff = deadline_time - currentTime;
    
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    days.innerHTML = d;
    hours.innerHTML = h < 10 ? "0" + h : h;
    minutes.innerHTML = m < 10 ? "0" + m : m;
    seconds.innerHTML = s < 10 ? "0" + s : s;

    if (d <= "0" && h <= "0" && m <= "0" && s <= "0") {
       const hideCountDown = document.querySelector(".container");
       const displayLateReg = document.querySelector(".penalty_container");
       hideCountDown.classList.add("display_none");
       displayLateReg.classList.remove("display_none");
    }
}

setInterval(updateCountdownTime, 1000);

const lateRegBtn = document.querySelector(".lateRegBtn");

lateRegBtn
    .addEventListener("click", function(){
        alert("Payment completed! proceed to registration");
        window.location.href = "./school_reg.html"
    })