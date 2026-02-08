// 1. DATA (Vahid Description sahəsi ilə)
window.PROJECTS_DATA = [
    {
        id: "fs-tools",
        title: "FS Tools",
        category: "Developer Utilities",
        status: "Live",
        statusColor: "green",
        gradient: "from-blue-600 to-indigo-600",
        description: "FS Tools proqramçıların gündəlik iş prosesini sürətləndirmək üçün hazırlanmış, hamısı-birində alətlər toplusudur. Müxtəlif veb saytlar arasında keçid etmək əvəzinə, JSON formatlamaq, Base64 çevirmək və ya API test etmək üçün vahid mərkəz rolunu oynayır. Layihə PWA standartlarına tam uyğundur.",
        gallery: [
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
        ],
        icon: "ri-tools-fill",
        features: ["JSON Formatter & Validator", "REST API Tester", "Base64 Encoder", "Responsive UI"],
        tags: ["Vanilla JS", "Tailwind CSS", "PWA", "API", "JSON"],
        links: { demo: "#", repo: "https://github.com/ferhadsultan98" }
    },
    {
        id: "by-jalali",
        title: "ByJalali",
        category: "E-Commerce Brand",
        status: "Dev",
        statusColor: "yellow",
        gradient: "from-purple-600 to-pink-500",
        description: "ByJalali müasir və minimalist geyim brendi üçün hazırlanmış tam funksional e-ticarət platforması konseptidir. Bu layihədə əsas diqqət istifadəçi təcrübəsinə (UX), rəng harmoniyasına və vizual hekayəyə yönəldilib. Müştərilərin rahatlıqla məhsul seçimi və sifarişi üçün optimallaşdırılıb.",
        gallery: [
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop"
        ],
        icon: "ri-shopping-bag-3-fill",
        features: ["Interaktiv Filtr", "Redux Səbət", "Admin Paneli", "Stripe Test"],
        tags: ["React.js", "Redux", "Framer Motion", "SCSS"],
        links: { demo: null, repo: null }
    },
    {
        id: "omni-chat",
        title: "Omni Chat SaaS",
        category: "SaaS Startup",
        status: "Plan",
        statusColor: "blue",
        gradient: "from-slate-700 to-slate-900",
        description: "Omni Chat bizneslərin müştəri dəstək xidmətini mərkəzləşdirmək üçün nəzərdə tutulmuş çoxkanallı (Omnichannel) SaaS layihəsidir. WhatsApp, Instagram və Veb-çat müraciətlərini tək bir paneldən idarə etməyə imkan verir. WebSocket texnologiyası ilə real-time ünsiyyəti təmin edir.",
        gallery: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop"
        ],
        icon: "ri-chat-voice-fill",
        features: ["WebSocket Message", "WhatsApp API", "Chatbot System", "Team Roles"],
        tags: ["Next.js", "Node.js", "Socket.io", "PostgreSQL"],
        links: { demo: null, repo: null }
    }
];

// 2. RENDER (Siyahı)
window.PAGES['projects'] = `
    <div class="mb-10 animate-fade-in">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span class="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <i class="ri-rocket-2-fill"></i>
            </span>
            Portfolia & Layihələr
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-2 ml-1 text-sm max-w-2xl">
            Real problemləri həll edən, müasir texnologiyalarla hazırlanmış seçilmiş işlərim.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 animate-fade-in-up">
        ${window.PROJECTS_DATA.map(project => `
            <div onclick="navigateTo('project-details', '${project.id}')" class="group bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-dark-700 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer">
                <div class="h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div class="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl text-white border border-white/30 shadow-lg group-hover:scale-110 transition duration-500">
                        <i class="${project.icon}"></i>
                    </div>
                </div>

                <div class="p-6 flex-1 flex flex-col">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 transition">${project.title}</h3>
                            <p class="text-xs text-slate-500 font-semibold mt-1">${project.category}</p>
                        </div>
                        <span class="px-3 py-1 text-[10px] font-bold rounded-full bg-gray-100 dark:bg-dark-700 text-slate-500 border border-gray-200 dark:border-dark-600 uppercase">
                            ${project.status}
                        </span>
                    </div>
                    
                    <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                        ${project.description}
                    </p>

                    <div class="mt-auto flex justify-between items-center">
                        <div class="flex flex-wrap gap-2">
                            ${project.tags.slice(0, 2).map(tag => `<span class="text-[10px] font-bold text-slate-400">#${tag}</span>`).join('')}
                        </div>
                        <span class="text-sm font-bold text-blue-600 flex items-center gap-1">Ətraflı <i class="ri-arrow-right-line"></i></span>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
`;