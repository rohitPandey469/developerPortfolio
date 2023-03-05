const scrollUp=document.querySelector("#scroll-up");
scrollUp.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth",
    });
});
const burger=document.querySelector("#burger-menu");
const ul=document.querySelector("#navigation");
const nav=document.querySelector("nav");
const heading=document.querySelector("#heading");


burger.addEventListener("click",()=>{
    ul.classList.toggle("show");
});
const navLinks=document.querySelectorAll(".nav-link");
navLinks.forEach((link)=>{
    link.addEventListener("click",()=>{
        ul.classList.remove("show");
    });
});
window.addEventListener("scroll",onScroll);
function onScroll(){
    ul.classList.remove("show");
    var scroll=document.documentElement.scrollTop;
    if(scroll>30){
        heading.classList.add("background-color");
    }
    else{
        heading.classList.remove("background-color");
    }
};
