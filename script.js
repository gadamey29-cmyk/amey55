/* ============================================
   Valentine's Proposal – For Vibha
   Interactive Script with Bears
   ============================================ */

// ============ STATE ============
let musicPlaying = false;
let currentPage = 'intro';
let noAttempts = 0;
const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '🩷', '♥️'];

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    startIntro();
    createFloatingHearts();
    createParticles();
    setupNoButton();
    setupFirstTapMusic();
});

// ============ FIRST TAP MUSIC (mobile-friendly) ============
function setupFirstTapMusic() {
    const music = document.getElementById('bgMusic');
    music.volume = 0.3;

    function startMusicOnInteraction() {
        if (!musicPlaying) {
            music.play().then(() => {
                musicPlaying = true;
                updateMusicButton();
                // Hide tap hint
                const hint = document.getElementById('tapHint');
                if (hint) hint.style.display = 'none';
            }).catch(() => { });
        }
        // Remove listeners after first interaction
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
    }

    // Try autoplay first
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicPlaying = true;
            updateMusicButton();
            const hint = document.getElementById('tapHint');
            if (hint) hint.style.display = 'none';
        }).catch(() => {
            // Autoplay blocked – wait for user interaction
            document.addEventListener('click', startMusicOnInteraction);
            document.addEventListener('touchstart', startMusicOnInteraction);
        });
    }
}

// ============ INTRO TYPEWRITER ============
function startIntro() {
    const title = document.getElementById('introTitle');
    const text = 'For Vibha – From Miles Away';
    let i = 0;

    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 70);
        } else {
            title.classList.add('done');
            triggerFadeGroup('intro');
        }
    }

    setTimeout(type, 800);
}

// ============ FADE-IN ANIMATIONS ============
function triggerFadeGroup(pageId) {
    const page = document.getElementById(pageId);
    const fadeElements = page.querySelectorAll('.fade-in');

    fadeElements.forEach(el => {
        const delay = parseInt(el.getAttribute('data-delay')) || 0;
        setTimeout(() => {
            el.classList.add('visible');
        }, delay);
    });
}

// ============ PAGE NAVIGATION ============
function goToPage(targetId) {
    const currentEl = document.getElementById(currentPage);
    const targetEl = document.getElementById(targetId);

    // Fade out current
    currentEl.classList.remove('active');

    // After transition, show target
    setTimeout(() => {
        targetEl.classList.add('active');
        currentPage = targetId;

        // Trigger fade-in animations for new page
        setTimeout(() => triggerFadeGroup(targetId), 200);

        // Special handling for proposal page - increase hearts
        if (targetId === 'proposal') {
            intensifyHearts();
        }
    }, 600);
}

// ============ FLOATING HEARTS ============
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const size = Math.random() * 20 + 14;
        const left = Math.random() * 100;
        const duration = Math.random() * 6 + 6;
        const delay = Math.random() * 2;
        const swayAmount = (Math.random() - 0.5) * 100;

        heart.style.cssText = `
            left: ${left}%;
            font-size: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        heart.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
            { transform: `translateY(15vh) translateX(${swayAmount * 0.3}px) rotate(45deg)`, opacity: 0.7 },
            { transform: `translateY(50vh) translateX(${swayAmount}px) rotate(180deg)`, opacity: 0.4 },
            { transform: `translateY(110vh) translateX(${swayAmount * 0.5}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'ease-in',
            fill: 'forwards'
        });

        container.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, (duration + delay) * 1000 + 500);
    }

    // Spawn hearts continuously
    setInterval(spawnHeart, 800);

    // Initial burst
    for (let i = 0; i < 8; i++) {
        setTimeout(spawnHeart, i * 200);
    }
}

function intensifyHearts() {
    const container = document.getElementById('heartsContainer');

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

            const size = Math.random() * 25 + 16;
            const left = Math.random() * 100;
            const duration = Math.random() * 4 + 4;

            heart.style.cssText = `
                left: ${left}%;
                font-size: ${size}px;
            `;

            heart.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
                { transform: 'translateY(15vh) rotate(90deg)', opacity: 0.8 },
                { transform: 'translateY(110vh) rotate(360deg)', opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'ease-in',
                fill: 'forwards'
            });

            container.appendChild(heart);
            setTimeout(() => { if (heart.parentNode) heart.remove(); }, duration * 1000 + 500);
        }, i * 150);
    }
}

// ============ PARTICLES ============
function createParticles() {
    const container = document.getElementById('particles');

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 8;
        const duration = Math.random() * 6 + 6;

        particle.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

        container.appendChild(particle);
    }
}

// ============ PROPOSAL LOGIC – YES ============
function handleYes() {
    // First: Bears come together on the proposal page
    const bearsStage = document.getElementById('bearsStage');
    if (bearsStage) {
        bearsStage.classList.add('united');
    }

    // Sparkle burst around bears
    spawnSparklesAroundBears();

    // Celebration burst
    launchConfetti();
    intensifyHearts();

    // Wait for bear animation, then transition
    setTimeout(() => {
        goToPage('afterYes');

        // Extra confetti waves
        setTimeout(launchConfetti, 1000);
        setTimeout(launchConfetti, 2500);
        setTimeout(() => intensifyHearts(), 1500);
    }, 2000);
}

// ============ SPARKLES AROUND BEARS ============
function spawnSparklesAroundBears() {
    const stage = document.getElementById('bearsStage');
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const sparkleEmojis = ['✨', '💫', '⭐', '🌟', '💖', '💗'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];

            const angle = (Math.PI * 2 * i) / 15;
            const radius = 40 + Math.random() * 60;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';

            document.body.appendChild(sparkle);

            setTimeout(() => {
                if (sparkle.parentNode) sparkle.remove();
            }, 1200);
        }, i * 80);
    }
}

// ============ NO BUTTON – RUNS AWAY ============
function setupNoButton() {
    const btnNo = document.getElementById('btnNo');

    const cuteMessages = [
        { text: "Are you sure? 🥺 I already imagined our future...", emoji: "🥺💔" },
        { text: "Please? Even the bears are sad now... 😢", emoji: "😢💔" },
        { text: "Last chance... my heart can't take it 🥹", emoji: "🥹💖" },
    ];

    function moveButtonAway(e) {
        if (e) e.preventDefault();
        noAttempts++;

        // Move the button to a random position
        const maxX = window.innerWidth - btnNo.offsetWidth - 40;
        const maxY = window.innerHeight - btnNo.offsetHeight - 40;
        const newX = Math.max(20, Math.random() * maxX);
        const newY = Math.max(20, Math.random() * maxY);

        btnNo.style.position = 'fixed';
        btnNo.style.left = newX + 'px';
        btnNo.style.top = newY + 'px';
        btnNo.style.zIndex = '200';
        btnNo.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

        // Show counter
        const counter = document.getElementById('noCounter');
        if (counter) {
            counter.classList.add('visible');
            counter.textContent = noAttempts < 3
                ? `The No button ran away ${noAttempts} time${noAttempts > 1 ? 's' : ''}! 😂`
                : '';
        }

        // After 3 tries → show cute guilt message
        if (noAttempts >= 3) {
            showGuiltMessage(noAttempts);
        }

        // Shrink the button progressively
        const shrink = Math.max(0.6, 1 - noAttempts * 0.08);
        const fade = Math.max(0.5, 1 - noAttempts * 0.06);
        btnNo.style.transform = `scale(${shrink})`;
        btnNo.style.opacity = `${fade}`;

        // After enough attempts, convert to Yes
        if (noAttempts >= 6) {
            convertNoToYes();
        }
    }

    function showGuiltMessage(attempt) {
        const questionEl = document.getElementById('proposalQuestion');
        if (!questionEl) return;

        const msgIndex = Math.min(attempt - 3, cuteMessages.length - 1);
        const msg = cuteMessages[msgIndex];

        questionEl.style.transition = 'all 0.4s ease';
        questionEl.style.opacity = '0.5';
        questionEl.style.transform = 'scale(0.97)';

        setTimeout(() => {
            questionEl.innerHTML = `
                <p class="guilt-message">${msg.text}</p>
                <p style="font-size: 2rem; margin-top: 0.8rem;">${msg.emoji}</p>
            `;
            questionEl.style.opacity = '1';
            questionEl.style.transform = 'scale(1)';
            questionEl.style.borderColor = 'rgba(255, 107, 138, 0.3)';
        }, 400);

        // Make the bears look sad
        const brownBear = document.querySelector('.bear-brown .bear-emoji');
        const whiteBear = document.querySelector('.bear-white .bear-emoji');
        if (brownBear) brownBear.style.filter = 'grayscale(0.3) drop-shadow(0 4px 15px rgba(0,0,0,0.3))';
        if (whiteBear) whiteBear.style.filter = 'grayscale(0.3) drop-shadow(0 4px 15px rgba(0,0,0,0.3))';

        // Update counter with cute text
        const counter = document.getElementById('noCounter');
        if (counter) {
            counter.textContent = '🥺 The bears are waiting for your answer...';
        }
    }

    function convertNoToYes() {
        btnNo.querySelector('span').textContent = '💖 Okay fine, YES!';
        btnNo.onclick = handleYes;

        // Remove all event listeners by cloning
        const newBtnNo = btnNo.cloneNode(true);
        newBtnNo.onclick = handleYes;
        btnNo.parentNode.replaceChild(newBtnNo, btnNo);

        // Style it like the Yes button
        newBtnNo.style.position = 'relative';
        newBtnNo.style.left = 'auto';
        newBtnNo.style.top = 'auto';
        newBtnNo.style.background = 'linear-gradient(135deg, #e8456b, #ff6b8a)';
        newBtnNo.style.color = 'white';
        newBtnNo.style.transform = 'scale(1.05)';
        newBtnNo.style.opacity = '1';
        newBtnNo.style.boxShadow = '0 0 30px rgba(232, 69, 107, 0.6)';
        newBtnNo.style.animation = 'pulse 1.5s ease-in-out infinite';
        newBtnNo.style.border = 'none';

        // Reset question to sweet message
        const questionEl = document.getElementById('proposalQuestion');
        if (questionEl) {
            questionEl.innerHTML = `
                <p class="big-question" style="color: #ffd700;">I knew you'd say yes! 💖</p>
                <p style="margin-top: 0.5rem; font-size: 1.1rem;">Go ahead, press the button... 😊</p>
            `;
            questionEl.style.borderColor = 'rgba(255, 215, 0, 0.3)';
        }

        // Make bears happy again
        const brownBear = document.querySelector('.bear-brown .bear-emoji');
        const whiteBear = document.querySelector('.bear-white .bear-emoji');
        if (brownBear) brownBear.style.filter = 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))';
        if (whiteBear) whiteBear.style.filter = 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))';

        // Update counter
        const counter = document.getElementById('noCounter');
        if (counter) {
            counter.textContent = '🐻💖🐻‍❄️ The bears are happy again!';
        }
    }

    // Desktop: run away on hover
    btnNo.addEventListener('mouseover', moveButtonAway);

    // Mobile: run away on touch
    btnNo.addEventListener('touchstart', moveButtonAway);

    // Click
    btnNo.addEventListener('click', moveButtonAway);
}

// ============ CONFETTI ============
function launchConfetti() {
    const colors = ['#ff6b8a', '#d4a853', '#ff8fa3', '#f0c96e', '#e8456b', '#ffd700', '#ff69b4', '#ff1493'];

    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const size = Math.random() * 8 + 5;
            const duration = Math.random() * 3 + 2;
            const shape = Math.random() > 0.5 ? '50%' : '2px';

            confetti.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${shape};
                animation-duration: ${duration}s;
            `;

            const swayX = (Math.random() - 0.5) * 200;
            confetti.animate([
                { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(50vh) translateX(${swayX}px) rotate(360deg)`, opacity: 0.8 },
                { transform: `translateY(100vh) translateX(${swayX * 1.5}px) rotate(720deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });

            document.body.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) confetti.remove();
            }, duration * 1000 + 500);
        }, i * 40);
    }
}

// ============ MUSIC ============
function toggleMusic() {
    const music = document.getElementById('bgMusic');

    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
    } else {
        music.play().then(() => {
            musicPlaying = true;
        }).catch(() => { });
    }

    updateMusicButton();
}

function updateMusicButton() {
    const btn = document.getElementById('musicToggle');
    const icon = document.getElementById('musicIcon');

    if (musicPlaying) {
        icon.textContent = '🔊';
        btn.classList.add('playing');
    } else {
        icon.textContent = '🔇';
        btn.classList.remove('playing');
    }
}
