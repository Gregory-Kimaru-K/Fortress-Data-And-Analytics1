function animateCards() {
    const cards = document.querySelectorAll('.serv-land-cont .card');
    gsap.fromTo(cards, {
        y: 100,
        x: 2000,
        opacity: 0
    }, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 2,
        scrollTrigger: {
            trigger: cards[0],
            start: '70% 70%',
            end: '300% -200%',
            scrub:true,
            markers: false,
            pin: '.serv-land-cont'
        }
    });
}

function animateTechCards() {
    const scrolling = document.querySelector('.races');
    let raceWidth = scrolling.scrollWidth;
    let amountOfScroll = raceWidth - window.innerWidth;

    const tween = gsap.to(".races .tech-card", {
        x: -amountOfScroll
    });

    ScrollTrigger.create({
        trigger: ".tech-land-cont",
        start: '10% 15%',
        end: '50% -100%',
        animation: tween,
        pin: true,
        scrub: 1,
        markers: false
    });
}

animateCards();

animateTechCards();

// Select all .magnet and .text elements
const magnetElements = document.querySelectorAll('.magnet');
const magnetTextElements = document.querySelectorAll('.text');

// Function to activate the magnetic effect on mouse move
const activateMagneto = (event) => {
    const boundBox = event.currentTarget.getBoundingClientRect();
    const magnetoStrength = 40;
    const magnetoTextStrength = 300;
    const newX = ((event.clientX - boundBox.left) / event.currentTarget.offsetWidth) - 0.5;
    const newY = ((event.clientY - boundBox.top) / event.currentTarget.offsetHeight) - 0.5;

    // Move the current magnet element
    gsap.to(event.currentTarget, {
        duration: 1,
        x: newX * magnetoStrength,
        y: newY * magnetoStrength,
        ease: Power4.easeOut
    });

    // Move the corresponding text element
    const textElement = event.currentTarget.querySelector('.text');
    gsap.to(textElement, {
        duration: 1,
        x: newX * magnetoTextStrength,
        y: newY * magnetoTextStrength,
        ease: Power4.easeOut
    });
};

// Function to reset the magnetic effect on mouse leave
const resetMagneto = (event) => {
    // Reset the position of the magnet and the text
    gsap.to([event.currentTarget, event.currentTarget.querySelector('.text')], {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut
    });
};

// Add event listeners to each magnet element
magnetElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        element.addEventListener('mousemove', activateMagneto);
    });
    element.addEventListener('mouseleave', () => {
        element.removeEventListener('mousemove', activateMagneto);
        resetMagneto({ currentTarget: element });
    });
});
