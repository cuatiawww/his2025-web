// Page identification and initialization
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/call.html')) return 'call';
    if (path.includes('/index.html') || path.endsWith('/')) return 'index';
    return '';
}

// Topics rendering with modern styling
// Topics rendering with modern styling
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
                        <i class="fas fa-check-circle"></i>
                        <span>${topic.topic}</span>
                    </div>
                </li>
            `).join('');

        // // Add animation effects
        // topicsList.querySelectorAll('.topic-item').forEach((item, index) => {
        //     item.style.animationDelay = `${index * 0.1}s`;
        //     item.classList.add('fade-in');
        // });
    } catch (err) {
        console.error('Error:', err);
        topicsList.innerHTML = '<li>Failed to load topics</li>';
    }
}

// Dates rendering with modern styling
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

// Guidelines rendering with modern styling
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

            <div class="guidelines-list">
                ${guidelines.map((guideline, index) => `
                    <div class="guideline-item fade-in" style="animation-delay: ${index * 0.1}s">
                        <i class="fas fa-check-circle"></i>
                        <span>${guideline}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    guidelinesBox.innerHTML = guidelinesHtml;
}

// Publications rendering with modern styling
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

// Initialize all components
function initializePageComponents() {
    const currentPage = getCurrentPage();

    // Common components initialization
    renderTopics();

    // Page-specific components
    if (currentPage === 'call') {
        renderDates();
        renderGuidelines();
        renderPublications();
    }

    // Initialize tooltips
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }
}

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