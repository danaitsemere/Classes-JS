
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

const feature = new FeatureToggle("New Feature", false, ["admins"]);
if (feature.canAccess("admins")) console.log("Admin access"); else console.log("No admin access");
if (feature.canAccess("user")) console.log("User access"); else console.log("No user access");

function checkAccess(userRole) {
    switch (userRole) {
        case "admins":
            console.log(feature.canAccess(userRole) ? "Admin access" : "No admin access");
            break;
        case "user":
            console.log(feature.canAccess(userRole) ? "User access" : "No user access");
            break;
        default:
            console.log("Unknown role");
    }
}

checkAccess("admins");
checkAccess("user");

feature.toggleFeature(true);

console.log(feature.canAccess("admins") ? "Admin access after toggle" : "No admin access after toggle");



function TimeLog(freelancerName, projectDetails, logs) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails;
    this.logs = logs || [];
}

TimeLog.prototype.calculateTotalEarnings = function () {
    return this.logs.reduce((total, log) => total + log.hoursWorked * this.projectDetails.hourlyRate, 0);
};

TimeLog.prototype.filterLogsByDateRange = function (startDate, endDate) {
    return this.logs.filter(log => log.date >= startDate && log.date <= endDate);
};

TimeLog.prototype.exceedsWeeklyHours = function (dateToCheck) {
    const weekStart = new Date(dateToCheck);
    weekStart.setDate(dateToCheck.getDate() - dateToCheck.getDay()); // Start of the week (Sunday)

    let weeklyHours = 0;
    for (const log of this.logs) {
        const logDate = new Date(log.date);
        if (logDate >= weekStart && logDate <= dateToCheck) {
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
    { date: "2024-11-03", hoursWorked: 8 },
    { date: "2024-11-04", hoursWorked: 7 },
    { date: "2024-11-05", hoursWorked: 9 },
    { date: "2024-11-06", hoursWorked: 8 },
    { date: "2024-11-07", hoursWorked: 9 },
    { date: "2024-11-08", hoursWorked: 5 }
];

const timeLog = new TimeLog("Alice", project, logs);

console.log("Total Earnings:", timeLog.calculateTotalEarnings());
console.log("Logs in range:", timeLog.filterLogsByDateRange("2024-11-01", "2024-11-05"));
console.log("Exceeds 40 hours:", timeLog.exceedsWeeklyHours(new Date("2024-11-07")));


function Order(customer, items, status) {
    this.customer = customer;
    this.items = items;
    this.status = status;
}

Order.prototype.computeTotalCost = function () {
    return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
};

Order.prototype.updateOrderStatus = function (payment) {
    this.status = payment === "paid" ? "processing" : (payment === "refunded" ? "cancelled" : this.status);
};

Order.prototype.categorizeOrderUrgency = function () {
    switch (this.status) {
        case "pending": return "High";
        case "processing": return this.computeTotalCost() > 1000 ? "Medium" : "Low";
        default: return "Low";
    }
};


const order = new Order({ name: "A" }, [{ productName: "B", quantity: 1, unitPrice: 50 }], "pending");
console.log("Cost:", order.computeTotalCost());
console.log("Urgency:", order.categorizeOrderUrgency());
order.updateOrderStatus("paid");
console.log("New Urgency:", order.categorizeOrderUrgency());



function Employee(id, name, metrics, feedback) {
    this.id = id;
    this.name = name;
    this.performanceMetrics = metrics;
    this.feedback = feedback || [];
}

Employee.prototype.calculateAverageScore = function () {
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

Employee.prototype.classifyPerformanceLevel = function () {
    const avg = this.calculateAverageScore();
    if (avg >= 90) return "Excellent";
    else if (avg >= 70) return "Good";
    else return "Needs Improvement";
};

Employee.prototype.addFeedback = function (newFeedback, condition) {
    if (condition) {
        this.feedback.push(newFeedback);
    }
};

const emp = new Employee(1, "Alice", { communication: 95, efficiency: 85 }, ["Good job!"]);
console.log("Avg Score:", emp.calculateAverageScore());
console.log("Level:", emp.classifyPerformanceLevel());
emp.addFeedback("Improve punctuality", emp.classifyPerformanceLevel() === "Needs Improvement");
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

const course = new Course("JS Basics", { name: "John", expertise: "Web Dev" }, [
    { name: "Alice", completionStatus: "completed", expertise: "Web Dev" },
    { name: "Bob", completionStatus: "incomplete", expertise: "Data Science" },
    { name: "Charlie", completionStatus: "completed", expertise: "Web Dev" }
]);

console.log("Completed:", course.getCompletedStudentNames());
console.log("Web Dev Students:", course.countStudentsByExpertise("Web Dev"));
console.log("Instructor Message:", course.instructorMessage());

