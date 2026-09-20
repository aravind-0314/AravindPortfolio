// =====================================================
// MOBILE MENU
// =====================================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});


// =====================================================
// MEDFIND IMAGE GALLERY
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalClose = document.getElementById("modalClose");
    const modalPrev = document.getElementById("modalPrev");
    const modalNext = document.getElementById("modalNext");
    const modalCounter = document.getElementById("modalCounter");

    // Support the new project-gallery-card class
    const cards = document.querySelectorAll(
        ".project-gallery-card, .gallery-card"
    );

    let currentIndex = 0;

    const gallery = [];

    // Collect all images
    cards.forEach(function (card) {

        const image = card.getAttribute("data-image");
        const title = card.getAttribute("data-title");
        const description = card.getAttribute("data-description");

        if (image) {

            gallery.push({
                image: image,
                title: title || "MedFind Project",
                description: description || ""
            });

        }

    });


    // =================================================
    // OPEN IMAGE
    // =================================================

    function openImage(index) {

        if (!modal || gallery.length === 0) {
            return;
        }

        currentIndex = index;

        const item = gallery[currentIndex];

        modalImage.src = item.image;
        modalImage.alt = item.title;

        modalTitle.textContent = item.title;

        modalDescription.textContent = item.description;

        modalCounter.textContent =
            (currentIndex + 1) + " / " + gallery.length;

        modal.classList.add("active");

        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    }


    // =================================================
    // CLICK ON PROJECT IMAGE
    // =================================================

    cards.forEach(function (card, index) {

        card.addEventListener("click", function (event) {

            event.preventDefault();

            event.stopPropagation();

            openImage(index);

        });

    });


    // =================================================
    // NEXT
    // =================================================

    function nextImage() {

        if (gallery.length === 0) {
            return;
        }

        currentIndex++;

        if (currentIndex >= gallery.length) {
            currentIndex = 0;
        }

        openImage(currentIndex);

    }


    // =================================================
    // PREVIOUS
    // =================================================

    function previousImage() {

        if (gallery.length === 0) {
            return;
        }

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = gallery.length - 1;
        }

        openImage(currentIndex);

    }


    // =================================================
    // NEXT BUTTON
    // =================================================

    if (modalNext) {

        modalNext.addEventListener("click", function (event) {

            event.preventDefault();

            event.stopPropagation();

            nextImage();

        });

    }


    // =================================================
    // PREVIOUS BUTTON
    // =================================================

    if (modalPrev) {

        modalPrev.addEventListener("click", function (event) {

            event.preventDefault();

            event.stopPropagation();

            previousImage();

        });

    }


    // =================================================
    // CLOSE
    // =================================================

    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    if (modalClose) {

        modalClose.addEventListener("click", function (event) {

            event.preventDefault();

            event.stopPropagation();

            closeModal();

        });

    }


    // =================================================
    // CLICK OUTSIDE
    // =================================================

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                closeModal();

            }

        });

    }


    // =================================================
    // KEYBOARD
    // =================================================

    document.addEventListener("keydown", function (event) {

        if (!modal || !modal.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeModal();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

    });

});


// =====================================================
// SMOOTH SCROLL
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});