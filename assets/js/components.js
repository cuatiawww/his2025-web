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
    registrationModal: `
        <div class="modal fade" id="registrationModal" tabindex="-1" aria-labelledby="registrationModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0 justify-content-center">
                        <h5 class="modal-title text-success" id="registrationModalLabel">
                            <i class="fas fa-info-circle me-2"></i>Registration Information
                        </h5>
                    </div>
                    <div class="modal-body text-center py-4">
                        <div class="registration-info-icon mb-3">
                            <i class="fas fa-calendar-alt fa-3x text-success"></i>
                        </div>
                        <h4 class="mb-3">Registration Coming Soon</h4>
                        <p class="mb-4">The registration system for HIS 2025 is currently being prepared and will be available in the coming months. Please check back later for updates on registration procedures and fees.</p>
                        <p class="small text-muted mb-0">For urgent inquiries, please contact us at <a href="mailto:his2025@ideas-lab.org">his2025@ideas-lab.org</a></p>
                    </div>
                    <div class="modal-footer border-0 justify-content-center">
                        <button type="button" class="btn btn-success px-4" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    hotelBookingModal: `
        <div class="modal fade" id="hotelBookingModal" tabindex="-1" aria-labelledby="hotelBookingModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0 justify-content-center">
                        <h5 class="modal-title text-success" id="hotelBookingModalLabel">
                            <i class="fas fa-hotel me-2"></i>Hotel Booking Information
                        </h5>
                    </div>
                    <div class="modal-body text-center py-4">
                        <div class="registration-info-icon mb-3">
                            <i class="fas fa-bed fa-3x text-success"></i>
                        </div>
                        <h4 class="mb-3">Hotel Booking Coming Soon</h4>
                        <p class="mb-4">Our hotel booking service for HIS 2025 is currently being prepared. We are partnering with hotels near the conference venue to provide special rates for conference attendees.</p>
                        <p class="mb-4">Recommended hotels and booking options will be available here in the coming months.</p>
                        <p class="small text-muted mb-0">For urgent accommodation inquiries, please contact us at <a href="mailto:his2025@ideas-lab.org">his2025@ideas-lab.org</a></p>
                    </div>
                    <div class="modal-footer border-0 justify-content-center">
                        <button type="button" class="btn btn-success px-4" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `,

    sidebar: `
       <div class="sidebar-box">
        <div class="time-display mb-4">
            <h2 class="time-heading">
                <i class="far fa-clock me-2"></i>Countdown to Conference
            </h2>
            <div class="date-display" id="date">HIS 2025 Conference Starts In:</div>
            <div class="digital-clock">
                <div class="time-segment">
                    <span id="days">00</span>
                    <span class="time-label">Days</span>
                </div>
                <span class="time-separator">:</span>
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
        <footer class="footer">
    <div class="container">
        <!-- Organizers Section -->
        <div class="organizers-section mb-5">
            <div class="row">
                <div class="col-12 mb-4">
                    <h5 class="organizer-title">Organized by</h5>
                    <div class="organizer-logos">
                        <div class="logo-container">
                            <img src="../assets/images/ideaslab.png" alt="IDEAS LAB Logo" class="organizer-logo">
                        </div>
                        <div class="logo-container">
                            <img src="../assets/images/ukm.png" alt="Universitas Maranatha Logo" class="organizer-logo">
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <h5 class="organizer-title">Co-organized by</h5>
                    <div class="co-organizer-placeholder">
                        <span>Coming soon</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact Info -->
        <div class="footer-content">
            <div class="footer-contact">
                <h5 class="contact-title">Contact Us</h5>
                <div class="contact-info">
                    <p>
                        <i class="fas fa-envelope"></i>
                        <span>his2025@ideas-lab.org</span>
                    </p>
                    <p>
                        <i class="fas fa-phone"></i>
                        <span>+62 897 9400 787</span>
                    </p>
                    <p>
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Bandung, Indonesia</span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="footer-bottom">
            <p>© 2025 HIS Conference. All rights reserved.</p>
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

async function renderConferences() {
    // Cari elemen dengan id 'conferenceList'
    const conferenceList = document.getElementById('conferenceList');
    if (!conferenceList) return;

    try {
        // Ambil data dari Supabase menggunakan fungsi getPreviousConferences
        const conferences = await window.dbOperations.getPreviousConferences();
        
        // Jika tidak ada data, tampilkan pesan
        if (!conferences || conferences.length === 0) {
            conferenceList.innerHTML = '<li>No conference data available</li>';
            return;
        }

        // Render data ke dalam list
        conferenceList.innerHTML = conferences
            .map(conf => `
                <li>
                    <a href="${conf.url || '#'}" class="conf-link">
                        HIS ${conf.year}
                    </a> - ${conf.location}
                </li>
            `).join('');

    } catch (err) {
        // Tangani error jika ada
        console.error('Error:', err);
        conferenceList.innerHTML = '<li>Failed to load conference data</li>';
    }
}


// Add this to components.js

let registrationModalInstance = null;
let hotelModalInstance = null;

function initializeModals() {
    // Initialize Registration Modal
    if (!document.getElementById('registrationModal')) {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = components.registrationModal;
        document.body.appendChild(modalDiv);
    }

    // Initialize Hotel Booking Modal
    if (!document.getElementById('hotelBookingModal')) {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = components.hotelBookingModal;
        document.body.appendChild(modalDiv);
    }

    // Handle registration links
    document.querySelectorAll('a[href*="registration"], a[href="#register"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('registration');
        });
    });

    // Handle hotel booking links
    document.querySelectorAll('a[href*="hotel-booking"], a[href*="Hotel Booking"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('hotel');
        });
    });

    // Add modal cleanup handlers
    setupModalCleanup('registrationModal');
    setupModalCleanup('hotelBookingModal');
}

function showModal(type) {
    const modalId = type === 'registration' ? 'registrationModal' : 'hotelBookingModal';
    const modalElement = document.getElementById(modalId);
    
    // Dispose existing instance if any
    if (type === 'registration' && registrationModalInstance) {
        registrationModalInstance.dispose();
        registrationModalInstance = null;
    }
    if (type === 'hotel' && hotelModalInstance) {
        hotelModalInstance.dispose();
        hotelModalInstance = null;
    }

    // Create new instance
    const newModal = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: true
    });

    // Store instance
    if (type === 'registration') {
        registrationModalInstance = newModal;
    } else {
        hotelModalInstance = newModal;
    }

    // Show modal
    newModal.show();
}

function setupModalCleanup(modalId) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    modalElement.addEventListener('hidden.bs.modal', function() {
        // Clean up body classes
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');
        
        // Remove backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }

        // Dispose modal instance
        if (modalId === 'registrationModal' && registrationModalInstance) {
            registrationModalInstance.dispose();
            registrationModalInstance = null;
        }
        if (modalId === 'hotelBookingModal' && hotelModalInstance) {
            hotelModalInstance.dispose();
            hotelModalInstance = null;
        }
    });

    // Handle close button click
    const closeButton = modalElement.querySelector('.btn-success[data-bs-dismiss="modal"]');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }
}

// Update the DOM ready function
document.addEventListener('DOMContentLoaded', function() {
    ['header', 'footer', 'sidebar'].forEach(id => {
        loadComponent(id);
    });
    
    // Initialize all modals
    initializeModals();
});
