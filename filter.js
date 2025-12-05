function filterCSS() {
    const query = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('.css-card');

    cards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        if (title.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByColor() {
    const selectedColor = document.getElementById('color-select').value.toLowerCase();
    const cards = document.querySelectorAll('.css-card');

    cards.forEach(card => {
        const filters = card.getAttribute('data-filters').toLowerCase().split(',');
        if (!selectedColor || filters.includes(selectedColor)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
