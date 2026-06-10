
import { config } from './config/user.js';
// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { firebaseConfig } from './config/firebaseConfig.js';

// import {
//     getFirestore,
//     collection,
//     addDoc,
//     getDocs
// } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const randomText = document.getElementById('random-text');
const logoImg = document.getElementById('logo-img');
const loader = document.getElementById('loader');

const memberCount = document.getElementById('member-count');

const texts = [
    'RANK1-WATWEIGHT',
    'RANK1-WATWEIGHT',
    'RANK1-WATWEIGHT',
    'RANK1-WATWEIGHT',
    'RANK1-WATWEIGHT'
];

const colors = [
    '#98ff6fff',
    '#6fff98ff',
    '#6f98ffff',
    '#ffb56fff',
    '#ff6f6fff'
];

let index = 0;
let index1 = 0;

export function loadUsers() {
    const rankSection = document.getElementById("rank-section");

    rankSection.innerHTML = "";

    Object.entries(config.allUsers).forEach(([rankName, users]) => {

        // สร้างหัวข้อ Rank
        const title = document.createElement("h2");
        title.className = "founder";
        title.innerHTML = `
            <i class="${config.allUsers[rankName][0].icon}"></i>
            ${rankName.toUpperCase()}
        `;
        title.style.color = config.allUsers[rankName][0].color;

        // สร้าง Container
        const container = document.createElement("div");
        container.id = rankName;

        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("input", () => {
            const searchValue = searchInput.value.toLowerCase();
            const cards = container.querySelectorAll(".cards");
            cards.forEach(card => {
                const name = card.querySelector("h3").textContent.toLowerCase();
                const rank = card.querySelector("p").textContent.toLowerCase();
                if (name.includes(searchValue) || rank.includes(searchValue)) {
                    card.style.display = "block";
                    title.style.display = "block";
                } else {
                    card.style.display = "none";
                    title.style.display = "none";
                }
            });
        });

        // สร้าง User Cards
        users.forEach(user => {
            
            const card = document.createElement("div");
            card.className = "cards";

            card.innerHTML = `
                <div class="card">
                    <img src="${user.image}" alt="${user.name}">
                    <div class="info">
                        <h3>${user.name}</h3>
                        <p>${rankName}</p>
                    </div>

                    <div class="status">
                        <button class="instagram-button" onclick="openIG('${user.instagramURL}')">
                            <i class="fab fa-instagram"></i>
                            Instagram
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

        rankSection.appendChild(title);
        rankSection.appendChild(container);
    });
}





if (randomText) {
    setInterval(() => {
        randomText.textContent = texts[index];
        randomText.style.animation = 'none';
        randomText.style.transition = 'all 0.5s ease';
        randomText.style.color = colors[index];
        randomText.style.filter = `drop-shadow(0 0 5px ${colors[index]})`;
        // setTimeout(() => {
        //     randomText.style.animation = 'glow 2s ease-in-out infinite';
        // }, 10);
        index = (index + 1) % texts.length;
    }, 5000);
}

memberCount.textContent = config.conutMEMBERS;
loadUsers();

function openIG(instagramURL) {
    window.open(instagramURL, '_blank');
}
