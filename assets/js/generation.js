// this function will generate every party at the home page
function GenerateStartParties() {

    // put every party and its information in an array with objects
    var startParties = [{
    		"url" : "https://www.vvd.nl/",
            "img" : "assets/img/vvd.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.pvda.nl/",
            "img" : "assets/img/pvda.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.pvv.nl/",
            "img" : "assets/img/pvv.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.sp.nl/",
            "img" : "assets/img/sp.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.cda.nl/",
            "img" : "assets/img/cda.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.d66.nl/",
            "img" : "assets/img/d66.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.christenunie.nl/",
            "img" : "assets/img/christenunie.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.groenlinks.nl/",
            "img" : "assets/img/groenlinks.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.sgp.nl/",
            "img" : "assets/img/sgp.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.pvdd.nl/",
            "img" : "assets/img/pvdd.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.50pluspartij.nl/",
            "img" : "assets/img/50plus.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.ondernemerspartij.nl/",
            "img" : "assets/img/ondernemerspartij.png",
            "participation" : true
    	},
    	{
    		"url" : "https://www.vnl.nu/",
            "img" : "assets/img/vnl.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.bewegingdenk.nl/",
            "img" : "assets/img/denk.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.nieuwewegen.nu/",
            "img" : "assets/img/nieuwewegen.png",
            "participation" : true
    	},
    	{
    		"url" : "https://www.forumvoordemocratie.nl/",
            "img" : "assets/img/forumvoordemocratie.png",
            "participation" : true
    	},
    	{
    		"url" : "https://www.deburgerbeweging.nl/",
            "img" : "assets/img/burgerbeweging.png",
            "participation" : true
    	},
    	{
    		"url" : "https://www.vrijzinnigepartij.nl/",
            "img" : "assets/img/vrijzinnigepartij.png",
            "participation" : true
    	},
    	{
    		"url" : "https://www.piratenpartij.nl/",
            "img" : "assets/img/piratenpartij.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.artikel1.org/",
            "img" : "assets/img/artikel1.png",
            "participation" : true
    	},
    	{
    		"url" : "https://www.nietstemmers.nl/",
            "img" : "assets/img/nietstemmers.svg",
            "participation" : true
    	},
    	{
    		"url" : "https://www.stemlp.nl/",
            "img" : "assets/img/libertarischepartij.svg",
            "participation" : true
    	},
        {
    		"url" : "https://www.lokaalindekamer.nl/",
            "img" : "assets/img/lokaalindekamer.svg",
            "participation" : true
    	},
        {
    		"url" : "https://www.geenpeil.nl/",
            "img" : "assets/img/geenpeil.png",
            "participation" : false
    	},
        {
    		"url" : "https://www.jezusleeft.nl/",
            "img" : "assets/img/jezusleeft.png",
            "participation" : false
    	},
        {
    		"url" : "https://www.stemnl.nl/",
            "img" : "assets/img/stemnl.png",
            "participation" : false
    	},
        {
    		"url" : "https://sites.google.com/site/parasolpartijenstartpagina/",
            "img" : "assets/img/mensspirit.png",
            "participation" : false
    	},
        {
    		"url" : "https://www.deverkiezingswijzer.nl/",
            "img" : "assets/img/vdp.png",
            "participation" : false
    	}
    ];

    // get the two lists at the home page
    const eenvandaagTrue = document.getElementById('eenvandaag-party-true');
    const eenvandaagFalse = document.getElementById('eenvandaag-party-false');

    // clears the lists to make sure that the party circles won't duplicate
    eenvandaagTrue.innerHTML = "";
    eenvandaagFalse.innerHTML = "";

    // for every party in the list
    for (var i = 0; i < startParties.length; i++) {

        // if the participation value is equal to true, add them to the eenvandaagTrue list. If not, add them to the eenvandaagFalse list.
        if(startParties[i].participation == true) {
            eenvandaagTrue.innerHTML += "<a href='" + startParties[i].url + "' target='_blank'><div class='eenvandaag-party-circle'><img class='eenvandaag-party-image' src='" + startParties[i].img +"' alt='partijfoto'></div></a>";
        } else {
            eenvandaagFalse.innerHTML += "<a href='" + startParties[i].url + "' target='_blank'><div class='eenvandaag-party-circle'><img class='eenvandaag-party-image' src='" + startParties[i].img +"' alt='partijfoto'></div></a>";
        }
    }
}

// this function will generate all parties and their side
function GenerateParties(){

    // get all sides on the question page
    var eensList = document.getElementById('eens-list');
    var noneList = document.getElementById('none-list');
    var oneensList = document.getElementById('oneens-list');

    // clears all sides to make sure that the parties won't duplicate
    eensList.innerHTML = "";
    noneList.innerHTML = "";
    oneensList.innerHTML = "";

    // loop through all parties in the subjects list
    for(var i = 0; i < subjects[index].parties.length; i++){
        var party = subjects[index].parties[i];

        // if a party is for the current statement
        if(party.position == "pro"){
            eensList.innerHTML += "<div class='question-dropdown-container" + i + "' onclick='TogglePartyDropdown(" + i + ");'><p class='question-party-name'>" + party.name + "</p>";
            eensList.innerHTML += "<img id='question-dropdown-image" + i + "' value='false' class='question-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            eensList.innerHTML += "<div id='questionPartyDropdown" + i + "' class='question-container-dropdown'><p>" + party.explanation + "</p></div></div>";
        }

        // if a party is neutral the current statement
        if(party.position == "ambivalent"){
            noneList.innerHTML += "<div class='question-dropdown-container" + i + "' onclick='TogglePartyDropdown(" + i + ");'><p class='question-party-name'>" + party.name + "</p>";
            noneList.innerHTML += "<img id='question-dropdown-image" + i + "' value='false' class='question-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            noneList.innerHTML += "<div id='questionPartyDropdown" + i + "' class='question-container-dropdown'><p>" + party.explanation + "</p></div></div>";
        }

        // if a party is against the current statement
        if(party.position == "contra"){
            oneensList.innerHTML += "<div class='question-dropdown-container" + i + "' onclick='TogglePartyDropdown(" + i + ");'><p class='question-party-name'>" + party.name + "</p>";
            oneensList.innerHTML += "<img id='question-dropdown-image" + i + "' value='false' class='question-dropdown-image' src='assets/img/icon-dropdown.svg'>";
            oneensList.innerHTML += "<div id='questionPartyDropdown" + i + "' class='question-container-dropdown'><p>" + party.explanation + "</p></div></div>";
        }
    }
}


// this function will generate all topics in the priority page
function GenerateTopics(){

    // get all topics on the priority page
    var priorityTopic = document.getElementById('priority-statement');

    // clears priority topics to make sure that the priorities won't duplicate
    priorityTopic.innerHTML = "";

    // loop through all question titles and statements
    for(var i = 0; i < subjects.length; i++){
        var topicTitle = subjects[i].title;
        var topicStatement = subjects[i].statement;

        // this will generate all titles and statements
        priorityTopic.innerHTML += "";
    }
}
