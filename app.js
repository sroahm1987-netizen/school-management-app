// بيانات التطبيق
let students = JSON.parse(localStorage.getItem('students')) || [];
let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
let grades = JSON.parse(localStorage.getItem('grades')) || [];
let attendance = JSON.parse(localStorage.getItem('attendance')) || [];

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // تعيين اليوم الحالي للحضور
    const today = new Date().toISOString().split('T')[0];
    const attendanceDateInput = document.getElementById('attendanceDate');
    if (attendanceDateInput) {
        attendanceDateInput.value = today;
    }
    
    // تحديث الإحصائيات
    updateStats();
    displayStudents();
    displayTeachers();
    displayGrades();
    displayAttendance();
    updateStudentSelects();
    
    // عرض القسم الرئيسي بشكل افتراضي
    showSection('home');
});

// إظهار القسم المختار
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // عرض القسم المختار
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // تحديث البيانات عند فتح القسم
    if (sectionId === 'students') {
        displayStudents();
    } else if (sectionId === 'teachers') {
        displayTeachers();
    } else if (sectionId === 'grades') {
        displayGrades();
    } else if (sectionId === 'attendance') {
        displayAttendance();
    } else if (sectionId === 'classes') {
        updateClassStats();
    }
}

// تحديث الإحصائيات
function updateStats() {
    document.getElementById('total-students').textContent = students.length;
    document.getElementById('total-teachers').textContent = teachers.length;
    updateClassStats();
}

// تحديث إحصائيات الفصول
function updateClassStats() {
    for (let i = 1; i <= 6; i++) {
        const classStudents = students.filter(s => s.class == i).length;
        const element = document.getElementById(`students-${i}`);
        if (element) {
            element.textContent = classStudents;
        }
    }
}

// ===== إدارة الطلاب =====

function addStudent(event) {
    event.preventDefault();
    
    const student = {
        id: Date.now(),
        name: document.getElementById('studentName').value,
        studentID: document.getElementById('studentID').value,
        class: document.getElementById('studentClass').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        date: new Date().toLocaleDateString('ar-EG')
    };
    
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    
    showAlert('تم إضافة الطالب بنجاح!', 'success');
    document.getElementById('studentForm').reset();
    displayStudents();
    updateStats();
    updateStudentSelects();
}

function displayStudents() {
    const tbody = document.getElementById('studentsList');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentID}</td>
            <td>الصف ${student.class} الابتدائي</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteStudent(${student.id})">حذف</button>
                <button class="btn btn-secondary" onclick="editStudent(${student.id})">تعديل</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteStudent(id) {
    if (confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
        students = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        updateStats();
        showAlert('تم حذف الطالب بنجاح!', 'success');
    }
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('studentClass').value = student.class;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        
        deleteStudent(id);
    }
}

function showStudentsByClass(classNum) {
    showSection('students');
    // تصفية الطلاب من نفس الفصل
    const classStudents = students.filter(s => s.class == classNum);
    const tbody = document.getElementById('studentsList');
    tbody.innerHTML = '';
    
    classStudents.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentID}</td>
            <td>الصف ${student.class} الابتدائي</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteStudent(${student.id})">حذف</button>
                <button class="btn btn-secondary" onclick="editStudent(${student.id})">تعديل</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ===== إدارة المعلمين =====

function addTeacher(event) {
    event.preventDefault();
    
    const classesSelect = document.getElementById('teacherClass');
    const selectedClasses = Array.from(classesSelect.selectedOptions).map(opt => opt.value).join(', ');
    
    const teacher = {
        id: Date.now(),
        name: document.getElementById('teacherName').value,
        specialty: document.getElementById('teacherSpecialty').value,
        email: document.getElementById('teacherEmail').value,
        phone: document.getElementById('teacherPhone').value,
        classes: selectedClasses,
        date: new Date().toLocaleDateString('ar-EG')
    };
    
    teachers.push(teacher);
    localStorage.setItem('teachers', JSON.stringify(teachers));
    
    showAlert('تم إضافة المعلم بنجاح!', 'success');
    document.getElementById('teacherForm').reset();
    displayTeachers();
    updateStats();
}

function displayTeachers() {
    const tbody = document.getElementById('teachersList');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    teachers.forEach(teacher => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${teacher.name}</td>
            <td>${teacher.specialty}</td>
            <td>${teacher.email}</td>
            <td>${teacher.phone}</td>
            <td>${teacher.classes}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteTeacher(${teacher.id})">حذف</button>
                <button class="btn btn-secondary" onclick="editTeacher(${teacher.id})">تعديل</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteTeacher(id) {
    if (confirm('هل أنت متأكد من حذف هذا المعلم؟')) {
        teachers = teachers.filter(t => t.id !== id);
        localStorage.setItem('teachers', JSON.stringify(teachers));
        displayTeachers();
        updateStats();
        showAlert('تم حذف المعلم بنجاح!', 'success');
    }
}

function editTeacher(id) {
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherSpecialty').value = teacher.specialty;
        document.getElementById('teacherEmail').value = teacher.email;
        document.getElementById('teacherPhone').value = teacher.phone;
        
        deleteTeacher(id);
    }
}

// ===== إدارة الدرجات =====

function addGrade(event) {
    event.preventDefault();
    
    const grade = {
        id: Date.now(),
        studentID: document.getElementById('gradeStudent').value,
        course: document.getElementById('gradeCourse').value,
        value: document.getElementById('gradeValue').value,
        type: document.getElementById('gradeType').value,
        date: new Date().toLocaleDateString('ar-EG'),
        time: new Date().toLocaleTimeString('ar-EG')
    };
    
    grades.push(grade);
    localStorage.setItem('grades', JSON.stringify(grades));
    
    showAlert('تم تسجيل الدرجة بنجاح!', 'success');
    document.getElementById('gradeForm').reset();
    displayGrades();
}

function displayGrades() {
    const tbody = document.getElementById('gradesList');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    grades.forEach(grade => {
        const student = students.find(s => s.id == grade.studentID);
        const studentName = student ? student.name : 'طالب محذوف';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${studentName}</td>
            <td>${grade.course}</td>
            <td>${grade.value}</td>
            <td>${grade.type}</td>
            <td>${grade.date}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteGrade(${grade.id})">حذف</button>
                <button class="btn btn-secondary" onclick="editGrade(${grade.id})">تعديل</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteGrade(id) {
    if (confirm('هل أنت متأكد من حذف هذه الدرجة؟')) {
        grades = grades.filter(g => g.id !== id);
        localStorage.setItem('grades', JSON.stringify(grades));
        displayGrades();
        showAlert('تم حذف الدرجة بنجاح!', 'success');
    }
}

function editGrade(id) {
    const grade = grades.find(g => g.id === id);
    if (grade) {
        document.getElementById('gradeStudent').value = grade.studentID;
        document.getElementById('gradeCourse').value = grade.course;
        document.getElementById('gradeValue').value = grade.value;
        document.getElementById('gradeType').value = grade.type;
        
        deleteGrade(id);
    }
}

function updateStudentSelects() {
    const gradeSelect = document.getElementById('gradeStudent');
    if (gradeSelect) {
        gradeSelect.innerHTML = '<option value="">اختر الطالب</option>';
        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = `${student.name} (الصف ${student.class})`;
            gradeSelect.appendChild(option);
        });
    }
}

// ===== إدارة الحضور =====

function loadClassStudents() {
    const classSelect = document.getElementById('attendanceClass');
    const classNum = classSelect.value;
    
    if (!classNum) return;
    
    const classStudents = students.filter(s => s.class == classNum);
    const listContainer = document.getElementById('classStudentsList');
    listContainer.innerHTML = '';
    
    classStudents.forEach(student => {
        const div = document.createElement('div');
        div.className = 'attendance-item';
        div.innerHTML = `
            <input type="checkbox" id="student-${student.id}" value="${student.id}">
            <label for="student-${student.id}">${student.name}</label>
        `;
        listContainer.appendChild(div);
    });
}

function recordAttendance(event) {
    event.preventDefault();
    
    const classNum = document.getElementById('attendanceClass').value;
    const date = document.getElementById('attendanceDate').value;
    const checkboxes = document.querySelectorAll('#classStudentsList input[type="checkbox"]:checked');
    
    if (classNum && date && checkboxes.length > 0) {
        checkboxes.forEach(checkbox => {
            const attendanceRecord = {
                id: Date.now() + Math.random(),
                studentID: checkbox.value,
                class: classNum,
                date: date,
                status: 'حاضر'
            };
            
            attendance.push(attendanceRecord);
        });
        
        localStorage.setItem('attendance', JSON.stringify(attendance));
        showAlert('تم تسجيل الحضور بنجاح!', 'success');
        document.getElementById('attendanceForm').reset();
        displayAttendance();
    } else {
        showAlert('الرجاء اختيار فصل وتاريخ والطلاب الحاضرين', 'warning');
    }
}

function displayAttendance() {
    const tbody = document.getElementById('attendanceList');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    attendance.forEach(record => {
        const student = students.find(s => s.id == record.studentID);
        const studentName = student ? student.name : 'طالب محذوف';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${studentName}</td>
            <td>الصف ${record.class} الابتدائي</td>
            <td>${record.date}</td>
            <td><span class="status-badge status-${record.status}">${record.status}</span></td>
            <td>
                <button class="btn btn-danger" onclick="deleteAttendance(${record.id})">حذف</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteAttendance(id) {
    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
        attendance = attendance.filter(a => a.id !== id);
        localStorage.setItem('attendance', JSON.stringify(attendance));
        displayAttendance();
        showAlert('تم حذف السجل بنجاح!', 'success');
    }
}

// ===== إضافة رسالة تنبيه =====

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

// ===== اختيار فصل =====

function selectClass(classNum) {
    showStudentsByClass(classNum);
}