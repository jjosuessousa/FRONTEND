document.addEventListener("DOMContentLoaded", function () {
    // Identifica a página atual pelo título
    const pageTitle = document.title;

    if (pageTitle === "CineTech - Página Principal") {
        // Executa funções específicas da página inicial
        loadMovies();

        // Adiciona o evento ao botão de busca
        const searchButton = document.getElementById("searchButton");
        if (searchButton) {
            searchButton.addEventListener("click", function () {
                const query = document.getElementById("searchInput").value;
                searchMovies(query);
            });
        }
    } else if (pageTitle === "Administração - CineTech") {
        // Executa funções específicas da página de administração
        const movieForm = document.getElementById("movieForm");

        if (movieForm) {
            movieForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Evita o reload da página

                const formData = new FormData();
                formData.append("title", document.getElementById("title").value);
                formData.append("description", document.getElementById("description").value);
                formData.append("category", document.getElementById("category").value);
                formData.append("image", document.getElementById("image").files[0]);
                formData.append("trailer", document.getElementById("trailer").value);

                fetch("http://localhost/cineTech-api/addMovie.php", {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            alert(data.message || "Filme cadastrado com sucesso!");
                            movieForm.reset(); // Limpa o formulário
                            document.getElementById("file-name").textContent = "Nenhum arquivo selecionado"; // Reseta o campo de upload
                            window.location.href = "index.html"; // Redireciona para a página inicial
                        } else {
                            alert("Erro ao cadastrar filme: " + (data.error || "Erro desconhecido."));
                        }
                    })
                    .catch((error) => {
                        console.error("Erro ao enviar dados:", error);
                        alert("Ocorreu um erro no envio. Por favor, tente novamente.");
                    });
            });
        }
    } else {
        console.warn("Nenhuma funcionalidade específica para esta página.");
    }
});

// Função para carregar todos os filmes
function loadMovies() {
    const container = document.getElementById("movies-container");

    // Verifica se o elemento existe antes de usar
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    fetch("http://localhost/cineTech-api/getMovies.php")
        .then((response) => response.json())
        .then((movies) => renderMovies(movies))
        .catch((error) => console.error("Erro ao carregar filmes:", error));
}

// Função para buscar filmes com um termo de busca
function searchMovies(query) {
    const container = document.getElementById("movies-container");

    // Verifica se o elemento existe antes de usar
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    fetch(`http://localhost/cineTech-api/getMovies.php?search=${query}`)
        .then((response) => response.json())
        .then((movies) => renderMovies(movies))
        .catch((error) => console.error("Erro ao buscar filmes:", error));
}

// Função para renderizar filmes na página
function renderMovies(movies) {
    const container = document.getElementById("movies-container");

    // Verifica se o elemento existe antes de tentar renderizar
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    container.innerHTML = "";

    if (!movies || movies.length === 0 || movies.message) {
        container.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }

    movies.forEach((movie) => {
        const movieCard = `
            <div class='movie-card'>
                <img src="${movie.imagem}" alt="${movie.nome}">
                <h3>${movie.nome}</h3>
                <p>${movie.descricao}</p>
                <a href="${movie.trailer_link}" target="_blank">Ver Trailer</a>
            </div>
        `;
        container.innerHTML += movieCard;
    });
}
