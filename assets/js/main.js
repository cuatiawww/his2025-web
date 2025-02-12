function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/call.html')) return 'call';
    if (path.includes('/index.html') || path.endsWith('/')) return 'index';
    return '';
}

async function renderTopics() {
    const topicsList = document.getElementById('topicsList');
    if (!topicsList) return;

    try {
        const topics = await dbOperations.getCallForPapers();
        
        if (!topics || topics.length === 0) {
            topicsList.innerHTML = '<li>No topics available</li>';
            return;
        }

        topicsList.innerHTML = topics
            .map(topic => `
                <li class="topic-item">
                    <div class="topic-content">
                        <span>${topic.topic}</span>
                    </div>
                </li>
            `).join('');

    } catch (err) {
        console.error('Error:', err);
        topicsList.innerHTML = '<li>Failed to load topics</li>';
    }
}

function renderDates() {
    const datesList = document.getElementById('datesList');
    if (!datesList || !conferenceData?.importantDates) return;

    const dates = conferenceData.importantDates.map(date => `
        <li class="date-item-wrapper fade-in">
            <div class="date-item">
                <div class="date-content">
                    <div class="date-label">
                        <i class="far fa-calendar-alt"></i>
                        ${date.label}
                    </div>
                    <div class="date-value">
                        ${date.oldDate ? `<span class="old-date">${date.oldDate}</span>` : ''}
                        <span class="new-date">${date.newDate || date.date}</span>
                    </div>
                </div>
            </div>
        </li>
    `).join('');

    datesList.innerHTML = dates;

    // Add animation effects
    datesList.querySelectorAll('.date-item-wrapper').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}


async function renderCommitteeMembers() {
    const committeeMembersList = document.getElementById('committeeMembersList');
    if (!committeeMembersList) return;

    try {
        const members = await dbOperations.getCommitteeMembers();
        
        if (!members || members.length === 0) {
            committeeMembersList.innerHTML = '<p>No committee members available</p>';
            return;
        }

        committeeMembersList.innerHTML = `
            <div class="row">
                ${members.map(member => `
                    <div class="col-md-6 mb-4 fade-in">
                        <div class="committee-member">
                            <h3 class="member-name">
                                ${member.first_name} ${member.last_name}
                            </h3>
                            <p class="member-affiliation">
                                ${member.affiliation}
                            </p>
                            <p class="member-email">
                                <a href="mailto:${member.email}">
                                    <i class="fas fa-envelope me-2"></i>${member.email}
                                </a>
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        committeeMembersList.querySelectorAll('.fade-in').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    } catch (err) {
        console.error('Error:', err);
        committeeMembersList.innerHTML = '<p>Failed to load committee members</p>';
    }
}

function renderGuidelines() {
    const guidelinesBox = document.getElementById('guidelinesBox');
    if (!guidelinesBox || !conferenceData?.submissionGuidelines) return;

    const { mainText, submissionLink, guidelines } = conferenceData.submissionGuidelines;

    const guidelinesHtml = `
        <div class="guidelines-container">
            <div class="main-text-section fade-in">
                <p>
                    ${mainText.text}
                    <a href="${mainText.springerLink.url}" 
                       target="_blank" 
                       class="springer-link">
                        ${mainText.springerLink.text}
                    </a>
                    ${mainText.endText}
                </p>
            </div>
            
            <div class="submission-section fade-in">
                <p>
                    ${submissionLink.text}
                    <a href="${submissionLink.link.url}" 
                       target="_blank" 
                       class="easychair-link">
                        ${submissionLink.link.text}
                    </a>
                </p>
            </div>

        
        </div>
    `;

    guidelinesBox.innerHTML = guidelinesHtml;
}

function renderPublications() {
    const publicationsBox = document.getElementById('publicationsBox');
    if (!publicationsBox || !conferenceData?.publications) return;

    const publications = conferenceData.publications.map((publication, index) => `
        <div class="publication-item fade-in" style="animation-delay: ${index * 0.1}s">
            <div class="publication-content">
                <i class="fas fa-book"></i>
                <span>${publication}</span>
            </div>
        </div>
    `).join('');

    publicationsBox.innerHTML = publications;
}
function initializePageComponents() {
    const currentPage = getCurrentPage();

    renderTopics();

    if (currentPage === 'call') {
        renderDates();
        renderGuidelines();
        renderPublications();
    }

    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }
}

async function populateCommitteeTable() {
    const tableBody = document.getElementById('committeeTableBody');
    
    try {
        const members = await dbOperations.getCommitteeMembers();
        
        if (!members || members.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4">No committee members available</td></tr>';
            return;
        }

        tableBody.innerHTML = members.map(member => `
            <tr class="fade-in">
                <td>${member.first_name}</td>
                <td>${member.last_name}</td>
                <td><a href="mailto:${member.email}" class="email-link">${member.email}</a></td>
                <td>${member.affiliation}</td>
            </tr>
        `).join('');

        // Add animation effects
        tableBody.querySelectorAll('.fade-in').forEach((row, index) => {
            row.style.animationDelay = `${index * 0.05}s`;
        });

    } catch (err) {
        console.error('Error:', err);
        tableBody.innerHTML = '<tr><td colspan="4">Failed to load committee members</td></tr>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    populateCommitteeTable();
});

async function loadOrganizationMembers() {
    const contentDiv = document.getElementById('committeeContent');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    try {
        const groupedMembers = await dbOperations.getOrganizationMembers();
        
        if (!groupedMembers) {
            throw new Error('Failed to load committee members');
        }

        // Generate HTML
        let html = '';
        for (const [role, members] of Object.entries(groupedMembers)) {
            html += `
                <div class="committee-section">
                    <h2 class="committee-title">${role}</h2>
                    ${members.map(member => `
                        <div class="committee-member">
                            <div class="member-name">${member.name}</div>
                            <div class="member-affiliation">${member.affiliation}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Remove loading indicator and show content
        loadingIndicator.style.display = 'none';
        contentDiv.innerHTML = html;

    } catch (error) {
        console.error('Error loading committee members:', error);
        loadingIndicator.style.display = 'none';
        contentDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Error loading committee members. Please try refreshing the page.
            </div>
        `;
    }
}

// Load data when page is ready
document.addEventListener('DOMContentLoaded', loadOrganizationMembers);


async function renderVenueInfo() {
    try {
        const venueInfo = await dbOperations.getVenueInfo();
        
        if (!venueInfo) {
            console.error('No venue information available');
            return;
        }

        document.querySelector('.venue-section').innerHTML = `
            <h3 class="section-title">Conference Venue</h3>
            <p><strong>Address:</strong> ${venueInfo.address}</p>
            
            <iframe class="venue-map" 
                    src="${venueInfo.map_url}" 
                    allowfullscreen="" 
                    loading="lazy">
            </iframe>
            
            <p>Please explore the conference centre by the 
               <a href="${venueInfo.virtual_tour_url}" class="info-link">360° View</a>.
            </p>
            <p>For more information about the campus map, please refer to the 
               <a href="${venueInfo.campus_map_url}" class="info-link">EDUHK CAMPUS MAP</a>.
            </p>
        `;

        // Update description section
        document.querySelectorAll('.venue-section')[1].querySelector('p').textContent = venueInfo.description;

    } catch (err) {
        console.error('Error:', err);
    }
}

document.addEventListener('DOMContentLoaded', renderVenueInfo);
// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    initializePageComponents();

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});


// document.addEventListener('DOMContentLoaded', function() {
//     let modalInstance = null;
//     const registrationModal = document.getElementById('registrationModal');

//     // Handle registration links
//     document.querySelectorAll('a[href*="registration"], a[href="#register"]').forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             if (!modalInstance) {
//                 modalInstance = new bootstrap.Modal(registrationModal);
//             }
//             modalInstance.show();
//         });
//     });

//     // Clean up modal when it's hidden
//     registrationModal.addEventListener('hidden.bs.modal', function () {
//         if (modalInstance) {
//             modalInstance.dispose();
//             modalInstance = null;
//         }
//         // Clean up backdrop and body classes
//         const backdrop = document.querySelector('.modal-backdrop');
//         if (backdrop) {
//             backdrop.remove();
//         }
//         document.body.classList.remove('modal-open');
//         document.body.style.removeProperty('padding-right');
//     });

//     // Handle close button click
//     const closeButton = registrationModal.querySelector('.btn-success');
//     if (closeButton) {
//         closeButton.addEventListener('click', function() {
//             if (modalInstance) {
//                 modalInstance.hide();
//             }
//         });
//     }
// });