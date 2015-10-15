// ! ! !
// Three Bugs


// var arrayAtticus = ["Atticus", "2405", "47000", 3];
// var arrayJem = ["Jem", "62347", "63500", 4];
// var arrayBoo = ["Boo", "11435", "54000", 3];
// var arrayScout = ["Scout", "6243", "74750", 5];

function employee(name, employeeNumber, baseSalary, reviewScore){
  this.employeeName = name;
  this.employeeNumber = employeeNumber;
  this.baseSalary = baseSalary;
  this.reviewScore = reviewScore;
  return this;
}

var atticus = new employee("Atticus", "2405", "47000", 3);
var jem = new employee("Jem", "62347", "63500", 4);
var boo = new employee("Boo", "11435", "54000", 3);
var scout = new employee("Scout", "6243", "74750", 5);

// var atticus = {
//   name: "Atticus",
//   employeeNumber: "2405",
//   baseSalary: "47000",
//   reviewScore: 3
// };
// var jem = {
//   name: "Jem",
//   employeeNumber: "62347",
//   baseSalary: "63500",
//   reviewScore: 4
// };
// var boo = {
//   name: "Boo",
//   employeeNumber: "11435",
//   baseSalary: "54000",
//   reviewScore: 3
// };
// var scout = {
//   name: "Scout",
//   employeeNumber: "6243",
//   baseSalary: "74750",
//   reviewScore: 5
// };

// console.log(atticus);

// var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];
var array = [atticus,jem,boo,scout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	array[i] = calculateSTI(array[i]);
  // console.log("this is the updated array", array[i])
 	newEl = document.createElement('li');
	// newText = document.createTextNode(array[i]);
  newText = document.createTextNode(array[i].employee + ", " + array[i].bonus + ", " + array[i].adjustedSalary + ", " + array[i].totalBonus);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(object){
  var newObject = {};

  // newArray[0] = array[0];
  newObject.employee = object.employeeName;

  var employeeNumber = object.employeeNumber;
  var baseSalary = object.baseSalary;
  var reviewScore = object.reviewScore;

  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  newObject.bonus = bonus;
  newObject.adjustedSalary = Math.round(baseSalary * (1.0 + bonus)); //Third bug found, bonus percentage is used to calculate total Bonus and adjusted Salary, but these values are not rounded to the nearest whole number. 
  newObject.totalBonus = Math.round(baseSalary * bonus);
  console.log(newObject.employee + " " + newObject.bonus + " " + newObject.adjustedSalary + " " + newObject.totalBonus);
  return newObject;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  // return basePercent - 1;
  return basePercent; //Second bug found, getBaseSTI returns basePercent-1 on line 67, this causese the value of the STI to be negative which causes miscalculations when determining total bonus and adjusted salary
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}