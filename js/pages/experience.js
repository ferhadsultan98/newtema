// --- 1. MƏLUMATLAR (Dinamik Hissə) ---
const experienceData = [
    {
        title: "Freelance Frontend Developer",
        subtitle: "Remote / Bakı",
        date: "2023 - Hazırda",
        icon: "ri-macbook-line",
        color: "blue", // blue, orange, slate, green, etc.
        description: "Yerli və xarici müştərilər üçün müasir, sürətli və responsiv veb interfeyslərin hazırlanması.",
        list: [ // İş öhdəlikləri
            "Figma dizaynlarının (Pixel-perfect) koda köçürülməsi.",
            "React komponentlərinin optimizasiyası və təkrar istifadəsi.",
            "API inteqrasiyası və dinamik məlumatların idarə olunması."
        ],
        tags: ["React.js", "Next.js", "Tailwind", "Figma"] // Texnologiyalar
    },
    {
        title: "Fərdi İnkişaf & Kurslar",
        subtitle: "Udemy / YouTube / Docs",
        date: "Davamlı",
        icon: "ri-lightbulb-flash-line",
        color: "orange",
        description: "Frontend ekosistemindəki yenilikləri izləmək və dərinləşmək üçün davamlı öyrənmə prosesindəyəm.",
        grid: [ // Xüsusi qutular (əgər varsa)
            { icon: "ri-server-line", text: "SSR & Server Actions" },
            { icon: "ri-database-2-line", text: "Backend Basics (Node.js)" }
        ]
    },
    {
        title: "Bakalavr Təhsili",
        subtitle: "Universitet Adı",
        date: "2019 - 2023",
        icon: "ri-graduation-cap-line",
        color: "slate",
        description: "Kompüter Elmləri / İnformasiya Texnologiyaları ixtisası üzrə ali təhsil. Alqoritmlər, Verilənlər bazası və Proqramlaşdırmanın əsasları."
    }
];

// --- 2. RENDER FUNKSİYASI ---
window.PAGES['experience'] = `
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 animate-fade-in">
        <div>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span class="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
                    <i class="ri-briefcase-4-fill"></i>
                </span>
                İş Təcrübəsi & Təhsil
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg">
                Peşəkar fəaliyyətim, freelancer layihələrim və akademik keçmişim haqqında xronoloji məlumatlar.
            </p>
        </div>
        <button class="mt-4 md:mt-0 px-5 py-2.5 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 transition shadow-sm flex items-center gap-2">
            <i class="ri-download-cloud-2-line"></i> CV Yüklə
        </button>
    </div>

    <div class="relative border-l-2 border-gray-200 dark:border-dark-700 ml-3 md:ml-6 space-y-12 pb-8 animate-fade-in-up">
        
        ${experienceData.map(item => {
            // Rənglərin tənzimlənməsi (Tailwind sinifləri üçün)
            const colorMap = {
                blue: "bg-blue-600 border-blue-600 text-blue-600 shadow-blue-500/30",
                orange: "bg-orange-500 border-orange-500 text-orange-500 shadow-orange-500/30",
                slate: "bg-slate-700 border-slate-700 text-slate-600 shadow-slate-500/30",
                green: "bg-green-600 border-green-600 text-green-600 shadow-green-500/30"
            };
            const activeColor = colorMap[item.color] || colorMap.blue;
            const activeText = `text-${item.color}-600 group-hover:text-${item.color}-500`;

            return `
            <div class="relative pl-8 md:pl-12 group">
                <div class="absolute -left-[14px] top-0 w-7 h-7 rounded-full border-4 border-white dark:border-dark-900 flex items-center justify-center shadow-lg z-10 ${activeColor.replace('text-', '').replace('bg-', 'bg-')}">
                    <i class="${item.icon} text-white text-xs"></i>
                </div>
                
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white transition ${activeText}">${item.title}</h3>
                        <p class="text-slate-500 text-sm font-medium">${item.subtitle}</p>
                    </div>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-700 text-slate-600 dark:text-slate-300 text-xs font-bold border border-gray-200 dark:border-dark-600">
                        ${item.date.includes('Hazırda') ? '<span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>' : ''}
                        ${item.date}
                    </span>
                </div>

                <div class="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition duration-300">
                    
                    ${item.description ? `<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">${item.description}</p>` : ''}
                    
                    ${item.list ? `
                        <ul class="space-y-2 mb-6">
                            ${item.list.map(li => `
                                <li class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                    <i class="ri-check-double-line text-primary mt-0.5"></i>
                                    <span>${li}</span>
                                </li>
                            `).join('')}
                        </ul>
                    ` : ''}

                    ${item.grid ? `
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            ${item.grid.map(g => `
                                <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-900 rounded-lg border border-gray-100 dark:border-dark-700">
                                    <i class="${g.icon} text-${item.color}-500"></i>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-200">${g.text}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    ${item.tags ? `
                        <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-dark-700">
                            ${item.tags.map(tag => `
                                <span class="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-dark-700 text-slate-600 dark:text-slate-300 rounded-md">${tag}</span>
                            `).join('')}
                        </div>
                    ` : ''}

                </div>
            </div>
            `;
        }).join('')}

    </div>
`;