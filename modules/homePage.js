// modules/homePage.js
import { loadMovies, renderMovies, searchMovies, filterMoviesByCategory } from './movieUtils.js';

export function initializeHomePage() {
    loadMovies(); // Carrega os filmes

    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", function () {
            const query = document.getElementById("searchInput").value.trim();
            searchMovies(query);
        });
    }

    const categoryButtons = document.querySelectorAll(".category-button");
    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener("click", function () {
                const category = this.getAttribute("data-category");
                filterMoviesByCategory(category);
            });
        });
    }
}
