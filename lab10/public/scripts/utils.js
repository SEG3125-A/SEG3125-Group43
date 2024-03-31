$(document).ready(function() {
    // Select the links
    const links = document.querySelectorAll('a:not(#navbar-brand)');

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

    document.getElementById("scrolltop").addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    $('[data-toggle="tooltip"]').tooltip({
        'placement': 'top'
    });
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
            'placement': 'top'
    });

    // Get the chatbot checkbox
    const chatbotCheckbox = $("#chat-btn");

    // Get the chatbot container 
    const chatbotContainer = $("#bot-container");
    chatbotContainer.css("display", "none");

    chatbotCheckbox.on("change", function(){
        if(chatbotCheckbox.prop("checked")){
            chatbotContainer.css("display", "flex");
            $("#chat-btn-container").css("display", "none");
        } else {
            chatbotContainer.css("display", "none");
        }
    }) 
});