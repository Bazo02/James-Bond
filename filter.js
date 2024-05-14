function filterProductsByCategory() {
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

function filterProductsByPrice() {
    var priceRange = document.getElementById('price').value;
    var products = document.querySelectorAll('.product');

    products.forEach(product => {
        var price = parseInt(product.querySelector('p:last-of-type').textContent.replace(' kr', ''), 10);
        switch (priceRange) {
            case '0-500':
                product.style.display = price <= 500 ? '' : 'none';
                break;
            case '500-1000':
                product.style.display = (price > 500 && price <= 1000) ? '' : 'none';
                break;
            case '1000+':
                product.style.display = price > 1000 ? '' : 'none';
                break;
            default:
                product.style.display = '';
                break;
        }
    });
}

function startCountdown() {
    var countdownElement = document.getElementById('countdown');
    var countDownDate = new Date("May 17, 2024 15:00:00").getTime();

    var countdownFunction = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Tilbud slutter om: ${days}d ${hours}h ${minutes}m ${seconds}s `;

        if (distance < 0) {
            clearInterval(countdownFunction);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    filterProductsByCategory();
    document.getElementById('category').addEventListener('change', filterProductsByCategory);
    document.getElementById('price').addEventListener('change', filterProductsByPrice);
});
