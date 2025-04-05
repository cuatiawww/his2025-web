// main.js

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/call.html')) return 'call';
    if (path.includes('/program-committee.html')) return 'program-committee';
    if (path.includes('/organization-committee.html') || path.includes('/organizing-committee.html')) return 'organization-committee';
    if (path.includes('/keynotes.html')) return 'keynotes'; // Add this line
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
// Updated loadKeynoteSpeakers function for main.js
// Updated loadKeynoteSpeakers function for main.js
async function loadKeynoteSpeakers() {
    console.log('Loading keynote speakers...');
    
    const contentDiv = document.getElementById('keynoteSpeakersContent');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!contentDiv) {
        console.error('Keynote speakers content div not found');
        return;
    }
    
    // Check if content is already visible (has children elements)
    if (contentDiv.children.length > 0) {
        console.log('Keynote speakers content already loaded');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
        return; // Don't try to load again if content is already there
    }
    
    try {
        // Show loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }

        // Try to fetch speakers from Supabase
        const speakers = await dbOperations.getKeynoteSpeakers();
        console.log('Fetched keynote speakers:', speakers);
        
        if (!speakers || speakers.length === 0) {
            console.log('No keynote speakers found in database, using fallback content');
            return;
        }

        // Generate HTML for keynote speakers
        let speakersHTML = `
            <h2 class="section-title mb-4">Keynote Speakers</h2>
        `;
        
        speakers.forEach((speaker) => {
            speakersHTML += `
                <div class="keynote-speaker-card">
                    <div class="row">
                        <div class="col-md-4 mb-3 mb-md-0">
                            <div class="speaker-photo-container">
                                <img src="${speaker.photo_url || '../assets/images/speaker-placeholder.jpg'}" 
                                     alt="${speaker.name}" 
                                     class="speaker-photo">
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="speaker-info">
                                <h3 class="speaker-name">${speaker.name}</h3>
                                <p class="speaker-affiliation">${speaker.affiliation}</p>
                                
                                <div class="speaker-talk mt-3">
                                    <h4 class="talk-title">
                                        <i class="fas fa-microphone-alt"></i> 
                                        ${speaker.talk_title === 'TBA' ? 'Talk Title: To Be Announced' : speaker.talk_title || 'Talk title to be announced'}
                                    </h4>
                                    ${speaker.abstract && speaker.abstract !== 'To be announced' ? `<p class="talk-abstract">${speaker.abstract}</p>` : ''}
                                </div>
                                
                                <div class="speaker-bio mt-3">
                                    <h5 class="bio-heading">
                                        <i class="fas fa-user-graduate"></i> Biography
                                    </h5>
                                    <div class="bio-text">
                                        ${speaker.bio.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Update the DOM
        contentDiv.innerHTML = speakersHTML;
        console.log('Keynote speakers loaded successfully');
        
    } catch (error) {
        console.error('Error loading keynote speakers:', error);
        // Don't modify the content div as it already has fallback content
        console.log('Using fallback content due to error');
    } finally {
        // Always hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
}

// Update initializePageComponents function to include keynote speakers
function initializePageComponents() {
    const currentPage = getCurrentPage();
    console.log('Current page detected:', currentPage);

    // Common components for all pages
    if (document.getElementById('digitalClock')) {
        updateClock();
        setInterval(updateClock, 1000);
    }

    renderPreviousConferences();

    // Page-specific components
    if (currentPage === 'call') {
        renderDates();
        renderGuidelines();
        renderPublications();
        renderTopics();
    } else if (currentPage === 'program-committee') {
        loadProgramCommitteeMembers();
    } else if (currentPage === 'organization-committee') {
        loadOrganizationMembers();
    } else if (currentPage === 'keynotes') {
        // Add this condition for keynote speakers page
        loadKeynoteSpeakers();
    }

    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
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

// Improved loadOrganizationMembers function with direct data handling
async function loadOrganizationMembers() {
    console.log('Loading organization members...');
    
    const committeeContainer = document.getElementById('committeeContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!committeeContainer) {
        console.error('Committee container div not found');
        return;
    }
    
    try {
        // Show loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }

        // Try to fetch organization members
        const response = await fetch(
            `${SUPABASE_CONFIG.url}/rest/v1/organization_members?select=*`, {
            headers: {
                'apikey': SUPABASE_CONFIG.apiKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const members = await response.json();
        console.log('Fetched organization members:', members);
        
        if (!members || members.length === 0) {
            console.log('No organization members found in database, using fallback content');
            return; // Keep the fallback content
        }

        // Get the roles
        const rolesResponse = await fetch(
            `${SUPABASE_CONFIG.url}/rest/v1/organization_roles?select=*&order=display_order.asc`, {
            headers: {
                'apikey': SUPABASE_CONFIG.apiKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!rolesResponse.ok) {
            throw new Error(`API error for roles: ${rolesResponse.status} ${rolesResponse.statusText}`);
        }

        const roles = await rolesResponse.json();
        console.log('Fetched roles:', roles);
        
        // Create a mapping of role_id to role name
        const roleMapping = {};
        roles.forEach(role => {
            roleMapping[role.id] = role.role_name;
        });
        
        // Group members by role
        const groupedMembers = {};
        
        // Initialize role groups based on fetched roles
        roles.forEach(role => {
            groupedMembers[role.role_name] = [];
        });
        
        // Populate groups with members, clean up email addresses
        members.forEach(member => {
            const roleId = member.role_id;
            if (!roleId) {
                console.warn('Member missing role ID:', member);
                return;
            }
            
            const roleName = roleMapping[roleId] || 'Committee Members';
            
            if (!groupedMembers[roleName]) {
                groupedMembers[roleName] = [];
            }
            
            // Clean affiliation - remove email addresses
            let affiliation = member.affiliation || '';
            
            // If the affiliation contains an email, extract just the domain name
            if (affiliation.includes('@')) {
                affiliation = affiliation.split('@')[0].trim();
                if (affiliation.endsWith(',')) {
                    affiliation = affiliation.slice(0, -1);
                }
            }
            
            groupedMembers[roleName].push({
                name: member.name,
                affiliation: affiliation
            });
        });
        
        console.log('Grouped members by role:', groupedMembers);
        
        // Generate HTML for committee sections
        let html = '';
        
        // Display roles in order, only if they have members
        roles.forEach(role => {
            const roleName = role.role_name;
            const roleMembers = groupedMembers[roleName] || [];
            
            if (roleMembers.length === 0) return;
            
            // Determine if it's a small committee (1-2 members)
            const smallCommittee = roleMembers.length <= 2;
            
            html += `
                <div class="committee-container">
                    <div class="committee-header">
                        <h2>${roleName}</h2>
                    </div>
                    <div class="committee-members">
                        <div class="committee-row ${smallCommittee ? 'small-committee' : ''}">
                            ${roleMembers.map(member => `
                                <div class="committee-member">
                                    <div class="member-name">${member.name || 'Name not available'}</div>
                                    <div class="member-affiliation">${member.affiliation || 'Affiliation not available'}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });

        // Update the DOM if we have new content
        if (html) {
            committeeContainer.innerHTML = html;
        }
        
        console.log('Organization members loaded successfully');
        
    } catch (error) {
        console.error('Error loading organization members:', error);
        console.log('Using fallback content due to error');
        // Fallback content is already in the HTML
    } finally {
        // Always hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
}
async function loadProgramCommitteeMembers() {
    console.log('Loading program committee members...');
    const committeeTable = document.getElementById('committeeTable');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!committeeTable) {
        console.error('Committee table element not found');
        return;
    }
    
    try {
        // Show loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }

        // Fetch committee members from Supabase
        console.log('Fetching committee members...');
        const members = await dbOperations.getCommitteeMembers();
        console.log('Received committee members:', members?.length || 0);
        
        if (!members || members.length === 0) {
            if (committeeTable.innerHTML.trim() === '') {
                committeeTable.innerHTML = '<tr><td colspan="2">No committee members available at this time.</td></tr>';
            }
            return;
        }

        // Sort members alphabetically by first name
        members.sort((a, b) => {
            const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
            const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
            return nameA.localeCompare(nameB);
        });

        // Generate table rows
        let tableHTML = '';
        
        members.forEach((member) => {
            const fullName = `${member.first_name} ${member.last_name}`;
            
            tableHTML += `
                <tr>
                    <td class="member-name">${fullName}</td>
                    <td class="member-affiliation">${member.affiliation}</td>
                </tr>
            `;
        });
        
        // Update the table content
        committeeTable.innerHTML = tableHTML;
        console.log('Program committee members loaded successfully');
    } catch (error) {
        console.error('Error loading committee members:', error);
        if (committeeTable.innerHTML.trim() === '') {
            committeeTable.innerHTML = `
                <tr>
                    <td colspan="2" class="text-center">
                        <div class="alert alert-danger" role="alert">
                            Error loading committee members. Please try refreshing the page.
                        </div>
                    </td>
                </tr>
            `;
        }
    } finally {
        // Always hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
}

async function renderVenueInfo() {
    try {
        const venueSection = document.querySelector('.venue-section');
        if (!venueSection) return;
        
        const venueInfo = await dbOperations.getVenueInfo();
        
        if (!venueInfo) {
            console.error('No venue information available');
            return;
        }

        venueSection.innerHTML = `
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

        // Update description section if available
        const descriptionSection = document.querySelectorAll('.venue-section')[1];
        if (descriptionSection) {
            const descParagraph = descriptionSection.querySelector('p');
            if (descParagraph) {
                descParagraph.textContent = venueInfo.description;
            }
        }

    } catch (err) {
        console.error('Error:', err);
    }
}

async function renderPreviousConferences() {
    const conferencesList = document.getElementById('prevConferencesList');
    if (!conferencesList) {
        console.log('Previous conferences list element not found');
        return;
    }
    
    try {
        console.log('Fetching previous conferences...');
        const conferences = await dbOperations.getPreviousConferences();
        console.log('Received previous conferences:', conferences?.length || 0);
        
        if (!conferences || conferences.length === 0) {
            conferencesList.innerHTML = '<li>No previous conferences available</li>';
            return;
        }
        
        const conferencesHtml = conferences
            .map(conf => `
                <li>
                    <a href="${conf.link || '#'}" class="conf-link" target="_blank">
                        HIS ${conf.year}
                    </a>
                    <div class="conf-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${conf.location}
                    </div>
                </li>
            `)
            .join('');
            
        conferencesList.innerHTML = conferencesHtml;
        console.log('Previous conferences loaded successfully');
    } catch (error) {
        console.error('Error loading previous conferences:', error);
        conferencesList.innerHTML = '<li>Failed to load previous conferences</li>';
    }
}

// Main function to initialize page components
function initializePageComponents() {
    const currentPage = getCurrentPage();
    console.log('Current page detected:', currentPage);

    // Common components for all pages
    if (document.getElementById('digitalClock')) {
        updateClock();
        setInterval(updateClock, 1000);
    }

    renderPreviousConferences();

    // Page-specific components
    if (currentPage === 'call') {
        renderDates();
        renderGuidelines();
        renderPublications();
        renderTopics();
    } else if (currentPage === 'program-committee') {
        loadProgramCommitteeMembers();
    } else if (currentPage === 'organization-committee') {
        loadOrganizationMembers();
    }

    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready, initializing components...');
    
    // Initialize page components
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
    
    // Initialize venue info if needed
    if (document.querySelector('.venue-section')) {
        renderVenueInfo();
    }
    
    console.log('Initialization complete');
});