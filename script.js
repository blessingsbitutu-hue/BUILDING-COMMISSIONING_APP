function calculateProgress() {

    const total = Number(
        document.getElementById("totalTasks").value
    );

    const completed = Number(
        document.getElementById("completedTasks").value
    );

    if (total <= 0 || completed > total || completed < 0) {
        alert("Please enter valid task numbers.");
        return;
    }

    const progress = (completed / total) * 100;

    document.getElementById("progressResult").textContent =
        progress.toFixed(1) + "%";

    document.getElementById("dashboardProgress").textContent =
        progress.toFixed(1) + "%";

    document.getElementById("progressBar").style.width =
        progress + "%";

}let inspectionCount = 0;
let passedCount = 0;

function addInspection() {

    const activity = document.getElementById("inspectionActivity").value.trim();

    const system = document.getElementById("inspectionSystem").value;

    const result = document.getElementById("inspectionResult").value;

    if (!activity || !system || !result) {
        alert("Please complete all inspection fields.");
        return;
    }

    inspectionCount++;

    if (result === "Pass") {
        passedCount++;
    }

    const table = document.getElementById("inspectionRecords");

    const row = table.insertRow();

    row.innerHTML = `
        <td>${inspectionCount}</td>
        <td></td>
        <td></td>
        <td></td>
    `;

    row.cells[1].textContent = activity;
    row.cells[2].textContent = system;
    row.cells[3].textContent = result;

if (result === "Pass") {
    row.cells[3].style.color = "#15803d";
    row.cells[3].style.fontWeight = "bold";
}

if (result === "Fail") {
    row.cells[3].style.color = "#dc2626";
    row.cells[3].style.fontWeight = "bold";
}

if (result === "Pending") {
    row.cells[3].style.color = "#d97706";
    row.cells[3].style.fontWeight = "bold";
}
    saveTableData("inspectionRecords", "savedInspections");

    document.getElementById("totalInspections").textContent =
        inspectionCount;

    document.getElementById("passedInspections").textContent =
        passedCount;

    document.getElementById("inspectionActivity").value = "";
    document.getElementById("inspectionSystem").value = "";
    document.getElementById("inspectionResult").value = "";
}let defectCount = 0;

function addDefect() {

    const ref = document.getElementById("defectRef").value.trim();
    const system = document.getElementById("defectSystem").value;
    const description = document.getElementById("defectDescription").value.trim();
    const location = document.getElementById("defectLocation").value.trim();
    const severity = document.getElementById("defectSeverity").value;
    const contractor = document.getElementById("defectContractor").value.trim();
    const status = document.getElementById("defectStatus").value;

    if (!ref || !system || !description || !location || !severity || !contractor) {
        alert("Please complete all required defect fields.");
        return;
    }

    const table = document.getElementById("defectRecords");

    const row = table.insertRow();

    [ref, system, description, location, severity, contractor, status]
        .forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
        const severityCell = row.cells[4];

if (severity === "Critical") {
    severityCell.style.color = "#dc2626";
}

if (severity === "Major") {
    severityCell.style.color = "#ea580c";
}

if (severity === "Minor") {
    severityCell.style.color = "#15803d";
}

severityCell.style.fontWeight = "bold";

    defectCount++;

    updateDefectDashboard();

    document.getElementById("defectRef").value = "";
    document.getElementById("defectSystem").value = "";
    document.getElementById("defectDescription").value = "";
    document.getElementById("defectLocation").value = "";
    document.getElementById("defectSeverity").value = "";
    document.getElementById("defectContractor").value = "";
    document.getElementById("defectStatus").value = "Open";

}

function updateDefectDashboard() {

    const rows = document.querySelectorAll("#defectRecords tr");

    let outstanding = 0;

    rows.forEach(row => {
        const status = row.cells[6].textContent;

        if (status !== "Closed") {
            outstanding++;
        }
    });

    document.getElementById("outstandingDefects").textContent =
        outstanding;
}function addCorrectiveAction() {

    const ref = document.getElementById("actionRef").value.trim();
    const measure = document.getElementById("correctiveMeasure").value.trim();
    const contractor = document.getElementById("actionContractor").value.trim();
    const date = document.getElementById("targetDate").value;
    const officer = document.getElementById("verificationOfficer").value.trim();
    const verification = document.getElementById("verificationResult").value;
    const status = document.getElementById("actionStatus").value;

    if (!ref || !measure || !contractor || !date || !officer || !verification) {
        alert("Please complete all corrective action fields.");
        return;
    }

    if (status === "Closed" && verification !== "Accepted") {
        alert("A corrective action can only be closed after successful verification.");
        return;
    }

    const table = document.getElementById("actionRecords");
    const row = table.insertRow();

    [ref, measure, contractor, date, officer, verification, status]
        .forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });const severityCell = row.cells[4];

if (severity === "Critical") {
    severityCell.style.color = "#dc2626";
}

if (severity === "Major") {
    severityCell.style.color = "#ea580c";
}

if (severity === "Minor") {
    severityCell.style.color = "#15803d";
}

severityCell.style.fontWeight = "bold";

    document.getElementById("actionRef").value = "";
    document.getElementById("correctiveMeasure").value = "";
    document.getElementById("actionContractor").value = "";
    document.getElementById("targetDate").value = "";
    document.getElementById("verificationOfficer").value = "";
    document.getElementById("verificationResult").value = "";
    document.getElementById("actionStatus").value = "Open";

    alert("Corrective action recorded successfully.");
}function addDocument() {

    const name = document.getElementById("documentName").value.trim();
    const ref = document.getElementById("documentRef").value.trim();
    const category = document.getElementById("documentCategory").value;
    const date = document.getElementById("documentDate").value;
    const officer = document.getElementById("documentOfficer").value.trim();
    const status = document.getElementById("documentStatus").value;
    const remarks = document.getElementById("documentRemarks").value.trim();

    if (!name || !ref || !category || !date || !officer || !status) {
        alert("Please complete all required document fields.");
        return;
    }

    const table = document.getElementById("documentRecords");
    const row = table.insertRow();

    [name, ref, category, date, officer, status, remarks]
        .forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

    document.getElementById("documentName").value = "";
    document.getElementById("documentRef").value = "";
    document.getElementById("documentCategory").value = "";
    document.getElementById("documentDate").value = "";
    document.getElementById("documentOfficer").value = "";
    document.getElementById("documentStatus").value = "";
    document.getElementById("documentRemarks").value = "";

    alert("Document record added successfully.");
}function saveRecommendations() {

    const outstanding = document.getElementById("outstandingRequirements").value.trim();
    const technical = document.getElementById("technicalRecommendations").value.trim();
    const maintenance = document.getElementById("maintenanceRecommendations").value.trim();
    const safety = document.getElementById("safetyRecommendations").value.trim();
    const handover = document.getElementById("handoverRecommendation").value;
    const officer = document.getElementById("preparedBy").value.trim();
    const date = document.getElementById("assessmentDate").value;

    if (!handover || !officer || !date) {
        alert("Please complete the handover recommendation, officer and assessment date.");
        return;
    }

    const results = document.getElementById("recommendationResults");

    results.innerHTML = "";

    const heading = document.createElement("h4");
    heading.textContent = "COMMISSIONING ASSESSMENT";
    results.appendChild(heading);

    const entries = [
        ["Outstanding Requirements", outstanding],
        ["Technical Recommendations", technical],
        ["Maintenance Recommendations", maintenance],
        ["Safety Recommendations", safety],
        ["Handover Recommendation", handover],
        ["Prepared By", officer],
        ["Assessment Date", date]
    ];

    entries.forEach(([label, value]) => {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = label + ": ";
        paragraph.appendChild(strong);
        paragraph.appendChild(document.createTextNode(value || "None recorded"));

        results.appendChild(paragraph);
    });

    alert("Commissioning recommendations saved successfully.");
}// PERMANENT BROWSER DATA STORAGE

function saveTableData(tableId, storageKey) {

    const table = document.getElementById(tableId);

    const records = [];

    table.querySelectorAll("tr").forEach(row => {

        const values = Array.from(row.cells).map(
            cell => cell.textContent
        );

        records.push(values);

    });

    localStorage.setItem(storageKey, JSON.stringify(records));

}

function loadTableData(tableId, storageKey) {

    const table = document.getElementById(tableId);

    const savedRecords = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
    );

    table.innerHTML = "";

    savedRecords.forEach(record => {

        const row = table.insertRow();

        record.forEach(value => {

            const cell = row.insertCell();

            cell.textContent = value;

        });

    });

}window.addEventListener("DOMContentLoaded", function() {

    loadTableData("inspectionRecords", "savedInspections");

    const rows = document.querySelectorAll("#inspectionRecords tr");

    inspectionCount = rows.length;

    passedCount = 0;

    rows.forEach(row => {
        if (row.cells[3].textContent === "Pass") {
            passedCount++;
        }
    });

    document.getElementById("totalInspections").textContent =
        inspectionCount;

    document.getElementById("passedInspections").textContent =
        passedCount;

});function generateReport() {

    const projectSections = [
        "dashboard",
        "profile",
        "brief",
        "services",
        "testing",
        "defects",
        "documents",
        "actions",
        "recommendations"
    ];

    const originalSections = [];

    projectSections.forEach(id => {

        const section = document.getElementById(id);

        if (section) {
            originalSections.push({
                element: section,
                display: section.style.display
            });

            section.style.display = "block";
        }

    });

    window.print();

    originalSections.forEach(item => {
        item.element.style.display = item.display;
    });

}function updateCoverPage() {

    const project = document.getElementById("projectName").value;
    const client = document.getElementById("projectClient").value;
    const location = document.getElementById("projectLocation").value;
    const reference = document.getElementById("projectReference").value;
    const date = document.getElementById("projectReportDate").value;
    const officer = document.getElementById("preparedBy").value;

    document.getElementById("coverProjectName").textContent =
        project || "PROJECT NAME";

    document.getElementById("coverClient").textContent =
        client || "Not Provided";

    document.getElementById("coverLocation").textContent =
        location || "Not Provided";

    document.getElementById("coverReference").textContent =
        reference || "BCR-001";

    document.getElementById("coverDate").textContent =
        date || "Not Provided";

    document.getElementById("coverPreparedBy").textContent =
        officer || "Not Provided";

    alert("Report cover updated successfully.");
}