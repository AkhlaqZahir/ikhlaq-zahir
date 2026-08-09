document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       GET ELEMENTS
       ========================================= */

    const menuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    const navigationMenu =
        document.getElementById(
            "navigationMenu"
        );


    /* =========================================
       SAFETY CHECK
       ========================================= */

    if (
        !menuButton ||
        !navigationMenu
    ) {

        console.error(
            "Mobile navigation elements were not found."
        );

        return;

    }


    /* =========================================
       OPEN / CLOSE MOBILE MENU
       ========================================= */

    menuButton.addEventListener(
        "click",
        function () {


            const isOpen =
                navigationMenu.classList.toggle(
                    "mobile-open"
                );


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

        }
    );


    /* =========================================
       CLOSE MENU AFTER CLICKING LINK
       ========================================= */

    const navigationLinks =
        navigationMenu.querySelectorAll(
            "a"
        );


    navigationLinks.forEach(
        function (link) {


            link.addEventListener(
                "click",
                function () {


                    navigationMenu.classList.remove(
                        "mobile-open"
                    );


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        }
    );


    /* =========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ========================================= */

    document.addEventListener(
        "click",
        function (event) {


            const clickedInsideMenu =
                navigationMenu.contains(
                    event.target
                );


            const clickedButton =
                menuButton.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {


                navigationMenu.classList.remove(
                    "mobile-open"
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }
    );


});
