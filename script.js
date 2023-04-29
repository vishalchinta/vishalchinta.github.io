/* ===============Menu show Y hidden=========  */
const navMenu = document.getElementById("nav-menu");
navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");

if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu');
    })
}

if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
    let itemClass = this.parentNode.className;
    for(i=0;i<skillsContent.length;i++){
        skillsContent[i].className = 'skills__content skills__close';
    }
    if(itemClass == 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((e)=>{
    e.addEventListener('click',toggleSkills);
});

// ============qualification tabs============

const tabs = document.querySelectorAll('[data-target]'),
        tabContent = document.querySelectorAll('[data-content]');
 
tabs.forEach(tab => {
    tab.addEventListener('click',()=>{
        const target = document.querySelector(tab.dataset.target);
        tabContent.forEach(tabContent=>{
            tabContent.classList.remove('qualification__active');
        });
        target.classList.add('qualification__active');
        tabs.forEach(tab=>{
            tab.classList.remove('qualification__active');
        });
        tab.classList.add('qualification__active');
    })
})


// ==========================Dark/light theme====================

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

if(selectedTheme){
    document.body.classList[selectedTheme == "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon == "fa-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click" , () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem("selected-theme",getCurrentTheme());
    localStorage.setItem("selected-icon",getCurrentIcon());
})


const downloadCv = document.getElementById("Resume-Button");

downloadCv.addEventListener('click',function(){
    window.open("https://drive.google.com/file/d/17RnXHEMxNrE_TaAI_asOKOqkTAPLcXm-/view?usp=share_link")
});