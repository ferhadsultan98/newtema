// 1. BLOG DATA (Likes sahəsi əlavə edildi)
window.BLOG_DATA = [
    {
        id: "nextjs-15-update",
        title: "Next.js 15: Müasir Veb Arxitekturasında Yeni Era",
        category: "Development",
        date: "07 Fevral, 2026",
        viewCount: 1420,
        likes: 124,
        readTime: "6 dəq",
        image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop",
        summary: "Next.js 15 ilə gələn caching mexanizmləri və React 19 inteqrasiyası proqramçılar üçün hansı üstünlükləri yaradır? Performans testləri və analiz.",
        content: `Next.js 15 artıq server-side rendering tərəfində inqilabi dəyişikliklər təklif edirasf Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum....`
    },
    {
        id: "cyber-security-2026",
        title: "2026-cı ildə Kiber Təhlükəsizlik Trendləri",
        category: "Security",
        date: "04 Fevral, 2026",
        viewCount: 3100,
        likes: 89,
        readTime: "10 dəq",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        summary: "AI əsaslı kiber hücumlar və onlardan qorunma yolları. Şirkətlər öz infrastrukturunu necə sığortalamalıdır?",
        content: `Kiber təhlükəsizlik artıq sadəcə firewall və antivirus deyil...`
    }
];

// 2. FILTER FUNKSİYASI
window.filterBlog = (category) => {
    const grid = document.getElementById('blogGrid');
    const filteredData = category === 'All' 
        ? window.BLOG_DATA 
        : window.BLOG_DATA.filter(post => post.category === category);
    
    grid.innerHTML = filteredData.map(post => renderBlogCard(post)).join('');
    
    // Aktiv düymə stili
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-white', 'dark:bg-dark-800', 'text-slate-600');
    });
    event.currentTarget.classList.add('bg-blue-600', 'text-white');
    event.currentTarget.classList.remove('text-slate-600');
};

// Köməkçi Kart Renderi
function renderBlogCard(post) {
    return `
        <div onclick="navigateTo('blog-details', '${post.id}')" class="group bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-dark-700 overflow-hidden hover:border-blue-600 transition-all duration-500 flex flex-col h-full cursor-pointer shadow-sm hover:shadow-xl">
            <div class="h-56 relative overflow-hidden">
                <img src="${post.image}" class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700">
                <div class="absolute bottom-4 left-4">
                    <span class="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg">${post.category}</span>
                </div>
            </div>
            <div class="p-7 flex-1 flex flex-col">
                <div class="flex items-center gap-4 text-[11px] text-slate-400 font-bold mb-4 uppercase">
                    <span class="flex items-center gap-1.5"><i class="ri-time-line text-blue-600"></i> ${post.date}</span>
                    <span class="flex items-center gap-1.5"><i class="ri-eye-line text-blue-600"></i> ${post.viewCount}</span>
                </div>
                <h3 class="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors mb-4">${post.title}</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">${post.summary}</p>
                <div class="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-400">${post.readTime} mütaliə</span>
                    <div class="flex items-center gap-1 text-blue-600 font-bold text-xs">OXU <i class="ri-arrow-right-line"></i></div>
                </div>
            </div>
        </div>`;
}

// 3. RENDER LIST
const categories = ['All', ...new Set(window.BLOG_DATA.map(p => p.category))];

window.PAGES['blog'] = `
    <div class="mb-12 animate-fade-in">
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
            <span class="w-2 h-10 bg-blue-600 rounded-full"></span>
            Texnoloji Xəbərlər
        </h2>
        
        <div class="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            ${categories.map(cat => `
                <button onclick="filterBlog('${cat}')" class="cat-btn flex-shrink-0 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-dark-700 font-bold text-xs uppercase tracking-widest transition-all ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-dark-800 text-slate-600 dark:text-slate-300'}">
                    ${cat}
                </button>
            `).join('')}
        </div>
    </div>

    <div id="blogGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 animate-fade-in-up">
        ${window.BLOG_DATA.map(post => renderBlogCard(post)).join('')}
    </div>
`;