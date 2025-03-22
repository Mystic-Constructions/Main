// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get } from "firebase/database";  // Add Realtime Database imports

const app = firebase.initializeApp({
    apiKey: "AIzaSyBgfQNkEgo3s-MSlOiGTujbNyQUjTnf31Y",
    authDomain: "mystic-constructions.firebaseapp.com",
    databaseURL: "https://mystic-constructions-default-rtdb.firebaseio.com",
    projectId: "mystic-constructions",
    storageBucket: "mystic-constructions.firebasestorage.app",
    messagingSenderId: "44408283200",
    appId: "1:44408283200:web:5265e3c75a560e5f0dffa5",
    measurementId: "G-XC1ESTMZMF"
  });
  
  const database = firebase.database();
  
  function loadItems() {
      const category = document.getElementById('category').value;
      const tagFilter = document.getElementById('tagFilter').value;
      const itemsRef = database.ref(category); // Bruk Firebase ref
  
      itemsRef.get().then((snapshot) => {
          if (snapshot.exists()) {
              const itemsList = snapshot.val();
              const filteredItems = [];
  
              for (let key in itemsList) {
                  const item = itemsList[key];
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
      itemsList.innerHTML = '';
  
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
  
  loadItems();
  