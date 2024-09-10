let treatedPatients = []; // مصفوفة المرضى المعالجين
let currentPatient = []; // مصفوفة المريض الحالي
let waitingPatients = []; // مصفوفى قائمة الانتظار

document.addEventListener('DOMContentLoaded', function() {
    loadPatients();
});

document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('patient-name').value;
    const phone = document.getElementById('patient-phone').value;
    const bloodType = document.getElementById('blood-type').value;
    const bookingType = document.getElementById('booking-type').value;
    const bookingDate = document.getElementById('booking-date').value;

    // Validate the input fields
    if (name === '' || phone === '' || bloodType === '' || bookingType === '' || bookingDate === '') {
        alert('Please fill out all the required fields.');
        return;
    }

    const patient = {
        name,
        phone,
        bloodType,
        bookingType,
        bookingDate,
        treated: false
    };

    addPatient(patient);
    document.getElementById('booking-form').reset(); // Reset the form fields
});
//اضافة مريض الى قائمة الانتظار
function addPatient(patient) {
    waitingPatients.push(patient); 
    loadPatients();
}

function loadPatients() {
    currentPatient = treatedPatients[0];
    waitingList = waitingPatients;

    // Display the current patient
    document.getElementById('current-patient').innerHTML = currentPatient ? `
        <tr>
            <td>${currentPatient.name}</td>
            <td>${currentPatient.phone}</td>
            <td>${currentPatient.bloodType}</td>
            <td>${currentPatient.bookingType}</td>
            <td>${currentPatient.bookingDate}</td>
        </tr>` : '<tr><td colspan="5">لا يوجد مريض  في الوقت الحالي</td></tr>';

    // Display the patients in the waiting list
    document.getElementById('waiting-list').innerHTML = waitingList.map((patient, index) => `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.phone}</td>
            <td>${patient.bloodType}</td>
            <td>${patient.bookingType}</td>
            <td>${patient.bookingDate}</td>
            <td>
                <button onclick="treatPatient(${index})" class="btn btn-success btn-sm">معالجة</button>
                <button onclick="removePatient(${index})" class="btn btn-danger btn-sm">إلغاء الحجز</button>
            </td>
        </tr>`).join('');

    // Display the treated patients
    document.getElementById('treated-list').innerHTML = treatedPatients.map(patient => `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.phone}</td>
            <td>${patient.bloodType}</td>
            <td>${patient.bookingType}</td>
            <td>${patient.bookingDate}</td>
        </tr>`).join('');
}
//تابع معالجة المريض
function treatPatient(index) {
    if (currentPatient) {
        treatedPatients.push(currentPatient);
    }

    treatedPatients.unshift(waitingPatients[index]);
    waitingPatients.splice(index, 1);
    loadPatients();
}
//تابع الغاء الحجز
function removePatient(index) {
    waitingPatients.splice(index, 1);
    loadPatients();
}
//تابع لازالة الكل
function clearTreatedPatients() {
    treatedPatients = [];
    loadPatients();
}
