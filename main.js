//Objeto
class Course{
    constructor (id, courseName, ageGroup, vacancies, coursePrice){
      this.id= id;
      this.courseName = courseName;
      this.ageGroup = ageGroup;
      this.vacancies = vacancies;
      this.coursePrice = coursePrice;
      this.quantity = 1;
    }
}

// New Courses
const teenYogaCourse= new Course (001, "Teen Yoga Course", "10 to 18 years old", 100, 500);
const adultYogaCourse= new Course (002, "Adult Yoga Course", "19 to 40 years old",100, 700);

// Courses Array

const courses = [teenYogaCourse, adultYogaCourse];

// Empty basket array

let basket = [];

if(localStorage.getItem("basket")){
    basket= JSON.parse(localStorage.getItem("basket"));
}
// Course container dom

const containerCourse = document.getElementById("containerCourse");

// Show products

const showCourses = () => {
    courses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.innerHTML=`
                        <div class="card">
                            <img src="../media/${course.courseName}.jpg" class="card-img-top" alt="${course.courseName}">
                            <div class="card-body">
                                <h5 class="card-title">${course.courseName}</h5>
                                <p class="card-text">From ${course.ageGroup}</p>
                                <span>Vacancies: ${course.vacancies}</span>
                                <br>
                                <span>Price $${course.coursePrice}</span>
                                <button class="btn btn-primary addbtn" id="btn${course.id}">Add</button>
                            </div>
                        </div>`
    containerCourse.appendChild(courseCard)          
     const button= document.getElementById(`btn${course.id}`);        
    button.addEventListener("click", ()=>{
    addToBasket(course.id);    
    })
    })
}

showCourses ();

// Add to basket

const addToBasket = (id) =>{
    const inTheBasket = basket.find(course => course.id === id);
    if(inTheBasket) {
        inTheBasket.quantity++;
    } else {
        const course = courses.find (course => course.id === id);
        basket.push(course);
    }
    totalAmount();
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Show basket

const containerBasket = document.getElementById("containerBasket");
const seeBasket = document.getElementById("seeBasket");

seeBasket.addEventListener("click", () => {
    showBasket();
})

const showBasket = ()=>{
    containerBasket.innerHTML="";
    basket.forEach(course => {
        const basketList = document.createElement("li");
        basketList.innerHTML=`Course:${course.courseName} Price: $${course.coursePrice}  Quantity:${course.quantity} <button class="btn btn-outline-secondary btn-sm" id="erase${course.id}">X</button>`
        containerBasket.appendChild(basketList)
        const eraseBtn = document.getElementById(`erase${course.id}`)
        eraseBtn.addEventListener("click",()=>{
            eraseFromBasket(course.id)
            })
    
    })
    totalAmount();
}


//TotalBasket
const totalBasket = document.getElementById("totalBasket");
const totalAmount = ()=>{
    let purchaseTotal = 0;
    basket.forEach(course =>{
        purchaseTotal += course.coursePrice * course.quantity;

    })
    totalBasket.innerHTML = `Amount: $${purchaseTotal}`;
}

// Erase single course
const eraseFromBasket = (id) => {
    const course = basket.find(course => course.id === id);
    const indice = basket.indexOf(course);
    basket.splice(indice,1);
    showBasket();
    localStorage.setItem("basket", JSON.stringify(basket));
}


// Empty all
const emptyBasket = document.getElementById("emptyBasket");

emptyBasket.addEventListener("click", () => {
    eraseAll();
    localStorage.setItem("basket", JSON.stringify(basket));
})

const eraseAll = () =>{
    basket=[];
    if (basket.length === 0) {
        let message = document.getElementById("finishPurchase")
        message.innerHTML = ""
    }
    showBasket();
}

//finPurchase
const finishPurchase = ()=>{
    if (basket.length === 0) {
        let message = document.getElementById("finishPurchase")
        message.innerHTML = `Oops! Your basket is empty`
    } else {
    eraseAll()
    let message = document.getElementById("finishPurchase")
    message.innerHTML = `Yay! see you soon in our Yoga Course!`
    }    
}
const pressBuy = document.getElementById("btnBuy")
pressBuy.addEventListener("click",()=>{
    finishPurchase()

})

