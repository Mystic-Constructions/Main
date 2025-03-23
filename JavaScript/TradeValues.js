// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get } from "firebase/database";  // Add Realtime Database imports

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgfQNkEgo3s-MSlOiGTujbNyQUjTnf31Y",
  authDomain: "mystic-constructions.firebaseapp.com",
  databaseURL: "https://mystic-constructions-default-rtdb.firebaseio.com",
  projectId: "mystic-constructions",
  storageBucket: "mystic-constructions.firebasestorage.app",
  messagingSenderId: "44408283200",
  appId: "1:44408283200:web:5265e3c75a560e5f0dffa5",
  measurementId: "G-XC1ESTMZMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize the Realtime Database

function loadItems() {
    const category = document.getElementById('category').value;
    const tagFilter = document.getElementById('tagFilter').value;
    
    const dataRef = ref(database, "Data"); // Referanse til hovednoden
    
    get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const firstKey = Object.keys(data)[0]; // Finn ID-en dynamisk
            const categoryData = data[firstKey][category]; // Hent data under riktig kategori

            if (!categoryData) {
                console.log("No data available for this category");
                return;
            }

            const filteredItems = [];
            for (let key in categoryData) {
                const item = categoryData[key];
                if (tagFilter === '' || item.tags.includes(tagFilter)) {
                    filteredItems.push(item);
                }
            }

            displayItems(filteredItems);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function displayItems(items) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = ''; // Clear current items

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${item.name}</h2>
            <p>Gems: ${item.gems}</p>
            <p>Coins: ${item.coins}</p>
            <p>Obtainable: ${item.obtainable ? 'Yes' : 'No'}</p>
            <p>Tags: ${item.tags.join(', ')}</p>
        `;
        itemsList.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("category").addEventListener("change", loadItems);
    document.getElementById("tagFilter").addEventListener("change", loadItems);
    loadItems(); // Kjør funksjonen ved start
});

// Load items initially
window.loadItems = loadItems;
