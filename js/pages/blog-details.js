// --- FUNKSİONAL MƏNTİQ (YENİLƏNDİ VƏ TƏKMİLLƏŞDİRİLDİ) ---

// 1. Share Menyusunu açmaq və kənara kliklədikdə bağlamaq
window.toggleShare = (event) => {
    event.stopPropagation();
    const menu = document.getElementById('shareMenu');
    if (!menu) return;
    
    const isHidden = menu.classList.contains('hidden');
    
    // Bütün menyuları bağla, sonra lazımi olanı aç
    menu.classList.toggle('hidden', !isHidden);
    menu.classList.toggle('flex', isHidden);
};

// Kənara kliklədikdə menyunu bağla
window.onclick = (e) => {
    const menu = document.getElementById('shareMenu');
    if (menu && !menu.contains(e.target)) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
    }
};

// Sosial şəbəkədə paylaş və menyunu bağla
window.shareAction = (platform, title) => {
    const url = window.location.href;
    let shareUrl = '';
    
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    if (platform === 'x') shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    if (platform === 'instagram') {
        navigator.clipboard.writeText(url);
        alert("Link kopyalandı! Instagram hekayənizdə paylaşa bilərsiniz.");
    }

    if (shareUrl) window.open(shareUrl, '_blank');
    
    const menu = document.getElementById('shareMenu');
    if (menu) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
    }
};

// 2. Like Animasiyası (FIX EDİLDİ: Kiçilmir, Böyüyür)
window.handleLike = (btn) => {
    const icon = btn.querySelector('i');
    const counter = btn.querySelector('.like-count');
    let isLiked = btn.dataset.liked === 'true';
    let count = parseInt(counter.innerText);

    if (!isLiked) {
        // LIKED STATE
        btn.dataset.liked = 'true';
        btn.classList.add('text-red-500', 'bg-red-50', 'dark:bg-red-900/20', 'border-red-200');
        btn.classList.remove('text-slate-400', 'bg-slate-50', 'dark:bg-dark-800');
        icon.className = 'ri-heart-3-fill';
        counter.innerText = count + 1;
        
        // Pulse Animasiyası
        icon.style.transform = 'scale(1.4)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 200);
    } else {
        // UNLIKED STATE
        btn.dataset.liked = 'false';
        btn.classList.remove('text-red-500', 'bg-red-50', 'dark:bg-red-900/20', 'border-red-200');
        btn.classList.add('text-slate-400', 'bg-slate-50', 'dark:bg-dark-800');
        icon.className = 'ri-heart-3-line';
        counter.innerText = count - 1;
        
        // Geri qayıdış animasiyası
        icon.style.transform = 'scale(0.8)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 150);
    }
};

// --- RENDER FUNKSİYASI ---

window.renderBlogDetailsPage = (blogId) => {
    const post = window.BLOG_DATA.find(b => b.id === blogId);
    if (!post) return `<div class="text-center py-20 text-slate-500 font-bold">Məqalə tapılmadı.</div>`;

    const tags = ["Engineering", "FutureTech", "DigitalTransformation", post.category, "Software"];

    return `
        <style>
            /* Like Animasiyası üçün xüsusi transition */
            .like-btn i { 
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease; 
                display: inline-block;
            }
            .animate-fade-in { animation: fadeIn 0.4s ease-out; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        </style>

        <div class="max-w-5xl mx-auto animate-fade-in pb-20">
            
            <div class="flex items-center justify-between mb-12">
                <button onclick="navigateTo('blog')" class="group flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-xl hover:border-blue-600 transition shadow-sm">
                    <i class="ri-arrow-left-line text-blue-600 group-hover:-translate-x-1 transition"></i>
                    <span class="text-sm font-bold text-slate-600 dark:text-slate-300">Geri qayıt</span>
                </button>

                <div class="flex gap-3 relative">
                    <div class="relative">
                        <button onclick="toggleShare(event)" class="w-11 h-11 rounded-xl bg-slate-50 dark:bg-dark-800 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition border border-transparent hover:border-blue-100 flex items-center justify-center">
                            <i class="ri-share-forward-line text-xl"></i>
                        </button>
                        
                        <div id="shareMenu" class="hidden absolute right-0 mt-3 bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 p-2 rounded-2xl shadow-2xl z-50 flex-col min-w-[180px]">
                            <button onclick="shareAction('facebook', '${post.title}')" class="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition text-slate-600 dark:text-slate-300 w-full">
                                <i class="ri-facebook-box-fill text-blue-600 text-xl"></i>
                                <span class="text-xs font-bold uppercase">Facebook</span>
                            </button>
                            <button onclick="shareAction('x', '${post.title}')" class="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-dark-800 rounded-xl transition text-slate-600 dark:text-slate-300 w-full">
                                <i class="ri-twitter-x-fill text-slate-900 dark:text-white text-xl"></i>
                                <span class="text-xs font-bold uppercase">X (Twitter)</span>
                            </button>
                            <button onclick="shareAction('instagram', '${post.title}')" class="flex items-center gap-3 p-3 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-xl transition text-slate-600 dark:text-slate-300 w-full">
                                <i class="ri-instagram-line text-pink-600 text-xl"></i>
                                <span class="text-xs font-bold uppercase">Instagram</span>
                            </button>
                        </div>
                    </div>

                    <button onclick="handleLike(this)" data-liked="false" class="like-btn flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-dark-800 text-slate-400 border border-transparent rounded-xl transition-all duration-300">
                        <i class="ri-heart-3-line text-xl"></i>
                        <span class="like-count text-xs font-black">${post.likes || 0}</span>
                    </button>
                </div>
            </div>

            <div class="text-center max-w-3xl mx-auto mb-12">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-md mb-6">
                    <span class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                    ${post.category}
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                    ${post.title}
                </h1>
                
                <div class="flex items-center justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-slate-800 pt-8">
                    <div class="flex flex-col gap-1"><span class="text-blue-600 font-black">Tarix</span><span>${post.date}</span></div>
                    <div class="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                    <div class="flex flex-col gap-1"><span class="text-blue-600 font-black">Baxış</span><span>${post.viewCount + 5}</span></div>
                    <div class="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                    <div class="flex flex-col gap-1"><span class="text-blue-600 font-black">Müddət</span><span>${post.readTime}</span></div>
                </div>
            </div>

            <div class="relative w-full h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl mb-16 border-8 border-white dark:border-dark-800">
                <img src="${post.image}" class="w-full h-full object-cover">
                <div class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[40px]"></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div class="lg:col-span-8">
                    <article class="prose prose-blue dark:prose-invert max-w-none">
                        <div class="text-slate-600 dark:text-slate-300 leading-[1.8] text-xl font-medium">
                            <p class="mb-8 first-letter:text-7xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                                ${post.summary}
                            </p>
                            <div class="space-y-8 mt-12 text-lg opacity-90">
                                ${post.content}
                            </div>
                        </div>
                    </article>

                    <div class="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                        ${tags.map(h => `<span class="px-5 py-2.5 bg-white dark:bg-dark-800 text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-wider rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition cursor-default shadow-sm">#${h}</span>`).join('')}
                    </div>
                </div>

                <div class="lg:col-span-4 space-y-8">
                    <div class="bg-slate-50 dark:bg-dark-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 sticky top-24">
                        <h4 class="font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
                            <i class="ri-notification-badge-line text-blue-600"></i> Bülleten
                        </h4>
                        <p class="text-sm text-slate-500 mb-6 font-medium">Həftəlik texnoloji icmalları emailinizdə qəbul edin.</p>
                        <input type="email" placeholder="Email ünvanı" class="w-full bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 transition mb-3">
                        <button class="w-full bg-blue-600 text-white font-black py-3.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 text-[10px] uppercase tracking-widest">Abunə ol</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};