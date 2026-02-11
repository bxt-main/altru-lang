// Algolia DocSearch Integration for Altru Documentation
// This will be activated once you receive your Algolia credentials

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the documentation site
    if (window.location.hostname.includes('github.io')) {
        // Initialize DocSearch when credentials are available
        // const search = docsearch({
        //     container: '#search-container',
        //     appId: 'YOUR_APP_ID',
        //     apiKey: 'YOUR_API_KEY', 
        //     indexName: 'altru-lang',
        //     debug: false
        // });
    }
});

// Fallback search functionality (basic keyword search)
function fallbackSearch(query) {
    if (!query || query.length < 2) return;
    
    const results = [];
    const pages = [
        { title: 'Specification v0.2.1', url: 'en/specification-0.2.1-full.html', lang: 'en' },
        { title: '设计规范 v0.2.1', url: 'zh/specification-0.2.1-full.html', lang: 'zh' },
        { title: 'Memory Management', url: 'en/memory-management.html', lang: 'en' },
        { title: '内存管理', url: 'zh/memory-management.html', lang: 'zh' },
        { title: 'Concurrency Model', url: 'en/concurrency-model.html', lang: 'en' },
        { title: '并发模型', url: 'zh/concurrency-model.html', lang: 'zh' },
        { title: 'AI Integration', url: 'en/ai-integration.html', lang: 'en' },
        { title: 'AI集成特性', url: 'zh/ai-integration.html', lang: 'zh' }
    ];
    
    const lowerQuery = query.toLowerCase();
    pages.forEach(page => {
        if (page.title.toLowerCase().includes(lowerQuery)) {
            results.push(page);
        }
    });
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }
    
    let html = '<ul class="search-results-list">';
    results.forEach(result => {
        html += `<li><a href="${result.url}">${result.title}</a></li>`;
    });
    html += '</ul>';
    
    container.innerHTML = html;
}