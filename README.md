**README.md:**
```markdown
# 🌱 Green Earth - Tree Plantation Website

## 📍 Live Demo
🔗 **Live Link:** [https://mim531.github.io/plant-a-tree/](https://mim531.github.io/plant-a-tree/)

## 📋 Project Overview
Green Earth is a responsive tree plantation campaign website where users can browse different tree categories, add trees to cart, view details, and support the campaign.

## ✨ Features

### ✅ Main Requirements Completed
1. **Navbar**
   - Website logo/name on the left
   - Menu items (About, Gallery, Plant a Tree) in center
   - "Plant a Tree" button on the right

2. **Banner Section**
   - Green background with leaf decorations
   - Title: "Plant a Tree, Grow a Future"
   - Subtitle about planting 1 million trees
   - Centered "Get Involved" button

3. **About Campaign Section**
   - Section heading: "About the Campaign"
   - Image on left, descriptive text on right
   - Bullet points: Habitat restoration, Air quality improvement, Community support

4. **Our Impact Section**
   - 3 cards showing campaign statistics:
     - 500K+ Trees Planted
     - 120+ Communities Involved
     - 30+ Countries Reached

5. **Plant a Tree Today Section & Footer**
   - Donation form with Name, Email, Number of Trees
   - Footer with copyright: © 2025 Green Earth. All Rights Reserved.

6. **Responsive Design**
   - Mobile-first responsive design
   - Works on all screen sizes

### ⚙️ Functionalities Implemented
- **Category Loading**: Tree categories loaded dynamically on left side
- **Category Click**: Loads trees of selected category
- **3-Column Card Layout**: Trees displayed in responsive grid
- **Card Contents**: Each card includes:
  - Image
  - Name (clickable for details)
  - Short description
  - Category badge
  - Price
  - Add to Cart button
- **Modal**: Clicking tree name opens modal with full details

### 🧪 Challenges Completed
1. **Add to Cart**
   - Adds tree to cart list
   - Shows tree name, price, and quantity

2. **Total Calculation**
   - Calculates total price of all trees in cart
   - Updates in real-time

3. **Remove from Cart**
   - Click ❌ to remove tree from cart
   - Price automatically deducted from total

4. **Loading Spinner**
   - Shows spinner while loading data
   - Disappears when data is loaded

5. **Active Button State**
   - Highlights active category button
   - Green background for selected category

## 🔗 API Endpoints Used
```
🌴 All Plants: https://openapi.programming-hero.com/api/plants
🌴 All Categories: https://openapi.programming-hero.com/api/categories
🌴 Plants by Category: https://openapi.programming-hero.com/api/category/${id}
🌴 Plant Details: https://openapi.programming-hero.com/api/plant/${id}
```

## 🛠️ Technology Stack
- **HTML5** - Structure and semantics
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Vanilla JavaScript** - Pure JavaScript (no frameworks)



## 🚀 How to Run
1. Download all project files
2. Open `index.html` in any modern web browser
3. No installation or build process required

## 🧠 Technical Questions & Answers

### 1. **Difference between var, let, and const**
- **var**: Function-scoped, can be redeclared and reassigned, hoisted
- **let**: Block-scoped, cannot be redeclared, can be reassigned
- **const**: Block-scoped, cannot be redeclared or reassigned (for primitives)

### 2. **Difference between map(), forEach(), and filter()**
- **map()**: Creates new array by transforming each element
  ```javascript
  const doubled = [1,2,3].map(num => num * 2); // [2,4,6]
  ```
- **forEach()**: Executes function for each element (no return)
  ```javascript
  [1,2,3].forEach(num => console.log(num));
  ```
- **filter()**: Creates new array with elements that pass test
  ```javascript
  const evens = [1,2,3,4].filter(num => num % 2 === 0); // [2,4]
  ```

### 3. **Arrow Functions in ES6**
- Shorter syntax: `(param) => expression`
- No binding of `this` keyword
- Cannot be used as constructors
- Implicit return for single expressions
- Example:
  ```javascript
  // Traditional function
  function add(a, b) { return a + b; }
  
  // Arrow function
  const add = (a, b) => a + b;
  ```

### 4. **Destructuring Assignment in ES6**
- Extracts values from arrays or objects into variables
  ```javascript
  // Array destructuring
  const [first, second] = [1, 2];
  
  // Object destructuring
  const {name, age} = person;
  
  // With default values
  const {name = 'John', age = 25} = user;
  
  // Nested destructuring
  const {address: {city}} = user;
  ```

### 5. **Template Literals in ES6**
- Use backticks (`) instead of quotes
- Multi-line strings without concatenation
- Expression interpolation with `${expression}`
- More readable than string concatenation
  ```javascript
  // Template Literal (ES6)
  const greeting = `Hello ${name}, you are ${age} years old!`;
  
  // String Concatenation (Old way)
  const greeting = 'Hello ' + name + ', you are ' + age + ' years old!';
  ```

## 🎯 JavaScript Implementation Details

### Key Functions in script.js:
```javascript
// Core Functions
loadCategories()        // Loads and displays categories
loadTrees(url)          // Loads trees from API
createPlantCard(plant)  // Creates individual tree card
addItemToCart(plant)    // Adds plant to shopping cart
removeItemFromCart(id)  // Removes item from cart
updateCart()           // Updates cart display and total
loadPlantDetail(id)    // Loads and shows plant details in modal

// Utility Functions
toggleLoadingSpinner()  // Shows/hides loading spinner
createCategoryButton()  // Creates category button element
```

### Global State Variables:
```javascript
let cart = [];                     // Shopping cart items
let currentActiveCategoryButton = null;  // Currently selected category
let allCategoriesData = [];        // All category data from API
```

## 📱 Responsive Design
- **Mobile (< 768px)**: Single column, stacked layout
- **Tablet (768px-1024px)**: 2-column grid for trees
- **Desktop (> 1024px)**: 3-column grid for trees, sidebar categories
- **Sticky cart** on desktop for better UX

## 🎨 Design Elements
- **Color Scheme**:
  - Primary Green: `#166534`
  - Secondary Yellow: `#FFD700`
  - Background: Light gray
- **Typography**: Clean, readable fonts
- **Icons**: Leaf emojis and simple icons
- **Cards**: Shadow effects and hover animations
- **Buttons**: Rounded corners with hover states

## 🔧 Future Improvements
1. Add user authentication system
2. Implement actual payment processing
3. Add search functionality
4. Include tree planting location map
5. Add social sharing features
6. Implement dark mode toggle

## 📄 License
MIT License - Free to use and modify

## 👨‍💻 Developer
Created as a project demonstrating API integration, JavaScript functionality, and responsive web design.

---
**🌍 Join the mission to make Earth greener! Plant a tree today! 🌳**
```
