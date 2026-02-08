window.PAGES['home'] = `
    <div class="space-y-10 animate-fade-in pb-10">
        
        <div class="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden group">
            
            <div class="absolute -right-10 -bottom-10 opacity-10 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700 ease-in-out">
                <i class="ri-code-s-slash-line text-[200px] md:text-[250px] leading-none select-none"></i>
            </div>
            
            <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div class="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>

            <div class="relative z-10 max-w-2xl">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-6 text-blue-100">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available for new projects
                </div>

                <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
                    Salam, mən Fərhad! <span class="inline-block animate-wave origin-bottom-right">👋</span>
                </h1>
                
                <p class="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                    Bura mənim rəqəmsal atelyemdir. Gündəlik işlər üçün hazırladığım <span class="font-bold text-white border-b-2 border-white/30">developer alətləri</span> və real layihələrim bir ünvanda.
                </p>

                <div class="flex flex-wrap gap-4">
                    <button onclick="navigateTo('all-tools')" class="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center gap-2">
                        <i class="ri-flashlight-fill"></i> Alətləri Kəşf Et
                    </button>
                    <button onclick="navigateTo('contact')" class="px-8 py-3.5 rounded-xl font-bold border border-white/30 hover:bg-white/10 backdrop-blur-sm transition flex items-center gap-2">
                        <i class="ri-mail-send-line"></i> Mənə Yaz
                    </button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                <div class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-2 text-xl">
                    <i class="ri-tools-line"></i>
                </div>
                <span class="text-2xl font-bold text-slate-900 dark:text-white">12+</span>
                <span class="text-xs text-slate-500 font-medium uppercase tracking-wide">Alət</span>
            </div>
            
            <div class="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                <div class="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mb-2 text-xl">
                    <i class="ri-rocket-2-line"></i>
                </div>
                <span class="text-2xl font-bold text-slate-900 dark:text-white">5+</span>
                <span class="text-xs text-slate-500 font-medium uppercase tracking-wide">Layihə</span>
            </div>

            <div class="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                <div class="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center mb-2 text-xl">
                    <i class="ri-briefcase-line"></i>
                </div>
                <span class="text-2xl font-bold text-slate-900 dark:text-white">3 İl</span>
                <span class="text-xs text-slate-500 font-medium uppercase tracking-wide">Təcrübə</span>
            </div>

            <div class="bg-white dark:bg-dark-800 p-5 rounded-2xl border border-gray-100 dark:border-dark-700 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                <div class="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center mb-2 text-xl">
                    <i class="ri-github-fill"></i>
                </div>
                <span class="text-2xl font-bold text-slate-900 dark:text-white">Act</span>
                <span class="text-xs text-slate-500 font-medium uppercase tracking-wide">Open Source</span>
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <i class="ri-fire-line text-orange-500"></i> Populyar Alətlər
                </h2>
                <button onclick="navigateTo('all-tools')" class="text-sm font-medium text-primary hover:text-blue-700 transition flex items-center gap-1">
                    Hamısına bax <i class="ri-arrow-right-line"></i>
                </button>
            </div>
            
            <div id="homeGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="h-40 bg-gray-100 dark:bg-dark-800 rounded-2xl animate-pulse"></div>
                <div class="h-40 bg-gray-100 dark:bg-dark-800 rounded-2xl animate-pulse"></div>
                <div class="h-40 bg-gray-100 dark:bg-dark-800 rounded-2xl animate-pulse"></div>
            </div>
        </div>

        <div class="bg-slate-900 dark:bg-white rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div class="relative z-10">
                <h3 class="text-2xl font-bold text-white dark:text-slate-900 mb-3">Yeni bir ideyanız var?</h3>
                <p class="text-slate-400 dark:text-slate-500 mb-6 max-w-lg mx-auto">Frontend layihələri, UI/UX dizayn və ya alət təklifləri üçün mənimlə əlaqə saxlaya bilərsiniz.</p>
                <button onclick="navigateTo('contact')" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition">
                    Layihəni Başlat <i class="ri-arrow-right-line"></i>
                </button>
            </div>
            
            <div class="absolute -left-10 top-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div class="absolute -right-10 bottom-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

    </div>
`;