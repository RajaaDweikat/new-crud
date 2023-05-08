var coursename = document.getElementById("course-name");
var coursecategory = document.getElementById("course-category");
var courseprice = document.getElementById("course-price");
var coursedescription = document.getElementById("course-description");
var coursecapacity = document.getElementById("course-capacity");
var addbtn = document.getElementById("click");
var data = document.getElementById("data");
var search = document.getElementById("search");
var currentindex=0;
var isnamevalid=false
var iscategoryvalid=false
var ispricevalid=false
var isdescriptionvalid=false
var iscapacityvalid=false
var courses =JSON.parse(localStorage.getItem('courses'))
if(JSON.parse(localStorage.getItem('courses'))==null){
    courses=[]
}
else{
    courses=JSON.parse(localStorage.getItem('courses'))

}
displaydata()
checkinputs()
function checkinputs(){
    if(isnamevalid && iscategoryvalid && ispricevalid && isdescriptionvalid && iscapacityvalid){
        addbtn.removeAttribute('disabled')
    }
    else{
        addbtn.setAttribute('disabled','disabled')
    }
}

var update=document.getElementById("update");
update.style.display='none';
addbtn.onclick = function (e) {
    e.preventDefault()
    addcourse();
    reserinput();
    displaydata();
    console.log(courses);


}
/*craet course*/
function addcourse() {
    var course = {
        name: coursename.value,
        category: coursecategory.value,
        price: courseprice.value,
        description: coursedescription.value,
        capacity: coursecapacity.value,
    }
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'course added successfully',
        showConfirmButton: false,
        timer: 1500
    })
}

function reserinput() {
    coursename.value = '';
    coursecategory.value = '';
    courseprice.value = '';
    coursedescription.value = '';
    coursecapacity.value = '';


}
/*add data on table or read data*/
function displaydata() {
    var result = ``
    for (var i = 0; i < courses.length; i++) {
        result += `
       <tr>
       <td>${i + 1}</td>
       <td>${courses[i].name}</td>
       <td>${courses[i].category}</td>
       <td>${courses[i].price}</td>
       <td>${courses[i].description}</td>
       <td>${courses[i].capacity}</td>
       <td><button class="btn btn-info" onclick="getcourse(${i})">update</button></td>
       <td><button class="btn btn-danger" onclick="deletecourse(${i})">delete</button></td>
       </tr>
       `
    }
    data.innerHTML = result;
}
/*delete all*/

document.getElementById("deleteBtn").onclick = function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            localStorage.setItem('courses',JSON.stringify(courses))
            data.innerHTML = '';
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })


}
/*delete course*/
function deletecourse(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem('courses',JSON.stringify(courses))
            console.log(courses);
            displaydata()
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}

/*search*/

search.onkeyup = function () {
    var result = '';
    console.log(search.value);
    for (i = 0; i < courses.length; i++) {
        if (courses[i].name.toLowerCase().includes(search.value.toLowerCase())) {
            result += `
            <tr>
            <td>${i + 1}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td>${courses[i].capacity}</td>
            <td><button class="btn btn-info" onclick="getcourse(${i})">update</button></td>
            <td><button class="btn btn-danger" onclick="deletecourse(${i})">delete</button></td>
            </tr>
            `
        }
        data.innerHTML = result;

    }
}
/*update*/
function getcourse(index) {
    console.log(index);
    currentindex=index;
    var course = courses[index];
    console.log(course);
    coursename.value = course.name
    coursecategory.value = course.category
    courseprice.value = course.price
    coursedescription.value = course.description
    coursecapacity.value = course.capacity
    update.style.display='inline';
    addbtn.style.display='none';

}
update.onclick=function(e){
    e.preventDefault()
    updatecourse()
    displaydata();
    update.style.display='none';
    addbtn.style.display='inline';
    reserinput()

}
function updatecourse(){
    var course = {
        name: coursename.value,
        category: coursecategory.value,
        price: courseprice.value,
        description: coursedescription.value,
        capacity: coursecapacity.value,
    }
    var prename=courses[currentindex].name;
    courses[currentindex].name=course.name;
    courses[currentindex].category=course.category;
    courses[currentindex].price=course.price;
    courses[currentindex].description=course.description;
    courses[currentindex].capacity=course.capacity;
    localStorage.setItem('courses',JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${prename} updated successfully`,
        showConfirmButton: false,
        timer: 1500
    })


   
}

/*validation*/
/*name: start with capital,3-10,no numbers*/
 var nameAlert=document.getElementById("nameAlert");
coursename.onkeyup=function(){
    var pattern=/^[A-Z][a-z]{2,10}$/
    if(pattern.test(coursename.value)){
        isnamevalid=true;
        if(coursename.classList.contains('is-invalid')){
          coursename.classList.replace('is-invalid','is-valid')  
        }
        coursename.classList.add('is-valid');
        nameAlert.innerHTML='';   
    }
    else{
         isnamevalid=false;
         nameAlert.innerHTML='please start with capital and numder of letters must be from 3 t0 10'
        if(coursename.classList.contains('is-valid')){
          coursename.classList.replace('is-valid','is-invalid')  
        }
        coursename.classList.add('is-invalid')
       
    }
    checkinputs()


}
/*category: start with capital,3-20*/
 var catAlert=document.getElementById("catAlert");
coursecategory.onkeyup=function(){
    var pattern=/^[A-Z][a-z]{3,20}$/
    if(pattern.test(coursecategory.value)){
        iscategoryvalid=true;
        if(coursecategory.classList.contains('is-invalid')){
            coursecategory.classList.replace('is-invalid','is-valid')  
        }
        coursecategory.classList.add('is-valid')
        catAlert.innerHTML='';  
        
    }
    else{
         iscategoryvalid=false;
         catAlert.innerHTML='Please start with capital and number of letters must be from 3 to 20'; 
        if(coursecategory.classList.contains('is-valid')){
          coursecategory.classList.replace('is-valid','is-invalid')  
        }
        coursecategory.classList.add('is-invalid')
       
    }
    checkinputs()
}
/*price:100-9999 numbers*/
var priceAlert=document.getElementById("priceAlert");
courseprice.onkeyup=function(){
    var pattern=/^[0-9]{3,4}$/
    if(pattern.test(courseprice.value) && courseprice.value>=100){
        ispricevalid=true;
        if(courseprice.classList.contains('is-invalid')){
            courseprice.classList.replace('is-invalid','is-valid')  
        }
        courseprice.classList.add('is-valid')
        priceAlert.innerHTML='';
        
    }
    else{
         ispricevalid=false;
         priceAlert.innerHTML='Price must be between 100-9999';
        if(courseprice.classList.contains('is-valid')){
          courseprice.classList.replace('is-valid','is-invalid')  
        }
        courseprice.classList.add('is-invalid')
       
    }
    checkinputs()
}

/*description: start with capital, 3-120, signs or numbers or letters*/
var desAlert=document.getElementById('desAlert')
coursedescription.onkeyup=function(){
    var pattern=/^[A-Z][A-Za-z0-9\s]{3,120}$/
    if(pattern.test(coursedescription.value)){
        isdescriptionvalid=true;
        if(coursedescription.classList.contains('is-invalid')){
            coursedescription.classList.replace('is-invalid','is-valid')  
        }
        coursedescription.classList.add('is-valid')
        desAlert.innerHTML=''
        
    }
    else{
         isdescriptionvalid=false;
         desAlert.innerHTML='wrie from 3 to 120 character paragraph description and start with capital'
        if(coursedescription.classList.contains('is-valid')){
          coursedescription.classList.replace('is-valid','is-invalid')  
        }
        coursedescription.classList.add('is-invalid')
       
    }
    checkinputs()
}

/*capacity:2-3 numbers*/
var capAlert=document.getElementById('capAlert');
coursecapacity.onkeyup=function(){
    var pattern=/^[0-9]{2,3}$/
    if(pattern.test(coursecapacity.value) && coursecapacity.value>=50){
        iscapacityvalid=true;
        if(coursecapacity.classList.contains('is-invalid')){
            coursecapacity.classList.replace('is-invalid','is-valid')  
        }
        coursecapacity.classList.add('is-valid')
        capAlert.innerHTML=''
        
    }
    else{
         iscapacityvalid=false;
         capAlert.innerHTML='capacity should be between 2 and 3 digits'
        if(coursecapacity.classList.contains('is-valid')){
          coursecapacity.classList.replace('is-valid','is-invalid')  
        }
        coursecapacity.classList.add('is-invalid')
       
    }
    checkinputs()
}







