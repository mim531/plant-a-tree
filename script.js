// --- API Endpoints ---
const ALL_PLANTS_URL = "https://openapi.programming-hero.com/api/plants";
const CATEGORIES_URL = "https://openapi.programming-hero.com/api/categories";
const CATEGORY_BASE_URL = "https://openapi.programming-hero.com/api/category/";
const PLANT_DETAIL_BASE_URL = "https://openapi.programming-hero.com/api/plant/";

// --- DOM Elements ---
const categoriesContainer = document.getElementById('categories-container');
const treesContainer = document.getElementById('trees-container');
const loadingSpinner = document.getElementById('loading-spinner');
const cartList = document.getElementById('cart-list');
const cartTotalElement = document.getElementById('cart-total');
const detailModal = document.getElementById('plant_detail_modal');
const modalContent = document.getElementById('modal-content');

// --- Global State ---
let cart = [];
let currentActiveCategoryButton = null;
let allPlantsData = [];
let allCategoriesData = [];

// --- Utility Functions ---

// Show/hide loading spinner
const toggleLoadingSpinner = (isLoading) => {
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
        treesContainer.classList.add('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
        treesContainer.classList.remove('hidden');
    }
}

// Update cart display
const updateCart = () => {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    cartTotalElement.textContent = total.toFixed(2);

    cartList.innerHTML = '';
    
    if (cart.length === 0) {
        cartList.innerHTML = '<li class="text-sm text-gray-500 py-1">No items added yet.</li>';
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item', 'text-sm');
        
        const itemInfo = document.createElement('span');
        itemInfo.innerHTML = `${item.name} <span class="text-green-primary font-semibold">$${item.price.toFixed(2)} × ${item.quantity}</span>`;
        li.appendChild(itemInfo);

        const removeButton = document.createElement('button');
        removeButton.innerHTML = '✕';
        removeButton.classList.add('btn', 'btn-xs', 'btn-ghost', 'text-red-500', 'ml-2');
        removeButton.addEventListener('click', () => removeItemFromCart(item.id));
        li.appendChild(removeButton);

        cartList.appendChild(li);
    });
}

// Add item to cart
const addItemToCart = (plant) => {
    const price = parseFloat(plant.price) || 0;
    
    const existingItem = cart.find(item => item.id === plant.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const cartItem = {
            id: plant.id,
            name: plant.plant_name || plant.name,
            price: price,
            quantity: 1
        };
        cart.push(cartItem);
    }
    updateCart();
}

// Remove item from cart
const removeItemFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// --- Category Functions ---

// Load categories EXACTLY like screenshot
const loadCategories = async () => {
    try {
        // First try to load from API
        const response = await fetch(CATEGORIES_URL);
        const data = await response.json();
        allCategoriesData = data.data || [];
    } catch (error) {
        console.error('Error loading categories from API:', error);
        allCategoriesData = [];
    }
    
    // Create categories EXACTLY like screenshot
    createCategoriesList();
    
    // Load plants
    await loadAllPlants();
}

// Create categories list matching screenshot exactly
const createCategoriesList = () => {
    categoriesContainer.innerHTML = '';
    
    // Exact categories from your screenshot
    const categories = [
        { name: "All Trees", isMain: true, id: "all" },
        { name: "Fruit Trees", isMain: false },
        { name: "Flowering Trees", isMain: false },
        { name: "Shade Trees", isMain: false },
        { name: "Medicinal Trees", isMain: false },
        { name: "Timber Trees", isMain: false },
        { name: "Evergreen Trees", isMain: false },
        { name: "Ornamental Plants", isMain: false },
        { name: "Bamboo", isMain: false },
        { name: "Climbers", isMain: false },
        { name: "Aquatic Plants", isMain: false }
    ];
    
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        
        if (category.isMain) {
            categoryBtn.classList.add('category-btn', 'category-all', 'text-gray-700');
            categoryBtn.innerHTML = `<span class="text-green-primary mr-2">●</span> ${category.name}`;
        } else {
            categoryBtn.classList.add('category-btn', 'category-sub', 'text-gray-600');
            categoryBtn.textContent = category.name;
        }
        
        categoryBtn.dataset.categoryName = category.name;
        categoryBtn.dataset.categoryId = category.id || '';
        
        categoryBtn.addEventListener('click', () => {
            // Update active state
            if (currentActiveCategoryButton) {
                currentActiveCategoryButton.classList.remove('active-category');
            }
            
            categoryBtn.classList.add('active-category');
            currentActiveCategoryButton = categoryBtn;
            
            if (category.name === "All Trees") {
                displayPlants(allPlantsData);
            } else {
                // Try to filter by category
                filterPlantsByCategory(category.name);
            }
        });
        
        categoriesContainer.appendChild(categoryBtn);
    });
    
    // Set "All Trees" as active by default
    const allTreesBtn = categoriesContainer.querySelector('[data-category-name="All Trees"]');
    if (allTreesBtn) {
        allTreesBtn.classList.add('active-category');
        currentActiveCategoryButton = allTreesBtn;
    }
}

// Load all plants from API
const loadAllPlants = async () => {
    toggleLoadingSpinner(true);
    
    try {
        const response = await fetch(ALL_PLANTS_URL);
        const data = await response.json();
        
        allPlantsData = data.data || [];
        
        if (allPlantsData.length > 0) {
            displayPlants(allPlantsData);
        } else {
            // If API returns empty, use mock data
            loadMockPlants();
        }
    } catch (error) {
        console.error('Error loading plants:', error);
        // Use mock data if API fails
        loadMockPlants();
    }
}

// Mock data for testing
const loadMockPlants = () => {
    allPlantsData = [
        {
            id: 1,
            plant_name: "Mango Tree",
            price: 300,
            short_description: "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Ideal for tropical climates.",
            category: "Fruit Trees",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
            description: "The mango tree is a tropical tree that produces the mango fruit. It can grow up to 35-40 meters tall. The tree is long-lived, with some specimens known to be over 300 years old and still producing fruit."
        },
        {
            id: 2,
            plant_name: "Apple Tree",
            price: 250,
            short_description: "Produces sweet and crisp apples. Perfect for temperate climates and home gardens.",
            category: "Fruit Trees",
            image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop",
            description: "Apple trees are deciduous trees in the rose family best known for their sweet, pomaceous fruit. They are cultivated worldwide."
        },
        {
            id: 3,
            plant_name: "Rose Plant",
            price: 150,
            short_description: "Beautiful flowering plant with fragrant roses in various colors. Perfect for gardens.",
            category: "Flowering Trees",
            image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=300&fit=crop",
            description: "Roses are woody perennial flowering plants with over three hundred species and tens of thousands of cultivars."
        },
        {
            id: 4,
            plant_name: "Oak Tree",
            price: 500,
            short_description: "Large, sturdy tree that provides excellent shade and grows for centuries.",
            category: "Shade Trees",
            image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop",
            description: "Oak trees are known for their strength and longevity. They can live for hundreds of years and provide habitat for many species."
        },
        {
            id: 5,
            plant_name: "Neem Tree",
            price: 200,
            short_description: "Known for its medicinal properties and air purification capabilities.",
            category: "Medicinal Trees",
            image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4a?w=400&h=300&fit=crop",
            description: "Neem tree is known for its medicinal properties. Every part of the tree is used in traditional medicine."
        },
        {
            id: 6,
            plant_name: "Teak Tree",
            price: 450,
            short_description: "Premium timber tree known for its durability and water resistance.",
            category: "Timber Trees",
            image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop",
            description: "Teak is a tropical hardwood tree species in the family Lamiaceae. It is known for its high quality timber."
        },
        {
            id: 7,
            plant_name: "Pine Tree",
            price: 350,
            short_description: "Evergreen tree that stays green throughout the year.",
            category: "Evergreen Trees",
            image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=400&h=300&fit=crop",
            description: "Pine trees are evergreen, coniferous resinous trees in the genus Pinus. They are found throughout the world."
        },
        {
            id: 8,
            plant_name: "Bonsai Tree",
            price: 180,
            short_description: "Ornamental miniature tree grown in containers.",
            category: "Ornamental Plants",
            image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=300&fit=crop",
            description: "Bonsai is a Japanese art form using cultivation techniques to produce small trees in containers."
        },
        {
            id: 9,
            plant_name: "Bamboo",
            price: 120,
            short_description: "Fast-growing plant that's both decorative and useful.",
            category: "Bamboo",
            image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop",
            description: "Bamboo is a group of woody perennial grasses. It is one of the fastest-growing plants in the world."
        },
        {
            id: 10,
            plant_name: "Ivy Plant",
            price: 90,
            short_description: "Climbing plant that adds greenery to walls and fences.",
            category: "Climbers",
            image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=300&fit=crop",
            description: "Ivy is a genus of 12-15 species of evergreen climbing or ground-creeping woody plants."
        },
        {
            id: 11,
            plant_name: "Water Lily",
            price: 110,
            short_description: "Aquatic plant with beautiful floating flowers.",
            category: "Aquatic Plants",
            image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=400&h=300&fit=crop",
            description: "Water lilies are aquatic plants with large, round leaves that float on the water surface."
        },
        {
            id: 12,
            plant_name: "Orange Tree",
            price: 280,
            short_description: "Citrus tree that produces sweet oranges. Perfect for sunny locations.",
            category: "Fruit Trees",
            image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop",
            description: "Orange trees are citrus trees with sweet, juicy fruits. They thrive in warm climates."
        }
    ];
    
    displayPlants(allPlantsData);
}

// Filter plants by category
const filterPlantsByCategory = (categoryName) => {
    if (!allPlantsData.length) return;
    
    // Clean category name for comparison
    const cleanCategoryName = categoryName.toLowerCase()
        .replace(' trees', '')
        .replace(' plants', '')
        .trim();
    
    const filteredPlants = allPlantsData.filter(plant => {
        const plantCategory = (plant.category || '').toLowerCase();
        
        // Check for exact match or partial match
        if (cleanCategoryName === "fruit") {
            return plantCategory.includes('fruit') || 
                   plant.plant_name?.toLowerCase().includes('mango') ||
                   plant.plant_name?.toLowerCase().includes('apple') ||
                   plant.plant_name?.toLowerCase().includes('orange');
        } else if (cleanCategoryName === "flowering") {
            return plantCategory.includes('flower') || 
                   plant.plant_name?.toLowerCase().includes('rose');
        } else if (cleanCategoryName === "shade") {
            return plantCategory.includes('shade') || 
                   plant.plant_name?.toLowerCase().includes('oak');
        } else if (cleanCategoryName === "medicinal") {
            return plantCategory.includes('medicinal') || 
                   plant.plant_name?.toLowerCase().includes('neem');
        } else if (cleanCategoryName === "timber") {
            return plantCategory.includes('timber') || 
                   plant.plant_name?.toLowerCase().includes('teak');
        } else if (cleanCategoryName === "evergreen") {
            return plantCategory.includes('evergreen') || 
                   plant.plant_name?.toLowerCase().includes('pine');
        } else if (cleanCategoryName === "ornamental") {
            return plantCategory.includes('ornamental') || 
                   plant.plant_name?.toLowerCase().includes('bonsai');
        } else if (cleanCategoryName === "bamboo") {
            return plantCategory.includes('bamboo') || 
                   plant.plant_name?.toLowerCase().includes('bamboo');
        } else if (cleanCategoryName === "climbers") {
            return plantCategory.includes('climber') || 
                   plant.plant_name?.toLowerCase().includes('ivy');
        } else if (cleanCategoryName === "aquatic") {
            return plantCategory.includes('aquatic') || 
                   plant.plant_name?.toLowerCase().includes('water') ||
                   plant.plant_name?.toLowerCase().includes('lily');
        }
        
        return plantCategory.includes(cleanCategoryName);
    });
    
    if (filteredPlants.length > 0) {
        displayPlants(filteredPlants);
    } else {
        // If no specific category found, show all plants
        displayPlants(allPlantsData);
    }
}

// Display plants in the container
const displayPlants = (plants) => {
    treesContainer.innerHTML = '';
    
    if (!plants || plants.length === 0) {
        treesContainer.innerHTML = '<p class="text-xl text-gray-500 font-semibold col-span-full text-center py-10">No plants found.</p>';
        toggleLoadingSpinner(false);
        return;
    }
    
    plants.forEach(plant => {
        const card = createPlantCard(plant);
        treesContainer.appendChild(card);
    });
    
    toggleLoadingSpinner(false);
}

// Create plant card element
const createPlantCard = (plant) => {
    const { 
        id, 
        plant_name: name, 
        short_description: description, 
        category: categoryName, 
        price, 
        image: plantImage 
    } = plant;

    const finalName = name || 'Unknown Plant';
    const finalImage = plantImage || 'https://images.unsplash.com/photo-1562613539-e0c5c1e9e2c7?w=400&h=300&fit=crop';
    const finalDescription = description || 'A beautiful tree that contributes to our environment.';
    const finalPrice = price || '0.00';
    const finalCategory = categoryName || 'General';
    
    const card = document.createElement('div');
    card.classList.add('plant-card', 'card', 'bg-base-100', 'shadow-xl', 'overflow-hidden');
    
    card.innerHTML = `
        <figure class="h-48 overflow-hidden bg-gray-100">
            <img src="${finalImage}" alt="${finalName}" 
                 class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
        </figure>
        <div class="card-body p-5">
            <h2 class="card-title text-lg font-bold text-black cursor-pointer hover:text-green-primary transition"
                onclick="loadPlantDetail('${id}')">
                ${finalName}
            </h2>
            
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${finalDescription}</p>
            
            <div class="flex justify-between items-center mt-auto">
                <div class="badge badge-outline text-xs text-green-primary border-green-primary font-medium">
                    ${finalCategory}
                </div>
                <p class="text-2xl font-extrabold text-black">$${finalPrice}</p>
            </div>
            
            <div class="card-actions mt-4">
                <button id="add-to-cart-${id}" 
                        class="btn bg-green-primary btn-md w-full text-white font-bold hover:bg-green-700 transition">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    const addToCartButton = card.querySelector(`#add-to-cart-${id}`);
    addToCartButton.addEventListener('click', () => {
        addItemToCart(plant);
    });

    return card;
}

// Load plant details for modal
const loadPlantDetail = async (id) => {
    modalContent.innerHTML = `
        <div class="text-center">
            <span class="loading loading-spinner loading-md text-green-primary"></span>
            <p class="text-gray-700 mt-2">Loading details...</p>
        </div>
    `;
    
    detailModal.showModal();

    try {
        const response = await fetch(`${PLANT_DETAIL_BASE_URL}${id}`);
        const data = await response.json();
        const plant = data.data;

        if (plant) {
            modalContent.innerHTML = `
                <h3 class="font-bold text-3xl mb-4 text-green-primary">${plant.plant_name || 'Plant'}</h3>
                <div class="flex flex-col md:flex-row gap-6">
                    <figure class="md:w-1/3 h-48 overflow-hidden bg-gray-100 rounded-lg">
                        <img src="${plant.image || 'https://images.unsplash.com/photo-1562613539-e0c5c1e9e2c7?w=400&h=300&fit=crop'}" 
                             alt="${plant.plant_name}" class="w-full h-full object-cover">
                    </figure>
                    <div class="md:w-2/3 text-left">
                        <p class="text-lg font-semibold text-red-600 mb-2">Price: $${plant.price || '0.00'}</p>
                        <p class="text-gray-700 mb-4">${plant.description || plant.short_description || 'No description available.'}</p>
                        <ul class="space-y-2 text-gray-600">
                            <li><strong class="text-green-primary">Category:</strong> ${plant.category || 'N/A'}</li>
                            <li><strong class="text-green-primary">Life Span:</strong> ${plant.life_span || 'N/A'}</li>
                            <li><strong class="text-green-primary">Native Region:</strong> ${plant.native_region || 'N/A'}</li>
                            <li><strong class="text-green-primary">Water Needs:</strong> ${plant.water_needs || 'N/A'}</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-action mt-6">
                    <button class="btn bg-green-primary text-white hover:bg-green-700" onclick="addItemToCartFromDetail(${JSON.stringify(plant).replace(/"/g, '&quot;')})">
                        Add to Cart
                    </button>
                </div>
            `;
        } else {
            modalContent.innerHTML = '<p class="text-red-500 text-lg">Could not load plant details.</p>';
        }
    } catch (error) {
        console.error('Error loading plant detail:', error);
        // Fallback to mock data
        const mockPlant = allPlantsData.find(p => p.id == id);
        if (mockPlant) {
            modalContent.innerHTML = `
                <h3 class="font-bold text-3xl mb-4 text-green-primary">${mockPlant.plant_name}</h3>
                <div class="flex flex-col md:flex-row gap-6">
                    <figure class="md:w-1/3 h-48 overflow-hidden bg-gray-100 rounded-lg">
                        <img src="${mockPlant.image}" alt="${mockPlant.plant_name}" class="w-full h-full object-cover">
                    </figure>
                    <div class="md:w-2/3 text-left">
                        <p class="text-lg font-semibold text-red-600 mb-2">Price: $${mockPlant.price || '0.00'}</p>
                        <p class="text-gray-700 mb-4">${mockPlant.description || mockPlant.short_description || 'No description available.'}</p>
                        <ul class="space-y-2 text-gray-600">
                            <li><strong class="text-green-primary">Category:</strong> ${mockPlant.category || 'N/A'}</li>
                            <li><strong class="text-green-primary">Life Span:</strong> 20-30 years</li>
                            <li><strong class="text-green-primary">Native Region:</strong> Tropical regions</li>
                            <li><strong class="text-green-primary">Water Needs:</strong> Moderate</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-action mt-6">
                    <button class="btn bg-green-primary text-white hover:bg-green-700" onclick="addItemToCartFromDetail(${JSON.stringify(mockPlant).replace(/"/g, '&quot;')})">
                        Add to Cart
                    </button>
                </div>
            `;
        } else {
            modalContent.innerHTML = '<p class="text-red-500 text-lg">Failed to load plant details.</p>';
        }
    }
}

// Add to cart from modal
const addItemToCartFromDetail = (plant) => {
    addItemToCart(plant);
    detailModal.close();
}

// --- Initialize Application ---
const init = () => {
    loadCategories();
    updateCart();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make functions available globally
window.loadPlantDetail = loadPlantDetail;
window.removeItemFromCart = removeItemFromCart;
window.add