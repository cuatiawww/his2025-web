const components = {
    header: `
        <nav class="navbar navbar-expand-lg navbar-light fixed-top">
            <div class="container">
                <a class="navbar-brand animate-brand" href="index.html">
                    <span class="brand-text">HIS</span>
                    <span class="year-text">2025</span>
                </a>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active animate-link" href="index.html">HOME</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle animate-link" href="pages/call.html" id="callDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                CALL
                            </a>
                            <ul class="dropdown-menu animate slideIn" aria-labelledby="callDropdown">
                                <li><a class="dropdown-item" href="pages/call.html">Call for Papers</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle animate-link" href="pages/" id="orgDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ORGANIZATION
                            </a>
                            <ul class="dropdown-menu animate slideIn" aria-labelledby="orgDropdown">
                                <li><a class="dropdown-item" href="pages/organizing-committee.html">Organizing Committee</a></li>
                                <li><a class="dropdown-item" href="pages/program-committee.html">Program Committee</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle animate-link" href="pages/agenda.html" id="agendaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                AGENDA
                            </a>
                            <ul class="dropdown-menu animate slideIn" aria-labelledby="agendaDropdown">
                                <li><a class="dropdown-item" href="pages/conference-program.html">Conference Schedule</a></li>
                                <li><a class="dropdown-item" href="pages/keynotes.html">Keynote Speakers</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle animate-link" href="pages/participant.html" id="participantDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                PARTICIPANT INFORMATION
                            </a>
                            <ul class="dropdown-menu animate slideIn" aria-labelledby="participantDropdown">
                                <li><a class="dropdown-item" href="pages/participant.html#registration">Registration</a></li>
                                <li><a class="dropdown-item" href="pages/conference-venue.html">Venue & Accommodation</a></li>
                                <li><a class="dropdown-item" href="pages/travel-information.html">Travel Information</a></li>
                                <li><a class="dropdown-item" href="pages/hotel-booking.html">Hotel Booking</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `,

    sidebar: `
        <div class="sidebar-box">
    <div class="time-display mb-4">
        <h2 class="time-heading">
            <i class="far fa-clock me-2"></i>Time in Bandung, Indonesia
        </h2>
        <div class="date-display" id="date"></div>
        <div class="digital-clock">
            <div class="time-segment">
                <span id="hours">00</span>
                <span class="time-label">Hours</span>
            </div>
            <span class="time-separator">:</span>
            <div class="time-segment">
                <span id="minutes">00</span>
                <span class="time-label">Minutes</span>
            </div>
            <span class="time-separator">:</span>
            <div class="time-segment">
                <span id="seconds">00</span>
                <span class="time-label">Seconds</span>
            </div>
            <div class="time-period">
                <span id="session">AM</span>
            </div>
        </div>
    </div>

            <div class="previous-conferences-box">
    <h2 class="conf-heading">
        <i class="fas fa-history me-2"></i>Previous Conferences
    </h2>
    <div class="conferences-container text-center">
        <ul class="conference-list list-unstyled" id="conferenceList">
        </ul>
    </div>
</div>
    `,

    footer: `
        <footer class="bg-dark text-white py-4">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 text-center text-md-start">
                        <h5 class="mb-3">Contact Us</h5>
                        <p class="mb-1"><i class="fas fa-envelope me-2"></i>conference@his2025.org</p>
                        <p><i class="fas fa-map-marker-alt me-2"></i>Bandung, Indonesia</p>
                    </div>
                    <div class="col-md-6 text-center text-md-end">
                        <h5 class="mb-3">Follow Us</h5>
                        <a href="#" class="text-white me-3"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-white me-3"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="text-white"><i class="fab fa-facebook"></i></a>
                    </div>
                </div>
                <hr class="my-4">
                <div class="text-center">
                    <p class="mb-0">&copy; 2025 HIS Conference. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `
};

// Function to load component
function loadComponent(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const isInPagesDirectory = window.location.pathname.includes('/pages/');
    let componentHtml = components[elementId];

    if (isInPagesDirectory) {
        componentHtml = componentHtml
            .replace(/href="index.html"/g, 'href="../index.html"')
            .replace(/href="pages\//g, 'href="');
    }

    element.innerHTML = componentHtml;

    // Inisialisasi komponen setelah dimuat
    if (elementId === 'header') {
        // Tunggu sedikit untuk memastikan DOM sudah siap
        setTimeout(updateActiveNavLink, 100);
    }
    if (elementId === 'sidebar') {
        renderConferences();
    }
}

// Update active navigation link
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Reset semua active state
    navLinks.forEach(link => link.classList.remove('active'));
    dropdownItems.forEach(item => item.classList.remove('active'));

    // Set active untuk dropdown items
    dropdownItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (itemPath && currentPath.includes(itemPath.split('/').pop())) {
            item.classList.add('active');
            // Aktifkan parent dropdown
            const parentDropdown = item.closest('.dropdown').querySelector('.nav-link');
            if (parentDropdown) parentDropdown.classList.add('active');
        }
    });

    // Set active untuk home jika di halaman utama
    if (currentPath === '/' || currentPath.endsWith('index.html')) {
        document.querySelector('a[href$="index.html"]')?.classList.add('active');
    }
}

// Render conference list
function renderConferences() {
    const conferenceList = document.getElementById('conferenceList');
    if (!conferenceList || !conferenceData?.previousConferences) return;

    conferenceList.innerHTML = conferenceData.previousConferences
        .map(conf => `
            <li>
                <a href="#" class="conf-link">HIS ${conf.year}</a> - ${conf.location}
            </li>
        `).join('');
}

// Initialize semua komponen ketika DOM ready
document.addEventListener('DOMContentLoaded', function() {
    ['header', 'footer', 'sidebar'].forEach(id => {
        loadComponent(id);
    });
});