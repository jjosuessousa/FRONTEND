// modules/adminPage.js
export function initializeAdminPage() {
    const movieForm = document.getElementById("movieForm");

    if (movieForm) {
        movieForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(movieForm);
            const imageFile = document.getElementById("image").files[0];

            if (!imageFile) {
                alert("Por favor, selecione uma imagem.");
                return;
            }

            formData.append("image", imageFile);

            fetch("http://localhost/cineTech-api/addMovie.php", {
                method: "POST",
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        alert(data.message || "Filme cadastrado com sucesso!");
                        movieForm.reset();
                        window.location.href = "index.html";
                    } else {
                        alert("Erro ao cadastrar filme: " + (data.error || "Erro desconhecido."));
                    }
                })
                .catch(error => {
                    console.error("Erro ao enviar dados:", error);
                    alert("Ocorreu um erro no envio. Por favor, tente novamente.");
                });
        });
    }
}
