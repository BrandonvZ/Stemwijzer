// all pages
const startPage = document.getElementById('startpage');
const questionPage = document.getElementById('questionpage');
const partyPage = document.getElementById('partypage');
const priorityPage = document.getElementById('prioritypage');
const partiesPage = document.getElementById('partiespage');

// all buttons
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const eensBtn = document.getElementById('Eens');
const noneBtn = document.getElementById('Geen van beide');
const oneensBtn = document.getElementById('Oneens');
const bigPartyBtn = document.getElementById('parties-big-button');
const secularPartyBtn = document.getElementById('parties-secular-button');

// all party sides
var eensList = document.getElementById('eensList');
var noneList = document.getElementById('noneList');
var oneensList = document.getElementById('oneensList');

// question title and information
var questionTopic = document.getElementById('question-container-topic');
var questionInformation = document.getElementById('question-container-information');

// priority topics container
var priorityTopics = document.getElementById('priority-topics');

// parties topics container
var partiesTopics = document.getElementById('parties-topics');

// the progression bar
var progressBar = document.getElementById('progressbar');

// shows current information
var index = 0;

// saves your answers
var answers = [];

// dropdown menu control
var partyIsOpen = false;

// this function will be called if you press the start button
function StartQuestion(){
    // enables and disables the pages
    startPage.style.display = "none";
    questionPage.style.display = "block";

    // will set the progressbar to the correct percentage
    progressBar.style.width = (100 / subjects.length + 1) + "%";

    // resets the index to 0 and calls the ShowQuestion function
    index = 0;
    ShowQuestion();
}

// this function will display the current question title and information and handle answered question
function ShowQuestion(){
    // automatically closes dropdown
    partyPage.style.display = "none";
    partyIsOpen = false;

    // removes active styling on buttons
    eensBtn.classList.remove("active");
    noneBtn.classList.remove("active");
    oneensBtn.classList.remove("active");

    // if question has already been answered, show answer
    if(answers.length >= index && answers[index] != undefined && answers[index].answer != ''){

        // get button and apply active class
        var prevSelectedBtn = document.getElementById(answers[index].answer);
        prevSelectedBtn.classList.add("active");
    }

    questionTopic.innerHTML = (index + 1) + ". " + subjects[index]['title'];
    questionInformation.innerHTML = subjects[index]['statement'];

    GenerateParties();
}

// this function will sent the user choice
function NextQuestion(choice){
    // handle question data into an object
    var list = {
        'title' : subjects[index].title,
        'statement' : subjects[index].statement,
        'answer' : choice,
        'priority' : 0
    };

    // stores question data in answer list
    answers[index] = list;

    // increases the progressbar and index, and gives the progressbar a transition effect
    progressBar.style.width = (100 / subjects.length * (index + 2)) + "%";
    progressBar.style.transition = "all 0.2s";
    index++;

    // if the user surpasses the last question. question page will disable and enables priority questions page. If not, then show question
    if(index >= subjects.length){
        questionPage.style.display = "none";
        priorityPage.style.display = "block";
        GenerateTopics();
        console.log(answers);
    } else {
        ShowQuestion();
    }
}

// this function will show the previous question
function PreviousQuestion(){
    // if the user is on the priority page and presses to go back to the questions
    if(index == subjects.length){
        priorityPage.style.display = "none";
        questionPage.style.display = "block";
        progressBar.style.width = (100 / subjects.length * index) + "%";
        progressBar.style.transition = "all 0.2s";
        index--;
        ShowQuestion();
    } else {

        // decreases the progressbar and index, and gives the progressbar a transition effect
        progressBar.style.width = (100 / subjects.length * index) + "%";
        progressBar.style.transition = "all 0.2s";
        index--;

        // if the user goes lower then the first question. question page will disable and enables start page. If not, then show question
        if(index < 0){
            startPage.style.display = "block";
            questionPage.style.display = "none";
        } else {
            ShowQuestion();
        }
    }
}

// this function will toggle the parties dropdown
function ToggleDropdown(){
    // if the page is disabled and the user presses on the dropdown, the page will be enabled. If not, then the other way around.
    if(partyIsOpen == false){
        partyPage.style.display = "block";
        partyIsOpen = true;
    } else {
        partyPage.style.display = "none";
        partyIsOpen = false;
    }
}

// this function will generate all parties and their side
function GenerateParties(){
    eensList.innerHTML = "";
    noneList.innerHTML = "";
    oneensList.innerHTML = "";

    // loop through all parties in the subjects list
    for(var i = 0; i < subjects[index].parties.length; i++){
        var party = subjects[index].parties[i];

        // if a party is for the current statement
        if(party.position == "pro"){
            eensList.innerHTML += "<div class='party-dropdown-container" + i + "' onclick='TogglePartyDropdown(" + i + ");'><p class='party-container-partyname'>" + party.name + "</p>";
            eensList.innerHTML += "<img id='party-dropdown-image" + i + "' value='false' class='party-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            eensList.innerHTML += "<div id='party-dropdown" + i + "' class='party-container-dropdown'><p>" + party.explanation + "</p></div></div>";
        }

        // if a party is neutral the current statement
        if(party.position == "ambivalent"){
            noneList.innerHTML += "<div class='party-dropdown-container" + i + "' onclick='TogglePartyDropdown(" + i + ");'><p class='party-container-partyname'>" + party.name + "</p>";
            noneList.innerHTML += "<img id='party-dropdown-image" + i + "' value='false' class='party-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            noneList.innerHTML += "<div id='party-dropdown" + i + "' class='party-container-dropdown'><p>" + party.explanation + "</p></div></div>";
        }

        // if a party is against the current statement
        if(party.position == "contra"){
            oneensList.innerHTML += "<div class='party-dropdown-container" + i + "' onclick='TogglePartyDropdown(" + i + ");'><p class='party-container-partyname'>" + party.name + "</p>";
            oneensList.innerHTML += "<img id='party-dropdown-image" + i + "' value='false' class='party-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            oneensList.innerHTML += "<div id='party-dropdown" + i + "' class='party-container-dropdown'><p>" + party.explanation + "</p></div></div>";
        }
    }
}

// this function will hande the dropdown icon and information
function TogglePartyDropdown(i){
    var dropdownImg = document.getElementById('party-dropdown-image' + i);
    var partyStatement = document.getElementById('party-dropdown' + i);

    // if the dropdown icon is the default icon. If not, then change the icon into a cross and show the information
    if(dropdownImg.value == false){
        dropdownImg.src = "assets/img/icon-dropdown.svg";
        dropdownImg.value = true;
        partyStatement.style.display = "none";
    } else {
        dropdownImg.src = "assets/img/icon-cross.png";
        dropdownImg.value = false;
        partyStatement.style.display = "block";
    }
}

// this function will generate all topics in the priority page
function GenerateTopics(){
    priorityTopics.innerHTML = "";
    // loop through all question titles and statements
    for(var i = 0; i < subjects.length; i++){
        var topicTitle = subjects[i].title;
        var topicStatement = subjects[i].statement;

        // this will generate all titles and statements
        priorityTopics.innerHTML += "<img id='priority-checkbox-image" + i + "' value='false' class='priority-dropdown-image' src='assets/img/icon-checkbox.svg'><label id='priority-checkbox" + i + "' class='priority-topic-checkbox' for='"+ topicTitle +"' type='checkbox' value='false' onclick='IsPriorityTopic("+ i +");'><span class='priority-topics-listitem'>" + topicTitle + "<div id='priority-statement' tooltip='" + topicStatement + "'><span class='priority-questionmark'></span></div></span></label>";
    }
}

// this function will check whether you selected an important topic
function IsPriorityTopic(i){
    var priorityCheckbox = document.getElementById('priority-checkbox-image' + i);

    // if the topic is not important then change to unimportant topic, if not then make it an important topic
    if(priorityCheckbox.value == false){
        priorityCheckbox.src = "assets/img/icon-checkbox.svg";
        priorityCheckbox.value = true;
        document.getElementsByClassName('priority-topics-listitem')[i].style.color = "black";
        answers[i].priority = 0;
    } else {
        priorityCheckbox.src = "assets/img/icon-checkbox-checked.svg";
        priorityCheckbox.value = false;
        document.getElementsByClassName('priority-topics-listitem')[i].style.color = "#01B4DC";
        answers[i].priority = 2;
    }
}

// this function will disable the priority page and enable the parties page
function ShowParties(){
    priorityPage.style.display = "none";
    partiesPage.style.display = "block";
    console.log(answers);
    GenerateAllParties();
}

// this function will generate all parties at the last page before the result
function GenerateAllParties(){
    partiesTopics.innerHTML = "";

    // loop through all question titles and statements
    for(var i = 0; i < parties.length; i++){
        var partyTitle = parties[i].name;
        var partySeats = parties[i].size;

        // this will generate all titles and statements
        partiesTopics.innerHTML += "<img id='parties-checkbox-image" + i + "' value='false' class='parties-dropdown-image' src='assets/img/icon-checkbox.svg'><label id='parties-checkbox" + i + "' class='parties-topic-checkbox' for='"+ partyTitle +"' type='checkbox' value='false' onclick='IsPriorityParty("+ i +");'><span class='parties-topics-listitem'>" + partyTitle + " (" + partySeats + ")</span></label>";
    }
}

function SelectBigParties(){
    for(var i = 0; i < parties.length; i++){
        if(parties[i].size >= 14){
            partiesTopics.getElementsByTagName('img')[i].src = "assets/img/icon-checkbox-checked.svg";
            partiesTopics.getElementsByTagName('img')[i].value = "true";
            partiesTopics.getElementsByTagName('label')[i].value = "true";
            document.getElementsByClassName('parties-topics-listitem')[i].style.fontWeight = 'bold';
        } else {
            partiesTopics.getElementsByTagName('img')[i].src = "assets/img/icon-checkbox.svg";
            partiesTopics.getElementsByTagName('img')[i].value = "false";
            partiesTopics.getElementsByTagName('label')[i].value = "false";
            document.getElementsByClassName('parties-topics-listitem')[i].style.fontWeight = 'normal';
        }
    }
}

function ShowPriorityPage(){
    partiesPage.style.display = "none";
    priorityPage.style.display = "block";
    GenerateTopics();
    console.log(answers);
}

function IsPriorityParty(i){
    var partiesCheckbox = document.getElementById('parties-checkbox-image' + i);

    // if the topic is not important then change to unimportant topic, if not then make it an important topic
    if(partiesCheckbox.value == false){
        partiesCheckbox.src = "assets/img/icon-checkbox.svg";
        partiesCheckbox.value = true;
        document.getElementsByClassName('parties-topics-listitem')[i].style.fontWeight = 'normal';
    } else {
        partiesCheckbox.src = "assets/img/icon-checkbox-checked.svg";
        partiesCheckbox.value = false;
        document.getElementsByClassName('parties-topics-listitem')[i].style.fontWeight = 'bold';
    }
}
