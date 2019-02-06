// all pages
const startPage = document.getElementById('startpage');
const questionPage = document.getElementById('questionpage');
const partyPage = document.getElementById('partypage');

// all buttons
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');

// all party sides
var eensList = document.getElementById('eensList');
var noneList = document.getElementById('noneList');
var oneensList = document.getElementById('oneensList');

// question title and information
var questionTopic = document.getElementById('question-container-topic');
var questionInformation = document.getElementById('question-container-information');

// the progression bar
var progressBar = document.getElementById('progressbar');

// shows current information
var index = 0;

// saves your answers
var answers = [];

// dropdown menu control
var partyIsOpen = false;

// this function will be called if you press the start button
function startQuestion(){
    // enables and disables the pages
    startPage.style.display = "none";
    questionPage.style.display = "block";

    // will set the progressbar to the correct percetage
    progressBar.style.width = (100 / subjects.length + 1) + "%";

    // resets the index to 0 and calls the showQuestion function
    index = 0;
    showQuestion();
}

// this function will display the current question title and information
function showQuestion(){
    questionTopic.innerHTML = (index + 1) + ". " + subjects[index]['title'];
    questionInformation.innerHTML = subjects[index]['statement'];
    generateParties();
}

// this function will sent the user choice
function nextQuestion(choice){
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
    progressbar.style.transition = "all 0.2s";
    index++;

    // if the user surpasses the last question. question page will disable and enables priority questions page. If not, then show question
    if(index >= subjects.length){
        questionPage.style.display = "none";
        console.log(answers);
    } else {
        showQuestion();
    }
}

// this function will show the previous question
function previousQuestion(){
    // decreases progressbar and index, and gives the progressbar a transition effect
    progressBar.style.width = (100 / subjects.length * index) + "%";
    progressbar.style.transition = "all 0.2s";
    index--;

    // if the user goes lower then the first question. question page will disable and enables start page. If not, then show question
    if(index < 0){
        startPage.style.display = "block";
        questionPage.style.display = "none";
    } else {
        showQuestion();
    }
}

// this function will toggle the parties dropdown
function toggleDropdown(){
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
function generateParties(){
    eensList.innerHTML = "";
    noneList.innerHTML = "";
    oneensList.innerHTML = "";

    // loop through all parties in the subjects list
    for(var i = 0; i < subjects[index].parties.length; i++){
        var party = subjects[index].parties;

        // if a party is for the current statement
        if(party[i].position == "pro"){
            eensList.innerHTML += "<div class='party-dropdown-container" + i + "' onclick='togglePartyDropdown(" + i + ");'><p class='party-container-partyname'>" + party[i].name + "</p>";
            eensList.innerHTML += "<img id='party-dropdown-image" + i + "' value='false' class='party-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            eensList.innerHTML += "<div id='party-dropdown" + i + "' class='party-container-dropdown'><p>" + party[i].explanation + "</p></div></div>";
        }

        // if a party is neutral the current statement
        if(party[i].position == "ambivalent"){
            noneList.innerHTML += "<div class='party-dropdown-container" + i + "' onclick='togglePartyDropdown(" + i + ");'><p class='party-container-partyname'>" + party[i].name + "</p>";
            noneList.innerHTML += "<img id='party-dropdown-image" + i + "' value='false' class='party-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            noneList.innerHTML += "<div id='party-dropdown" + i + "' class='party-container-dropdown'><p>" + party[i].explanation + "</p></div></div>";
        }

        // if a party is against the current statement
        if(party[i].position == "contra"){
            oneensList.innerHTML += "<div class='party-dropdown-container" + i + "' onclick='togglePartyDropdown(" + i + ");'><p class='party-container-partyname'>" + party[i].name + "</p>";
            oneensList.innerHTML += "<img id='party-dropdown-image" + i + "' value='false' class='party-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            oneensList.innerHTML += "<div id='party-dropdown" + i + "' class='party-container-dropdown'><p>" + party[i].explanation + "</p></div></div>";
        }
    }
}

// this function will hande the dropdown icon and information
function togglePartyDropdown(i){
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
