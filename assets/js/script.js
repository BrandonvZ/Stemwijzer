// all pages
const startPage = document.getElementById('start-page');
const questionPage = document.getElementById('question-page');
const priorityPage = document.getElementById('priority-page');
const partiesPage = document.getElementById('party-page');
const resultPage = document.getElementById('result-page');

// all buttons
const startBtn = document.getElementById('start-button');
const backBtn = document.getElementById('question-back-button');
const eensBtn = document.getElementById('Eens');
const noneBtn = document.getElementById('Geen van beide');
const oneensBtn = document.getElementById('Oneens');

// question party dropdown
const questionPartyDropdown = document.getElementById('questionPartyDropdown');

// start page comment
var startComment = document.getElementById('start-comment');

// question title and information
var questionTopic = document.getElementById('question-statement');
var questionInfo = document.getElementById('question-description');

// topic containers
var partyTopic = document.getElementById('party-statement');

// progression bar
var progressBar = document.getElementById('progress-bar');

// shows current data
var index = 0;

// saves answers
var answers = [];

// question party dropdown control
var partyIsOpen = false;

startComment.innerHTML = "Test uw politieke voorkeur aan de hand van " + subjects.length + " stellingen";


// this function will be called to generate all party circles at the start page (function is in generation.js)
GenerateStartParties();

// this function will handle if the user pressed the start button at the start page
function StartQuestion() {
    // enables questionPage and disables startPage
    startPage.style.display = "none";
    questionPage.style.display = "block";

    // sets the progress bar to the correct percentage
    progressBar.style.width = (100 / subjects.length + 1) + "%";

    // resets the index to 0 and calls the ShowQuestion function
    index = 0;
    ShowQuestion();
}

// this function will handle the current data and already been answered questions
function ShowQuestion() {
    // automatically closes question party dropdown
    questionPartyDropdown.style.display = "none";
    partyIsOpen = false;

    // removes active styling on buttons
    eensBtn.classList.remove("active");
    noneBtn.classList.remove("active");
    oneensBtn.classList.remove("active");

    // if the question has already been answered
    if(answers.length >= index && answers[index] != undefined && answers[index].answer != '') {

        // get button and apply active styling to the previous answered questions
        var prevSelectedBtn = document.getElementById(answers[index].answer);
        prevSelectedBtn.classList.add("active");
    }

    // shows the current data
    questionTopic.innerHTML = (index + 1) + ". " + subjects[index]['title'];
    questionInfo.innerHTML = subjects[index]['statement'];

    // will be called to generate all parties at the question page and display their side on the topic (function is in generation.js)
    GenerateParties();
}

// this function will toggle the question parties dropdown
function ToggleQuestionDropdown() {
    // if the dropdown is disabled and the user presses on the dropdown
    if(partyIsOpen == false) {

        // show the dropdown and sets partyIsOpen to true
        questionPartyDropdown.style.display = "block";
        partyIsOpen = true;
    } else {

        // if the dropdown is enabled and the user presses on the dropdown, disable the dropdown and sets partyIsOpen back to false
        questionPartyDropdown.style.display = "none";
        partyIsOpen = false;
    }
}

// this function will hande the dropdown icon and information for the selected party
function TogglePartyDropdown(i){
    var dropdownImg = document.getElementById('question-dropdown-image' + i);
    var questionPartyDropdown = document.getElementById('questionPartyDropdown' + i);

    // if the dropdown icon is the default icon. If not, then change the icon into a cross and show the information
    if(dropdownImg.value == false){
        dropdownImg.src = "assets/img/icon-dropdown.svg";
        dropdownImg.value = true;
        questionPartyDropdown.style.display = "none";
    } else {
        dropdownImg.src = "assets/img/icon-cross.png";
        dropdownImg.value = false;
        questionPartyDropdown.style.display = "block";
    }
}

// this function will handle the user choice and next questions
function NextQuestion(choice) {
    // handle question data into an object
    var list = {
        'title' : subjects[index].title,
        'statement' : subjects[index].statement,
        'answer' : choice,
        'priority' : 0
    };

    // stores question data in answer list
    answers[index] = list;

    // increases the progress bar and index
    progressBar.style.width = (100 / subjects.length * (index + 2)) + "%";
    index++;

    // if the user surpasses the last question
    if(index >= subjects.length) {

        // question page will disable and enables priority page
        questionPage.style.display = "none";
        priorityPage.style.display = "block";

        // will be called to generate all topics at the priority page and display their info (function is in generation.js)
        GenerateTopics();

        // temp console.log (WILL BE REMOVED IF DONE TESTING)
        console.log(answers);
    } else {

        // if the user didn't surpass the last question, call ShowQuestion
        ShowQuestion();
    }
}

// this function will handle and display the previous questions
function PreviousQuestion() {
    // if the user is on the priority page and presses on the back button
    if(index == subjects.length) {

        // disables priority page and enables question page
        priorityPage.style.display = "none";
        questionPage.style.display = "block";

        // decreases the progress, index and calls ShowQuestion
        progressBar.style.width = (100 / subjects.length * index) + "%";
        index--;
        ShowQuestion();
    } else {

        // decreases the progressbar and index
        progressBar.style.width = (100 / subjects.length * index) + "%";
        //progressBar.style.transition = "all 0.2s";
        index--;

        // if the user presses back on the first question. question page will disable and enables start page. If not, call ShowQuestion
        if(index < 0) {
            startPage.style.display = "block";
            questionPage.style.display = "none";
        } else {
            ShowQuestion();
        }
    }
}

// this function will check whether you selected an important topic
function IsPriorityTopic(i){
    var priorityCheckbox = document.getElementById('topic' + i);

    // if the topic is not important then change to unimportant topic, if not then make it an important topic
    if(!priorityCheckbox.checked){
        document.getElementsByClassName('priority-title')[i].style.color = "black";
        answers[i].priority = 0;
    } else {
        document.getElementsByClassName('priority-title')[i].style.color = "#01B4DC";
        answers[i].priority = 2;
    }
}

function ShowParties(){
    priorityPage.style.display = "none";
    partiesPage.style.display = "block";
    GenerateAllParties();
}

// this function will check what party is considered big
function SelectBigParties(){
    var partiesCheckboxes = document.getElementsByClassName('party-checkbox');

    // loop through parties
    for(var i = 0; i < parties.length; i++){
        if(parties[i].size >= 14){
            partiesCheckboxes[i].checked = true;
            document.getElementsByClassName('party-title')[i].style.fontWeight = 'bold';
        } else {
            partiesCheckboxes[i].checked = false;
            document.getElementsByClassName('party-title')[i].style.fontWeight = 'normal';
        }
    }
}

// this function will check what party is considered secular
function SelectSecularParties(){
    var partiesCheckboxes = document.getElementsByClassName('party-checkbox');

    // loop through parties
    for(var i = 0; i < parties.length; i++){
        if(parties[i].secular == false){
            partiesCheckboxes[i].checked = true;
            document.getElementsByClassName('party-title')[i].style.fontWeight = 'bold';
        } else {
            partiesCheckboxes[i].checked = false;
            document.getElementsByClassName('party-title')[i].style.fontWeight = 'normal';
        }
    }
}

// this function will disable all parties if the user pressed the remove button
function DisableParties(){
    var partiesCheckboxes = document.getElementsByClassName('party-checkbox');

    // loop through parties
    for(var i = 0; i < parties.length; i++){
        if(parties[i].checked != false){
            partiesCheckboxes[i].checked = false;
            document.getElementsByClassName('party-title')[i].style.fontWeight = 'normal';
        }
    }
}

// this function will check whether you selected an important party
function IsPriorityParty(i){
    var partiesCheckbox = document.getElementById('party' + i);

    // if the topic is not important then change to unimportant topic, if not then make it an important topic
    if(!partiesCheckbox.checked){
        document.getElementsByClassName('party-title')[i].style.fontWeight = 'normal';
    } else {
        document.getElementsByClassName('party-title')[i].style.fontWeight = 'bold';
    }
}

// this function will show the result
function ShowResult(){
    var partiesCheckboxes = document.getElementsByClassName('party-checkbox');

    for(var i = 0; i < parties.length; i++){
        if(partiesCheckboxes[i].checked){
            console.log(parties[i].name);
        }
    }

    partiesPage.style.display = "none";
    resultPage.style.display = "block";

}
