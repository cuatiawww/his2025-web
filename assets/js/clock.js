function updateClock() {
    // Create a date object with UTC+7 (Bandung timezone)
    const bandungTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    
    // Update date with a more sophisticated format
    const dateElement = document.getElementById('date');
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = bandungTime.toLocaleDateString('en-US', options);
    }
    
    // Update time with animations
    const hours = bandungTime.getHours();
    const minutes = bandungTime.getMinutes();
    const seconds = bandungTime.getSeconds();
    const session = hours >= 12 ? 'PM' : 'AM';

    // Update clock elements with smooth transitions
    updateTimeSegment('hours', (hours % 12 || 12).toString().padStart(2, '0'));
    updateTimeSegment('minutes', minutes.toString().padStart(2, '0'));
    updateTimeSegment('seconds', seconds.toString().padStart(2, '0'));
    updateTimeSegment('session', session);
}

function updateTimeSegment(id, newValue) {
    const element = document.getElementById(id);
    if (element && element.textContent !== newValue) {
        element.style.transform = 'translateY(-10px)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 100);
    }
}

// Initialize the clock
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);

    // Add transition styles dynamically
    const timeSegments = document.querySelectorAll('#hours, #minutes, #seconds, #session');
    timeSegments.forEach(segment => {
        segment.style.transition = 'transform 0.2s, opacity 0.2s';
    });
});