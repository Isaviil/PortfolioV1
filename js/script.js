
/* Animating the articles on load */
let articles = gsap.utils.toArray(".main-panels article .a-m");
let isAnimating = false;


let animatingArticles = (elem, index) => {

    const text = elem.parentElement.querySelector(".article-text");
    isAnimating = true;
    let functionTL = gsap.timeline();
        
    if (index%2===0){
        functionTL
        .fromTo(elem, {opacity: 0, yPercent: 100}, {opacity: 1, yPercent: 0, duration: .33, ease: "power1.out"})
        .fromTo(text, {opacity: 0, x:-40}, {opacity: 1, x:0, duration: .2, ease: "power1.out"})
    } else {
        functionTL
        .fromTo(elem, {opacity: 0, yPercent: -100}, {opacity: 1, yPercent: 0, duration: .33, ease: "power1.out"})
        .fromTo(text, {opacity: 0, x:40}, {opacity: 1, x:0, duration: .2, ease: "power1.out"}) 
    }

    return functionTL;
}


let introTimeline = gsap.timeline();
introTimeline.eventCallback("onComplete", ()=>{
    isAnimating = false;
})
articles.forEach((x, i)=>{
    introTimeline.add(animatingArticles(x, i))
})








/*Function to split word for word */
let splittingWords = (elem) => {
    return elem.textContent.trim().split("").map(x=> x=== " "? `<span class="space"> </span>` :`<span>${x}</span>`).join("")
}

/*Splitting the welcome message + Welcome timeline*/
let titleSplit = document.querySelector(".main-panels>h2");
let welcomeTextSplit = document.querySelector(".small-lateral-message p");
let welcomeTL = gsap.timeline({delay: 2.5});
titleSplit.innerHTML = splittingWords(titleSplit);
welcomeTextSplit.innerHTML = splittingWords(welcomeTextSplit)

welcomeTL.fromTo(".navBar .bi-sun-fill", {opacity: 0, x: -25}, {opacity: 1, x:0, duration: .5, ease:"power2.out"})
.fromTo(".main-panels h2 span", {opacity: 0, x: 20}, {opacity: 1, duration:.7, ease: "power1.out", x:0, stagger: .1}, '<')
.fromTo(".small-lateral-message h3", {opacity: 0, x: -20}, {opacity: 1, duration:1, ease: "power2.out", x:0})
.fromTo(".small-lateral-message span", {opacity: 0}, {opacity: 1, duration :1, ease: "power2.out", stagger: .08})
.to(".small-lateral-message h3", {opacity: 0, x: 30, delay:4, ease: "power1.out", duration: .7, pointerEvents: "none"})
.to(".small-lateral-message span", {opacity: 0, x: 30, ease: "power1.out", duration: .7, pointerEvents: "none"}, "<+=.7")


 












/* toggle modal on clicking article */

const modalToggled = [{
    id: "work", img: "url('./img/b7.png')"
},{
    id: "progress", img: "url('./img/b6.png')"
},{
    id: "about", img: ""
},{
    id: "contact", img: ""
}]



let modal;


gsap.utils.toArray(".main-panels article .a-m").forEach((x, i)=>{
    x.addEventListener("click", (e)=>{

        e.stopPropagation();

        if (isAnimating){
            return;
        }

        isAnimating = true;

        let match = modalToggled.find(y => y.id === x.dataset.id);
        if(match){
             modal = document.getElementById(match.id);

             if (match.id === "work"){
                modal.classList.add("work")
                modal.querySelector(".my-info").style.height = "20%";
                modal.querySelector(".info-extra").style.height = "75%";
                modal.querySelector(".my-info").style.backgroundImage = match.img;
             }

             if (match.id === "contact"){
                modal.classList.add("contact");
             }

             if (match.id === "progress"){
                modal.classList.add("progress")
                modal.querySelector(".my-info").style.height = "25%";
                modal.querySelector(".info-extra").style.height = "70%";
                modal.querySelector(".my-info").style.backgroundImage = match.img;
             }

            let modalTimeline = gsap.timeline();
            modalTimeline.fromTo(".modal-container", {
                opacity:0, pointerEvents: "none", xPercent: 30
            }, {
                xPercent: 0, duration: .35, ease: "power2.out", opacity: 1, pointerEvents: "auto"
            })

            .fromTo(".modal-container", {backdropFilter: "blur(0px)"},{backdropFilter: "blur(5px)"})

            .fromTo(modal, {
                opacity: 0
            }, {
                opacity: 1, pointerEvents: "auto", duration: .4, ease: "power1.out", 
                onComplete: ()=>{
                    isAnimating = false;
                }
            }, "<")
            .fromTo(".close-modal-msg", {opacity: 0}, {opacity: 1, duration: .6, ease: "power2.out"})
    
        }
    })
})










/*Closing the modal*/
document.querySelector(".modal-container").addEventListener("click", (e) => {

        if (isAnimating){
            return;
        }

        isAnimating = true;
    
    if (!e.target.closest(".modal-info")){
        let modalTimeline = gsap.timeline();
        
          modalTimeline.fromTo(modal, {
            opacity: 1
          }, {
            opacity: 0, pointerEvents: "none", duration: .3, ease: "power2.out"
          })  
          .to(".modal-container", {backdropFilter: "unset", duration: .3, ease: "power1.out", opacity: 0, pointerEvents: "none"}, "<+=.2")
          .to(".close-modal-msg", {opacity: 0}, '<')
          .set(".modal-container", {xPercent: 100, onComplete: ()=> {isAnimating = false;}})
    } else {
        isAnimating=false;
    }
});








/*Close the modal on pressing esc */







/*Night/light mode */

document.querySelector(".navBar .bi").addEventListener("click", ()=>{

    if (isAnimating){
        return;
    }

    isAnimating = true;

    let nightmodeTimeline = gsap.timeline();

    const toggleIcon = document.body.classList.contains("light-mode")
    if(toggleIcon){
        document.body.classList.toggle("light-mode")
        nightmodeTimeline.to(".overlay-lightMode", {opacity: 0, duration: .6, ease: "power2.out"})
        .to(".bi-moon-fill", {opacity: 0, duration: .3, ease: "power1.out"}, '<')
        .to(".bi-sun-fill", {opacity: 1, duration: .3}, '<')
        

    } else { /* night mode -> day mode*/
        document.body.classList.toggle("light-mode")
        nightmodeTimeline.to(".overlay-lightMode", {opacity: 1, duration: .6, ease: "power2.out"})        
        .to(".bi-sun-fill", {opacity: 0, duration: .3, ease: "power1.out"}, '<')
        .to(".bi-moon-fill", {opacity: 1, duration: .3}, '<')
        
        
    }

    nightmodeTimeline.eventCallback("onComplete", ()=>{
        isAnimating=false;
    })

})

















/* modal to zoom each example */

const modalExampleToggled = [{
    type: "signup",
    img: "url(../img/exampleSignup.png)",
    description: ["Se registra al usuario en la base de datos para continuar. <br><small>Ilustración por <a href='https://www.instagram.com/datcravat/' target='_blank'>datcravat</a></small>" ,
        "Proyecto académico sin fines comerciales. Todo el contenido es demostrativo.",
        "Los personajes e ilustraciones pertenecen a © Arc System Works."
    ]
}, {
    type: "details",
    img: "url(../img/exampleDetails.png)",
    description: ["Tras seleccionar un producto, se muestran los detalles.",
        "Proyecto académico sin fines comerciales. Todo el contenido es demostrativo.",
        "Los personajes e ilustraciones pertenecen a © Arc System Works."
    ]
}, {
    type: "cart",
    img: "url(../img/exampleCart.png)",
    description: ["Carrito de compras con los elementos seleccionados de la tienda.",
        "Proyecto académico sin fines comerciales. Todo el contenido es demostrativo.",
        "Los personajes e ilustraciones pertenecen a © Arc System Works."
    ]
}, {
    type: "backend",
    img: "url(../img/exampleBackend.png)",
    description: ["Las compras se registran en la base de datos y se actualiza la información en el backend"]
}]




let modalExampleTrigger = gsap.utils.toArray(".my-projects .example");



modalExampleTrigger.forEach((x, i)=>{

    x.addEventListener("click", ()=>{
        let matchingTypes = modalExampleToggled.find(y => y.type === x.dataset.type)
        if (matchingTypes){
            gsap.to(".modal-display-example", {opacity: 1, pointerEvents: "auto"})
            document.querySelector(".display-example-img").style.backgroundImage = matchingTypes.img;
            document.querySelector(".display-example-description p").innerHTML = matchingTypes.description.map(x=> `<p>${x}<p>`).join("");
        }
    })

})








/* closing the modal example */

let modalExample = document.querySelector(".modal-display-example");

modalExample.addEventListener("click", (e)=>{

    if (e.target.closest(".modal-display-example")){
       gsap.to(".modal-display-example", {opacity: 0, pointerEvents: "none"});
    }

})

