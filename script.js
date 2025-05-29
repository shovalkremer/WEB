// מוזיקת רקע בעת טעינת הדף
window.addEventListener('load', () => {
    const bgMusic = new Audio('sounds/jungle.wav');
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    bgMusic.play();
});

const animals = document.querySelectorAll('.animal');

// משתנים גלובליים
let currentAnimalAudio = null;
let currentTimeout = null;

// האזנה ללחיצה על חיה
animals.forEach(animal => {
    animal.addEventListener('click', () => {
        const animalName = animal.getAttribute('data-animal');

        // עצירת צליל קודם
        if (currentAnimalAudio) {
            currentAnimalAudio.pause();
            currentAnimalAudio.currentTime = 0;
        }
        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }

        // קריאה קולית של שם החיה בלבד (בלי "Press A")
        const nameElement = animal.querySelector('h2');
        const name = nameElement ? nameElement.innerText : animalName;
        const utterance = new SpeechSynthesisUtterance(name);
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);

        // השהייה קצרה ואז השמעת הצליל
        setTimeout(() => {
            const sound = new Audio(`sounds/${animalName}.wav`);
            sound.play();
            currentAnimalAudio = sound;

            currentTimeout = setTimeout(() => {
                sound.pause();
                sound.currentTime = 0;
            }, 20000);
        }, 1000);
    });
});

// מיפוי מקשים לחיות
const keyMap = {
    'a': 'lion',
    's': 'elephant',
    'd': 'monkey',
    'f': 'parrot',
    'g': 'frog',
    'h': 'tiger',
    'j': 'snake'
};

// האזנה ללחיצה על מקשים
document.addEventListener('keydown', (e) => {
    const animalName = keyMap[e.key.toLowerCase()];
    if (animalName) {
        // עצירת קול קודם אם יש
        if (currentAnimalAudio) {
            currentAnimalAudio.pause();
            currentAnimalAudio.currentTime = 0;
        }
        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }

        const sound = new Audio(`sounds/${animalName}.wav`);
        sound.play();
        currentAnimalAudio = sound;

        currentTimeout = setTimeout(() => {
            sound.pause();
            sound.currentTime = 0;
        }, 20000);
    }
});
