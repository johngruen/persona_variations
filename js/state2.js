
//array to track current state of each box
//and check against valid states
var register = [0,0,0,0,0];

// holds array of indexes to be shown
var currentDisplayState = [0,0,0,0];

//jQuery object holding all show/hide divs;
var fields = $("#fields");
//array of first four boxes
var boxes = [];
// array to hold error states
var errors = [
	"You must have at least one option selected"
];


//HELPER PROTOTYPE FUNC FOR CHECKING MATCHES TO REGISTER
Array.prototype.compareLike = function(array) {
	for(var i = 0; i < this.length; i++) {
		if (this[i] !== array[i]) return false;
	}
	return true;
}


/*=====CHECKER OBJECT for 1st 4 boxes======*/
function Checker(state,checkbox,index) {
	this.state = state;
	this.name = checkbox;
	this.index = index;
	this.checkbox = document.getElementById(checkbox);
	this.parent = this.checkbox.parentNode;
	this.stateSettings();
	this.checkbox.addEventListener("click",this.bang.bind(this));
}

//RECORDS A CLICK AND (possibly) TOGGLES STATE
Checker.prototype.bang = function() {
	var specRegister = register;
	this.iCanHazToggle();

	register[this.index] = this.state;
	
	currentDisplayState = setDisplayState();
	showNewRegisterState();

	register[this.index] = this.state;
	this.stateSettings();
}

//Checks to see if this toggle is the last man standing
//if so disallows state change.
Checker.prototype.iCanHazToggle = function() {
	var canChange = false;
	if (this.checkbox.checked === false) {
		for (var i = 0; i < boxes.length;i++) {
			if (i === this.index) continue;
			else {
				if (register[i] === 1) {
					canChange = true;
					break;
				}
			}
		}
		if(canChange) this.state = 0;
		else this.state = 1;
	} else {
		this.state = 1;
	}
}

//HANDLES STATE SWITCHING
Checker.prototype.stateSettings = function () {
	if (this.state === 1) {
		this.checkbox.checked = true;
		this.parent.className+=" checked";
	} else {
		this.parent.className="checkbox";
	}
}

function setDisplayState() {
	for(var i = 0; i < validStates.length; i++) {
		if (validStates[i].stateSet.compareLike(register)) {
			return validStates[i].displays;
		}
	}
	return("something's gone wrong")
}

//FUNC TO INIT REGISTER
function initRegister() {
	for(var i = 0; i < boxes.length;i++) {
		register[i] = boxes[i].state;
	}
	currentDisplayState = setDisplayState();
	showNewRegisterState();
}

//SHOW NEW REGISTER STATE
function showNewRegisterState() {
	fields.find(">div>div").hide();
	for(var i = 0; i < 4 ; i++) {
		fields.find(">div:eq("+i+")>div:eq("+currentDisplayState[i]+")").fadeIn(100);
	}
}

//Fill up Boxes Array
boxes.push(new Checker(1,"persona",0));
boxes.push(new Checker(0,"traditional",1));
boxes.push(new Checker(0,"one_social",2));
boxes.push(new Checker(0,"mult_social",3));


initRegister();



