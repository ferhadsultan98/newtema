const aiChatTool = {
    id: "ai-assistant-ultimate-pro",
    title: "AI Chat (Ultimate Fixed)",
    description: "DeepSeek və Llama dəstəkli, canlı yazı effektli, xətasız işləyən super çat.",
    icon: "ri-openai-fill", 
    category: "AI & Communication",
    keywords: ["chat", "ai", "deepseek", "groq", "llama", "fs tools", "secure", "animated"],

    render: () => {
        return `
            <style>
                /* --- DİNAMİK ARXA FONLAR --- */
                @keyframes gradientFlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .bg-state-idle {
                    background: linear-gradient(-45deg, #f8fafc, #e2e8f0, #f1f5f9, #ffffff);
                    background-size: 400% 400%;
                    animation: gradientFlow 15s ease infinite;
                }
                .dark .bg-state-idle {
                    background: linear-gradient(-45deg, #0f172a, #1e293b, #020617, #172554);
                    background-size: 400% 400%;
                    animation: gradientFlow 15s ease infinite;
                }

                .bg-state-thinking {
                    background: linear-gradient(-45deg, #6366f1, #a855f7, #ec4899, #8b5cf6);
                    background-size: 300% 300%;
                    animation: gradientFlow 3s ease infinite;
                }
                .dark .bg-state-thinking {
                    background: linear-gradient(-45deg, #312e81, #581c87, #831843, #4c1d95);
                    background-size: 300% 300%;
                    animation: gradientFlow 3s ease infinite;
                }

                .bg-state-writing {
                    background: linear-gradient(-45deg, #0ea5e9, #22d3ee, #3b82f6, #10b981);
                    background-size: 200% 200%;
                    animation: gradientFlow 5s linear infinite;
                }
                .dark .bg-state-writing {
                    background: linear-gradient(-45deg, #0c4a6e, #115e59, #1e3a8a, #065f46);
                    background-size: 200% 200%;
                    animation: gradientFlow 5s linear infinite;
                }

                .bg-state-error {
                    background: linear-gradient(-45deg, #fee2e2, #fecaca, #ffedd5, #fff1f2);
                }
                .dark .bg-state-error {
                    background: linear-gradient(-45deg, #450a0a, #7f1d1d, #431407, #881337);
                }

                .typing-cursor::after {
                    content: '▋';
                    display: inline-block;
                    vertical-align: bottom;
                    animation: blink 1s step-start infinite;
                    color: #3b82f6;
                    margin-left: 2px;
                }
                @keyframes blink { 50% { opacity: 0; } }

                .code-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #334155;
                    color: #e2e8f0;
                    padding: 4px 12px;
                    font-size: 0.75rem;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }

                :fullscreen .chat-container { height: 100vh; max-height: 100vh; border-radius: 0; }
            </style>

            <div id="chatMainContainer" class="chat-container flex flex-col h-[650px] max-h-[90vh] bg-state-idle border border-gray-200 dark:border-dark-700 rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-500">
                
                <div class="bg-white/80 dark:bg-dark-900/80 backdrop-blur-md p-3 flex items-center justify-between border-b border-gray-200 dark:border-dark-700 z-50 relative shadow-sm">
                    <div class="flex items-center gap-3">
                        <div class="relative group">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                                <i class="ri-brain-line text-xl"></i>
                            </div>
                            <span id="aiStatusDot" class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-dark-800 rounded-full animate-pulse"></span>
                        </div>
                        <div class="flex flex-col">
                            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                AI Assistant <span class="px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold uppercase tracking-wider">PRO</span>
                            </h3>
                            <div class="flex items-center gap-1">
                                <select id="modelSelector" class="bg-transparent text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase cursor-pointer focus:outline-none hover:text-blue-600 transition">
                                    <option value="deepseek">DeepSeek V3</option>
                                    <option value="groq">Llama 3 (Fast)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button id="fullScreenBtn" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition text-slate-500"><i id="fullScreenIcon" class="ri-fullscreen-line text-lg"></i></button>
                        <button id="clearChatBtn" class="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 hover:text-red-500 transition"><i class="ri-delete-bin-line text-lg"></i></button>
                    </div>
                </div>

                <div id="chatBody" class="flex-1 overflow-y-auto p-4 space-y-6 custom-scroll scroll-smooth relative z-10">
                    <div id="messagesContainer" class="space-y-6"></div>
                    <div id="thinkingIndicator" class="hidden flex justify-start w-full animate-fade-in">
                        <div class="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-full py-2 px-4 flex items-center gap-2 border border-white/20 shadow-sm">
                            <div class="flex gap-1">
                                <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                                <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                <div class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                            </div>
                            <span id="thinkingText" class="text-xs font-medium text-indigo-600 dark:text-indigo-300 animate-pulse">Analiz edilir...</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl p-3 border-t border-gray-200 dark:border-dark-700 z-50">
                    <div class="relative bg-gray-100 dark:bg-dark-800 rounded-[24px] border border-gray-200 dark:border-dark-600 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-inner">
                        <textarea id="chatInput" rows="1" class="w-full bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 text-sm px-4 py-3 resize-none max-h-32 custom-scroll placeholder:text-slate-400" placeholder="Sualınızı bura yazın..."></textarea>
                        <div class="absolute right-2 bottom-1.5">
                            <button id="sendBtn" class="w-9 h-9 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white rounded-full flex items-center justify-center transition-all transform active:scale-90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                                <i class="ri-arrow-up-line text-lg"></i>
                            </button>
                        </div>
                    </div>
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
        const fullScreenBtn = document.getElementById('fullScreenBtn');
        const clearChatBtn = document.getElementById('clearChatBtn');
        const thinkingIndicator = document.getElementById('thinkingIndicator');
        const thinkingText = document.getElementById('thinkingText');
        const aiStatusDot = document.getElementById('aiStatusDot');

        let isTyping = false;
        
        // ==================================================
        // 🔴 VACİB: BURA ÖZ REAL API AÇARLARINI YAZ 🔴
        // ==================================================
        const KEYS = {
            groq: "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",     // Məsələn: gsk_yJ5... (Llama üçün)
            deepseek: "sk-43634066da7245a98c7d7359453a8988"   // Məsələn: sk-3d4... (DeepSeek üçün)
        };

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

        function setMood(mood) {
            mainContainer.classList.remove('bg-state-idle', 'bg-state-thinking', 'bg-state-writing', 'bg-state-error');
            if (mood === 'idle') {
                mainContainer.classList.add('bg-state-idle');
                aiStatusDot.className = "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full";
            } else if (mood === 'thinking') {
                mainContainer.classList.add('bg-state-thinking');
                aiStatusDot.className = "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-purple-500 border-2 border-white rounded-full animate-ping";
            } else if (mood === 'writing') {
                mainContainer.classList.add('bg-state-writing');
                aiStatusDot.className = "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full animate-pulse";
            } else if (mood === 'error') {
                mainContainer.classList.add('bg-state-error');
                aiStatusDot.className = "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full";
            }
        }
        setMood('idle');

        async function sendMessage() {
            const text = chatInput.value.trim();
            if (!text || isTyping) return;

            addMessageToUI('user', text);
            chatInput.value = '';
            chatInput.style.height = 'auto';
            conversationHistory.push({ role: "user", content: text });

            isTyping = true;
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="ri-loader-4-line animate-spin text-xl"></i>';
            setMood('thinking');
            thinkingIndicator.classList.remove('hidden');
            thinkingText.innerText = "Serverlə əlaqə qurulur...";
            scrollToBottom();

            const selectedProvider = modelSelector.value;
            // API Açarı yoxlanışı
            if (!KEYS[selectedProvider] || KEYS[selectedProvider].length < 10) {
                 handleError(`Xəta: ${selectedProvider} API Açarı daxil edilməyib! Kodu açın və 'KEYS' hissəsinə açarınızı yazın.`);
                 return;
            }

            const apiKey = KEYS[selectedProvider];
            let apiUrl, apiModel;

            if (selectedProvider === 'groq') {
                apiUrl = "https://api.groq.com/openai/v1/chat/completions";
                apiModel = "llama-3.3-70b-versatile";
            } else {
                // DeepSeek üçün rəsmi endpoint
                apiUrl = "https://api.deepseek.com/chat/completions";
                apiModel = "deepseek-chat";
            }

            try {
                // Fake delay (animasiya görünsün)
                await new Promise(r => setTimeout(r, 1000));

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
                        max_tokens: 2048
                    })
                });

                // JSON pars etməzdən əvvəl statusu yoxlayırıq
                if (!response.ok) {
                    const errorText = await response.text(); // Xətanı mətn kimi alırıq
                    console.error("API Error Response:", errorText);
                    throw new Error(`Server Xətası: ${response.status} - ${response.statusText}. API Key-i yoxlayın.`);
                }

                // İndi təhlükəsiz şəkildə JSON-a çeviririk
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error.message);
                }

                thinkingIndicator.classList.add('hidden');
                setMood('writing');
                
                const aiReply = data.choices[0].message.content;
                conversationHistory.push({ role: "assistant", content: aiReply });
                
                await typeWriterEffect(aiReply);

            } catch (error) {
                handleError(error.message || "İnternet və ya API xətası.");
            }
        }

        function handleError(msg) {
            setMood('error');
            thinkingIndicator.classList.add('hidden');
            addMessageToUI('error', msg);
            isTyping = false;
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="ri-arrow-up-line text-lg"></i>';
            chatInput.focus();
        }

        // --- Digər köməkçi funksiyalar (dəyişmədi) ---
        function addMessageToUI(type, text) {
            const div = document.createElement('div');
            div.className = `flex w-full animate-fade-in-up mb-4 ${type === 'user' ? 'justify-end' : 'justify-start'}`;
            let innerHTML = '';
            
            if (type === 'user') {
                innerHTML = `
                    <div class="bg-slate-800 dark:bg-indigo-600 text-white rounded-[20px] rounded-tr-md py-2.5 px-4 max-w-[85%] md:max-w-[70%] shadow-lg relative">
                        <p class="text-sm leading-relaxed whitespace-pre-wrap">${escapeHtml(text)}</p>
                    </div>`;
            } else if (type === 'error') {
                innerHTML = `
                    <div class="bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 px-4 py-2 rounded-xl text-xs border border-red-200 dark:border-red-800 flex items-center gap-2">
                        <i class="ri-error-warning-line"></i> <b>Xəta:</b> ${text}
                    </div>`;
            }
            div.innerHTML = innerHTML;
            messagesContainer.appendChild(div);
            scrollToBottom();
            return div;
        }

        async function typeWriterEffect(fullText) {
            const div = document.createElement('div');
            div.className = "flex w-full justify-start mb-4";
            div.innerHTML = `
                <div class="bg-white dark:bg-dark-800 text-slate-800 dark:text-slate-200 rounded-[20px] rounded-tl-sm py-3 px-5 max-w-[95%] md:max-w-[85%] shadow-md border border-gray-100 dark:border-dark-700 relative group">
                    <div class="ai-content text-sm leading-7 typing-cursor"></div>
                    <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-100 dark:border-dark-700/50">
                        <div class="flex gap-2">
                             <button class="text-xs text-slate-400 hover:text-blue-500 transition"><i class="ri-file-copy-line"></i></button>
                        </div>
                        <span class="text-[10px] text-slate-400 select-none">${new Date().toLocaleTimeString('az-AZ', {hour:'2-digit', minute:'2-digit'})}</span>
                    </div>
                </div>`;
            messagesContainer.appendChild(div);
            
            const contentArea = div.querySelector('.ai-content');
            let currentText = "";
            const chars = fullText.split(""); 

            for (let i = 0; i < chars.length; i++) {
                currentText += chars[i];
                contentArea.innerText = currentText; 
                scrollToBottom();
                if(i % 5 === 0) await new Promise(r => setTimeout(r, 5)); // Çox sürətli
            }

            contentArea.classList.remove('typing-cursor');
            contentArea.innerHTML = parseMarkdown(fullText);
            
            isTyping = false;
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="ri-arrow-up-line text-lg"></i>';
            setMood('idle');
            chatInput.focus();
            scrollToBottom();
        }

        function parseMarkdown(text) {
            let html = escapeHtml(text);
            html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<div class="my-3 rounded-lg overflow-hidden border border-gray-600/30 shadow-lg"><pre class="bg-[#1e1e1e] text-[#d4d4d4] p-3 overflow-x-auto text-xs font-mono m-0 leading-5">$2</pre></div>');
            html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 text-red-500 dark:text-red-300 px-1.5 py-0.5 rounded text-xs font-mono font-bold">$1</code>');
            html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
            html = html.replace(/\n/g, '<br>');
            return html;
        }

        function escapeHtml(text) {
            return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
        }

        function scrollToBottom() { chatBody.scrollTop = chatBody.scrollHeight; }

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!sendBtn.disabled) sendMessage(); }
        });
        chatInput.addEventListener('input', function() { this.style.height = 'auto'; this.style.height = (this.scrollHeight) + 'px'; });
        sendBtn.addEventListener('click', sendMessage);
        fullScreenBtn.addEventListener('click', () => { if (!document.fullscreenElement) mainContainer.requestFullscreen(); else document.exitFullscreen(); });
        clearChatBtn.addEventListener('click', () => { messagesContainer.innerHTML = ''; conversationHistory = [systemPrompt]; setMood('idle'); });
    }
};

if (window.TOOLS_DATA) { window.TOOLS_DATA.push(aiChatTool); } else { window.TOOLS_DATA = [aiChatTool]; }


