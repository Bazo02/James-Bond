function filterProducts() {
    var category = document.getElementById('category').value;
    var products = document.querySelectorAll('.product');

    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}
