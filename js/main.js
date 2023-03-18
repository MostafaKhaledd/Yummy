let datalist = []
let details = []
let Categories = []
let Area = []
let Areadetail = []
let Ingredients = []
let Ingredientsdetail = []
let card = []
let categdetails = []
let searchByname = document.getElementById("Search-By-Name")
let searchByFirst = document.getElementById("Search-By-First")
let nameInput = document.getElementById("nameInput")
let nameAlert = document.getElementById("nameAlert")
let emailInput = document.getElementById("emailInput")
let emailAlert = document.getElementById("emailAlert")
let phoneInput = document.getElementById("phoneInput")
let phoneAlert = document.getElementById("phoneAlert")
let ageInput = document.getElementById("ageInput")
let ageAlert = document.getElementById("ageAlert")
let passwordInput = document.getElementById("passwordInput")
let passwordAlert = document.getElementById("passwordAlert")
let repasswordInput = document.getElementById("repasswordInput")
let repasswordAlert = document.getElementById("repasswordAlert")
let unSubmit = document.getElementById("unSubmit")
let Submit = document.getElementById("Submit")

$(document).ready(loading())
function loading() {
  $(".landing").fadeOut(1000)
}
$(".landing1").fadeOut()

$("#navIcon").click(function () {
  let left = $("#navbar").css("left")
  let widthInner = $(".nav_inner").outerWidth(true)
  console.log(left)
  if (left == "0px") {
    $("#navbar").animate({ left: `-${widthInner}px` }, 600)
    $("#navLinks li").animate({ top: '300px' }, 1000)
    $("#navIcon").removeClass("fa-solid fa-xmark fa-2x")
    $("#navIcon").addClass("fa-solid open-close-icon fa-2x fa-align-justify")
  }
  else {
    $("#navbar").animate({ left: `0px` }, 600)
    for (let i = 0; i < 5; i++) {
      $("#navLinks li").eq(i).animate({ top: 0 }, (i + 5) * 120)
    }
    $("#navIcon").removeClass("fa-solid open-close-icon fa-2x fa-align-justify")
    $("#navIcon").addClass("fa-solid fa-xmark fa-2x")
  }
})
let widthInner = $(".nav_inner").outerWidth(true)
$("#navbar").css({ left: `-${widthInner}px` })
$("#navLinks ul li").animate({ top: '300px' }, 1000)

async function getData(type) {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${type}`)
  let data = await res.json()
  // console.log(data.meals)
  datalist = data.meals
  display()
}
getData("")

function findName() {
  let food = searchByname.value
  $("#foodDisplay").removeClass("d-none")
  $(".landing1").fadeIn()
  getData(food)
  $(".landing1").fadeOut(50)
}

function display() {
  let temp = ""
  datalist.forEach((element) => {
    temp += `<div class="col-md-3 Cardd" data_id="${element.idMeal}">
    <div class="overflow-hidden food cursor_pointer rounded-2 position-relative">
    <img src="${element.strMealThumb}" class="w-100" alt="">
    <div class="position-absolute d-flex align-items-center name_food ps-2">
      <h2 class="">${element.strMeal}</h2>
    </div>
    </div>
    </div>`
  })
  document.getElementById("food_card").innerHTML = temp
  card = document.querySelectorAll(".Cardd")
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
      $(".landing").fadeIn()
      let type = this.getAttribute("data_id")
      $("#foodDetails").removeClass("d-none")
      $("#foodDisplay").addClass("d-none")
      $("#Search").addClass("d-none")
      $("#Contact").addClass("d-none")
      getdetails(type)
      loading()
    })
  }
}

async function getDataByF(type) {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${type}`)
  let data = await res.json()
  // console.log(data.meals)
  datalist = data.meals
  display()
}

function Search() {
  $("#foodDisplay").addClass("d-none")
  $("#foodDetails").addClass("d-none")
  $("#Contact").addClass("d-none")
  $("#Search").removeClass("d-none")
  searchByname.value = ""
  searchByFirst.value = ""
}

function findF() {
  let food = searchByFirst.value
  $("#foodDisplay").removeClass("d-none")
  $(".landing1").fadeIn()
  getDataByF(food)
  $(".landing1").fadeOut(50)
}

async function getdetails(type) {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${type}`)
  let data = await res.json()
  // console.log(data.meals[0])
  details = data.meals[0]
  showdetails()
}

function showdetails() {

  let Ingredient = ``

  for (let i = 1; i <= 20; i++) {
    if (details[`strIngredient${i}`]) {
      Ingredient += `<li class="alert alert-info m-2 p-1">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
    }
  }

  let temp = ""
  temp = `<div class="row">
      <div class="col-lg-4">
        <img src="${details.strMealThumb}" class="w-100" alt="">
        <h2 class="text-white">${details.strMeal}</h2>
      </div>
      <div class="col-lg-8">
        <h2 class="text-white">Instructions</h2>
        <p class="text-white">${details.strInstructions}</p>
        <h3 class="text-white">Area : ${details.strArea}</h3>
        <h3 class="text-white">Category : ${details.strCategory}</h3>
        <h3 class="text-white">Recipes :</h3>

        <ul class="list-unstyled d-flex g-3 flex-wrap">
${Ingredient}
</ul>

<h3 class="text-white">Tags :</h3>
<ul class="list-unstyled d-flex g-3 flex-wrap">
<li class="alert alert-danger m-2 p-1">Soup</li>
</ul>
        <a href="${details.strSource}" target="_blank"><button type="button" class="btn btn-success">Source</button></a>
        <a href="${details.strYoutube}" target="_blank"><button type="button" class="btn btn-danger">Youtube</button></a>
      </div>
    </div>`
  document.getElementById("foodDetails").innerHTML = temp
}

async function getcategories() {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let data = await res.json()
  // console.log(data.categories)
  Categories = data.categories
  displayCategories()
}

function displayCategories() {
  $("#foodDisplay").removeClass("d-none")
  $("#foodDetails").addClass("d-none")
  $("#Contact").addClass("d-none")
  $("#Search").addClass("d-none")
  $(".landing").fadeIn()
  let temp = ""
  Categories.forEach((element) => {
    temp += `<div class="col-md-3 Cardd" data_id="${element.strCategory}">
    <div class="overflow-hidden food cursor_pointer rounded-2 position-relative">
    <img src="${element.strCategoryThumb}" class="w-100" alt="">
    <div class="position-absolute name_food ps-2 text-center">
      <h2>${element.strCategory}</h2>
      <p class="px-2 fw-bold">${element.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
    </div>
    </div>`
  })
  $(".landing").fadeOut(50)
  document.getElementById("food_card").innerHTML = temp
  card = document.querySelectorAll(".Cardd")
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
      $(".landing").fadeIn()
      let type = this.getAttribute("data_id")
      categoriesdetails(type)
      loading()
    })
  }
}

async function categoriesdetails(type) {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`)
  let data = await res.json()
  console.log(data.meals)
  categdetails = data.meals
  categoriesShow()
}

function categoriesShow() {
  let temp = ""
  categdetails.forEach((element) => {
    temp += `<div class="col-md-3 Cardd" data_id="${element.idMeal}">
    <div class="overflow-hidden food cursor_pointer rounded-2 position-relative">
    <img src="${element.strMealThumb}" class="w-100" alt="">
    <div class="position-absolute d-flex align-items-center name_food ps-2">
      <h3 class="">${element.strMeal}</h3>
    </div>
    </div>
    </div>`
  })
  document.getElementById("food_card").innerHTML = temp
  card = document.querySelectorAll(".Cardd")
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
      $(".landing").fadeIn()
      let type = this.getAttribute("data_id")
      $("#foodDetails").removeClass("d-none")
      $("#foodDisplay").addClass("d-none")
      $("#Search").addClass("d-none")
      $("#Contact").addClass("d-none")
      getdetails(type)
      loading()
    })
  }
}

function showdetails() {

  let Ingredient = ``

  for (let i = 1; i <= 20; i++) {
    if (details[`strIngredient${i}`]) {
      Ingredient += `<li class="alert alert-info m-2 p-1">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
    }
  }

  let temp = ""
  temp = `<div class="row">
      <div class="col-lg-4">
        <img src="${details.strMealThumb}" class="w-100" alt="">
        <h2 class="text-white">${details.strMeal}</h2>
      </div>
      <div class="col-lg-8">
        <h2 class="text-white">Instructions</h2>
        <p class="text-white">${details.strInstructions}</p>
        <h3 class="text-white">Area : ${details.strArea}</h3>
        <h3 class="text-white">Category : ${details.strCategory}</h3>
        <h3 class="text-white">Recipes :</h3>

        <ul class="list-unstyled d-flex g-3 flex-wrap">
${Ingredient}
</ul>

<h3 class="text-white">Tags :</h3>
<ul class="list-unstyled d-flex g-3 flex-wrap">
<li class="alert alert-danger m-2 p-1">Soup</li>
</ul>
        <a href="${details.strSource}" target="_blank"><button type="button" class="btn btn-success">Source</button></a>
        <a href="${details.strYoutube}" target="_blank"><button type="button" class="btn btn-danger">Youtube</button></a>
      </div>
    </div>`
  document.getElementById("foodDetails").innerHTML = temp
}

async function getArea() {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let data = await res.json()
  console.log(data.meals)
  Area = data.meals
  displayArea()
}

function displayArea() {
  $("#foodDisplay").removeClass("d-none")
  $("#foodDetails").addClass("d-none")
  $("#Search").addClass("d-none")
  $(".landing").fadeIn()
  let temp = ""
  datalist.forEach((element) => {
    temp += `<div class="col-md-3 Cardd" data_id="${element.strArea}">
    <div class="overflow-hidden text-center text-white food cursor_pointer rounded-2 position-relative">
    <i class="fa-solid fa-house-laptop fa-4x d-block"></i>
      <h2>${element.strArea}</h2>
    </div>
    </div>
    </div>`
  })
  $(".landing").fadeOut(50)
  document.getElementById("food_card").innerHTML = temp
  card = document.querySelectorAll(".Cardd")
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
      $(".landing").fadeIn()
      let type = this.getAttribute("data_id")
      Areadetails(type)
      loading()
    })
  }
}

async function Areadetails(type) {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${type}`)
  let data = await res.json()
  console.log(data.meals)
  Areadetail = data.meals
  AreaShow()
}

function AreaShow() {
  let temp = ""
  Areadetail.forEach((element) => {
    temp += `<div class="col-md-3 Cardd" data_id="${element.idMeal}">
    <div class="overflow-hidden food cursor_pointer rounded-2 position-relative">
    <img src="${element.strMealThumb}" class="w-100" alt="">
    <div class="position-absolute d-flex align-items-center name_food ps-2">
      <h2 class="">${element.strMeal}</h2>
    </div>
    </div>
    </div>`
  })
  document.getElementById("food_card").innerHTML = temp
  card = document.querySelectorAll(".Cardd")
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
      $(".landing").fadeIn()
      let type = this.getAttribute("data_id")
      $("#foodDetails").removeClass("d-none")
      $("#foodDisplay").addClass("d-none")
      $("#Search").addClass("d-none")
      $("#Contact").addClass("d-none")
      getdetails(type)
      loading()
    })
  }
}

async function getIngredients() {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let data = await res.json()
  console.log(data.meals)
  Ingredients = data.meals.slice(0, 20)
  displayIngredients()
}

function displayIngredients() {
  $("#foodDisplay").removeClass("d-none")
  $("#foodDetails").addClass("d-none")
  $("#Contact").addClass("d-none")
  $("#Search").addClass("d-none")
  $(".landing").fadeIn()
  let temp = ""
  Ingredients.forEach((element) => {
    temp += `<div class="col-md-3 Cardd" data_id="${element.strIngredient}">
    <div class="overflow-hidden text-center text-white food cursor_pointer rounded-2 position-relative">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h4>${element.strIngredient}</h4>
      <p>${element.strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
    </div>
    </div>`
  })
  $(".landing").fadeOut(50)
  document.getElementById("food_card").innerHTML = temp
  card = document.querySelectorAll(".Cardd")
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
      $(".landing").fadeIn()
      let type = this.getAttribute("data_id")
      Ingredientsdetails(type)
      loading()
    })
  }
}

async function Ingredientsdetails(type) {

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`)
  let data = await res.json()
  console.log(data.meals)
  Ingredientsdetail = data.meals
  IngredientsShow()
}

function IngredientsShow() {
  let temp = ""
  Ingredientsdetail.forEach((element) => {
    temp += `<div class="col-md-3 Cardd" data_id="${element.idMeal}">
    <div class="overflow-hidden food cursor_pointer rounded-2 position-relative">
    <img src="${element.strMealThumb}" class="w-100" alt="">
    <div class="position-absolute d-flex align-items-center name_food ps-2">
      <h3 class="">${element.strMeal}</h3>
    </div>
    </div>
    </div>`
  })
  document.getElementById("food_card").innerHTML = temp
  card = document.querySelectorAll(".Cardd")
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function () {
      $(".landing").fadeIn()
      let type = this.getAttribute("data_id")
      $("#foodDetails").removeClass("d-none")
      $("#foodDisplay").addClass("d-none")
      $("#Search").addClass("d-none")
      $("#Contact").addClass("d-none")
      getdetails(type)
      loading()
    })
  }
}

function validName() {
  let reg = /^[A-Z a-z 0-9]{3,25}$/
  if (reg.test(nameInput.value) == true) {
    nameAlert.classList.replace("d-block", "d-none")
    nameInput.classList.add("is-valid")
    nameInput.classList.remove("is-invalid")
    return true
  }
  else {
    nameAlert.classList.replace("d-none", "d-block")
    nameInput.classList.add("is-invalid")
    nameInput.classList.remove("is-valid")
    return false
  }
}

function validEmail() {
  let reg = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
  if (reg.test(emailInput.value) == true) {
    emailAlert.classList.replace("d-block", "d-none")
    emailInput.classList.add("is-valid")
    emailInput.classList.remove("is-invalid")
    return true
  }
  else {
    emailAlert.classList.replace("d-none", "d-block")
    emailInput.classList.add("is-invalid")
    emailInput.classList.remove("is-valid")
    return false
  }
}

function validphone() {
  let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

  if (reg.test(phoneInput.value) == true) {
    phoneAlert.classList.replace("d-block", "d-none")
    phoneInput.classList.add("is-valid")
    phoneInput.classList.remove("is-invalid")
    return true
  }
  else {
    phoneAlert.classList.replace("d-none", "d-block")
    phoneInput.classList.add("is-invalid")
    phoneInput.classList.remove("is-valid")
    return false
  }
}

function validage() {
  let reg = /^[1-9]?[0-9]{1}$|^100$/

  if (reg.test(ageInput.value) == true) {
    ageAlert.classList.replace("d-block", "d-none")
    ageInput.classList.add("is-valid")
    ageInput.classList.remove("is-invalid")
    return true
  }
  else {
    ageAlert.classList.replace("d-none", "d-block")
    ageInput.classList.add("is-invalid")
    ageInput.classList.remove("is-valid")
    return false
  }
}

function validpassword() {
  let reg = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/

  if (reg.test(passwordInput.value) == true && passwordInput.value.length>=8) {
    passwordAlert.classList.replace("d-block", "d-none")
    passwordInput.classList.add("is-valid")
    passwordInput.classList.remove("is-invalid")
    return true
  }
  else {
    passwordAlert.classList.replace("d-none", "d-block")
    passwordInput.classList.add("is-invalid")
    passwordInput.classList.remove("is-valid")
    return false
  }
}

function validrepassword() {
  let reg = /[a-zA-Z][0-9]/

  if (repasswordInput.value == passwordInput.value && repasswordInput.value!="") {
    repasswordAlert.classList.replace("d-block", "d-none")
    repasswordInput.classList.add("is-valid")
    repasswordInput.classList.remove("is-invalid")
    return true
  }
  else {
    repasswordAlert.classList.replace("d-none", "d-block")
    repasswordInput.classList.add("is-invalid")
    repasswordInput.classList.remove("is-valid")
    return false
  }
}

repasswordInput.addEventListener("onkeyup", validrepassword)
repasswordInput.addEventListener("onkeyup", Submit1)
function Submit1(){
if(validName()==true && validEmail()==true && validphone()==true && validage()==true  && validpassword()==true && validrepassword()==true){
  Submit.classList.remove("d-none")
  unSubmit.classList.add("d-none")
}
else{
  unSubmit.classList.remove("d-none")
  Submit.classList.add("d-none")
}
}

function Contact(){
$("#foodDisplay").addClass("d-none")
$("#foodDetails").addClass("d-none")
$("#Search").addClass("d-none")
$("#Contact").removeClass("d-none")
}