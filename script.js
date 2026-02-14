const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const cursor = document.getElementById('heart-cursor');

// 1. Heart Follower (With Safety Guard)
document.addEventListener('mousemove', (e) => {
  if (cursor) { // This "if" prevents the script from crashing
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

let yesScale = 1;
const yesPhrases = [
  "YES",
  "Are you sure? 🤔",
  "Click me instead! 😉",
  "I'm getting bigger for a reason...",
  "YOU HAVE NO CHOICE NOW! ❤️",
  "JUST CLICK IT! ✨",
  "I AM YOUR DESTINY! 💖"
];

// 2. NO Button Chase
if (noBtn) {
  noBtn.addEventListener('click', () => {
    noBtn.style.position = 'absolute';
    noBtn.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    noBtn.style.top = Math.random() * (window.innerHeight - 50) + 'px';
    yesScale += 0.2;
    yesBtn.style.transform = `scale(${yesScale})`;
    let phraseIndex = Math.min(Math.floor(yesScale * 1.5), yesPhrases.length - 1);
    yesBtn.innerText = yesPhrases[phraseIndex];
  });
}

// 3. YES -> Invite
if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    const music = document.getElementById('valentine-music');
    if (music) music.play();
    document.getElementById('main-card').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
    typeEffect('yay-header', "I knew you'd say yes! ❤️‍🔥", 70);
  });
}

// 4. Invite -> Dinner Screen
const startBtn = document.getElementById('start-date-btn');
if (startBtn) {
  startBtn.addEventListener('click', () => {
    document.getElementById('success-screen').classList.add('hidden');
    document.getElementById('date-screen').classList.remove('hidden');
  });
}

// 5. Fixed Dinner Logic (Fixed the syntax error here)
function nextStep(loc, emoji, imgArray) {
  const opt = document.getElementById('options-wrapper');
  const map = document.getElementById('map-container');
  // Note: Ensure you actually have an element with ID 'airplane-chime' if using this
  const chime = document.getElementById('airplane-chime');

  if (chime) {
    chime.currentTime = 0;
    chime.play();
  }

// 1. Show the Boarding Pass
document.getElementById('ticket-dest').innerText = loc.toUpperCase();
opt.classList.add('hidden'); // Hide the 3 dinner choices
map.classList.remove('hidden'); // Show the airplane ticket

setTimeout(() => {
  // 2. Hide the ticket and prepare the photos
  map.classList.add('hidden');
  const photoStack = document.getElementById('photo-stack');
  photoStack.innerHTML = '';

  const tiltClasses = ['photo-left', 'photo-center', 'photo-right'];

  imgArray.forEach((imgSrc, index) => {
    if (index < 3) {
      // 1. Create the container
      const imgContainer = document.createElement('div');
      imgContainer.className = 'stacked-photo ' + tiltClasses[index];

      // 2. Define captions based on the location (loc)
      const captions = {
        'Paris': ['Mon Amour in Paris 🇫🇷', 'Croissants & Coffee ☕', 'The City
of Lights ✨'],
        'Italy': ['A slice of heaven 🍕', 'Pasta with my favorite 🍝', 'Romantic
Italian nights 🌃'],
        'Japan': ['Falling for you 🌸', 'The best sushi date 🍣', 'Magic in
Tokyo ⛩️']
      };

      // 3. Add both the Image AND the Caption div
      // We use loc to pick the right set of captions, and index to pick the
specific one
      imgContainer.innerHTML = `
          ${loc}
          
${captions[loc][index]}
`;

      photoStack.appendChild(imgContainer);
    }
  });

  // 3. Reveal the location photos
  document.getElementById('location-preview').classList.remove('hidden');

  // Corrected the target ID for the typeEffect to match your HTML
  const romanticMsg = `Ooh, ${loc}! ${emoji} Everything looks so beautiful here...`;
  typeEffect('date-question-text', romanticMsg, 60);

  // 4. Show the "Dessert Next" button WITHOUT deleting the old buttons (cleaner
transition)
  // We find the button in the HTML and just show it
  const dessertBtn = document.getElementById('dessert-btn');
  if (dessertBtn) {
    dessertBtn.classList.remove('hidden');
    // Update the click action dynamically based on location
    dessertBtn.onclick = () => goToGift(loc);
  }
}, 3500); // 3.5 seconds of "flight time"
}

function revealGift() {
  const lid = document.querySelector('.gift-lid');
  const box = document.getElementById('gift-box');
  const instruction = document.getElementById('gift-instruction');
  const loader = document.getElementById('loader');
  const finalReveal = document.getElementById('final-reveal');

  // 1. Disable clicking again and stop the shaking animation
  box.style.pointerEvents = "none";
  box.style.animation = "none";

    // 2. Animate the lid flying off
    if (lid) {
      lid.style.transition = "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity
0.5s";
      lid.style.transform = "translateY(-150px) rotate(30deg) scale(1.2)";
      lid.style.opacity = "0";
    }

    // 3. Brief delay to see the lid fly, then show loader
    setTimeout(() => {
      box.classList.add('hidden');
      instruction.classList.add('hidden');
      loader.classList.remove('hidden'); // Use your existing heartbeat loader

      // 4. Final reveal after the "suspense"
      setTimeout(() => {
        loader.classList.add('hidden');
        if (finalReveal) finalReveal.classList.remove('hidden');

        // --- ADDED: TURN OFF BACKGROUND MUSIC ---
        const bgMusic = document.getElementById('valentine-music');
        if (bgMusic) {
          bgMusic.pause();
          bgMusic.currentTime = 0; // Optional: Resets the song to the beginning
        }
        startRosePetals();
        typeEffect('gift-content', 'Every second with you is my favorite memory... ❤️‍🔥',
60);

        const video = document.getElementById('scrapbook-video');
        if (video) {
          video.load(); // Prepares the video file
          // video.play(); // Uncomment this if you want it to play automatically
        }

        // Trigger confetti if you added that function earlier!
        if (typeof confettiExplosion === "function") confettiExplosion();
      }, 2500); // How long the heart loader stays
    }, 600);
  }

  function typeEffect(elementId, text, speed = 50) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = "";
    el.classList.remove('hidden');
    let i = 0;
    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  const myVideo = document.getElementById('scrapbook-video');

  if (myVideo) {
    myVideo.onended = function() {
      // 1. Stop the first song
      const originalMusic = document.getElementById('valentine-music');
      if (originalMusic) originalMusic.pause();

      // 2. Gently fade out the video frame
      const frame = document.querySelector('.memory-frame');
      if (frame) {

            frame.style.transition = "opacity 1s";
      frame.style.opacity = "0";
    }

    // 3. Wait for the fade, then switch screens
    setTimeout(() => {

      // KILL THE GHOST BOX: Hide video section completely
      const revealSection = document.getElementById('final-reveal');
      revealSection.classList.add('hidden');
      revealSection.style.display = 'none';

      // Show the final romantic message card
      const finalCard = document.getElementById('final-message-card');
      if (finalCard) {
        finalCard.classList.remove('hidden');
        finalCard.classList.add('fade-in');
        finalCard.style.display = 'block';
      }

      // 4. Play the new "Ending Song"
      const finalSong = document.getElementById('final-song');
      if (finalSong) {
        finalSong.currentTime = 0;
        finalSong.play().catch(e => console.log("Music blocked by browser - requires
click"));
      }

      // 5. Throw the heart confetti!
      if (typeof launchConfetti === "function") {
        launchConfetti();
      }

    }, 1000); // This 1000 matches the 'opacity 1s' transition
  }

  function createHeart() {
    const bg = document.getElementById('heart-bg');
    if (!bg) return;
    const heart = document.createElement('div');
    heart.classList.add('heart-shape');
    const size = Math.random() * 20 + 10 + "px";
    heart.style.width = size;
    heart.style.height = size;
    heart.style.left = Math.random() * 100 + "vw";
    const duration = Math.random() * 3 + 4 + "s";
    heart.style.setProperty('--duration', duration);
    bg.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 7000);
  }

  let heartInterval = setInterval(createHeart, 400);

let heartsCaught = 0;
const reasons = [
  "I love you because you're not too showy, you have a formal aura, and I guess you're not
a playgirl. I see that you're straightforward 🙈... ✨",
  "I love you because I see exclusive traits in you compared to other girls. Though you
may not be the most beautiful girl with the nicest attitude that I've met, I still chose
you... 🌙.",
  "I've loved you since our DJT days because you stood out among the rest of the girls
there. 🥺... ❤️"
];

function goToGift(loc) {
  document.getElementById('date-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  heartsCaught = 0;
  document.getElementById('score').innerText = "0";
  document.getElementById('heart-bg').style.opacity = "0.2";
  startGame();
}

function startGame() {
  const gameTimer = setInterval(() => {
    if (heartsCaught < 3) {
      spawnCatchableHeart();
    } else {
      clearInterval(gameTimer);
      setTimeout(() => { finishGame(); }, 3500);
    }
  }, 1000);
}

function spawnCatchableHeart() {
  const gameArea = document.getElementById('game-area');
  const heart = document.createElement('div');
  heart.classList.add('catchable-heart');
  heart.innerHTML = '💖';
  heart.style.left = Math.random() * 80 + 10 + "%";
  const speed = (Math.random() * 1.2 + 0.9).toFixed(2) + "s";
  heart.style.animationDuration = speed;
  heart.onclick = () => {
    heartsCaught++;
    document.getElementById('score').innerText = heartsCaught;
    showReason(reasons[heartsCaught - 1]);
    heart.remove();
  };
  gameArea.appendChild(heart);
  setTimeout(() => { if (heart.parentNode) heart.remove(); }, parseFloat(speed) * 1000);
}

function showReason(text) {
  const popup = document.getElementById('reason-popup');
  popup.classList.remove('hidden');
  typeEffect('reason-popup', text, 50);
  setTimeout(() => { popup.classList.add('hidden'); }, 10000);
}

function finishGame() {
  setTimeout(() => {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
      document.getElementById('gift-section').classList.remove('hidden');
      typeEffect('gift-instruction', "You caught all my reasons... now for your final
surprise! 🎁", 50);
    }, 2000);
  }, 2000);
}

function startRosePetals() {
  clearInterval(heartInterval);
  const heartBg = document.getElementById('heart-bg');
  heartBg.innerHTML = '';
  heartInterval = setInterval(() => {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    const size = Math.random() * 15 + 10 + "px";
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = Math.random() * 100 + "vw";
    const duration = Math.random() * 5 + 5 + "s";
    petal.style.animationDuration = duration;
    heartBg.appendChild(petal);
    setTimeout(() => { petal.remove(); }, 10000);
  }, 300);
}

function launchConfetti() {
  const colors = ['💖', '❤️', '✨', '🌹', '🥰'];

  for (let i = 0; i < 50; i++) {
    const heart = document.createElement('div');
    heart.className = 'confetti-heart';
    heart.innerText = colors[Math.floor(Math.random() * colors.length)];

    // Random positions and speeds
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.opacity = Math.random();

    document.body.appendChild(heart);

    // Clean up memory after animation ends
    setTimeout(() => heart.remove(), 5000);
  }
}
    
