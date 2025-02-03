const components = {
    header: `
        <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <span>HIS</span>
                    <span class="year-text">2025</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active" href="index.html">HOME</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="pages/call.html" id="callDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                CALL
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="callDropdown">
                                <li><a class="dropdown-item" href="pages/call.html">Call for Papers</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="pages/" id="orgDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ORGANIZATION
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="orgDropdown">
                                <li><a class="dropdown-item" href="pages/organizing-committee.html">Organizing Committee</a></li>
                                <li><a class="dropdown-item" href="pages/program-committee.html">Program Committee</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="pages/agenda.html" id="agendaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                AGENDA
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="agendaDropdown">
                                <li><a class="dropdown-item" href="pages/conference-program.html">Conference Schedule</a></li>
                                <li><a class="dropdown-item" href="pages/keynotes.html">Keynote Speakers</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="pages/participant.html" id="participantDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                PARTICIPANT INFORMATION
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="participantDropdown">
                                <li><a class="dropdown-item" href="pages/participant.html#registration">Registration</a></li>
                                <li><a class="dropdown-item" href="pages/participant.html#venue">Venue & Accommodation</a></li>
                                <li><a class="dropdown-item" href="pages/participant.html#travel">Travel Information</a></li>
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
                <h2 class="text-success mb-2">Time in Bandung, Indonesia</h2>
                <div class="text-muted">
                    <div id="date"></div>
                    <div class="digital-clock">
                        <span id="hours"></span>:<span id="minutes"></span>:<span id="seconds"></span>
                        <span id="session"></span>
                    </div>
                </div>
            </div>

            <div class="previous-conferences-box">
                <h2 class="text-success">Previous Conferences</h2>
                <ul class="conference-list list-unstyled" id="conferenceList">
                    <!-- Will be populated by JavaScript -->
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

    // Sesuaikan path untuk links berdasarkan lokasi halaman
    const isInPagesDirectory = window.location.pathname.includes('/pages/');
    let componentHtml = components[elementId];

    if (isInPagesDirectory) {
        // Jika di folder pages, sesuaikan path
        componentHtml = componentHtml
            .replace(/href="index.html"/g, 'href="../index.html"')
            .replace(/href="pages\//g, 'href="');
    }

    element.innerHTML = componentHtml;

    // Inisialisasi komponen setelah dimuat
    if (elementId === 'header') {
        updateActiveNavLink();
    }
    if (elementId === 'sidebar') {
        renderConferences();
    }
}

// Update active navigation link
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentPath.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // Set home sebagai active jika di root
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