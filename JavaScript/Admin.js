import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
        import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

        // Firebase Configuration
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
        const realtimeDB = getDatabase(app);  // Initialize Realtime Database

        // References to HTML elements
        const categorySelect = document.getElementById('category');
        const itemFilterSelect = document.getElementById('itemFilter');
        const itemDetailsDiv = document.getElementById('itemDetails');
        const inputsDiv = document.getElementById('inputs');
        const updateButton = document.getElementById('updateButton');

        let itemsData = {};  // Items Data for Admin Panel

        // Fetch Items Data for selected category
        function fetchItemsData() {
            const category = categorySelect.value;
            const itemsRef = ref(realtimeDB, `${category}`);
            get(itemsRef).then((snapshot) => {
                itemsData = snapshot.val() || {};  // Store the items data
                populateItemFilter();  // Populate item filter dropdown
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });
        }

        // Populate Item Filter Dropdown
        function populateItemFilter() {
            itemFilterSelect.innerHTML = '';  // Clear current items
            const items = Object.keys(itemsData);
            items.forEach((item) => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                itemFilterSelect.appendChild(option);
            });
        }

        // Display Item Details
        function displayItemDetails(itemName) {
            const item = itemsData[itemName];
            if (item) {
                itemDetailsDiv.style.display = 'block';
                inputsDiv.innerHTML = '';  // Clear previous inputs

                // Create input fields for each item property
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

        // Update Item Values
        function updateItemValues(itemName) {
            const updatedValues = {};
            const inputs = document.querySelectorAll('#inputs input');
            inputs.forEach((input) => {
                updatedValues[input.id] = input.value;
            });

            const itemRef = ref(realtimeDB, `${categorySelect.value}/${itemName}`);
            update(itemRef, updatedValues).then(() => {
                alert('Item values updated successfully.');
            }).catch((error) => {
                alert('Error updating item values.');
                console.error(error);
            });
        }

        // Event Listeners
        categorySelect.addEventListener('change', () => {
            fetchItemsData();  // Fetch items for selected category
        });

        itemFilterSelect.addEventListener('change', (event) => {
            const selectedItem = event.target.value;
            displayItemDetails(selectedItem);  // Display details for selected item
        });

        updateButton.addEventListener('click', () => {
            const selectedItem = itemFilterSelect.value;
            updateItemValues(selectedItem);  // Update selected item values
        });

        // Initialize on page load
        fetchItemsData();  // Fetch items when page loads