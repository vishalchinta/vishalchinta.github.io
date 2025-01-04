// Visitor tracking system that sends data to API
const VisitorTracker = {
    // API endpoint - replace with your actual API URL
    apiEndpoint: 'https://your-api.com/visitors',

    // Initialize and send visitor data
    async trackVisit() {
        try {
            const visitorData = this.gatherVisitorData();
            await this.sendToApi(visitorData);
        } catch (error) {
            console.error('Tracking error:', error);
        }
    },

    // Gather visitor information
    gatherVisitorData() {
        // Get or create visitor ID
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            visitorId = 'v_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitorId', visitorId);
        }

        // Gather data
        return {
            visitorId: visitorId,
            timestamp: new Date().toISOString(),
            page: {
                url: window.location.href,
                path: window.location.pathname,
                referrer: document.referrer || 'direct',
                title: document.title
            },
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth
            },
            browser: {
                language: navigator.language,
                userAgent: navigator.userAgent,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            performance: {
                loadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
                domReadyTime: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
            }
        };
    },

    // Send data to API
    async sendToApi(data) {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers if needed
                    // 'Authorization': 'Bearer your-token'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API error:', error);
            // Store failed requests for retry
            this.queueFailedRequest(data);
        }
    },

    // Queue failed requests for retry
    queueFailedRequest(data) {
        const queue = JSON.parse(localStorage.getItem('failedRequests') || '[]');
        queue.push({ data, timestamp: new Date().toISOString() });
        localStorage.setItem('failedRequests', JSON.stringify(queue));
    },

    // Retry failed requests
    async retryFailedRequests() {
        const queue = JSON.parse(localStorage.getItem('failedRequests') || '[]');
        if (queue.length === 0) return;

        const newQueue = [];
        for (const item of queue) {
            try {
                await this.sendToApi(item.data);
            } catch (error) {
                // Keep in queue if still failing
                newQueue.push(item);
            }
        }

        localStorage.setItem('failedRequests', JSON.stringify(newQueue));
    },

    // Track events (optional)
    async trackEvent(eventName, eventData = {}) {
        try {
            const data = {
                ...this.gatherVisitorData(),
                event: {
                    name: eventName,
                    data: eventData,
                    timestamp: new Date().toISOString()
                }
            };
            await this.sendToApi(data);
        } catch (error) {
            console.error('Event tracking error:', error);
        }
    }
};

// Initialize tracking
document.addEventListener('DOMContentLoaded', () => {
    VisitorTracker.trackVisit();
    
    // Retry failed requests
    VisitorTracker.retryFailedRequests();
});

// Track page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        VisitorTracker.trackEvent('page_visible');
    } else {
        VisitorTracker.trackEvent('page_hidden');
    }
});

// Track page unload
window.addEventListener('beforeunload', () => {
    VisitorTracker.trackEvent('page_exit', {
        timeSpent: (new Date() - performance.timing.navigationStart) / 1000
    });
});