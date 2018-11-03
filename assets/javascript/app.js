
    var correctAnswers = 0;
    var timespan = "30:00";
    var seconds = 30;
    var timeinterval = 30;
    var numofQuestions = 5;
    var RightAnswer = 0;
    var quizOver = false;
    var ranNums = [];

    var TriaviaQuizz = [{
        subject: "Social Studies",
        question: "Who is the only person to become US Vice President and then president without being elected to either office. ",
        choices: ["Gerald Ford", "Lyndon B Johnson", "Jimmy Carter", "Donald Trump" ],
        validAnswer: 0
    }, {
        subject: "Social Studies",
        question:"Who was the ruling monarch of Great Britain during WWII?",
        choices: ["Queen Elizabeth", "King George VI", "Winston Churchill", "King Edward 8"],
        validAnswer: 1    
    }, {
        subject: "Social Studies",
        question:"Who founded the religion of Islam? ",
        choices: ["Zoroaster", "Archimedes", "Zeus", "Muhammad"],
        validAnswer: 3        
    }, {
        subject: "Social Studies",
        question:"In what year did World War II end? ",
        choices: ["1947", "1945", "1942", "1950"],
        validAnswer: 1        
    }, {
        subject: "Social Studies",
        question:"Ramses II was a King in what ancient civilization?",
        choices: ["China", "Macedonia", "Egypt", "Greece"],
        validAnswer: 2
    }, {
        subject: "Social Studies",
        question:"Who succeeded Abraham Lincoln as US President? ",
        choices: ["Andrew Johnson", "Jimmy Carter", "Gerald Ford", "Grorge Bush"],
        validAnswer: 0   
    }, {
        subject: "Social Studies",
        question:"Which Egyptian Queen was the wife of Roman General Mark Antony? ",
        choices: ["Maathorneferure", "Berenice IV of Egypt", "Arsinoe II", "Cleopatra"],
        validAnswer: 3
    }, {
        subject: "Social Studies",
        question:"The ancient city of Troy was located in what present-day country?    ",
        choices: ["Lebanon", "Greece", "Turkey", "Italy"],
        validAnswer: 2
    }, {
        subject: "Social Studies",
        question:"Which of the following historical periods happened most recently? ",
        choices: ["Stone age", "Iron age", "Bronze age", "Ice Age"],
        validAnswer: 1        
    }, {
        subject: "Social Studies",
        question:"What is the most populous Native American Indian tribe in the United States?  ",
        choices: ["Mohawk", "Cherokee", "Navajo", "Ponca"],
        validAnswer: 2
    }, {
        subject: "Social Studies",
        question:"Of the People, by the people and for the people is stated in which document?         ",
        choices: ["US Declaration of Independence", "Us Constitution", " Gettysburg Address", "Constitution"],
        validAnswer: 2
    }, {
        subject: "Social Studies",
        question:"Political leader and activist Mahatma Gandi was born in what country? ",
        choices: ["China", "India", "Pakistan", "South Africa"],
        validAnswer: 1        
    }, {
        subject: "Social Studies",
        question:"What current city was once known as Constantinople?  ",
        choices: ["Amman, Jordan", "Athens, Greece", "Istanbul, Turkey", "Rome, Italy"],
        validAnswer: 2
    }, {
        subject: "Social Studies",
        question:"The eagle on our national seal holds an olive branch in one claw and 13 of what in the other?  ",
        choices: ["Arrows", "Spears", "Stars", "Stamps"],
        validAnswer: 0
    }, {
        subject: "Social Studies",
        question:"How many justices serve on the US supreme court?",
        choices: ["3", "11", "7", "9"],
        validAnswer: 3
    }, {
        subject: "Social Studies",
        question:"How many US states border Texas?         ",
        choices: ["4", "9", "7", "2"],
        validAnswer: 0
    }, {
        subject: "Social Studies",
        question:"Presidency belongs to which branch of the United States Government?  ",
        choices: ["Executive", "Legislative", "Judicial", "Presidential"],
        validAnswer: 0
    }, {
        subject: "Social Studies",
        question:"Which US president is featured on the face of the nickel?  ",
        choices: ["Abraham Lincon", "George Washington", "George Bush", "Thomas Jefferson"],
        validAnswer: 3                             
    }];


function generateRandomArray()
{ 
         var j = 0;
         var cntr = 0;
         cntr = numofQuestions;

        for (x=0;x<cntr;x++)
        {
         j =  Math.floor(Math.random() * (TriaviaQuizz.length));
         if (ranNums.includes(j))
         {
            cntr = cntr +1;    
         }
         else
         {
             ranNums.push(j);
         }
        }
}

// Logic: We need to generate random non repeating questions each time.
// hence creating random non repeating array of question numbers.
// reading this question number array and then reading question for that index.

function LoadQuizz() {
    // this is page load - display questions here 
    // the TriaviaQuizz 
    generateRandomArray();

    for (cnt=0;cnt<ranNums.length;cnt++)
    {
    var i =  ranNums[cnt];
    var question = TriaviaQuizz[i].question;
    var questionClass = $(document).find(".QuizzForm > .question");
    var choiceList = $(document).find(".QuizzForm > .options");
    var numChoices = TriaviaQuizz[i].choices.length;
    // dynamically reading questiona nd creating card layout html and radio buttons for options
    var bigElement = $(
        `
        <div class="card bg-success Qclass">
            <div class="card-title question">${question}</div>
            <div class="card-body options">
                <div class="row"><br></div>
                <form id="radioForm">
                <label class="radio-inline"><input type="radio" name="optradio${i}" value="0">${TriaviaQuizz[i].choices[0]}</label>
                <label class="radio-inline"><input type="radio" name="optradio${i}" value="1">${TriaviaQuizz[i].choices[1]}</label>
                <label class="radio-inline"><input type="radio" name="optradio${i}" value="2">${TriaviaQuizz[i].choices[2]}</label>     
                <label class="radio-inline"><input type="radio" name="optradio${i}" value="3">${TriaviaQuizz[i].choices[3]}</label>            
                </form>
                <div class="row"><br></div>
            </div>              
        </div>
        `
        )
    $('#QuizzForm').append(bigElement);    
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    }
    $('#QuizzForm').append('<div class="row subbutton"><br></div><button id="send" type="button" disabled="true" class="btn btn-success">Am I ?? </button><div class="row"><br></div>');
    $('#TimerDisplay').html("Time: " + timespan);
}

function enableQuizz() {    
    $("#startQuizz").attr("disabled", true);
    $("#send").attr("disabled", false);
    $("input[type=radio]").attr('disabled', false);
}

function disableQuizz() {
    $("#startQuizz").attr("disabled", false);
    $("#send").attr("disabled", true);
    $("input[type=radio]").attr('disabled', true);
}

function verifyAnswers(){
    for (cnt=0;cnt<ranNums.length;cnt++)
    {
    var i =  ranNums[cnt];
        var validAnswer = TriaviaQuizz[i].validAnswer;
        var radioval = $(`input[name='optradio${i}']:checked`);
        var varAnswer = radioval.val();
        if (varAnswer == validAnswer)
        {
            RightAnswer++;
        }
    }
}

// once the game is over or timer is up - clear the display/view similar to reload page 
function resetQuizz() {
    seconds = timeinterval;
    RightAnswer = 0;
    ranNums = [];
    $('#TimerDisplay').html("Time: " + timespan);
    clearInterval(time);
    correctAnswers = 0;
    $(".Qclass").empty();
    $("#QuizzForm").empty();
    LoadQuizz();
    disableQuizz();
}

// display results
function ShowScore() {
    $(".ShowResults").addClass('glyphicon glyphicon-education');
    var nPercent = (100 * RightAnswer) / numofQuestions;
    if (nPercent < 80 )
    {
        $("#result").html(" Game Over! <br> Better Luck Next Time beating a 5th Grader! <br> You scored: " + RightAnswer + " out of: " + numofQuestions ); //+ "(" + nPercent + "%");
    }
    else
    {
        $("#result").html(" Game Over! <br> Wow! You are smarter than a 5th Grader! <br> You scored: " + RightAnswer + " out of: " + numofQuestions + " (" + nPercent + "%)");
    }
    //$("#result").html("Game Over! You scored: " + RightAnswer + " out of: " + numofQuestions);
    $("#result").show();
    $("#send").attr("disabled", true);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    //return false;
    resetQuizz();
}

// start quizz
$("#startQuizz").on("click" , function(event){
    $("#result").hide();
    enableQuizz();
    countdown();
});

// submit quizz - dynamically created button , needs .on method and triggered with document object. 
$(document).on('click','#send',function(){
    $("#send").attr("disabled", true);
    verifyAnswers();
	clearInterval(time);
	ShowScore();   
});


// timer countdown
function countdown(){
	$('#TimerDisplay').html('<h4>Time Remaining: ' + seconds + '</h4>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#TimerDisplay').html('<h4>Time Remaining: ' + seconds + '</h4>');
	if(seconds < 1){
        alert ("Time is Up!");
        verifyAnswers();
		clearInterval(time);
		ShowScore();
	}
}


$(document).ready(function() {

$("#result").hide();
LoadQuizz();
disableQuizz();

});