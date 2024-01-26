document.addEventListener("DOMContentLoaded", function () {
    const dietListElement = document.getElementById('diet-list');
    dietaryPrefs.forEach(pref => {
        const listItem = document.createElement('li');
        listItem.textContent = pref.name;
        dietListElement.appendChild(listItem);
    });

    // Toggle panel functionality
    const sidePanel = document.getElementById('side-panel');
    const closePanelBtn = document.getElementById('close-panel');

    // Assuming you have a button with id `toggle-panel` to open the side panel
    document.getElementById('toggle-panel').addEventListener('click', function() {
        sidePanel.classList.add('visible');
    });

    // Close panel button
    closePanelBtn.addEventListener('click', function() {
        sidePanel.classList.remove('visible');
    });
});