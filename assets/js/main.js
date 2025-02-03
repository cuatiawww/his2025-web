function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('/call.html')) return 'call';
    if (path.includes('/index.html') || path.endsWith('/')) return 'index';
    return '';
}

// Render topics list
function renderTopics() {
    const topicsList = document.getElementById('topicsList');
    if (!topicsList || !conferenceData?.callForPapers) return;

    const topics = conferenceData.callForPapers.map(topic => `
        <li>
            <div class="p-2 bg-light">
                <i class="fas fa-check text-success me-2"></i>${topic}
            </div>
        </li>
    `).join('');

    topicsList.innerHTML = topics;
}

// Render submission dates
function renderDates() {
    const datesList = document.getElementById('datesList');
    if (!datesList || !conferenceData?.importantDates) return;

    const dates = conferenceData.importantDates.map(date => `
        <li class="mb-3">
            <div class="date-item p-3 bg-light rounded">
                <div class="date-label fw-bold">${date.label}</div>
                <div class="date-value">
                    ${date.oldDate ? `<s>${date.oldDate}</s> ` : ''}
                    <span class="text-success">${date.newDate || date.date}</span>
                </div>
            </div>
        </li>
    `).join('');

    datesList.innerHTML = dates;
}

function renderGuidelines() {
    const guidelinesBox = document.getElementById('guidelinesBox');
    if (!guidelinesBox || !conferenceData?.submissionGuidelines) return;

    const mainText = conferenceData.submissionGuidelines.mainText;
    const submission = conferenceData.submissionGuidelines.submissionLink;

    const guidelinesHtml = `
        <div class="submission-text mb-4">
            <p>
                ${mainText.text}
                <a class="fw-bold" href="${mainText.springerLink.url}" target="_blank" class="text-success">
                    ${mainText.springerLink.text}
                </a>
                ${mainText.endText}
            </p>
            <p class="fw-bold">
                ${submission.text}
                <a href="${submission.link.url}" target="_blank" class="text-success">
                    ${submission.link.text}
                </a>.
            </p>
        </div>
       
    `;

    guidelinesBox.innerHTML = guidelinesHtml;
}

// Render publications info
function renderPublications() {
    const publicationsBox = document.getElementById('publicationsBox');
    if (!publicationsBox || !conferenceData?.publications) return;

    const publications = conferenceData.publications.map(publication => `
        <div class="publication-item mb-3 p-3 bg-light rounded">
            <i class="fas fa-book text-success me-2"></i>${publication}
        </div>
    `).join('');

    publicationsBox.innerHTML = publications;
}

// Initialize page content
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();

    // Initialize common elements
    renderTopics();

    // Initialize page-specific elements
    if (currentPage === 'call') {
        renderDates();
        renderGuidelines();
        renderPublications();
    }

    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }
});




{/* <div class="guidelines-list">
${conferenceData.submissionGuidelines.guidelines.map(guideline => `
    <div class="guideline-item mb-3 p-3 bg-light rounded">
        <i class="fas fa-check-circle text-success me-2"></i>${guideline}
    </div>
`).join('')}
</div> */}