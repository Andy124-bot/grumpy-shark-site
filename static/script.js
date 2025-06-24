document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded!");

    // 📩 Auto-fill Contact Form if Coming from Purchase Page
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get("subject");
    const bodyParam = urlParams.get("body");

    if (subjectParam) {
        const subjectField = document.getElementById("subject");
        if (subjectField) subjectField.value = subjectParam;
    }

    if (bodyParam) {
        const messageField = document.getElementById("message");
        if (messageField) messageField.value = bodyParam;
    }

    // 📩 Contact Form Submission Handling
    const confirmationMessage = document.getElementById("confirmation-message");

    // 📩 Create Mailto Link Dynamically on Click
    document.getElementById("send-email-link").addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (!name || !email || !message) {
            alert("Please fill in all fields before sending!");
            return;
        }

        // Format mailto link
       const mailtoLink = `mailto:grumpsharkwebsite@gmail.com` +
        `?subject=Contact%20Grumpy%20Shark` +
        `&body=Name:%20${encodeURIComponent(name)}%0A` +
        `Email:%20${encodeURIComponent(email)}%0A` +
        `Message:%20${encodeURIComponent(message)}`;

    // Open user's email client
    window.location.href = mailtoLink;

    // Show a helpful message (not "sent" confirmation)
    confirmationMessage.textContent = "📬 Your email app should now be open—click Send to complete your message.";
    confirmationMessage.classList.remove("hidden");

    setTimeout(() => confirmationMessage.classList.add("hidden"), 6000);


    });

    // 🌊 Scroll-based fade-in animations for sections
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();

    // 🎨 Button hover effects (smooth scaling & shadow)
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        button.addEventListener("mouseover", function () {
            button.style.transform = "scale(1.1)";
            button.style.boxShadow = "0 4px 10px rgba(0, 102, 255, 0.5)";
        });

        button.addEventListener("mouseout", function () {
            button.style.transform = "scale(1)";
            button.style.boxShadow = "none";
        });
    });

    // 🐠 Floating sway animation for oceanic elements
    const floatingElements = document.querySelectorAll(".oceanic-transition");

    function animateFloatingElements() {
        floatingElements.forEach((element) => {
            let position = 0;
            let direction = 1;

            setInterval(() => {
                position += direction * 0.5;
                element.style.transform = `translateY(${position}px)`;

                if (position > 5 || position < -5) {
                    direction *= -1;
                }
            }, 100);
        });
    }

    animateFloatingElements();
});