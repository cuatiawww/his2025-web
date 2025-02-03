// supabase-config.js

const SUPABASE_CONFIG = {
    url: 'https://csnzntoyjrgydkovxdbb.supabase.co',
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnpudG95anJneWRrb3Z4ZGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1ODU2NjYsImV4cCI6MjA1NDE2MTY2Nn0.7_CB78ueOwwLYq2QkCUO8dcnWA0rsuuWymOBYKhN-8M'
};

const dbOperations = {
    // Fetch conference data - fungsi ini yang aktif digunakan
    getPreviousConferences: async () => {
        try {
            const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/previous_conferences?select=*&order=year.desc`, {
                headers: {
                    'apikey': SUPABASE_CONFIG.apiKey,
                    'Authorization': `Bearer ${SUPABASE_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error fetching conferences:', err);
            return null;
        }
    },
    getCallForPapers: async () => {
        try {
            const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/call_for_papers?select=*`, {
                headers: {
                    'apikey': SUPABASE_CONFIG.apiKey,
                    'Authorization': `Bearer ${SUPABASE_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error fetching call for papers:', err);
            return null;
        }
    },

};

// Make database operations globally available
window.dbOperations = dbOperations;