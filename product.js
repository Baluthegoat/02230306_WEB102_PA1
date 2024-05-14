const fs = require('fs');
const path = require('path');

// Path to the JSON file
const productsFilePath = path.join(__dirname, 'products.json');

// Helper function to read the JSON file
const readJSONFile = () => {
  const data = fs.readFileSync(productsFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to the JSON file
const writeJSONFile = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(productsFilePath, jsonData, 'utf8');
};

// CRUD operations

// Create a new product
const createProduct = (name, description, price) => {
  const products = readJSONFile();
  const newProduct = { id: products.length + 1, name, description, price };
  products.push(newProduct);
  writeJSONFile(products);
  return newProduct;
};

// Read all products
const readProducts = () => {
  return readJSONFile();
};

// Update a product
const updateProduct = (id, updatedProduct) => {
  const products = readJSONFile();
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    writeJSONFile(products);
    return products[index];
  }
  return null;
};

// Delete a product
const deleteProduct = (id) => {
  const products = readJSONFile();
  const updatedProducts = products.filter((product) => product.id !== id);
  writeJSONFile(updatedProducts);
};

// Example usage
const newProduct = createProduct('Product 3', 'This is the description for Product 3', 19.99);
console.log('New product created:', newProduct);

const allProducts = readProducts();
console.log('All products:', allProducts);

const updatedProduct = updateProduct(2, { name: 'Updated Product 2', price: 16.99 });
console.log('Updated product:', updatedProduct);

deleteProduct(1);
const remainingProducts = readProducts();
console.log('Remaining products after deletion:', remainingProducts);