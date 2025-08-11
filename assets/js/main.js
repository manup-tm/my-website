/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== EMAILJS CONTACT FORM (Load-Safe with Debug Logs) =====*/
function initEmailJS() {
    if (typeof emailjs !== "undefined") {
        console.log("✅ EmailJS library detected. Initializing...");
        emailjs.init("vip4AcNw6Dzxm1Kab"); // Your public key
        console.log("✅ EmailJS initialized with public key.");

        const form = document.getElementById("contact-form");
        if (!form) {
            console.error("❌ Contact form not found in DOM.");
            return;
        }

        console.log("✅ Contact form found. Attaching submit handler...");
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("📤 Sending form data via EmailJS...");

            emailjs.sendForm("service_yecggpf", "template_j08y2ff", this)
                .then(function(response) {
                    console.log("✅ EmailJS sendForm success:", response);
                    const msg = document.getElementById("thanksMessage");
                    msg.style.display = "block";
                    msg.style.opacity = "1";
                    form.reset();

                    // Fade out after 4 seconds
                    setTimeout(() => {
                        msg.style.transition = "opacity 1s ease";
                        msg.style.opacity = "0";
                        setTimeout(() => { msg.style.display = "none"; }, 1000);
                    }, 4000);

                }, function(error) {
                    console.error("❌ EmailJS sendForm error:", error);
                    alert("❌ Failed to send message. Please check console for details.");
                });
        });
    } else {
        console.warn("⏳ EmailJS not loaded yet. Retrying in 200ms...");
        setTimeout(initEmailJS, 200);
    }
}

// Start initialization
initEmailJS();
