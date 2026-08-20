window.currentFilter = 'All';

async function renderTemplates(filterCat = window.currentFilter) {
  try {
    window.currentFilter = filterCat;
    let templates = templateData;
    
    if (filterCat !== 'All') {
        templates = templates.filter(t => t.category === filterCat);
    }
    
    // Find the container grid
    const gridContainer = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3.gap-6');
    if (!gridContainer) return;
    
    // Update the total count text in the search area
    const countElement = document.querySelector('.text-sm.text-muted-foreground strong');
    if (countElement) {
        countElement.textContent = templates.length;
    }
    const headerCount = document.querySelector('h1 + p strong');
    if (headerCount) {
        headerCount.textContent = templates.length + " Template";
    }

    gridContainer.innerHTML = ''; // Clear static templates
    
    // Helper function to pick a random image based on category or generic
    function getImage(category) {
        const catMap = {
            "Travel Open Trip": "open-trip-adventure.jpg",
            "Travel Umrah": "umrah-premium.jpg",
            "Rental Transportasi": "hiace-rental-pro.jpg",
            "Study Tour": "study-tour-edu.jpg",
            "Desa Wisata": "desa-wisata.jpg",
            "Single Destination": "destination.jpg",
            "Travel Agent": "travel-agent-pro.jpg",
            "Tour Operator": "tour-operator-elite.jpg",
            "MICE": "mice.jpg",
            "Konsorsium": "konsorsium.jpg",
            "Corporate Travel": "corporate-travel.jpg",
            "Wisata Lokal": "wisata-lokal.jpg",
            "Multi Cabang": "multi-cabang-hub.jpg",
            "Multi Vendor": "vendor-portal.jpg",
            "Multi Brand": "agregator.jpg",
            "Enterprise": "enterprise-dashboard.jpg"
        };
        return catMap[category] || "mobile-placeholder.jpg"; // Default generic image
    }
    
    templates.forEach(item => {
      const card = document.createElement('div');
      card.className = "glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all flex flex-col h-full";
      card.style = "opacity: 1; transform: none;";
      
      const img = getImage(item.category);
      
      card.innerHTML = `
                <!-- Browser Mockup Image Area -->
                <div class="relative flex flex-col bg-muted/20 border-b border-border/50">
                    <!-- Browser Header -->
                    <div class="flex items-center gap-2 px-3 py-2 bg-[#F1F5F9] border-b border-gray-200">
                        <div class="flex gap-1.5">
                            <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <div class="mx-auto text-[9px] text-gray-500 bg-white px-3 py-0.5 rounded border border-gray-200 truncate max-w-[70%]">
                            ${item.url.replace(/^https?:\/\//, '')}
                        </div>
                    </div>
                    <!-- Website Image (Iframe Preview) -->
                    <div class="relative h-48 overflow-hidden bg-white">
                        <iframe src="${item.url}" class="absolute top-0 left-0 border-0" style="width: 400%; height: 400%; transform: scale(0.25); transform-origin: top left; pointer-events: none;" loading="lazy" tabindex="-1"></iframe>
                        <!-- Overlay to allow clicking the card without interacting with iframe -->
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-10 cursor-pointer"></a>
                        <!-- Category Badge -->
                        <div class="absolute bottom-0 right-0 bg-[#00A8B5] text-white px-3 py-1 rounded-tl-lg font-bold text-[10px] shadow-lg z-20 pointer-events-none">
                            ${item.category}
                        </div>
                    </div>
                </div>
                <!-- Card Body -->
                <div class="p-5 flex flex-col flex-1 bg-white">
                    <div>
                        <h3 class="font-heading font-extrabold text-sm text-foreground uppercase tracking-wide leading-tight mb-3" title="${item.title}">
                            ${item.title}
                        </h3>
                        <div class="space-y-1.5 mb-4">
                            <div class="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A8B5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span>Pembuat: ${item.creator || 'WebTravel'}</span>
                            </div>
                            <div class="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A8B5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                                <span>Batch: ${item.batch || '1'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-auto pt-4 flex gap-2">
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="flex-1 block py-2 rounded-full text-center font-bold text-xs transition-colors border border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9]/10 uppercase tracking-wider" style="color: #0ea5e9; border-color: #0ea5e9;">
                            Demo
                        </a>
                        <a href="index.html#contact" class="flex-1 block py-2 rounded-full text-center font-bold text-xs transition-colors bg-[#0ea5e9] text-white hover:opacity-90 shadow-md shadow-[#0ea5e9]/30 uppercase tracking-wider" style="background: linear-gradient(135deg, #0284c7, #0ea5e9);">
                            Pesan
                        </a>
                    </div>
                </div>
      `;
      gridContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load templates:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTemplates();
    
    // Attach event listener to category dropdown
    const templateFilter = document.getElementById('template-filter');
    if (templateFilter) {
        templateFilter.addEventListener('change', (e) => {
            renderTemplates(e.target.value);
        });
    }
});

