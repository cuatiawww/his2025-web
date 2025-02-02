// assets/js/components.js
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', '../components/header.html');
    loadComponent('sidebar', '../components/sidebar.html');
    loadComponent('footer', '../components/footer.html');
});