/* --- WEAPON DATA --- */
const weaponDB = {
    vandal: {
        title: "VANDAL",
        desc: "High damage, high recoil. Lethal at any range with precise aim.",
        stats: { dmg: "90%", fr: "65%", pen: "75%" },
        img: "images/vandal.png" 
    },
    phantom: {
        title: "PHANTOM",
        desc: "Silenced, lower recoil. Devastating at close range with spray control.",
        stats: { dmg: "80%", fr: "85%", pen: "60%" },
        img: "images/phantom.png"
    },
    operator: {
        title: "OPERATOR",
        desc: "One shot, one kill. The most expensive and powerful weapon in the arsenal.",
        stats: { dmg: "100%", fr: "10%", pen: "100%" },
        img: "images/operator.png"
    },
    sheriff: {
        title: "SHERIFF",
        desc: "A high-impact revolver. Rewards accuracy with massive headshot damage.",
        stats: { dmg: "75%", fr: "40%", pen: "80%" },
        img: "images/sheriff.png"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CURSOR
    const cursor = document.getElementById('cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        });
        document.querySelectorAll('.hover-target').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // 2. PARALLAX
    const video = document.getElementById('bgVideo');
    if(video) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            video.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }

    // 3. SCROLL REVEAL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// --- FUNCTIONS ---
function selectWeapon(key, btnElement) {
    const titleEl = document.getElementById('w-title');
    if (!titleEl) return; 

    const data = weaponDB[key];
    if(!data) return;

    titleEl.innerText = data.title;
    document.getElementById('w-desc').innerText = data.desc;
    
    const img = document.getElementById('w-img');
    img.style.opacity = 0;
    setTimeout(() => {
        img.src = data.img;
        img.style.opacity = 1;
    }, 200);

    document.getElementById('bar-dmg').style.width = data.stats.dmg;
    document.getElementById('bar-fr').style.width = data.stats.fr;
    document.getElementById('bar-pen').style.width = data.stats.pen;

    document.querySelectorAll('.weapon-btn').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');
}