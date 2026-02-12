const aiChatTool = {
    id: "ai-assistant-ultimate-pro",
    title: "AI Chat (Professional)",
    description: "DeepSeek və Llama dəstəkli, tam təhlükəsiz və animasiyalı xüsusi çat.",
    icon: "ri-openai-fill", 
    category: "AI & Communication",
    keywords: ["chat", "ai", "deepseek", "groq", "llama", "fs tools", "secure"],

    render: () => {
        return `
            <style>
                /* AI Animated Background */
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes gradientThinking {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes gradientTyping {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes gradientSolving {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes gradientGreeting {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .ai-animated-bg {
                    background: linear-gradient(-45deg, #eef2ff, #f0f9ff, #e0e7ff, #f5f3ff);
                    background-size: 400% 400%;
                    animation: gradientBG 15s ease infinite;
                    transition: all 0.5s ease;
                }
                
                .dark .ai-animated-bg {
                    background: linear-gradient(-45deg, #0f172a, #1e1b4b, #111827, #172554);
                    background-size: 400% 400%;
                    animation: gradientBG 15s ease infinite;
                }
                
                /* Düşünərkən - Mavi-Bənövşəyi */
                .ai-animated-bg.thinking {
                    background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #6366f1, #a855f7);
                    background-size: 400% 400%;
                    animation: gradientThinking 3s ease infinite;
                }
                
                .dark .ai-animated-bg.thinking {
                    background: linear-gradient(-45deg, #1e40af, #6b21a8, #4338ca, #7e22ce);
                    background-size: 400% 400%;
                    animation: gradientThinking 3s ease infinite;
                }
                
                /* Yazarkən - Yaşıl-Mavi */
                .ai-animated-bg.typing {
                    background: linear-gradient(-45deg, #10b981, #06b6d4, #14b8a6, #0ea5e9);
                    background-size: 400% 400%;
                    animation: gradientTyping 2s ease infinite;
                }
                
                .dark .ai-animated-bg.typing {
                    background: linear-gradient(-45deg, #047857, #0e7490, #0f766e, #0369a1);
                    background-size: 400% 400%;
                    animation: gradientTyping 2s ease infinite;
                }
                
                /* Xəta həll edəndə - Sarı-Narıncı */
                .ai-animated-bg.solving {
                    background: linear-gradient(-45deg, #fbbf24, #f97316, #fb923c, #fcd34d);
                    background-size: 400% 400%;
                    animation: gradientSolving 2.5s ease infinite;
                }
                
                .dark .ai-animated-bg.solving {
                    background: linear-gradient(-45deg, #d97706, #c2410c, #ea580c, #ca8a04);
                    background-size: 400% 400%;
                    animation: gradientSolving 2.5s ease infinite;
                }
                
                /* Salamlayanda - Qızılı-Çəhrayı */
                .ai-animated-bg.greeting {
                    background: linear-gradient(-45deg, #fbbf24, #ec4899, #f59e0b, #f472b6);
                    background-size: 400% 400%;
                    animation: gradientGreeting 3s ease infinite;
                }
                
                .dark .ai-animated-bg.greeting {
                    background: linear-gradient(-45deg, #d97706, #be185d, #d97706, #db2777);
                    background-size: 400% 400%;
                    animation: gradientGreeting 3s ease infinite;
                }
                
                /* Typing Indicator Animation */
                @keyframes typingDots {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
                    30% { transform: translateY(-10px); opacity: 1; }
                }
                
                .typing-indicator {
                    display: inline-flex;
                    gap: 4px;
                    align-items: center;
                    padding: 8px 12px;
                }
                
                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background: currentColor;
                    border-radius: 50%;
                    animation: typingDots 1.4s infinite;
                }
                
                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }
                
                /* Cursor blink for typing effect */
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                
                .typing-cursor {
                    display: inline-block;
                    width: 2px;
                    height: 1em;
                    background: currentColor;
                    margin-left: 2px;
                    animation: blink 1s infinite;
                }
                
                /* Code Block Styling */
                .code-block {
                    position: relative;
                    margin: 12px 0;
                }
                
                .code-block pre {
                    background: #1e1e1e !important;
                    color: #d4d4d4 !important;
                    padding: 16px !important;
                    border-radius: 8px !important;
                    overflow-x: auto !important;
                    font-family: 'Fira Code', 'Consolas', monospace !important;
                    font-size: 13px !important;
                    line-height: 1.6 !important;
                    border: 1px solid #333 !important;
                }
                
                .code-block .copy-btn {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    padding: 4px 8px;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                    font-size: 11px;
                    opacity: 0;
                    transition: all 0.2s;
                }
                
                .code-block:hover .copy-btn {
                    opacity: 1;
                }
                
                .code-block .copy-btn:hover {
                    background: rgba(255,255,255,0.2);
                }
                
                /* Syntax Highlighting Colors */
                .code-keyword { color: #569cd6; }
                .code-string { color: #ce9178; }
                .code-number { color: #b5cea8; }
                .code-comment { color: #6a9955; font-style: italic; }
                .code-function { color: #dcdcaa; }
                
                /* Tam Ekran Zamanı Scroll Problemini Həll Etmək */
                :fullscreen .chat-container { height: 100vh; max-height: 100vh; border-radius: 0; }
                ::backdrop { background-color: #000; }
                
                /* Smooth scroll */
                .custom-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
                }
                
                .custom-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .custom-scroll::-webkit-scrollbar-thumb {
                    background-color: rgba(156, 163, 175, 0.3);
                    border-radius: 3px;
                }
                
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(156, 163, 175, 0.5);
                }
                
                /* Message animation */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.3s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
                
                /* Status indicator pulse */
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            </style>

            <div id="chatMainContainer" class="chat-container flex flex-col h-[600px] max-h-[85vh] bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-2xl overflow-hidden shadow-2xl relative animate-fade-in group transition-all duration-300">
                
                <div class="bg-white/90 dark:bg-dark-800/90 backdrop-blur-md p-3 flex items-center justify-between border-b border-gray-200 dark:border-dark-700 z-50 relative shadow-sm">
                    
                    <div class="flex items-center gap-3 overflow-hidden">
                        <div class="relative flex-shrink-0">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
                                <i class="ri-robot-3-line text-xl"></i>
                            </div>
                            <span id="statusIndicator" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-dark-800 rounded-full"></span>
                        </div>
                        
                        <div class="flex flex-col min-w-0">
                            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none mb-1 truncate">AI Köməkçi</h3>
                            
                            <div class="relative flex items-center">
                                <select id="modelSelector" class="appearance-none bg-transparent text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide cursor-pointer focus:outline-none pr-3 hover:text-blue-600 transition">
                                    <option value="groq">Llama 3.3 70B (Fast)</option>
                                    <option value="deepseek">DeepSeek V3 (Smart)</option>
                                </select>
                                <i class="ri-arrow-down-s-fill absolute right-0 text-xs text-slate-400 pointer-events-none"></i>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-1">
                        <button id="fullScreenBtn" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400 transition" title="Tam Ekran">
                            <i id="fullScreenIcon" class="ri-fullscreen-line text-xl"></i>
                        </button>

                        <div class="relative">
                            <button id="chatMenuBtn" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400 transition">
                                <i class="ri-more-2-fill text-xl"></i>
                            </button>
                            <div id="chatMenuDropdown" class="hidden absolute right-0 top-12 w-48 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden z-50 transform origin-top-right transition-all duration-200">
                                <button id="clearChatBtn" class="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition">
                                    <i class="ri-delete-bin-line"></i> Söhbəti təmizlə
                                </button>
                                <button id="exportChatBtn" class="w-full text-left px-4 py-3 text-sm text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2 transition">
                                    <i class="ri-download-line"></i> Söhbəti yüklə
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="chatBody" class="ai-animated-bg flex-1 overflow-y-auto p-4 space-y-4 custom-scroll scroll-smooth relative z-10">
                    
                    <div class="flex justify-center mb-4 relative z-10">
                        <span class="bg-white/50 dark:bg-black/20 backdrop-blur-md text-slate-600 dark:text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">Bu gün</span>
                    </div>

                    <div id="welcomeMsg" class="flex justify-start w-full animate-fade-in-up relative z-10">
                        <div class="bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-none py-2 px-3 max-w-[85%] md:max-w-[70%] shadow-sm relative">
                            <p class="text-sm leading-relaxed mb-1">
                                Salam! 😊 Mən FS Tools üçün hazırlanmış xüsusi süni intellektəm. Sizə necə kömək edə bilərəm?
                            </p>
                            <div class="flex justify-end items-center gap-1 mt-1">
                                <span class="text-[10px] text-slate-400 dark:text-slate-500 select-none timestamp-now"></span>
                            </div>
                        </div>
                    </div>

                    <div id="messagesContainer" class="relative z-10 space-y-4"></div>

                </div>

                <div class="bg-white/90 dark:bg-dark-800/90 backdrop-blur-md p-2 md:p-3 flex items-end gap-2 border-t border-gray-200 dark:border-dark-700 z-50">
                    <div class="flex-1 bg-gray-100 dark:bg-dark-900 rounded-3xl flex items-center px-4 py-2 border border-transparent focus-within:border-blue-500/30 transition-all">
                        <textarea id="chatInput" rows="1" class="w-full bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 text-sm resize-none max-h-32 custom-scroll placeholder:text-slate-400" placeholder="Sualınızı yazın..."></textarea>
                    </div>
                    <button id="sendBtn" class="w-10 h-10 md:w-12 md:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="ri-send-plane-fill text-lg md:text-xl ml-0.5"></i>
                    </button>
                </div>
            </div>
        `;
    },

    init: () => {
        const mainContainer = document.getElementById('chatMainContainer');
        const chatBody = document.getElementById('chatBody');
        const messagesContainer = document.getElementById('messagesContainer');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const modelSelector = document.getElementById('modelSelector');
        const statusIndicator = document.getElementById('statusIndicator');
        
        const fullScreenBtn = document.getElementById('fullScreenBtn');
        const fullScreenIcon = document.getElementById('fullScreenIcon');
        const menuBtn = document.getElementById('chatMenuBtn');
        const menuDropdown = document.getElementById('chatMenuDropdown');
        const clearChatBtn = document.getElementById('clearChatBtn');
        const exportChatBtn = document.getElementById('exportChatBtn');

        document.querySelectorAll('.timestamp-now').forEach(el => el.innerText = getCurrentTime());

        // ==========================================
        //  API AÇARLARI (Bura yazın)
        // ==========================================
        const KEYS = {
            groq: "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", 
            deepseek: "sk-43634066da7245a98c7d7359453a8988"
        };

        // ==========================================
        //  GUARDRAILS (GİZLİ TƏHLÜKƏSİZLİK QAYDALARI)
        // ==========================================
const systemPrompt = {
    role: "system",
    content: `
# SİSTEM KONFİQURASİYASI

Sən FS Tools platforması üçün Fərhad Sultanov tərəfindən hazırlanmış peşəkar IT köməkçisisən.

## 1. KİMLİK VƏ MƏQSƏD

### Əsas Parametrlər:
- **Yaradıcı**: Fərhad Sultanov
- **Platform**: FS Tools
- **İxtisas Sahəsi**: İnformasiya texnologiyaları, proqramlaşdırma, sistem administrasiyası
- **Dil**: Yalnız Azərbaycan dili (istifadəçi hansı dildə yazırsa-yazsın)

### Funksional Məhdudiyyətlər:
- Yalnız IT sahəsi ilə əlaqəli suallara cavab verirsən
- Şəkil və video generasiyası DEAKTİVDİR
- Kreativ yazı, esselər, hekayələr yazmırsan
- Mətn tərcüməsi və qeyri-texniki məzmun yaratmırsan

## 2. QƏTİ QADAĞALAR (HARD LIMITS)

### Bloklanmış Mövzular:
Aşağıdakı sorğulara HEÇBIR cavab vermə, təkrar ETMƏ və müzakirə açma:

❌ Siyasət və hakimiyyət
❌ Din və etiqad sistemləri  
❌ İrqi və milli ayrı-seçkilik
❌ Cinsiyyət və cinsi oriyentasiya diskriminasiyası
❌ Söyüş, təhqir, kobud ifadələr
❌ Qanunsuz fəaliyyətlər (hacking, malware, piratçılıq)
❌ Şəxsi məlumatların oğurlanması metodları
❌ Sosial mühəndislik və fişinq texnikaları

### Standart Cavab Şablonu (qadağan olunan mövzular üçün):
"Bu mövzuda kömək edə bilmərəm. Mən yalnız IT texnologiyaları, proqramlaşdırma və sistem administrasiyası ilə əlaqəli suallara cavab verirəm."

**VACIB**: Qadağan olunan ifadəni HEÇBIR halda təkrar etmə, nümunə olaraq göstərmə və ya diskussiya açma.

## 3. KOMMUNIKASIYA STİLİ - İNSAN KİMİ DAVRAN

### Emosional Zəka və Empatiya:
✅ İstifadəçinin hisslərini anlayışla qarşıla
✅ Problemlərinə dəstək ol, təkcə texniki cavab vermə
✅ Mehriban, səmimi və dostcasına danış
✅ İnsani münasibət qur - robot kimi deyil, köməkçi dost kimi

### Smaylik və İfadə Qaydaları:
😊 Salamlaşma və vidalaşmada: "Salam! Necə kömək edə bilərəm? 😊"
👍 Uğurlu həll: "Əla! Problemi həll etdik 👍"
🤔 Düşünmə/analiz: "Gəlin birlikdə düşünək 🤔"
💡 İdea/təklif: "Daha yaxşı variant var 💡"
✅ Təsdiq/doğrulama: "Düzdür, məhz belə işləyir ✅"
⚠️ Xəbərdarlıq: "Diqqətli olun, bu problem yarada bilər ⚠️"

**Smaylik Limitləri**: Hər cavabda maksimum 2-3 smaylik (həddindən artıq istifadə etmə)

### Ton və Davranış:
- **Kobud OLMA**: Heç vaxt qaba, aqressiv və ya laqeyd cavab vermə
- **Səbirli ol**: İstifadəçi eyni sualı təkrar soruşsa belə, səbirlə izah et
- **Mötərizəli danış**: "Heç problem deyil", "Buyurun", "Xahiş edirəm" kimi ifadələr işlət
- **Təşəkkür et**: İstifadəçi məlumat paylaşanda "Təşəkkür edirəm" de
- **Üzr dilə**: Səhv etsən və ya başa düşməsən "Üzr istəyirəm" de

### Cavab Strukturu:
1️⃣ **Salamlaşma/Tanıma** (ilk mesajda)
2️⃣ **Empati ifadəsi** (problemə görə)
3️⃣ **Texniki həll yolu** (sadə dillə)
4️⃣ **Kod nümunəsi** (lazım olduqda)
5️⃣ **Yekun və dəstək** (əlavə suallar üçün açıq ol)

### NÜMUNƏ DİALOQLAR:

**İstifadəçi**: "Bu kod işləmir, niyə?"
**Səhv cavab** ❌: "Kodda səhv var. Düzəlt."
**Düzgün cavab** ✅: "Gəlin birlikdə baxaq 🤔 Problemin səbəbi [X] ola bilər. İndi düzəldək 💡"

---

**İstifadəçi**: "Mən başa düşmürəm..."
**Səhv cavab** ❌: "Sadə məsələdir, başa düşmək çətin deyil."
**Düzgün cavab** ✅: "Heç problem deyil! 😊 Gəlin addım-addım izah edim, daha aydın olacaq."

---

**İstifadəçi**: [Kobud ifadə işlədir]
**Səhv cavab** ❌: [İfadəni təkrar edib] "Bu barədə danışa bilmərəm."
**Düzgün cavab** ✅: "Bu mövzuda kömək edə bilmərəm. IT sahəsində başqa bir sualınız varsa, məmnuniyyətlə cavablandıraram 😊"

## 4. TEXNIKI STANDARTLAR

### Cavab Formatı:
✅ Qısa, konkret, lakin insani ton
✅ Struktur: empati → problemin anlaşılması → həll yolu → kod nümunəsi
✅ Kodda best practices və standartlara riayət
✅ Xəta hallarının (error handling) nəzərə alınması
✅ İzahlar sadə dillə, texniki terminlər açıqlanır

### Kod Yazarkən:
- Clean Code prinsiplərinə uyğunluq
- Şərhlərin (comments) Azərbaycan dilində yazılması
- Təhlükəsizlik (security) aspektlərinin nəzərə alınması
- Performance optimizasiyası
- Readability (oxunaqlıq) prioritet

### Dəstəklənən Sahələr:
- Backend/Frontend development
- Database design və optimizasiya
- DevOps və CI/CD
- Cloud texnologiyaları
- Kibertəhlükəsizlik (etik çərçivədə)
- Sistem arxitekturası
- API development
- Mobil proqramlaşdırma

## 5. CAVAB VERMƏZLİK ŞƏRTLƏRI

Aşağıdakı hallarda mehriban şəkildə rədd et:

🚫 İT sahəsi ilə əlaqəsi olmayan mövzular
   → "Bu mövzu mənim ixtisasım deyil, amma IT sahəsində hər zaman köməyə hazıram 😊"

🚫 Kreativ mətn yazısı (esselər, hekayələr, şeirlər)
   → "Kreativ mətn yazmaq mənim funksiyam deyil. Texniki sənədlər və kodda kömək edə bilərəm 💡"

🚫 Qeyri-etik hacking və sistem sındırma
   → "Bu, qanuni deyil və kömək edə bilmərəm. Etik kibertəhlükəsizlik mövzularında isə məmnuniyyətlə danışarıq ✅"

## 6. ÖZÜNÜ TANITMAQ

Sorğu: "Sən kimsən?" / "Səni kim yaradıb?"

Cavab:
"Salam! 😊 Mən Fərhad Sultanov tərəfindən FS Tools platforması üçün hazırlanmış AI köməkçisiyəm. IT texnologiyaları və proqramlaşdırma mövzularında sizə kömək etmək üçün buradadam. Nə kimi sualınız var? 💡"

---

## 7. XATIRLATMA

🎯 **Əsas prinsip**: İnsan kimi danış, robot kimi yox
❤️ **Empatiya**: Hər zaman anlayışlı və mehriban ol
🚫 **Qəti qadağa**: Kobud olmaq, smayliksiz soyuq cavab vermək
✅ **Məqsəd**: İstifadəçi texniki kömək alarkən özünü rahat hiss etsin

Hər bir sorğuda peşəkarlıq, etika və **insani münasibət** prioritetdir.
    `
};

        let conversationHistory = [systemPrompt];
        let isTyping = false;
        let currentMessageElement = null;

        // --- BACKGROUNDto STATE DƏYIŞMƏ ---
        function setBackgroundState(state) {
            chatBody.classList.remove('thinking', 'typing', 'solving', 'greeting');
            if (state) {
                chatBody.classList.add(state);
            }
        }

        // --- STATUS INDICATOR ---
        function setStatus(status) {
            statusIndicator.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-red-500', 'animate-pulse');
            
            switch(status) {
                case 'online':
                    statusIndicator.classList.add('bg-green-500');
                    break;
                case 'thinking':
                    statusIndicator.classList.add('bg-yellow-500', 'animate-pulse');
                    break;
                case 'typing':
                    statusIndicator.classList.add('bg-blue-500', 'animate-pulse');
                    break;
                case 'error':
                    statusIndicator.classList.add('bg-red-500');
                    break;
            }
        }

        // --- TAM EKRAN (REAL FULL SCREEN) ---
        fullScreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (mainContainer.requestFullscreen) {
                    mainContainer.requestFullscreen().catch(err => {
                        console.log("Full screen error:", err);
                        fallbackFullScreen();
                    });
                } else {
                    fallbackFullScreen();
                }
            } else {
                document.exitFullscreen();
            }
        });

        function fallbackFullScreen() {
            mainContainer.classList.toggle('fixed');
            mainContainer.classList.toggle('inset-0');
            mainContainer.classList.toggle('z-[9999]');
            mainContainer.classList.toggle('h-full');
            mainContainer.classList.toggle('max-h-full');
            mainContainer.classList.toggle('rounded-none');
        }

        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                fullScreenIcon.className = "ri-fullscreen-exit-line text-xl";
                mainContainer.classList.remove('rounded-2xl');
            } else {
                fullScreenIcon.className = "ri-fullscreen-line text-xl";
                mainContainer.classList.add('rounded-2xl');
            }
        });

        // --- MENU ---
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.add('hidden');
            }
        });

        clearChatBtn.addEventListener('click', () => {
            messagesContainer.innerHTML = '';
            conversationHistory = [systemPrompt];
            menuDropdown.classList.add('hidden');
            setBackgroundState(null);
        });

        exportChatBtn.addEventListener('click', () => {
            const chatHistory = conversationHistory.slice(1).map(msg => {
                return `${msg.role === 'user' ? 'İstifadəçi' : 'AI'}: ${msg.content}`;
            }).join('\n\n');
            
            const blob = new Blob([chatHistory], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `chat-${new Date().getTime()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
            menuDropdown.classList.add('hidden');
        });

        // --- TYPING INDICATOR ---
        function showTypingIndicator() {
            const div = document.createElement('div');
            div.id = 'typingIndicator';
            div.className = "flex justify-start w-full animate-fade-in-up mb-2";
            div.innerHTML = `
                <div class="bg-white dark:bg-dark-800 text-slate-400 dark:text-slate-500 rounded-2xl rounded-tl-none py-2 px-3 shadow-sm">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            `;
            messagesContainer.appendChild(div);
            scrollToBottom();
        }

        function hideTypingIndicator() {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) {
                indicator.remove();
            }
        }

        // --- MESAJ GÖNDƏRMƏ ---
        async function sendMessage() {
            const text = chatInput.value.trim();
            if (!text || isTyping) return;

            // İlk mesaj salamlaşma yoxla
            const greetings = ['salam', 'hello', 'hi', 'salam', 'hey', 'salamlar'];
            const isGreeting = greetings.some(g => text.toLowerCase().includes(g));
            
            if (isGreeting) {
                setBackgroundState('greeting');
                setTimeout(() => setBackgroundState(null), 3000);
            }

            addMessageToUI('user', text);
            chatInput.value = '';
            chatInput.style.height = 'auto'; 
            chatInput.focus();
            
            isTyping = true;
            setStatus('thinking');
            setBackgroundState('thinking');
            showTypingIndicator();

            conversationHistory.push({ role: "user", content: text });

            const selectedProvider = modelSelector.value;
            const apiKey = KEYS[selectedProvider];

            let apiUrl = "";
            let apiModel = "";

            if (selectedProvider === 'groq') {
                apiUrl = "https://api.groq.com/openai/v1/chat/completions";
                apiModel = "llama-3.3-70b-versatile";
            } else {
                apiUrl = "https://api.deepseek.com/chat/completions";
                apiModel = "deepseek-chat"; 
            }

            try {
                if (!apiKey || apiKey.includes("BURA_") || apiKey.includes("harika") || apiKey.includes("ayakta")) {
                    throw new Error("API Açarı daxil edilməyib!");
                }

                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: apiModel,
                        messages: conversationHistory,
                        temperature: 0.7,
                        stream: true // STREAMING AKTIV
                    })
                });

                hideTypingIndicator();
                setStatus('typing');
                setBackgroundState('typing');

                if (!response.ok) {
                    throw new Error(`API Xətası: ${response.status}`);
                }

                // Kod və xəta həll animasiyası yoxla
                const checkForCodeOrError = (text) => {
                    if (text.includes('```') || text.includes('error') || text.includes('xəta') || text.includes('problem')) {
                        setBackgroundState('solving');
                    }
                };

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let aiReply = '';
                
                // AI mesaj bubble yarat
                currentMessageElement = createAIMessageBubble();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') continue;

                            try {
                                const parsed = JSON.parse(data);
                                const content = parsed.choices?.delta?.content || '';
                                
                                if (content) {
                                    aiReply += content;
                                    checkForCodeOrError(aiReply);
                                    await typeWriterEffect(content, currentMessageElement);
                                }
                            } catch (e) {
                                // JSON parse xətası - növbəti líneyə keç
                            }
                        }
                    }
                }

                conversationHistory.push({ role: "assistant", content: aiReply });
                setStatus('online');
                setBackgroundState(null);

            } catch (error) {
                hideTypingIndicator();
                addMessageToUI('error', error.message || "İnternet xətası.");
                setStatus('error');
                setBackgroundState(null);
            } finally {
                isTyping = false;
                currentMessageElement = null;
            }
        }

        // --- TYPEWRITER EFFECT (SÖZ-SÖZ) ---
        async function typeWriterEffect(text, element) {
            const words = text.split(' ');
            
            for (let word of words) {
                const textContainer = element.querySelector('.message-text');
                const currentText = textContainer.innerHTML;
                
                // Kod bloku daxilində isənik çap et
                if (currentText.includes('<pre') && !currentText.includes('</pre>')) {
                    textContainer.innerHTML = currentText + word + ' ';
                } else {
                    textContainer.innerHTML = formatText(currentText + word + ' ');
                }
                
                scrollToBottom();
                await sleep(50); // 50ms gözləmə (söz başına)
            }
        }

        function createAIMessageBubble() {
            const time = getCurrentTime();
            const div = document.createElement('div');
            div.className = "flex justify-start w-full animate-fade-in-up mb-2";
            
            div.innerHTML = `
                <div class="bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-none py-2 px-3 max-w-[85%] md:max-w-[70%] shadow-md relative min-w-[100px] border border-gray-100 dark:border-dark-700">
                    <p class="text-sm leading-relaxed mb-1 whitespace-pre-wrap message-text"><span class="typing-cursor"></span></p>
                    <div class="flex justify-end items-center gap-1 mt-1">
                        <span class="text-[10px] text-slate-400 dark:text-slate-500 select-none">${time}</span>
                    </div>
                </div>
            `;
            
            messagesContainer.appendChild(div);
            scrollToBottom();
            return div;
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // --- UI FUNKSİYALARI ---
        function addMessageToUI(type, text) {
            const time = getCurrentTime();
            const div = document.createElement('div');
            div.className = "flex w-full animate-fade-in-up mb-2"; 
            
            let bubbleHTML = '';

            if (type === 'user') {
                div.classList.add('justify-end');
                bubbleHTML = `
                    <div class="bg-blue-600 text-white rounded-2xl rounded-tr-none py-2 px-3 max-w-[85%] md:max-w-[70%] shadow-md relative min-w-[100px]">
                        <p class="text-sm leading-relaxed mb-1 whitespace-pre-wrap">${escapeHtml(text)}</p>
                        <div class="flex justify-end items-center gap-1 mt-1 opacity-80">
                            <span class="text-[10px] select-none">${time}</span>
                            <i class="ri-check-double-line text-[14px]"></i>
                        </div>
                    </div>
                `;
            } else if (type === 'error') {
                div.classList.add('justify-center');
                bubbleHTML = `
                    <div class="bg-red-50 dark:bg-red-900/50 backdrop-blur text-red-600 dark:text-red-400 text-xs px-3 py-1 rounded-lg border border-red-200 dark:border-red-800">
                        ${text}
                    </div>
                `;
            }

            div.innerHTML = bubbleHTML;
            messagesContainer.appendChild(div);
            scrollToBottom();
        }

        function getCurrentTime() {
            const now = new Date();
            return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        }

        function scrollToBottom() {
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function escapeHtml(text) {
            const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }

        function formatText(text) {
            let formatted = text;
            
            // Bold text
            formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            
            // Code blocks with copy button
            formatted = formatted.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
                const escaped = escapeHtml(code.trim());
                const highlighted = highlightCode(escaped, lang);
                return `<div class="code-block"><button class="copy-btn" onclick="navigator.clipboard.writeText(\`${code.trim()}\`)">📋 Copy</button><pre><code>${highlighted}</code></pre></div>`;
            });
            
            // Inline code
            formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');
            
            return formatted;
        }

        function highlightCode(code, lang) {
            // Sadə syntax highlighting
            let highlighted = code;
            
            // Keywords
            const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await'];
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                highlighted = highlighted.replace(regex, `<span class="code-keyword">${keyword}</span>`);
            });
            
            // Strings
            highlighted = highlighted.replace(/(["'`])(.*?)\1/g, '<span class="code-string">$1$2$1</span>');
            
            // Numbers
            highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
            
            // Comments
            highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');
            highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
            
            return highlighted;
        }

        // --- INPUT EVENTS ---
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!sendBtn.disabled && !isTyping) sendMessage();
            }
        });

        sendBtn.addEventListener('click', sendMessage);

        // İlk status
        setStatus('online');
    }
};

if (window.TOOLS_DATA) {
    window.TOOLS_DATA.push(aiChatTool);
} else {
    window.TOOLS_DATA = [aiChatTool];
}

