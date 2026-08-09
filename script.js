document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) {
        return;
    }

    const navbar = document.querySelector(".navbar");

    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-button";
    menuButton.setAttribute("aria-label", "Toggle navigation menu");
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    navbar.querySelector(".nav-container").appendChild(menuButton);

    menuButton.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("mobile-open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

});
