// modules/movieUtils.js
export function loadMovies() {
    const container = document.getElementById("movies-container");
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    container.innerHTML = "<p>Carregando filmes...</p>";
    fetch("http://localhost/cineTech-api/getMovies.php")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(movies => renderMovies(movies))
        .catch(error => {
            console.error("Erro ao carregar filmes:", error);
            container.innerHTML = "<p>Erro ao carregar filmes. Tente novamente mais tarde.</p>";
        });
}

export function renderMovies(movies) {
    const container = document.getElementById("movies-container");
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    container.innerHTML = "";

    if (!movies || movies.length === 0) {
        container.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }

    movies.forEach(movie => {
        const movieCard = `
            <div class='movie-card'>
                <img src="${movie.imagem}" alt="${movie.nome}" class="movie-image">
                <h3>${movie.nome}</h3>
                <p><strong>Descrição:</strong> ${movie.descricao}</p>
                <p><strong>Categoria:</strong> ${movie.categoria}</p>
                <a href="${movie.trailer_link}" target="_blank" class="movie-trailer-link">Ver Trailer</a>
            </div>
        `;
        container.innerHTML += movieCard;
    });
}

export function searchMovies(query) {
    const container = document.getElementById("movies-container");
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    container.innerHTML = "<p>Buscando filmes...</p>";
    fetch(`http://localhost/cineTech-api/getMovies.php?search=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(movies => renderMovies(movies))
        .catch(error => {
            console.error("Erro ao buscar filmes:", error);
            container.innerHTML = "<p>Erro ao buscar filmes. Tente novamente mais tarde.</p>";
        });
}

export function filterMoviesByCategory(category) {
    const container = document.getElementById("movies-container");
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    container.innerHTML = `<p>Carregando filmes da categoria '${category}'...</p>`;
    fetch(`http://localhost/cineTech-api/getMovies.php?categoria=${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(movies => renderMovies(movies))
        .catch(error => {
            console.error("Erro ao filtrar filmes:", error);
            container.innerHTML = `<p>Erro ao carregar filmes da categoria '${category}'.</p>`;
        });
}
