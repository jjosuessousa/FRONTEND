document.addEventListener("DOMContentLoaded", () => {
    carregarFilmes();
    document.getElementById("categoriaFiltro").addEventListener("change", carregarFilmes);
});

function carregarFilmes() {
    const categoria = document.getElementById("categoriaFiltro").value;

    fetch("http://localhost/trabalho/public/filmes")
        .then(response => {
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
        .then(filmes => {
            const filmesContainer = document.getElementById("filmesContainer");
            filmesContainer.innerHTML = ""; // Limpa o conteúdo anterior
            filmes.forEach(filme => {
                if (!categoria || filme.categoria === categoria) {
                    const filmeElement = document.createElement("div");
                    filmeElement.classList.add("filme");
                    
                    filmeElement.innerHTML = `
                        <img src="${filme.imagem}" alt="${filme.titulo}">
                        <h3>${filme.titulo}</h3>
                        <p>${filme.descricao}</p>
                        <a href="lancamentos.html?id=${filme.id}">Ver mais</a>
                    `;

                    filmesContainer.appendChild(filmeElement);
                }
            });
        })
        .catch(error => console.error("Erro ao carregar filmes:", error));
}
