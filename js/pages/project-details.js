let currentSlideIndex = 0;
let currentProjectImages = [];

window.initProjectSlider = (images) => {
    currentProjectImages = images;
    currentSlideIndex = 0;
    updateSlideView();
};

window.changeProjectSlide = (step) => {
    currentSlideIndex += step;
    if (currentSlideIndex >= currentProjectImages.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = currentProjectImages.length - 1;
    updateSlideView();
};

function updateSlideView() {
    const imgElement = document.getElementById('detailSliderImg');
    const counterElement = document.getElementById('detailSliderCounter');
    if (imgElement) {
        imgElement.style.opacity = '0';
        setTimeout(() => {
            imgElement.src = currentProjectImages[currentSlideIndex];
            imgElement.style.opacity = '1';
        }, 150);
    }
    if (counterElement) counterElement.innerText = `${currentSlideIndex + 1} / ${currentProjectImages.length}`;
}

window.renderProjectDetailsPage = (projectId) => {
    const project = window.PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return `<div class="text-center py-20">Layihə tapılmadı.</div>`;

    setTimeout(() => window.initProjectSlider(project.gallery), 100);

    // Bol Hashtag Siyahısı (Sferaya uyğun)
    const extraHashtags = [
        "WebDevelopment", "Frontend", "UserExperience", "CleanCode", "ModernUI", 
        "Javascript", "Portfolio", "SoftwareEngineering", "UIUXDesign", "Responsive",
        "CodingLife", "FullStack", "ProjectShowcase", "WebDesign", "Innovation"
    ];

    return `
        <div class="max-w-6xl mx-auto animate-fade-in pb-10">
            
            <div class="flex items-center gap-4 mb-6">
                <button onclick="navigateTo('projects')" class="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl hover:border-primary/50 transition shadow-sm">
                    <i class="ri-arrow-left-line text-slate-500 group-hover:text-primary transition"></i>
                    <span class="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-primary">Geri qayıt</span>
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">${project.title}</h1>
                    <p class="text-slate-500 dark:text-slate-400 font-medium">${project.category}</p>
                </div>
                <span class="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-sm rounded-lg border border-green-200 dark:border-green-800 uppercase">
                    ${project.status}
                </span>
            </div>

            <div class="relative w-full h-[300px] md:h-[500px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mb-10 group border border-gray-200 dark:border-dark-700">
                <img id="detailSliderImg" src="${project.gallery[0]}" class="w-full h-full object-cover transition-opacity duration-300">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                <button onclick="changeProjectSlide(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition z-10"><i class="ri-arrow-left-s-line text-2xl"></i></button>
                <button onclick="changeProjectSlide(1)" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition z-10"><i class="ri-arrow-right-s-line text-2xl"></i></button>
                <div id="detailSliderCounter" class="absolute bottom-6 right-6 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white">1 / ${project.gallery.length}</div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div class="lg:col-span-2 space-y-8">
                    <div class="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-sm">
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><i class="ri-file-text-line text-primary"></i> Layihə Haqqında</h3>
                        <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-base">${project.description}</p>
                    </div>

                    <div class="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-sm">
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><i class="ri-list-check-2 text-primary"></i> Texniki Özəlliklər</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${project.features.map(feat => `<div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-700"><i class="ri-checkbox-circle-fill text-green-500"></i><span class="text-slate-700 dark:text-slate-200 font-medium text-sm">${feat}</span></div>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-sm">
                        <h3 class="font-bold text-slate-900 dark:text-white mb-4">Linklər</h3>
                        <div class="flex flex-col gap-3">
                            ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" class="w-full py-3 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20"><i class="ri-external-link-line"></i> Canlı Demo</a>` : `<button disabled class="w-full py-3 rounded-xl bg-gray-100 dark:bg-dark-700 text-gray-400 font-bold flex items-center justify-center gap-2 cursor-not-allowed"><i class="ri-loader-4-line"></i> Hazırlanır</button>`}
                            ${project.links.repo ? `<a href="${project.links.repo}" target="_blank" class="w-full py-3 rounded-xl border border-gray-200 dark:border-dark-600 text-slate-700 dark:text-white font-bold flex items-center justify-center gap-2 transition hover:bg-gray-50 dark:hover:bg-dark-700"><i class="ri-github-fill text-xl"></i> Source Code</a>` : ''}
                        </div>
                    </div>

                    <div class="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-sm">
                        <h3 class="font-bold text-slate-900 dark:text-white mb-4">Texnologiyalar</h3>
                        <div class="flex flex-wrap gap-2">
                            ${project.tags.map(tag => `<span class="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-dark-600">#${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-100 dark:border-dark-800">
                <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 opacity-40 hover:opacity-100 transition-opacity duration-500">
                    ${extraHashtags.map(h => `<span class="text-xs font-medium text-slate-500 dark:text-slate-400 cursor-default">#${h}</span>`).join('')}
                    ${project.tags.map(t => `<span class="text-xs font-medium text-slate-500 dark:text-slate-400 cursor-default">#${t.replace(/\s+/g, '')}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
};