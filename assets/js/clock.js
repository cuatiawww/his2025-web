// assets/js/clock.js
function updateClock() {
    // Create a date object with UTC+7 (Bandung timezone)
    const bandungTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    
    // Update date
    const dateElement = document.getElementById('date');
    if (dateElement) {
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        dateElement.textContent = bandungTime.toLocaleDateString('en-US', options);
    }
    
    // Update time
    const hours = bandungTime.getHours();
    const minutes = bandungTime.getMinutes();
    const seconds = bandungTime.getSeconds();
    const session = hours >= 12 ? 'p.m.' : 'a.m.';

    // Update clock elements if they exist
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const sessionElement = document.getElementById('session');

    if (hoursElement) hoursElement.textContent = (hours % 12 || 12).toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    if (sessionElement) sessionElement.textContent = session;
}

// Update clock immediately and then every second
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
});