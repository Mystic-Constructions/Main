import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Firebase-konfigurasjon
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
const auth = getAuth();
const db = getFirestore();
const realtimeDB = getDatabase(app);  // Initialize Realtime Database

function loadItems() {
    const category = document.getElementById('category').value;
    const tagFilter = document.getElementById('tagFilter').value;
    
    const dataRef = ref(realtimeDB, "/Data/-OM2N2peS-ACaYvP3F0v"); // Bruker fast nøkkel

    get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const categoryData = data[category]; // Hent data under riktig kategori

            if (!categoryData) {
                console.log("No data available for this category:", category);
                return;
            }

            const filteredItems = [];
            for (let key in categoryData) {
                const item = categoryData[key];
                if (tagFilter === '' || tagFilter === 'All' || (item.tags && item.tags.includes(tagFilter))) {
                    filteredItems.push(item);
                }
            }

            displayItems(filteredItems, tagFilter);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function displayItems(items, tagFilter) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = ''; // Clear current items

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Create the card content with conditional display of tags
        let tagsDisplay = '';
        if (tagFilter === 'All') {
            tagsDisplay = `<p>Tags: ${item.tags.join(', ')}</p>`;
        }

        card.innerHTML = `
            <h2>${item.Name}</h2>  <!-- Display the item name -->
            <p>Gems: ${item.Gems}</p>
            <p>Coins: ${item.Coins}</p>
            <p>Obtainable: ${item.Obtainable ? 'Yes' : 'No'}</p>
            ${tagsDisplay}  <!-- Conditionally display tags -->
        `;

        itemsList.appendChild(card);
    });
}

// Vent til dokumentet er lastet før event listeners legges til
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("category").addEventListener("change", loadItems);
    document.getElementById("tagFilter").addEventListener("change", loadItems);
    loadItems(); // Kjør funksjonen ved start
});
