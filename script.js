document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".mobile-menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (!menuButton || !navLinks) {
        return;
    }


    /* ==========================================
       MOBILE MENU TOGGLE
       ========================================== */

    menuButton.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("mobile-open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* ==========================================
       CLOSE MENU AFTER CLICKING A LINK
       ========================================== */

    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /* ==========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ========================================== */

    document.addEventListener("click", (event) => {

        const clickedInsideNavigation =
            navLinks.contains(event.target) ||
            menuButton.contains(event.target);

        if (!clickedInsideNavigation) {

            navLinks.classList.remove("mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

});
