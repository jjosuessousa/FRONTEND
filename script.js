document.addEventListener("DOMContentLoaded", function () {
    const pageTitle = document.title;

    if (pageTitle === "CineTech - Página Principal") {
        import('./modules/homePage.js').then(module => module.initializeHomePage());
    } else if (pageTitle === "Listagem de Todos os Filmes") {
        import('./modules/listMoviesPage.js').then(module => module.initializeListMoviesPage());
    } else if (pageTitle === "Administração - CineTech") {
        import('./modules/adminPage.js').then(module => module.initializeAdminPage());
    } else {
        console.warn("Nenhuma funcionalidade específica para esta página.");
    }
});
