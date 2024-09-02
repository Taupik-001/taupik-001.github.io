document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("role-text");

    if (!element) return;

    const texts = element.querySelectorAll("b");
    element.classList.add("solid-cursor");

    const typingSpeed = 75;
    const deletingSpeed = 25;
    const switchDelay = 2000;

    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function updateText() {
        const text = texts[currentTextIndex].textContent;
        
        // Update the text content
        element.textContent = text.slice(0, charIndex);

        if (isDeleting) {
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
            }
        } else {
            charIndex++;
            if (charIndex === text.length) {
                element.classList.remove("solid-cursor");
                element.classList.add("blinking-cursor");
                setTimeout(() => {
                    isDeleting = true;
                }, switchDelay);
            }
        }
        
        // Adjust the speed based on the typing or deleting state
        const delay = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(updateText, delay);
    }

    updateText();

    element.addEventListener('animationiteration', () => {
        if (charIndex < texts[currentTextIndex].textContent.length) {
            element.classList.remove("blinking-cursor");
            element.classList.add("solid-cursor");
        }
    });
});


document.querySelector('.menu-icon').addEventListener('click', function() {
    this.classList.toggle('active');
});