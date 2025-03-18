// modules/listMoviesPage.js
import { loadMovies } from './movieUtils.js';

export function initializeListMoviesPage() {
    loadMovies(); // Carrega todos os filmes
}
