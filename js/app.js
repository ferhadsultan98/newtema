// --- QLOBAL DƏYİŞƏNLƏR ---
const container = document.getElementById('viewContainer');
const searchInput = document.getElementById('searchInput');

// Səhifələmə və Filtr üçün State
let appState = {
    currentCategory: 'All',
    currentPage: 1,
    itemsPerPage: 6
};

// --- ROUTER & NAVİQASİYA SİSTEMİ (YENİLƏNMİŞ) ---

// 1. URL dəyişmək və Router-i çağırmaq üçün əsas funksiya
window.navigateTo = (url, param = null) => {
    // Mobil menyu açıqdırsa bağla
    if (window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
            toggleSidebar();
        }
    }

    // Əgər URL tamdırsa (məsələn: /projects), onu olduğu kimi saxla
    // Əgər sadə ID gəlirsə (məsələn: 'projects'), onu '/projects' formasına sal
    let path = url.startsWith('/') ? url : `/${url}`;
    
    // Parametr varsa URL-ə əlavə et (məsələn: /projects/123)
    if (param) {
        path = `${path}/${param}`;
    }

    // URL-i dəyiş (Səhifə yenilənmədən)
    history.pushState(null, null, path);
    
    // Router-i işlət ki, məzmunu dəyişsin
    router();
};

// 2. URL-ə əsasən düzgün səhifəni tapan funksiya
const router = async () => {
    const path = window.location.pathname; // Hazırkı URL (məs: /projects və ya /blog/5)
    
    // Scrollu yuxarı qaldır
    if(container) container.scrollTo(0, 0);

    // --- 1. DİNAMİK MARŞRUTLAR (Detail Pages) ---

    // Layihə Detalı: /projects/123
    const projectMatch = path.match(/^\/projects\/([\w-]+)$/);
    if (projectMatch) {
        const projectId = projectMatch[1];
        if (typeof window.renderProjectDetailsPage === 'function') {
            container.innerHTML = window.renderProjectDetailsPage(projectId);
        }
        return;
    }

    // Bloq Detalı: /blog/123
    const blogMatch = path.match(/^\/blog\/([\w-]+)$/);
    if (blogMatch) {
        const blogId = blogMatch[1];
        if (typeof window.renderBlogDetailsPage === 'function') {
            container.innerHTML = window.renderBlogDetailsPage(blogId);
        }
        return;
    }

    // --- 2. STATİK SƏHİFƏLƏR ---

    switch (path) {
        case '/':
        case '/home':
            renderHomePage();
            break;
            
        case '/all-tools':
            renderAllToolsPage();
            break;
            
        case '/about':
            container.innerHTML = '<div class="text-center py-20 opacity-50">Yüklənir...</div>';
            // About səhifəsi async ola bilər
            if(window.renderAboutPage) container.innerHTML = await window.renderAboutPage();
            break;

        case '/projects':
             // Projects səhifəsi
            if(window.PAGES['projects']) container.innerHTML = window.PAGES['projects'];
            // Əgər layihələri API-dən çəkən funksiya varsa onu çağır
            if(window.PageProjects && window.PageProjects.render) {
                 // PageProjects.render() birbaşa HTML qaytarırsa:
                 // container.innerHTML = await window.PageProjects.render();
                 // Və ya init funksiyası varsa:
                 // window.PageProjects.init();
            }
            break;

        case '/blog':
             if(window.PAGES['blog']) container.innerHTML = window.PAGES['blog'];
             if(window.PageBlog && window.PageBlog.render) {
                 // container.innerHTML = await window.PageBlog.render();
             }
             break;

        case '/experience':
             if(window.PAGES['experience']) container.innerHTML = window.PAGES['experience'];
             if(window.PageExperience && window.PageExperience.render) {
                 container.innerHTML = await window.PageExperience.render();
             }
             break;

        case '/contact':
             if(window.PAGES['contact']) container.innerHTML = window.PAGES['contact'];
             break;

        default:
             // Heç biri tapılmadısa 404 və ya Ana Səhifə
             // Əgər path sadəcə '/' deyilsə və tanınmırsa
             if(path !== '/') container.innerHTML = '<h2 class="text-2xl font-bold text-center mt-10">404 - Səhifə tapılmadı</h2>';
             else renderHomePage(); 
    }
};

// --- ANA SƏHİFƏ (HOME) ---
function renderHomePage() {
    const recentTools = window.TOOLS_DATA.slice(0, 3);
    
    container.innerHTML = `
        <div class="space-y-8 animate-fade-in">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                <h1 class="text-3xl font-bold mb-2">Salam, Developer! 👋</h1>
                <p class="opacity-90">Gündəlik işlərini asanlaşdıracaq alətlər burada.</p>
            </div>

            <div>
                <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Populyar Alətlər</h2>
                <div id="homeGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </div>
        </div>
    `;
    
    renderSimpleGrid(document.getElementById('homeGrid'), recentTools);
}

// --- BÜTÜN ALƏTLƏR ---
function renderAllToolsPage() {
    container.innerHTML = `
        <div class="space-y-6 animate-fade-in">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Bütün Alətlər</h2>
            </div>

            <div id="categoryTabs" class="flex flex-nowrap gap-2 pb-2 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
            </div>

            <div id="allToolsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            </div>

            <div id="paginationControls" class="flex justify-center items-center gap-2 mt-8 pb-8">
            </div>
        </div>
    `;

    renderCategories(); 
    updateToolsGrid();  
}

// --- KATEQORIYALAR ---
function renderCategories() {
    const tabsContainer = document.getElementById('categoryTabs');
    if (!tabsContainer) return;

    const categories = ['All', ...new Set(window.TOOLS_DATA.map(t => t.category || 'Other'))];

    tabsContainer.innerHTML = categories.map(cat => `
        <button onclick="window.setCategory('${cat}')" 
            class="px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap shrink-0
            ${appState.currentCategory === cat 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                : 'bg-white dark:bg-dark-800 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
            }">
            ${cat}
        </button>
    `).join('');
}

// --- ALƏTLƏRİ YENİLƏMƏK ---
function updateToolsGrid() {
    const grid = document.getElementById('allToolsGrid');
    const pagContainer = document.getElementById('paginationControls');
    if (!grid) return;

    let filtered = window.TOOLS_DATA;
    if (appState.currentCategory !== 'All') {
        filtered = filtered.filter(t => t.category === appState.currentCategory);
    }

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(t => 
            t.title.toLowerCase().includes(searchTerm) || 
            (t.keywords && t.keywords.some(k => k.toLowerCase().includes(searchTerm)))
        );
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / appState.itemsPerPage);
    
    if (appState.currentPage > totalPages) appState.currentPage = 1;
    if (appState.currentPage < 1) appState.currentPage = 1;
    
    const startIndex = (appState.currentPage - 1) * appState.itemsPerPage;
    const endIndex = startIndex + appState.itemsPerPage;
    const visibleTools = filtered.slice(startIndex, endIndex);

    renderSimpleGrid(grid, visibleTools);

    if (totalPages > 1) {
        pagContainer.innerHTML = `
            <button onclick="window.changePage(${appState.currentPage - 1})" ${appState.currentPage === 1 ? 'disabled' : ''} class="p-2 rounded-lg border border-gray-200 dark:border-dark-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-dark-800 text-slate-600 dark:text-white">
                <i class="ri-arrow-left-s-line"></i>
            </button>
            
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300 px-2">
                Səhifə ${appState.currentPage} / ${totalPages}
            </span>

            <button onclick="window.changePage(${appState.currentPage + 1})" ${appState.currentPage === totalPages ? 'disabled' : ''} class="p-2 rounded-lg border border-gray-200 dark:border-dark-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-dark-800 text-slate-600 dark:text-white">
                <i class="ri-arrow-right-s-line"></i>
            </button>
        `;
    } else {
        pagContainer.innerHTML = ''; 
    }
}

// --- KARTLARIN ÇƏKİLMƏSİ ---
function renderSimpleGrid(element, data) {
    if (data.length === 0) {
        element.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-10 text-slate-400">
                <i class="ri-search-2-line text-4xl mb-2"></i>
                <p>Heç nə tapılmadı</p>
            </div>
        `;
        return;
    }

    element.innerHTML = data.map(tool => `
        <div onclick="window.openToolById('${tool.id}')" class="group bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
            <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                    <i class="${tool.icon || 'ri-tools-line'} text-2xl"></i>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-dark-700 px-2 py-1 rounded">
                    ${tool.category || 'General'}
                </span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${tool.title}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">${tool.description}</p>
            <div class="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                Aləti aç <i class="ri-arrow-right-line"></i>
            </div>
        </div>
    `).join('');
}

// --- ACTIONS ---
window.setCategory = (cat) => {
    appState.currentCategory = cat;
    appState.currentPage = 1; 
    renderCategories(); 
    updateToolsGrid();
};

window.changePage = (newPage) => {
    appState.currentPage = newPage;
    updateToolsGrid();
    if(container) container.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openToolById = (id) => {
    // URL-i dəyişirik ki, linki paylaşmaq olsun (məs: /tools/api-tester)
    // Amma hələlik sadə saxlayırıq
    const tool = window.TOOLS_DATA.find(t => t.id === id);
    if (tool) openTool(tool);
};

function openTool(tool) {
    container.innerHTML = `
        <div class="animate-fade-in pb-20">
            <div class="flex items-center gap-3 mb-6">
                <button onclick="window.navigateTo('all-tools')" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-slate-500 transition">
                    <i class="ri-arrow-left-line text-xl"></i>
                </button>
                <div>
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        ${tool.title}
                        <span class="text-xs font-normal bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">${tool.category}</span>
                    </h2>
                </div>
            </div>
            <div id="toolWorkArea" class="bg-white dark:bg-dark-800 p-1 md:p-6 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm min-h-[500px]">
                ${tool.render()}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        if (tool.init) tool.init();
    }, 50);
}

// --- INIT & EVENT LISTENERS ---

// Axtarış
searchInput.addEventListener('input', () => {
    if (window.location.pathname !== '/all-tools') {
        window.navigateTo('all-tools');
    }
    appState.currentPage = 1;
    updateToolsGrid();
});

// Səhifə yüklənəndə (İlk dəfə və ya Refresh olanda)
document.addEventListener('DOMContentLoaded', () => {
    // Mövcud URL-i router-ə göndər
    router();
});

// Back/Forward düymələrinə reaksiya
window.addEventListener("popstate", router);