$(document).ready(function() {
    // Select the links
    const links = document.querySelectorAll('a:not(#booking-btn, #navbar-brand)');

    // Add a click event listener to each link
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            // Prevent the default action
            event.preventDefault();

            // Get the target element
            const targetId = event.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Calculate the position to scroll to
            const positionToScrollTo = targetElement.getBoundingClientRect().top + window.pageYOffset - 85;

            // Scroll to the target element
            window.scrollTo({
                top: positionToScrollTo,
                behavior: 'smooth'
            });
        });
    });

    $("#scrolltop").on('click', function () {
        $('html, body').animate({ scrollTop: 0 });
    });
});