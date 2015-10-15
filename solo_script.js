// ! ! !
// Three Bugs

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

// var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];
var array = [atticus,jem,boo,scout];


//Create variables used to write to the DOM
var newEl, newText, position;

//Capture the position of insertion into the DOM
position = document.getElementById('content');

// // Loop the array, extracting each array and writing information to the DOM
// // Note that the information is not 'clean'
// for(var i = 0; i < array.length; i++){
// 	array[i] = calculateSTI(array[i]);
//   // console.log("this is the updated array", array[i])
//  	newEl = document.createElement('li');
// 	// newText = document.createTextNode(array[i]);
//   newText = document.createTextNode(array[i].employee + ", " + array[i].bonus + ", " + array[i].adjustedSalary + ", " + array[i].totalBonus);
// 	newEl.appendChild(newText);
// 	position.appendChild(newEl);
// }

var automate =  {
  processEmployee: function (employee){
    employee = calculateSTI(employee);
    newEl = document.createElement('li');
    newText = document.createTextNode(employee.employeeName + ", " + employee.bonus + ", " + employee.adjustedSalary + ", " + employee.totalBonus);
    newEl.appendChild(newText);
    position.appendChild(newEl);
  }
};

for (employee in array){
  // console.log(array[employee]);
  automate.processEmployee(array[employee]);
}



function calculateSTI(object){
  var newObject = {};

  // newArray[0] = array[0];
  newObject.employeeName = object.employeeName;

  var employeeNumber = object.employeeNumber;
  var baseSalary = object.baseSalary;
  var reviewScore = object.reviewScore;

  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  newObject.bonus = bonus;
  newObject.adjustedSalary = Math.round(baseSalary * (1.0 + bonus)); 
  newObject.totalBonus = Math.round(baseSalary * bonus);
  console.log(newObject.employeeName + " " + newObject.bonus + " " + newObject.adjustedSalary + " " + newObject.totalBonus);
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
  return basePercent; 
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