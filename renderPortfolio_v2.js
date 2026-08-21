
window.currentPortfolioFilter = 'All';

async function renderPortfolioV2(filterCat = 'All') {
    try {
        window.currentPortfolioFilter = filterCat;
        let templates = templateData;

        const targetCategories = [
            { id: 'tour-operator', name: 'Tour Operator' },
            { id: 'umrah-haji', name: 'Travel Umrah' },
            { id: 'open-trip', name: 'Travel Open Trip' },
            { id: 'corporate-travel', name: 'Corporate Travel' },
            { id: 'destination-management', name: 'Single Destination' },
            { id: 'rental-transport', name: 'Rental Transportasi' }
        ];

        let showcase = [];
        targetCategories.forEach(cat => {
            const found = templates.find(t => t.category === cat.name);
            if (found) {
                found.filterId = cat.id;
                found.catName = cat.name;
                showcase.push(found);
            }
        });

        if (filterCat !== 'All') {
            showcase = showcase.filter(item => item.filterId === filterCat || item.catName === filterCat);
        }

        const gridContainer = document.getElementById('portfolio-grid-v2');
        if (!gridContainer) return;
        gridContainer.innerHTML = '';

        showcase.forEach(item => {
            const card = document.createElement('div');
            card.style.cssText = 'background:var(--bg-card);border:1px solid var(--border);border-radius:1rem;overflow:hidden;transition:all 0.3s ease;';
            card.onmouseenter = () => { card.style.boxShadow = 'var(--shadow-soft)'; card.style.transform = 'translateY(-4px)'; };
            card.onmouseleave = () => { card.style.boxShadow = ''; card.style.transform = ''; };
            card.innerHTML = `
                <div style="position:relative;background:#F1F5F9;border-bottom:1px solid var(--border);">
                    <div style="display:flex;align-items:center;gap:6px;padding:8px 12px;">
                        <div style="display:flex;gap:4px;">
                            <div style="width:10px;height:10px;border-radius:50%;background:#f87171;"></div>
                            <div style="width:10px;height:10px;border-radius:50%;background:#fbbf24;"></div>
                            <div style="width:10px;height:10px;border-radius:50%;background:#4ade80;"></div>
                        </div>
                        <div style="flex:1;background:white;border:1px solid #e2e8f0;border-radius:4px;padding:2px 8px;font-size:9px;color:#6b7280;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
                            ${item.url.replace(/^https?:\/\//, '')}
                        </div>
                    </div>
                    <div style="position:relative;height:180px;overflow:hidden;background:white;">
                        <iframe src="${item.url}" style="position:absolute;top:0;left:0;border:0;width:400%;height:400%;transform:scale(0.25);transform-origin:top left;pointer-events:none;" loading="lazy" tabindex="-1"></iframe>
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="position:absolute;inset:0;z-index:10;"></a>
                        <div style="position:absolute;bottom:0;right:0;background:#00A8B5;color:white;padding:4px 10px;border-top-left-radius:8px;font-size:9px;font-weight:700;z-index:20;">${item.category}</div>
                    </div>
                </div>
                <div style="padding:1.25rem;background:var(--bg-card);">
                    <h3 style="font-family:'DM Serif Display',serif;font-size:0.95rem;margin:0 0 0.5rem;color:var(--text);">${item.title}</h3>
                    <p style="font-size:0.75rem;color:var(--text-muted);margin:0 0 1rem;">Katalog: <strong style="color:var(--text);">${item.category}</strong></p>
                    <div style="display:flex;gap:0.625rem;">
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="flex:1;text-align:center;padding:0.5rem;border-radius:8px;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;background:linear-gradient(135deg,#00A8B5,#00828F);color:white;transition:opacity 0.2s;">Demo</a>
                        <a href="#contact" style="flex:1;text-align:center;padding:0.5rem;border-radius:8px;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border:2px solid #00A8B5;color:#00A8B5;transition:all 0.2s;" onmouseover="this.style.background='#00A8B5';this.style.color='white';" onmouseout="this.style.background='transparent';this.style.color='#00A8B5';">Pesan</a>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load portfolio v2:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolioV2();
    const filterSelect = document.getElementById('portfolio-filter-v2');
    if (filterSelect) {
        filterSelect.addEventListener('change', e => renderPortfolioV2(e.target.value));
    }
});
