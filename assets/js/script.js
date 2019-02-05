const startPage = document.getElementById('startpage');
const questionPage = document.getElementById('questionpage')
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
var questionTopic = document.getElementById('question-container-topic');
var questionInformation = document.getElementById('question-container-information');

var index = 0;
var answers = [];

function startQuestion(){
    index = 0;
    showQuestion();
}

function showQuestion(){
    startPage.style.display = "none";
    questionPage.style.display = "block";
    questionTopic.innerHTML = (index + 1) + ". " + subjects[index]['title'];
    questionInformation.innerHTML = subjects[index]['statement'];
}

function nextQuestion(choice){
    var list = {
        'title' : subjects[index].title,
        'statement' : subjects[index].statement,
        'answer' : choice,
        'priority' : 0
    };
    answers[index] = list;
    index++;
    if(index >= subjects.length){
        questionPage.style.display = "none";
        console.log(answers);
    } else {
        showQuestion();
    }
}

function previousQuestion(){
    index--;
    if(index < 0){
        startPage.style.display = "block";
        questionPage.style.display = "none";
    } else {
        showQuestion();
    }
}
