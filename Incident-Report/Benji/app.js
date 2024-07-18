const addReportBtn = document.getElementById('add-incident');
const addNewReport = document.getElementById('new-report');
const cancelReportBtn = document.getElementById('cancel-report');
const reportModal = document.getElementById('report-modal');
const incidentList = document.getElementById('incident-list');

//warning message
const warningMessage = () => {
    return `
        <div id="warning-msg" class="bg-white rounded p-5 shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg text-center hidden">
        Please enter all values to commit report 
        </div>
    `;
}
document.querySelector('body').innerHTML += warningMessage();

//clear all input function
const clearInputs = () => {
    const reportInputs = reportModal.querySelectorAll('input');
    
    reportInputs.forEach(rpt => rpt.value = '');
}

//check inlut values
const checkInputs = (e) => {
    console.log('Add New Report', e.target);
    const reportInputs = reportModal.querySelectorAll('input');
    
    reportInputs.forEach(rpt => {
        if (rpt.value !== '') {
        newReport();
        } else {
        const warningMsg = document.getElementById('warning-msg'); 
        warningMsg.classList.remove('hidden');
        setTimeout(() => {
            warningMsg.classList.add('hidden');
        },1200);
        }
    });
}

//creating incident card
const reportCard = (title, date, status, comment) => {
    
    return `
        <div class="bg-white p-6 rounded-md shadow-md">
            <p class="font-semibold text-xs mb-1">${date}</p>
            <h2 class="flex items-start sm:items-center font-bold text-lg">
            ${title}
            <span id="progress" class="rounded-md p-2 text-xs 
            ${status == 'RESOLVED' ? 'bg-green-600' : status == 'MONITORING' ? 'bg-yellow-600' : 'bg-red-600'} text-white ml-auto sm:ml-5">
                ${status}
            </span>

            </h2>
                
            <p class="text-sm text-gray-700 my-5">${comment}</p>
                
            <button class="view-full-report flex items-center gap-2 text-sm rounded-sm border border-neutral-800 bg-gray-100 px-3 py-1 hover:bg-gray-200">
                Full Report
                <i class="material-symbols-outlined text-lg text-gray-600">east</i>
            </button>
        </div>
    `;
}

//adding new report card
const newReport = () => {
    const reportTitle = document.getElementById('title').value;
    const reportDate = document.getElementById('date').value;
    const reportStatus = document.getElementById('status').value;
    const reportComment = document.getElementById('comment').value;
    
    incidentList.innerHTML += reportCard(reportTitle, reportDate, reportStatus, reportComment);
    reportModal.classList.add('hidden');
    clearInputs();
}

//open close report modal
addReportBtn.addEventListener('click', (e) => {
    console.log('Add New Incident', e.target);
    reportModal.classList.remove('hidden');
    
});

cancelReportBtn.addEventListener('click', () => {
    reportModal.classList.add('hidden');
    clearInputs();
});

addNewReport.addEventListener('click', checkInputs);
