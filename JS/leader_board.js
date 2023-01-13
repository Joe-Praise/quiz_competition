let table = document.getElementById("table");

let leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));

let container = [];

for (let i = 0; i < leaderBoard.length; i++){
    let details = leaderBoard[i];
    container.push(details);
    container.sort((a, b) => b.score - a.score);
    // container.sort((a , b) => {
    //     if (a.score > b.score)
    //         return -1;
    //     if (a.score < b.score)
    //         return 1;
    // })
}

function setData(res) {
    let details ="";
    let display = document.getElementById("table");
    res.forEach((score) => {
        details += `
            <tr>
                <td>${score.school_name}</td>
                <td>${score.name}</td>
                <td>${score.score}%</td>
            </tr>
        `;
    })
    display.innerHTML = details;
}
setData(container);