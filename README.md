# TrainSchedular
ASSIGNMENT 07 - FireBase - Create a train schedule application that incorporates Firebase to host arrival and departure data.

Submitted On: 11/04/2018

Technologies: HTML. CSS, Bootstrap, jQuery, javascrpt, firebase, datatable, googleAPI

This is assignment 07: https://unc.bootcampcontent.com/UNC-Coding-Boot-Camp/UNCHILL201808FSF3/blob/master/homework/07-firebase/Homework_Train_Activity_Basic.md

Inputs/Files: index.html, README.md 
Css folder: main.css,  uses bootstrap.css with web link
javascript folder:  js files, datatable.js relevant files

Outputs: Train Schedular/ Bulletin page

Features:
----------
* Used Google API to autoprompt use for destinations
* Added data validations using regular expression.
* considered the reality that there could be one train a day or or week, or daily with multiple freqency and scoped the bulletin accordingly.


Notes & Limitations:
--------------------
* The page refresh function has been reloading the page every minute. 
The drawback is, user may lose train data if they are entering one.
Correction could be to refresh only the train bulleting panel every minute. 
$('#thisdiv').load(document.URL +  ' #thisdiv');
Due to constraint of time & error due to CORS policy, I am limiting the scope. 
  
* Tried using datatables for pagination, sorting and search but not to its fullest extent.
  
Future Scope:
-------------
Planning to add a delay input in case a train is delayed due to unforeseen conditions.
Also need a location (Platform numer) where the train is arriving and the a day/date of start.

Extensive use of datatables to search or sort trains by each column.


Logic:
-------
Consider RightNow time in HH:mm & TrainTime as entered by user in HH:mm in 24 hour format
	 Case 1:
	 		If TrainTime > RightNow -> the train is scheduled for later/future, hence no need to add interval. 
	 		minsAway = TrainTime - RightNow & NextArrival = TrainTime
	 Case 2:
	 		If TrainTime < RightNow -> The startitme has passed, so we need to consider interval/frequency
	 		but if frequency is 00 - means that the train has already passed for today an no more trains today
	 		minsAway = 'No train today' & NextArrival = TrainTime
	 		or if frequency > 1440 (24*60) - Today's train has paased and the frequency is more than 24 hours, or train is not within a day 
	 		minsAway = 'No train today' & NextArrival = date by adding frequency to TrainTime & TrainTime
	 		Generic case: TrainTime has passed but add frequency to it until RightNow  < TrainArrival Time
			minsAway = TrainArrivalTime - RightNow & NextArrival = (TrainTime + multiple necessary frequencies)
	
Run Instructions:
--------------
To run localy:

1) Clone or download this git repository.
2) Run index.html in your web browser. 
3) Use Add train panel to enter inputs or review existing train bulletin.
4) Delete a train.
