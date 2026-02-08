// About səhifəsini render edən funksiya
window.renderAboutPage = async () => {
    // Backend-dən datanı çəkirik
    const portfolioData = await window.apiService.get('/v1/portfolio');
    
    if (!portfolioData || !portfolioData.profile) {
        return `<div class="text-center py-20">Məlumat yüklənmədi.</div>`;
    }

    const { profile } = portfolioData;

    // Dinamik HTML qaytarılır
    return `
    <style>
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
    </style>

    <div class="space-y-8 animate-fade-in pb-10">
        <div class="bg-white dark:bg-dark-800 rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-dark-700 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div class="relative w-40 h-40 md:w-48 md:h-48 shrink-0">
                <div class="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow blur-md opacity-70"></div>
                <div class="absolute inset-1 bg-white dark:bg-dark-800 rounded-full z-10"></div>
                <div class="absolute inset-2 rounded-full overflow-hidden z-20 border-4 border-gray-50 dark:border-dark-700 shadow-inner">
                    <img src="${profile.avatarUrl}" alt="${profile.name}" class="w-full h-full object-cover hover:scale-110 transition duration-500">
                </div>
            </div>

            <div class="text-center md:text-left z-10 flex-1">
                <div class="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    ${profile.title}
                </div>
                <h2 class="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">${profile.name}</h2>
                <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 max-w-2xl">
                    ${profile.bio}
                </p>

                <div class="flex flex-wrap justify-center md:justify-start gap-3">
                    <a href="${profile.contactLinks.github || '#'}" target="_blank" class="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition">
                        <i class="ri-github-fill text-xl"></i> GitHub
                    </a>
                    <a href="${profile.contactLinks.linkedin || '#'}" class="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                        <i class="ri-linkedin-fill text-xl"></i> LinkedIn
                    </a>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${profile.stats.map(stat => `
                <div class="p-5 bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 text-center">
                    <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">${stat.value}</div>
                    <div class="text-xs font-bold text-slate-400 uppercase">${stat.label}</div>
                </div>
            `).join('')}
        </div>

        <div class="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-sm overflow-hidden">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <i class="ri-github-fill text-2xl"></i> GitHub Aktivliyi (@${profile.githubUser})
            </h3>
            <div class="w-full overflow-x-auto pb-2">
                <img src="https://ghchart.rshah.org/3b82f6/${profile.githubUser}" alt="GitHub Chart" class="min-w-[700px] w-full block dark:opacity-90">
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 shadow-sm relative overflow-hidden">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center"><i class="ri-stack-line"></i></span>
                    Texnologiyalar
                </h3>
                <div class="flex flex-wrap gap-3">
                    ${profile.technologies.map(tech => `
                        <span class="flex items-center gap-2 px-4 py-2 rounded-lg bg-${tech.color}-50 dark:bg-${tech.color}-900/20 text-${tech.color}-700 dark:text-${tech.color}-400 font-bold text-sm border border-${tech.color}-100 dark:border-${tech.color}-800/30">
                            <i class="${tech.icon} text-lg"></i> ${tech.name}
                        </span>
                    `).join('')}
                </div>
            </div>

            <div class="bg-white dark:bg-dark-800 p-8 rounded-3xl border border-gray-200 dark:border-dark-700 shadow-sm relative overflow-hidden">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span class="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center"><i class="ri-lightbulb-flash-line"></i></span>
                    İş Yanaşması
                </h3>
                <div class="space-y-4">
                    ${profile.approach.map(item => `
                        <div class="flex gap-4 items-start">
                            <div class="w-8 h-8 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/20 text-${item.color}-600 shrink-0 flex items-center justify-center font-bold text-sm">${item.id}</div>
                            <div>
                                <h4 class="font-bold text-slate-900 dark:text-white">${item.title}</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400">${item.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>`;
};