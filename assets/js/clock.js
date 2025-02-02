// Clock functionality
function updateClock() {
    const now = new Date();
    
    // Update time
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const session = hours >= 12 ? 'p.m.' : 'a.m.';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = String(hours).padStart(2, '0');
    
    // Update date
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options)
        .replace(/,/g, '.'); // Replace commas with dots
    
    // Update DOM
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('session').textContent = session;
    document.getElementById('date').textContent = dateStr;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initial update
updateClock();