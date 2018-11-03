  // delete button - key issue & datatable ordering
  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyBe5tLLBwwBGHeUL8M2HjILwVsXXDATC2g",
    authDomain: "trainschedular-2f3cb.firebaseapp.com",
    databaseURL: "https://trainschedular-2f3cb.firebaseio.com",
    projectId: "trainschedular-2f3cb",
    storageBucket: "trainschedular-2f3cb.appspot.com",
    messagingSenderId: "795631186279"
  };
  firebase.initializeApp(config);

 var database = firebase.database();
 var txtDestination;
 
   
function initialize() {
  txtDestination = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('txtDestination')),
      { types: ['geocode'] });
  google.maps.event.addListener(txtDestination, 'place_changed', function() {
  });
}

$( "#txtDestination" ).keyup(function() {
  //alert( "Handler for .keyup() called." );
});
			
			
 function Timedropdown() {
		var j = 00;
    for (var i = 0; i <= 23; i++) {
		if (i<10)
		{ j = "0" + i;}
		else
		{ j = i}
			
        $("#dropdownMenu1").append("<option>" + j + "</option>");
    }
	    for (var i = 0; i <= 59; i++) {
		if (i<10)
		{ j = "0" + i;}
		else
		{ j = i}
        $("#dropdownMenu2").append("<option>" + j + "</option>");
    }
 }
 
 
  //  clear function
 function clearform()
 {
 $("#txtTrainName").val("");
 $("#txtDestination").val( "");
 $("#dropdownMenu1").val("00");
 $("#dropdownMenu2").val("00");
 $("#txtFreq").val("");
 } 
 
 
 
// on clear button 
 $("#btnClear").on("click", function(event) {
	 clearform();
});	 
  

  // on submit
$("#btnAddTrain").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

		
// read values from input form
var tName = $("#txtTrainName").val().trim();
var tDestination = $("#txtDestination").val().trim();
var tHH = $("#dropdownMenu1").val().trim();
var tMM = $("#dropdownMenu2").val().trim();
var tFrq = $("#txtFreq").val().trim();
var tTime = tHH + ":" + tMM;

	if(tName.trim().length == 0 )
	{
		alert ("Please enter Train Name.");
		return;
	}

	if(tDestination.trim().length == 0 )
	{
		alert ("Please enter destination.");
		return;
	}

	if (!moment(tTime, "HH:mm").isValid())
	{
		alert ("Please enter valid train time.");
		return;
	}
	
	var isnum = /^\d+$/.test(tFrq);
	if (!isnum)
	{
		alert ("Please enter valid frequency.");
		return;
	}


database.ref().push({ 
		tName: tName,
		tDestination: tDestination,
		tTime: tTime,
		tFrq: tFrq
}).then(function(){    
		// clear the form
		clearform();
}).catch(function(error) {
		alert("Data could not be saved." + error);
});

// end of submit button
});


	// read all from database to display
	// display data in the table
function TrainDisplay()
{
	// Task Requirement: Users from many different machines must be able to view same train times.
	// I interpreted this as using one standard time - UTC time.
	// but for ease of understanding - I have coded it with current time instead of UTC. 
	// UTC code commented for now but can be implemented if need be - 
	// var RightNow = moment.utc().format("HH:mm");
	// var TStartTime = moment.utc(ttTime, "HH:mm").format("HH:mm");

database.ref().on("child_added", function(childSnapshot) {

	var duration;
	var MinsAway;	
	var ttfrq = childSnapshot.val().tFrq ;
	var ttStartTime = childSnapshot.val().tTime;		
	var TStartTime = moment(ttStartTime, "HH:mm").format("HH:mm");
	var mTStartTime = new moment(TStartTime, "HH:mm");
	var RightNow = moment().format("HH:mm");
	var mRightNow = new moment(RightNow, "HH:mm");
	var ttnextArrival = TStartTime;
	var mttnextArrival = new moment(TStartTime, "HH:mm");
	var ttnextArrivalFull;
	
	//Logic: 
	//Consider RightNow time in HH:mm & TrainTime as entered by user in HH:mm in 24 hour format
	// Case 1:
	// 		If TrainTime > RightNow -> the train is scheduled for later/future, hence no need to add interval. 
	// 		minsAway = TrainTime - RightNow & NextArrival = TrainTime
	// Case 2:
	// 		If TrainTime < RightNow -> The startitme has passed, so we need to consider interval/frequency
	// 		but if frequency is 00 - means that the train has already passed for today an no more trains today
	// 		minsAway = 'No train today' & NextArrival = TrainTime
	// 		or if frequency > 1440 (24*60) - Today's train has paased and the frequency is more than 24 hours, or train is not within a day 
	// 		minsAway = 'No train today' & NextArrival = date by adding frequency to TrainTime & TrainTime
	// 		Generic case: TrainTime has passed but add frequency to it until RightNow  < TrainArrival Time
	//		minsAway = TrainArrivalTime - RightNow & NextArrival = (TrainTime + multiple necessary frequencies)
							
	$("#currentTime").text(RightNow);
		
	if (TStartTime >= RightNow)
	{
		// case 1 TrainTime >= RightNow
		duration = moment.duration(mTStartTime.diff(mRightNow));
		MinsAway = duration.asMinutes();
		ttnextArrivalFull = TStartTime;
	}
	else
	{
		// case 2 TrainTime < RightNow 
		if (parseInt(ttfrq) == 0 ) 
		{
			//train has already passed for today an no more trains today
			MinsAway = 'No train today';
			ttnextArrival = TStartTime;		
	        ttnextArrival = mTStartTime.add(parseInt(ttfrq), 'm'); 	
	        ttnextArrivalFull = ttnextArrival.format(); 		
		}
		else if (parseInt(ttfrq) > 1440 ) 
		{
			//Today's train has passed and the frequency is more than 24 hours, train is not within a day
			MinsAway = 'No train today';
			ttnextArrival = TStartTime;		
	        ttnextArrival = mTStartTime.add(parseInt(ttfrq), 'm'); 	
	        ttnextArrivalFull = ttnextArrival.format(); 		
		}
		else 
		{
			console.log("RightNow:" + RightNow);
			console.log("ttnextArrival:" + ttnextArrival);
			
				while(RightNow >=  ttnextArrival)
				{
					mttnextArrival = mttnextArrival.add(parseInt(ttfrq), 'm');	
					ttnextArrival = moment(mttnextArrival, "HH:mm").format("HH:mm");
					ttnextArrivalFull = ttnextArrival;
				}
				duration = moment.duration(mttnextArrival.diff(mRightNow));
				MinsAway = duration.asMinutes();
		}
	}

	//add a button to delete a train set and then read key as primary key
		
	var newRow = $(`
                <tr>
                  <td >${childSnapshot.val().tName}</td>
                  <td >${childSnapshot.val().tDestination}</td>				 				 
                  <td >${childSnapshot.val().tFrq }</td>
                  <td >${ttnextArrivalFull}</td>
                  <td >${MinsAway}</td>
				  <td ><button type="button" class="btn btn-default navbar-btn btnDeleteTrain" data=${childSnapshot.val().key}>Delete</button></td>				  
				</tr>	
	`);
	//console.log (newRow);
	
	
  // full list of items to the table
  $("#ttBody").append(newRow);

	
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

}

// on delete button 
 $("btnDeleteTrain").on("click", function(event) {
database.ref().on("child_added", function(childSnapshot) {
	alert ("delete pressed" + this.data.val());
});
});	 


$(document).ready(function () {
  $('#trainTable').DataTable({
   // "pagingType": "simple", // "simple" option for 'Previous' and 'Next' buttons only
    "paging": false ,
	"searching": false ,// false to disable search (or any other option)
	"scrollY": "50vh",
    "scrollCollapse": true,
	"info":false,	
	"oLanguage": {"sZeroRecords": "", "sEmptyTable": ""},
	"autoWidth":true,
	"ordering":true,
	"order": [[ 0, 'asc' ]]
  });
  $('.dataTables_length').addClass('bs-select');
  
   // basic on load 
 Timedropdown();
 TrainDisplay();
 
 setTimeout(function(){
   window.location.reload(1);
}, 60000);
  
});

