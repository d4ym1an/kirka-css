document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".css").forEach((item) => {
        item.children[4].children[0].dataset["url"] = item.children[1].href;
    });
    const codes = document.querySelectorAll(".code");
    const downloads = document.querySelectorAll(".download");
    const copies = document.querySelectorAll(".copy");
    const cred = document.querySelectorAll(".creds");
    const favoriteButtons = document.querySelectorAll(".favorite button");
    const favorites = document.querySelectorAll(".favorite");

    codes.forEach((code) => {
        code.addEventListener("mouseenter", () => {
            showPopup(code, "View the source code");
        });
        code.addEventListener("mouseleave", hidePopup);
    });

    downloads.forEach((download) => {
        download.addEventListener("mouseenter", () => {
            showPopup(download, "Download CSS");
        });
        download.addEventListener("mouseleave", hidePopup);
    });

    copies.forEach((copy) => {
        copy.addEventListener("mouseenter", () => {
            showPopup(copy, "Copy CSS (Thanks Sheriff)");
        });
        copy.addEventListener("mouseleave", hidePopup);
        copy.addEventListener("click", () => {
            copyToClipboard(copy.dataset["url"]);
            showPopup(copy, "CSS copied to clipboard!");
        });
    });

    cred.forEach((creds) => {
        creds.addEventListener("mouseenter", () => {
            showPopup(creds, "Thank you to mitsuha.me for making this css! (discord)");
        });    creds.addEventListener("mouseleave", hidePopup);
    });

    favorites.forEach((favorite) => {
        favorite.addEventListener("mouseenter", () => {
            showPopup(favorite, "Favorite this CSS");
        });    
        favorite.addEventListener("mouseleave", hidePopup);
    });

    favoriteButtons.forEach((button) => {
        button.innerHTML = `<img src="./favorite.svg" alt="Favorite">`; // Ensure correct path to favorite.svg
        button.addEventListener("click", () => {
            const isFavorited = button.dataset.favorited === "true";
            button.dataset.favorited = !isFavorited;
            button.innerHTML = isFavorited
                ? `<img src="./favorite.svg" alt="Favorite">`
                : `<img src="./favoriteFill.svg" alt="Favorited">`;

            const card = button.closest(".css-card");
            if (!isFavorited) {
                card.dataset.filters += ",favorite";
            } else {
                card.dataset.filters = card.dataset.filters
                    .split(",")
                    .filter((filter) => filter !== "favorite")
                    .join(",");
            }
        });

        button.addEventListener("mouseenter", () => {
            const isFavorited = button.dataset.favorited === "true";
            const message = isFavorited ? "Unfavorite this CSS" : "Favorite this CSS";
            showPopup(button, message);
        });

        button.addEventListener("mouseleave", hidePopup);
    });
});

function showPopup(element, message) {
    // Remove any existing popup for this element to prevent duplicates
    hidePopup({ target: element });

    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = message;
    document.body.appendChild(popup);

    const rect = element.getBoundingClientRect();
    const popupWidth = popup.offsetWidth;

    // Adjust positioning to display below the button
    popup.style.position = "absolute";
    popup.style.left = `${rect.left + window.scrollX + (rect.width - popupWidth) / 2}px`;
    popup.style.top = `${rect.bottom + window.scrollY + 10}px`; // Position below the element with some spacing
    popup.style.zIndex = "1000";

    // Associate the popup with the element
    element.dataset.popupId = popup.className;

    // Add the 'show' class to make the popup visible
    requestAnimationFrame(() => {
        popup.classList.add("show");
    });
}

function hidePopup(event) {
    const element = event.target;
    const popup = document.querySelector(`.${element.dataset.popupId}`);
    if (popup) {
        popup.remove(); // Immediately remove the popup to prevent lingering
        delete element.dataset.popupId; // Clean up the association
    }
}

// function copyToClipboard(text) {
//     navigator.clipboard.writeText(text).then(
//         () => {
//             alert("Copied CSS to clipboard!");
//         }, () => {
//             alert("Failed to copy CSS!");
//         }
//     );
// }


// Stolen From CarrySheriff <333333333