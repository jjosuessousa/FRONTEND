document.addEventListener("DOMContentLoaded", function () {
    const pageTitle = document.title;

    // Página principal
    if (pageTitle === "CineTech - Página Principal") {
        loadMovies();

        const searchButton = document.getElementById("searchButton");
        if (searchButton) {
            searchButton.addEventListener("click", function () {
                const query = document.getElementById("searchInput").value.trim();
                searchMovies(query);
            });
        }

    // Página de administração
    } else if (pageTitle === "Administração - CineTech") {
        const movieForm = document.getElementById("movieForm");

        if (movieForm) {
            movieForm.addEventListener("submit", function (event) {
                event.preventDefault();

                // Captura os dados do formulário
                const formData = new FormData(movieForm);
                const imageFile = document.getElementById("image").files[0];
                
                // Verifica se a imagem foi selecionada antes do envio
                if (!imageFile) {
                    alert("Por favor, selecione uma imagem.");
                    return;
                }

                formData.append("image", imageFile);

                // Faz a requisição ao servidor
                fetch("http://localhost/cineTech-api/addMovie.php", {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Erro HTTP: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (data.success) {
                            alert(data.message || "Filme cadastrado com sucesso!");
                            movieForm.reset();
                            document.getElementById("file-name").textContent = "Nenhum arquivo selecionado";
                            window.location.href = "index.html";
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

function loadMovies() {
    const container = document.getElementById("movies-container");
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    container.innerHTML = "<p>Carregando filmes...</p>";
    fetch("http://localhost/cineTech-api/getMovies.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then((movies) => {
            console.log("Filmes recebidos:", movies);
            renderMovies(movies);
        })
        .catch((error) => {
            console.error("Erro ao carregar filmes:", error);
            container.innerHTML = "<p>Erro ao carregar filmes. Tente novamente mais tarde.</p>";
        });
}

function searchMovies(query) {
    const container = document.getElementById("movies-container");
    if (!container) {
        console.error("O elemento 'movies-container' não foi encontrado!");
        return;
    }

    container.innerHTML = "<p>Buscando filmes...</p>";
    fetch(`http://localhost/cineTech-api/getMovies.php?search=${query}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then((movies) => renderMovies(movies))
        .catch((error) => {
            console.error("Erro ao buscar filmes:", error);
            container.innerHTML = "<p>Erro ao buscar filmes. Tente novamente mais tarde.</p>";
        });
}

function renderMovies(movies) {
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
