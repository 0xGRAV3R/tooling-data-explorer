document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("redirectForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.getElementById("textInput");
        const inputValue = input.value.trim();
        
        if (inputValue) {
            const newUrl = `${window.location.origin}${window.location.pathname}?${inputValue}`;
            window.location.href = newUrl;
        }
    });
});
