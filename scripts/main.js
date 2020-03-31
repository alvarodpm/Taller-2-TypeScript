import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
//Declarar las variables que se usarán en todos los métodos
var studentName = document.getElementById('studentName');
var studentTbody = document.getElementById('student');
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBoxMinCredits = document.getElementById("search-box-minCreditos");
var inputSearchBoxMaxCredits = document.getElementById("search-box-maxCreditos");
var totalCreditElm = document.getElementById("total-credits");
//Lo que se debe hacer al iniciarse por primera vez
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
renderStudentInTable(dataStudent);
//Funciones
function renderStudentInTable(student) {
    console.log('Desplegando estudiante');
    //Escribir el nombre del estudiante
    studentName.innerHTML = student.name;
    //Crear row del código del estudiante
    var trCode = document.createElement("tr");
    trCode.innerHTML = "<td>C\u00F3digo</td>\n                      <td>" + student.name + "</td>";
    studentTbody.appendChild(trCode);
    //Crear el tr de la cédula
    var trId = document.createElement("tr");
    trId.innerHTML = "<td>C\u00E9dula</td>\n                    <td>" + student.id + "</td>";
    studentTbody.appendChild(trId);
    //Crear el tr de la edad
    var trAge = document.createElement("tr");
    trAge.innerHTML = "<td>Edad</td>\n                      <td>" + student.age + "</td>";
    studentTbody.appendChild(trAge);
    //Crear el tr de la dirección
    var trAddress = document.createElement("tr");
    trAddress.innerHTML = "<td>Direcci\u00F3n</td>\n                        <td>" + student.address + "</td>";
    studentTbody.appendChild(trAddress);
    //Crear el tr del teléfono
    var trPhone = document.createElement("tr");
    trPhone.innerHTML = "<td>Tel\u00E9fono</td>\n                        <td>" + student.phone + "</td>";
    studentTbody.appendChild(trPhone);
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var minCreditos = inputSearchBoxMinCredits.valueAsNumber;
    var maxCreditos = inputSearchBoxMaxCredits.valueAsNumber;
    minCreditos = (minCreditos != minCreditos) ? 0 : minCreditos;
    maxCreditos = (maxCreditos != maxCreditos) ? Infinity : maxCreditos;
    console.log(minCreditos);
    console.log(maxCreditos);
    clearCoursesInTable();
    var coursesFiltered = searchCoursesByCredits(minCreditos, maxCreditos, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCoursesByCredits(min, max, courses) {
    return courses.filter(function (c) { return c.credits >= min && c.credits <= max; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
