// data.js
const conferenceData = {
    previousConferences: [
        { year: "2024", location: "Hong Kong" },
        { year: "2023", location: "Melbourne, Australia" },
        { year: "2022", location: "Biarritz, France" },
        { year: "2021", location: "Melbourne, Australia" },
        { year: "2020", location: "Amsterdam and Leiden, Netherlands" },
        { year: "2019", location: "Xi'an, China" },
        { year: "2018", location: "Cairns, Australia" },
        { year: "2017", location: "Puschino, Russia" },
        { year: "2016", location: "Shanghai, China" },
        { year: "2015", location: "Melbourne, Australia" },
        { year: "2014", location: "Shenzhen, China" },
        { year: "2014", location: "London, UK" },
        { year: "2014", location: "Beijing, China" },
    ],
    
    callForPapers: [
        "AI in medicine",
        "Medical big data",
        "Information systems including electronic health records, hospital information systems, data exchange and integration",
        "Health service delivery, workflow",
        "Data mining, knowledge discovery, decision making support",
        "System interoperability, ontology and standardization",
        "Bioinformatics",
        "Biomedical informatics, brain informatics, imaging informatics",
        "Telemedicine, health data management",
        "Health database and information-system integration",
        "Health information extraction, health information services",
        "Health information-system modelling, design, and development",
        "Health information visualization",
        "Support tools and languages for health information-system development",
        "Information system interfaces",
        "Data integration, data processing",
        "Data federation, sharing, and mining",
        "E-health care delivery",
        "Distributed computing, pervasive computing",
        "Information storage and retrieval",
        "Innovative applications",
        "Integration of heterogeneous information sources",
        "Agent systems"
    ],

    publications: [
        "All accepted papers will be published in the conference proceedings",
        "Selected papers will be recommended for publication in special issues of renowned journals",
        "Proceedings will be published in the Springer Lecture Notes in Computer Science (LNCS) series",
        "Papers will be indexed in major academic databases including Scopus and Web of Science"
    ],

    submissionGuidelines: {
        mainText: {
            text: "Papers should be submitted in PDF format. The results described must be unpublished and must not be under review elsewhere. Submissions must conform to Springer's LNCS format and should not exceed 12 pages, including all text, figures, references, and appendices. Submissions not conforming to the LNCS format, exceeding 12 pages, or being obviously out of the scope of the conference, will be rejected without review. Information about the Springer LNCS format can be found at",
            springerLink: {
                text: "Springer",
                url: "https://www.springer.com/gp/computer-science/lncs/conference-proceedings-guidelines"
            },
            endText: ". Three to five keywords characterizing the paper should be indicated at the end of the abstract."
        },
        submissionLink: {
            text: "All papers should be submitted via",
            link: {
                text: "EasyChair",
                url: "https://easychair.org/conferences/?conf=his2025"
            }
        },
        guidelines: [
            "Papers must be written in English and follow the Springer LNCS format",
            "Maximum paper length is 12 pages including all figures and references",
            "All submissions must be original and not simultaneously submitted elsewhere",
            "At least one author of each accepted paper must register and present at the conference",
            "All submissions will undergo a double-blind peer review process"
        ]
    },

    importantDates: [
        {
            label: "Abstract Submission Deadline",
            oldDate: "24 June 2025",
            newDate: "15 July 2025"
        },
        {
            label: "Full Paper Submission Deadline",
            oldDate: "1 July 2025",
            newDate: "22 July 2025"
        },
        {
            label: "Acceptance Notification",
            date: "1 September 2025"
        },
        {
            label: "Camera-Ready Submission",
            date: "5 October 2025"
        }
    ]
};