const yesbtn = document.getElementById("yesbtn");
const nobtn = document.getElementById("nobtn");
const question = document.getElementById("question");
const fstmood = document.getElementById("fstmood");
const scnmood = document.getElementById("scndmood");
const celebration = document.getElementById("celebration");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

nobtn.addEventListener("mouseenter", moveButton);
nobtn.addEventListener("touchstart", moveButton);

function moveButton(){
    const x = Math.random() * (window.innerWidth - nobtn.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - nobtn.offsetHeight - 20);
    nobtn.style.position = "absolute";
    nobtn.style.left = `${x}px`;
    nobtn.style.top = `${y}px`;
}
yesbtn.addEventListener("click" , () => {

    fstmood.pause();
    //fstmood.currenTime = 0;
    //fstmood.style.display = "none"
    fstmood.classList.add("hidden");

    scnmood.classList.remove("hidden");
    scnmood.currenTime = 0;
    scnmood.play();
    scnmood.muted = false;

    question.style.display = "none";

    celebration.classList.remove("hidden");

   // const cheeringsound = document.getElementById("cheeringsound");
    //cheeringsound.play();

    
    startConfetti();
});

let confettiParticles = [];

function startConfetti(){
    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 0.5 + 1,
            color: `hsl(${Math.random() *360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10

        });
    }
    requestAnimationFrame(drawConfetti);
}

function drawConfetti(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });

    updateConfetti();
    requestAnimationFrame(drawConfetti);
}

function updateConfetti(){
    confettiParticles.forEach((p) => {
        p.y += p.d;
        p.x += Math.sin(p.y * 0.02);
        if (p.y > canvas.height){
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });
}
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});