/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(rec){
    return {
        firstName: rec[0],
        familyName: rec[1],
        title: rec[2],
        payPerHour: rec[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRow){
    return employeeRow.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(startTime){
    let [date, hour] = startTime.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let createTimeOutEvent = function(endTime){
    let [date, hour] = endTime.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })
    return this
}

let hoursWorkedOnDate = function(dateSought){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === dateSought
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === dateSought
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour
    return rawWage
}

let findEmployeeByFirstName = function(collection, firstNameString){
    return collection.find(function(rec){
        return rec.firstName === firstNameString
    })
}


let calculatePayroll = function(empRec){
    return empRec.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)    
}