document.addEventListener("DOMContentLoaded", () => {
    // Contact form validation: checks required fields and matching passwords.
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const formMessage = document.getElementById("formMessage");
        const checkPasswords = () => {
            if (!password || !confirmPassword) return;
            confirmPassword.setCustomValidity(password.value === confirmPassword.value ? "" : "Passwords do not match.");
            confirmPassword.classList.toggle("is-invalid", password.value !== confirmPassword.value && confirmPassword.value.length > 0);
        };
        password?.addEventListener("input", checkPasswords);
        confirmPassword?.addEventListener("input", checkPasswords);
        contactForm.addEventListener("submit", event => {
            event.preventDefault(); checkPasswords();
            if (!contactForm.checkValidity()) {
                contactForm.classList.add("was-validated");
                if (formMessage) { formMessage.textContent = "Please complete all required fields correctly and make sure passwords match."; formMessage.className = "mt-3 text-danger"; }
                contactForm.reportValidity(); return;
            }
            if (formMessage) { formMessage.textContent = "Form validated successfully! This demo does not send data to a server."; formMessage.className = "mt-3 text-success"; }
        });
        contactForm.addEventListener("reset", () => { contactForm.classList.remove("was-validated"); if (formMessage) formMessage.textContent = ""; confirmPassword?.setCustomValidity(""); confirmPassword?.classList.remove("is-invalid"); });
    }

    // FAQ: event delegation and dynamic DOM classes.
    document.querySelectorAll(".faq-question").forEach(button => button.addEventListener("click", () => {
        const item = button.closest(".faq-item"); const willOpen = !item.classList.contains("open");
        item.classList.toggle("open", willOpen); button.setAttribute("aria-expanded", String(willOpen));
    }));

    // Accessible popup with Escape-to-close behavior.
    const popup = document.getElementById("subscriptionModal");
    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const closePopup = () => { popup?.classList.remove("show"); popup?.setAttribute("aria-hidden", "true"); };
    openPopupBtn?.addEventListener("click", () => { popup?.classList.add("show"); popup?.setAttribute("aria-hidden", "false"); document.getElementById("subscriptionEmail")?.focus(); });
    closePopupBtn?.addEventListener("click", closePopup);
    popup?.addEventListener("click", event => { if (event.target === popup) closePopup(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closePopup(); });
    const subscriptionForm = document.getElementById("subscriptionForm");
    subscriptionForm?.addEventListener("submit", event => {
        event.preventDefault();
        if (subscriptionForm.checkValidity()) { const message = document.getElementById("subscriptionMessage"); if (message) message.textContent = "Thank you! You are subscribed to our demo travel updates."; subscriptionForm.reset(); }
        else subscriptionForm.reportValidity();
    });

    // DOM styling and animation: cycle background colors with a button.
    const colorButton = document.getElementById("changeColorBtn");
    if (colorButton) { let colorIndex = 0; const colorClasses = ["color-change-1", "color-change-2", "color-change-3", "color-change-4"];
        colorButton.addEventListener("click", () => { document.body.classList.remove(...colorClasses); document.body.classList.add(colorClasses[colorIndex]); colorIndex = (colorIndex + 1) % colorClasses.length; colorButton.classList.add("animate__unused"); }); }

    // Date/time uses Date and updates once per second.
    const dateTime = document.getElementById("dateTime");
    if (dateTime) { const updateDateTime = () => { dateTime.textContent = new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true }); }; updateDateTime(); window.setInterval(updateDateTime, 1000); }

    // Array of destination objects, higher-order functions, loops, and switch statement.
    const travelIdeas = [
        { category: "nature", title: "Nature escape", text: "Explore Kazakhstan's mountains and wide-open landscapes." },
        { category: "culture", title: "Culture trip", text: "Discover traditional temples, museums, local food and history in Japan." },
        { category: "city", title: "City adventure", text: "Walk through Italy's lively squares, historic streets and beautiful cities." },
        { category: "nature", title: "Coastal reset", text: "Spend a relaxing day by the sea and enjoy the natural scenery." }
    ];
    const title = document.getElementById("suggestionTitle"); const text = document.getElementById("suggestionText");
    const card = document.getElementById("destinationSuggestion"); const message = document.getElementById("interactionMessage");
    function showSuggestion(category) {
        // switch chooses the category based on user input.
        let selectedCategory;
        switch (category) { case "nature": selectedCategory = "nature"; break; case "culture": selectedCategory = "culture"; break; case "city": selectedCategory = "city"; break; default: selectedCategory = "nature"; }
        const matches = travelIdeas.filter(idea => idea.category === selectedCategory);
        const idea = matches[Math.floor(Math.random() * matches.length)];
        if (idea && title && text) { title.textContent = idea.title; text.textContent = idea.text; card?.classList.remove("pulse"); void card?.offsetWidth; card?.classList.add("pulse"); if (message) message.textContent = `Showing a ${selectedCategory} idea. Choose another category to explore more.`; }
    }
    document.querySelectorAll(".travel-filter").forEach(button => button.addEventListener("click", () => {
        document.querySelectorAll(".travel-filter").forEach(item => { item.classList.remove("btn-primary"); item.classList.add("btn-outline-primary"); });
        button.classList.add("btn-primary"); button.classList.remove("btn-outline-primary"); showSuggestion(button.dataset.category);
    }));
    document.getElementById("surpriseMeBtn")?.addEventListener("click", () => {
        const idea = travelIdeas[Math.floor(Math.random() * travelIdeas.length)];
        if (title && text) { title.textContent = idea.title; text.textContent = idea.text; card?.classList.remove("pulse"); void card?.offsetWidth; card?.classList.add("pulse"); }
        if (message) message.textContent = "Surprise! A new travel idea has been selected.";
    });

    // Day/night theme toggle using CSS classes and dynamic text.
    const themeToggle = document.getElementById("themeToggle");
    themeToggle?.addEventListener("click", () => { const night = document.body.classList.toggle("night-mode"); themeToggle.textContent = night ? "Switch to Day Mode" : "Switch to Night Mode"; themeToggle.setAttribute("aria-pressed", String(night)); if (message) message.textContent = night ? "Night theme enabled." : "Day theme enabled."; });

    // Short sound effect made with Web Audio API; no external audio file required.
    document.getElementById("soundToggle")?.addEventListener("click", () => {
        try { const AudioContextClass = window.AudioContext || window.webkitAudioContext; if (!AudioContextClass) throw new Error("Audio unavailable");
            const audio = new AudioContextClass(); const oscillator = audio.createOscillator(); const gain = audio.createGain();
            oscillator.type = "sine"; oscillator.frequency.setValueAtTime(660, audio.currentTime); oscillator.frequency.setValueAtTime(880, audio.currentTime + 0.12);
            gain.gain.setValueAtTime(0.0001, audio.currentTime); gain.gain.exponentialRampToValueAtTime(0.12, audio.currentTime + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.35);
            oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + 0.36); oscillator.addEventListener("ended", () => audio.close());
            if (message) message.textContent = "Travel chime played!";
        } catch (error) { if (message) message.textContent = "Sound is not supported by this browser."; }
    });

    // Keyboard navigation: left/right arrow keys move focus through the main menu.
    const navLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link"));
    navLinks.forEach((link, index) => link.addEventListener("keydown", event => {
        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % navLinks.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + navLinks.length) % navLinks.length;
        else return;
        event.preventDefault(); navLinks[nextIndex].focus();
    }));
});
