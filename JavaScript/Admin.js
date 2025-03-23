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

// References to the HTML elements
const categorySelect = document.getElementById('category');
const itemFilterSelect = document.getElementById('itemFilter');
const itemDetailsDiv = document.getElementById('itemDetails');
const inputsDiv = document.getElementById('inputs');
const updateButton = document.getElementById('updateButton');

// Data structure for items
let currentCategory = 'Pets';  // Default category
let itemsData = {};

// Fetch items data from Firebase
function fetchItemsData() {
    const category = categorySelect.value;
    const itemsRef = realtimeDB.ref(`${category}`);
    itemsRef.once('value', (snapshot) => {
        itemsData = snapshot.val() || {};
        populateItemFilter();
    });
}

// Populate item dropdown based on category selection
function populateItemFilter() {
    itemFilterSelect.innerHTML = '';
    const items = itemsData ? Object.keys(itemsData) : [];
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        itemFilterSelect.appendChild(option);
    });
}

// Display item details when selected
function displayItemDetails(itemName) {
    const item = itemsData[itemName];
    if (item) {
        itemDetailsDiv.style.display = 'block';
        inputsDiv.innerHTML = '';
        Object.keys(item).forEach((key) => {
            const div = document.createElement('div');
            div.style.marginBottom = '10px';
            
            const label = document.createElement('label');
            label.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ':';
            div.appendChild(label);

            const input = document.createElement('input');
            input.type = 'text';
            input.value = item[key];
            input.id = key;
            div.appendChild(input);

            inputsDiv.appendChild(div);
        });
    }
}

// Update item values
function updateItemValues(itemName) {
    const updatedValues = {};
    const inputs = document.querySelectorAll('#inputs input');
    inputs.forEach(input => {
        updatedValues[input.id] = input.value;
    });

    const itemRef = realtimeDB.ref(`${currentCategory}/${itemName}`);
    itemRef.update(updatedValues, (error) => {
        if (error) {
            alert('Error updating item values.');
        } else {
            alert('Item values updated successfully.');
        }
    });
}

// Event listeners
categorySelect.addEventListener('change', (event) => {
    currentCategory = event.target.value;
    fetchItemsData();
});

itemFilterSelect.addEventListener('change', (event) => {
    const selectedItem = event.target.value;
    displayItemDetails(selectedItem);
});

updateButton.addEventListener('click', () => {
    const selectedItem = itemFilterSelect.value;
    updateItemValues(selectedItem);
});

// Initialize on page load
fetchItemsData();
