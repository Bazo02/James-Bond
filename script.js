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
    var countdownElement = document.getElementById('time');
    if (!countdownElement) return;

    var countDownDate = new Date("December 31, 2024 23:59:59").getTime();

    var countdownFunction = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownFunction);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);
}

function checkAvailability(date, messageId) {
    var selectedDate = new Date(date);
    var startDate = new Date("2024-05-18");
    var endDate = new Date("2024-06-30");

    var messageElement = document.getElementById(messageId);
    if (selectedDate >= startDate && selectedDate <= endDate) {
        messageElement.textContent = "Vi har ledige billetter til følgende tider: kl. 10, kl. 12 og kl. 13";
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = "Beklager, ingen utstillinger på angitt dato. Vennligst velg en annen dag.";
        messageElement.style.color = "red";
    }
}

function toggleExhibit(exhibitId) {
    const exhibit = document.getElementById(exhibitId);
    const content = exhibit.querySelectorAll('img, h3, p, label, input, .message');
    content.forEach(element => element.classList.toggle('hidden'));
    const button = exhibit.querySelector('.hide-btn');
    button.classList.toggle('collapsed');
    button.classList.toggle('expanded');
}

document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    filterProductsByCategory();
    document.getElementById('category').addEventListener('change', filterProductsByCategory);
    document.getElementById('price').addEventListener('change', filterProductsByPrice);

    // Nyhetsbrevskjema innsending
    const newsletterForm = document.querySelector('#newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Takk for at du abonnerer på vårt nyhetsbrev!');
        });
    }

    // Sett standard visning av utstillinger til synlig
    const exhibits = document.querySelectorAll('.exhibit');
    exhibits.forEach(exhibit => {
        const content = exhibit.querySelectorAll('img, h3, p, label, input, .message');
        content.forEach(element => element.classList.remove('hidden'));
        const button = exhibit.querySelector('.hide-btn');
        button.classList.add('expanded'); // Sett klassen til expanded som standard
    });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
