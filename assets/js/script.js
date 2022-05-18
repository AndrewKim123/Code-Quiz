let qI = 0;
let clockId;
let time = 60;
let banner = document.querySelector('.banner');
let clock = document.querySelector('#time');
document.getElementById('start').addEventListener('click',handleStart);

function handleStart() {
    clockId = setInterval(handleClock,1000);
    renderQuestion();
};

function handleClock() {
    clock.innerText = time;
    if (time<1) {
        time = 0;
        clock.innerText = time;
        clearInterval(clockId);
        return endQuiz(); 
    };
    time--;
};

function renderQuestion() {
    if(qI<questions.length) {
        let {question, answers, correct } = questions[qI];
        banner.innerHTML = `<div><h3>${question}</h3></div> `
        answers.forEach(ans => {
            let btn = document.createElement('button');
            btn.innerText = ans;
            btn.addEventListener('click', ()=>{
                ans == correct
                    ? handleCorrect()
                    : handleIncorrect();
                renderQuestion();
            })
            banner.appendChild(btn)
        });
        qI++;
    }else {
        endQuiz();
    }
};

function endQuiz() {
    clearInterval(clockId);
    banner.innerHTML = 
    `<p> Your score: <span>${time}.</p>
     <input id='initials' placeholder='Add Initials'>
     <button onclick='handleInitial()'>Sumit</button>`;
};

function showScores() {
    if (localStorage.scores == undefined) return;
    let store = JSON.parse(localStorage.scores);
    store.sort((a,b)=>b.score-a.score);
    banner.innerHTML= `<h1> Top Scores </h1>`;
    store.forEach((pl,i) => {
        if(i>4) return;
        banner.innerHTML += 
        `<h3>${pl.initials}: ${pl.score} </h3>`;
    });
}

function handleInitial() {
    let initials = document.getElementById('initials');
    let store = localStorage.scores == undefined
        ? [] : JSON.parse(localStorage.scores);
    store.push({'initials':initials.value,'score':time});
    localStorage.scores = JSON.stringify(store);
    initials.value = '';
    window.location.reload();
}

function handleCorrect() {
    time += 5;
    document.getElementById('correct').style.display = 'block'
    document.getElementById('incorrect').style.display = 'none'
}
function handleIncorrect() {
    time -= 5;
    document.getElementById('correct').style.display = 'none'
    document.getElementById('incorrect').style.display = 'block'
}