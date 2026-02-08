// --- 1. DATA ---
const contactInfo = [
    { 
        id: "email",
        label: "Email",
        value: "contact@farhadsultanov.info",
        icon: "ri-mail-send-line",
        action: "copy", // Bu kliklənəndə kopyalayacaq
        color: "text-blue-400"
    },
    { 
        id: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/farhadsultanov",
        icon: "ri-linkedin-box-fill",
        action: "link",
        url: "https://linkedin.com",
        color: "text-blue-600"
    },
    { 
        id: "github",
        label: "GitHub",
        value: "github.com/ferhadsultan98",
        icon: "ri-github-fill",
        action: "link",
        url: "https://github.com/ferhadsultan98",
        color: "text-gray-900 dark:text-white"
    },
    { 
        id: "location",
        label: "Ofis / Lokasiya",
        value: "Bakı, Azərbaycan (GMT+4)",
        icon: "ri-map-pin-2-fill",
        action: "none",
        color: "text-red-500"
    }
];

// --- 2. RENDER ---
window.PAGES['contact'] = `
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-6xl mx-auto min-h-[calc(100vh-140px)] flex items-center animate-fade-in">
        
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
            
            <div class="lg:col-span-2 bg-slate-900 text-white rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-6 opacity-10"><i class="ri-chat-quote-line text-9xl"></i></div>
                <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

                <div class="relative z-10">
                    <h2 class="text-4xl font-bold mb-4">Danışaq?</h2>
                    <p class="text-slate-300 text-lg leading-relaxed mb-10">
                        Yeni layihə ideyanız var və ya komandanıza güc qatmaq istəyirsiniz? Mən hazıram!
                    </p>

                    <div class="space-y-6">
                        ${contactInfo.map(item => `
                            <div class="flex items-start gap-4 group cursor-pointer" 
                                 onclick="${item.action === 'copy' ? `copyToClipboard('${item.value}')` : (item.action === 'link' ? `window.open('${item.url}', '_blank')` : '')}">
                                
                                <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl group-hover:bg-white/20 transition backdrop-blur-sm shrink-0">
                                    <i class="${item.icon} ${item.color === 'text-gray-900 dark:text-white' ? 'text-white' : 'text-blue-300'}"></i>
                                </div>
                                
                                <div>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">${item.label}</p>
                                    <p class="text-base font-medium text-white group-hover:text-blue-300 transition break-all">${item.value}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="relative z-10 mt-12 pt-8 border-t border-white/10">
                    <p class="text-sm text-slate-400">© 2024 Fərhad Sultanov. Bütün hüquqlar qorunur.</p>
                </div>
            </div>

            <div class="lg:col-span-3 bg-white dark:bg-dark-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-dark-700 flex flex-col justify-center">
                
                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Mesaj Göndər</h3>
                    <p class="text-slate-500 dark:text-slate-400">Formu doldurun, ən qısa zamanda sizə geri dönüş edəcəyəm.</p>
                </div>

                <form onsubmit="handleFormSubmit(event)" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="group">
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Adınız</label>
                            <input type="text" required placeholder="Con Doe" class="w-full bg-gray-50 dark:bg-dark-900 border-2 border-gray-100 dark:border-dark-700 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 transition font-medium text-slate-900 dark:text-white">
                        </div>
                        <div class="group">
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                            <input type="email" required placeholder="hello@example.com" class="w-full bg-gray-50 dark:bg-dark-900 border-2 border-gray-100 dark:border-dark-700 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 transition font-medium text-slate-900 dark:text-white">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Mövzu</label>
                        <select class="w-full bg-gray-50 dark:bg-dark-900 border-2 border-gray-100 dark:border-dark-700 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 transition font-medium text-slate-900 dark:text-white appearance-none">
                            <option>Yeni Layihə</option>
                            <option>İş Təklifi</option>
                            <option>Əməkdaşlıq</option>
                            <option>Digər</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Mesajınız</label>
                        <textarea required rows="5" placeholder="Layihəniz haqqında qısaca..." class="w-full bg-gray-50 dark:bg-dark-900 border-2 border-gray-100 dark:border-dark-700 rounded-xl px-4 py-3.5 outline-none focus:border-blue-500 transition font-medium text-slate-900 dark:text-white resize-none"></textarea>
                    </div>

                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group">
                        <span>Göndər</span>
                        <i class="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </form>

            </div>

        </div>
    </div>

    <div id="toast" class="fixed bottom-5 right-5 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-2xl translate-y-20 opacity-0 transition-all duration-300 z-50 flex items-center gap-3">
        <i class="ri-checkbox-circle-fill text-green-400 text-xl"></i>
        <span id="toastMsg">Əməliyyat uğurlu!</span>
    </div>
`;

// --- GLOBAL FUNCTIONS ---

window.copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Email kopyalandı!");
}

window.handleFormSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const oldHtml = btn.innerHTML;
    
    // Loading State
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line animate-spin text-xl"></i>';
    btn.classList.add('opacity-75');

    setTimeout(() => {
        btn.innerHTML = '<i class="ri-check-double-line text-xl"></i> Göndərildi!';
        btn.classList.replace('bg-blue-600', 'bg-green-600');
        btn.classList.replace('shadow-blue-500/30', 'shadow-green-500/30');
        showToast("Mesajınız uğurla göndərildi!");
        e.target.reset();

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = oldHtml;
            btn.classList.remove('opacity-75');
            btn.classList.replace('bg-green-600', 'bg-blue-600');
            btn.classList.replace('shadow-green-500/30', 'shadow-blue-500/30');
        }, 3000);
    }, 1500);
}

window.showToast = (msg) => {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}