import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { dataStudent } from './dataStudent.js';
import { Student } from './student.js';

//Declarar las variables que se usarán en todos los métodos

let studentName:HTMLElement = document.getElementById('studentName')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBoxMinCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-minCreditos")!;
const inputSearchBoxMaxCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-maxCreditos")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


//Lo que se debe hacer al iniciarse por primera vez

btnfilterByCredits.onclick = () => applyFilterByCredits();

btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

renderStudentInTable(dataStudent);



//Funciones



function renderStudentInTable(student: Student):void {
  console.log('Desplegando estudiante');

  //Escribir el nombre del estudiante
  studentName.innerHTML = student.name;

  //Crear row del código del estudiante
  let trCode = document.createElement("tr");
  trCode.innerHTML = `<td>Código</td>
                      <td>${student.name}</td>`;
  studentTbody.appendChild(trCode);


  //Crear el tr de la cédula
  let trId = document.createElement("tr");
  trId.innerHTML = `<td>Cédula</td>
                    <td>${student.id}</td>`;
  studentTbody.appendChild(trId);


  //Crear el tr de la edad
  let trAge = document.createElement("tr");
  trAge.innerHTML = `<td>Edad</td>
                      <td>${student.age}</td>`;
  studentTbody.appendChild(trAge);


  //Crear el tr de la dirección
  let trAddress = document.createElement("tr");
  trAddress.innerHTML = `<td>Dirección</td>
                        <td>${student.address}</td>`;
  studentTbody.appendChild(trAddress);


  //Crear el tr del teléfono
  let trPhone = document.createElement("tr");
  trPhone.innerHTML = `<td>Teléfono</td>
                        <td>${student.phone}</td>`;
  studentTbody.appendChild(trPhone);





}


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

 function applyFilterByCredits():void{
    let minCreditos:number = inputSearchBoxMinCredits.valueAsNumber;
    let maxCreditos:number = inputSearchBoxMaxCredits.valueAsNumber;

    minCreditos = (minCreditos != minCreditos)? 0 : minCreditos;
    maxCreditos = (maxCreditos != maxCreditos)? Infinity : maxCreditos;

    console.log(minCreditos);
    console.log(maxCreditos);

    clearCoursesInTable();

    let coursesFiltered:Course[] = searchCoursesByCredits(minCreditos, maxCreditos, dataCourses);

    renderCoursesInTable(coursesFiltered);
 }

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCoursesByCredits(min:number, max:number, courses:Course[]):Course[]{
  return courses.filter(c => c.credits >= min && c.credits <= max);

}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}