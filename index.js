// Your code here
function createEmployeeRecord(array)
{
  const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecord

}

function createEmployeeRecords(arrays)
{
  const records = [];
  arrays.map(employee => records.push(createEmployeeRecord(employee)))
  return records
}

function createTimeInEvent(employeeObj,dateTime){
  employeeObj.timeInEvents.push(
      {
        type: "TimeIn",
        hour: parseInt(dateTime.slice(11), 10),
        date: dateTime.slice(0, 10)
      }
    );  
  return employeeObj;  
}

function createTimeOutEvent(employeeObj,dateTime)
{
  employeeObj.timeOutEvents.push(
    {
      type: "TimeOut",
      hour: parseInt(dateTime.slice(11), 10),
      date: dateTime.slice(0, 10)
    }
   ); 
   return employeeObj;  
}

function hoursWorkedOnDate(employeeObj, date)
{
  for (let i = 0; i < employeeObj.timeInEvents.length; i++) 
  {
    if (date === employeeObj.timeInEvents[i].date) 
    {
      let arrivingTime= employeeObj.timeInEvents[i].hour;
      let departureTime = employeeObj.timeOutEvents[i].hour;
      let timeTaken = departureTime - arrivingTime;
      return timeTaken / 100;
    }
  }
}
 
 
function wagesEarnedOnDate(employeeObj, date)
{
  let wage = hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
  return wage;
}
 
 
function findEmployeeByFirstName(employeeObj, firstName)
{
  let matchArray= employeeObj.find((element)=>{
    return element.firstName === firstName;
    });
  return matchArray;
}
 
function allWagesFor(employeeObj)
{   
  let total = employeeObj.timeInEvents.reduce((accumulator, timeInElement) => {
    let total = wagesEarnedOnDate(employeeObj, timeInElement.date);
    return accumulator += total;
  }, 0)
  return total;
}

function calculatePayroll(employeeRecords)
{
  const reducer = (accumulator, employee) => {
    let totalWages = allWagesFor(employee);
    return accumulator += totalWages;
  }
  return employeeRecords.reduce(reducer, 0)
}