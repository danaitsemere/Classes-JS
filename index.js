
function FeatureToggle(name, enabled, groups = []) {
    this.featureName = name;
    this.isEnabled = enabled;
    this.userGroupAccess = groups;
}

FeatureToggle.prototype.canAccess = function (userRole) {
    return this.isEnabled
        ? (this.userGroupAccess.length === 0 ? true : this.userGroupAccess.includes(userRole))
        : false;
};

FeatureToggle.prototype.toggleFeature = function (flag) {
    this.isEnabled = !!flag;
};

const feature = new FeatureToggle("Feature", false, ["admins"]);
if (feature.canAccess("betaTesters")) console.log("betaTesters access"); else console.log("No betaTester access");
if (feature.canAccess("admins")) console.log("admins access"); else console.log("No admin access");

function checkAccess(userRole) {
    switch (userRole) {
        case "betaTester":
            console.log(feature.canAccess(userRole) ? "betaTester access" : "No betaTester access");
            break;
        case "admins":
            console.log(feature.canAccess(userRole) ? "admin access" : "No admin access");
            break;
        default:
            console.log("Access in not known");
    }
}

checkAccess("betaTester");
checkAccess("admins");

feature.toggleFeature(true);

console.log(feature.canAccess("betaTesters") ? "betaTester access after toggle" : "No betaTester access after toggle");
console.log(feature.canAccess("admins") ? "Admin access after toggle" : "No admin access after toggle");



function TimeLog(freelancerName, projectDetails, logs) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails;
    this.logs = logs || [];
}

TimeLog.prototype.totalEarnings = function () {
    return this.logs.reduce((sum, log) => sum + log.hoursWorked * this.projectDetails.hourlyRate, 0);
};

TimeLog.prototype.datebyRange = function (firstDate, lastDate) {
    return this.logs.filter(log => log.date >= firstDate && log.date <= lastDate);
};

TimeLog.prototype.weekHours = function (checkDate) {
    const firstWeek = new Date(checkDate);
    firstWeek.setDate(checkDate.getDate() - checkDate.getDay()); 

    let weeklyHours = 0;
    for (const log of this.logs) {
        const logDate = new Date(log.date);
        if (logDate >= firstWeek && logDate <= checkDate) {
            weeklyHours += log.hoursWorked;
        }
    }

    if (weeklyHours > 40) {
        return true;
    } else {
        return false;
    }
};


const project = { name: "Web Dev", hourlyRate: 50 };
const logs = [
    { date: "2025-08-12", hoursWorked: 7 },
    { date: "2025-08-22", hoursWorked: 8 },
    { date: "2025-08-14", hoursWorked: 7 },
    { date: "2025-08-16", hoursWorked: 9 },
    { date: "2025-08-17", hoursWorked: 8 },
    { date: "2024-08-20", hoursWorked: 6 }
];

const timeLog = new TimeLog("Monica", project, logs);

console.log("Total Earnings Gained:", timeLog.totalEarnings());
console.log("Logs in date range:", timeLog.datebyRange("2025-08-12", "2025-08-20"));
console.log("Weekly hours exceeds 40 hours:", timeLog.weekHours(new Date("2025-08-16")));


function Order(customer, items, status) {
    this.customer = customer;
    this.items = items;
    this.status = status;
}

Order.prototype.totalCost = function () {
    return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
};

Order.prototype.orderStatus = function (payment) {
    this.status = payment === "order is paid" ? "order on processing" : (payment === "repaid" ? "order cancelled" : this.status);
};

Order.prototype.urgentOrder = function () {
    switch (this.status) {
        case "pending": return "High";
        case "processing": return this.totalCost() > 1000 ? "Medium" : "Low";
        default: return "Low";
    }
};


const order = new Order({ name: "Pizza" }, [{ productName: "Burger", quantity: 1, unitPrice: 50 }], "pending");
console.log("Total cost :", order.totalCost());
console.log("Urgency:", order.urgentOrder());
order.orderStatus("paid successfully");
console.log("Another Urgency:", order.urgentOrder());

function Employee(id, name, metrics, feedback) {
    this.id = id;
    this.name = name;
    this.performanceMetrics = metrics;
    this.feedback = feedback || [];
}

Employee.prototype.average = function () {
    let sum = 0;
    let count = 0;
    for (const metric in this.performanceMetrics) {
        if (this.performanceMetrics.hasOwnProperty(metric)) {
            sum += this.performanceMetrics[metric];
            count++;
        }
    }
    return count > 0 ? sum / count : 0;
};

Employee.prototype.levelOfPerformance = function () {
    const performanceAverage = this.average();
    if (performanceAverage >= 90) return "High performance";
    else if (performanceAverage >= 70) return "medium performance";
    else return "low perfromance";
};

Employee.prototype.additionalFeedback = function (newFeedback, condition) {
    if (condition) {
        this.feedback.push(newFeedback);
    }
};

const emp = new Employee(1, "Alice", { communication: 95, efficiency: 85 }, ["Good job!"]);
console.log("Avg Score:", emp.average());
console.log("Level:", emp.levelOfPerformance());
emp.additionalFeedback("Improve punctuality", emp.levelOfPerformance() === "Needs Improvement");
console.log("Feedback:", emp.feedback);



function Course(title, instructor, students) {
    this.title = title;
    this.instructor = instructor;
    this.students = students || [];
}

Course.prototype.getCompletedStudentNames = function () {
    return this.students.filter(student => student.completionStatus === "completed")
        .map(student => student.name);
};

Course.prototype.countStudentsByExpertise = function (expertise) {
    return this.students.filter(student => student.expertise === expertise).length;
};

Course.prototype.instructorMessage = function () {
    const studentCount = this.students.length;
    if (studentCount > 5) return "Great job, teaching many students!";
    else return "Keep growing your student base!";
};

const course = new Course("JS Basics", { name: "Jesica", expertise: "Web Dev" }, [
    { name: "Amir", completionStatus: "completed", expertise: "Web Dev" },
    { name: "Jackson", completionStatus: "incomplete", expertise: "Data Science" },
    { name: "Wantya", completionStatus: "completed", expertise: "Web Dev" }
]);

console.log("Completed:", course.getCompletedStudentNames());
console.log("Web Dev Students:", course.countStudentsByExpertise("Web Dev"));
console.log("Instructor Message:", course.instructorMessage());

