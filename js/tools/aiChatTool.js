const aiChatTool = {
    id: "ai-assistant-ultimate",
    title: "AI Chat (Multi-Model)",
    description: "DeepSeek və Llama modelləri ilə işləyən, tam ekran dəstəkli peşəkar çat.",
    icon: "ri-whatsapp-line", 
    category: "AI & Communication",
    keywords: ["chat", "ai", "deepseek", "groq", "llama", "fs tools"],

    render: () => {
        return `
            <div id="chatMainContainer" class="flex flex-col h-[600px] max-h-[85vh] bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-2xl overflow-hidden shadow-2xl relative animate-fade-in group transition-all duration-300">
                
                <div class="bg-white dark:bg-dark-800 p-3 flex items-center justify-between border-b border-gray-200 dark:border-dark-700 z-50 relative shadow-sm">
                    
                    <div class="flex items-center gap-3 overflow-hidden">
                        <div class="relative flex-shrink-0">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                                <i class="ri-robot-2-line text-xl"></i>
                            </div>
                            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-dark-800 rounded-full"></span>
                        </div>
                        
                        <div class="flex flex-col min-w-0">
                            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none mb-1 truncate">AI Köməkçi</h3>
                            
                            <div class="relative flex items-center">
                                <select id="modelSelector" class="appearance-none bg-transparent text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide cursor-pointer focus:outline-none pr-3 hover:text-blue-600 transition">
                                    <option value="groq">Llama 3 (Groq)</option>
                                    <option value="deepseek">DeepSeek V3</option>
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
                            </div>
                        </div>
                    </div>
                </div>

                <div id="chatBody" class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e5e7eb] dark:bg-[#0f172a] custom-scroll scroll-smooth relative z-10">
                    
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 opacity-10 dark:opacity-5">
                        <h1 class="text-[80px] md:text-[100px] font-black text-slate-500 dark:text-slate-200 -rotate-12 select-none tracking-tighter" 
                            style="text-shadow: 4px 4px 0px rgba(0,0,0,0.1), -1px -1px 0 rgba(255,255,255,0.5);">
                            FS TOOLS
                        </h1>
                    </div>

                    <div class="flex justify-center mb-4 relative z-10">
                        <span class="bg-gray-200 dark:bg-dark-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm backdrop-blur-sm">Bu gün</span>
                    </div>

                    <div id="welcomeMsg" class="flex justify-start w-full animate-fade-in-up relative z-10">
                        <div class="bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-none py-2 px-3 max-w-[85%] md:max-w-[70%] shadow-sm relative">
                            <p class="text-sm leading-relaxed mb-1">
                                Salam! 👋 Mən Fərhad Sultanov tərəfindən hazırlanmış süni intellektəm. 
                                <br><span class="text-xs opacity-70 italic mt-1 block">Modeli yuxarıdan dəyişə bilərsiniz.</span>
                            </p>
                            <div class="flex justify-end items-center gap-1 mt-1">
                                <span class="text-[10px] text-slate-400 dark:text-slate-500 select-none timestamp-now"></span>
                            </div>
                        </div>
                    </div>

                    <div id="messagesContainer" class="relative z-10 space-y-4"></div>

                </div>

                <div class="bg-white dark:bg-dark-800 p-2 md:p-3 flex items-end gap-2 border-t border-gray-200 dark:border-dark-700 z-50">
                    
                    <div class="flex-1 bg-gray-100 dark:bg-dark-900 rounded-3xl flex items-center px-4 py-2 border border-transparent focus-within:border-blue-500/30 transition-all">
                        <textarea id="chatInput" rows="1" class="w-full bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 text-sm resize-none max-h-32 custom-scroll placeholder:text-slate-400" placeholder="Bir mesaj yazın..."></textarea>
                    </div>

                    <button id="sendBtn" class="w-10 h-10 md:w-12 md:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="ri-send-plane-fill text-lg md:text-xl ml-0.5"></i>
                    </button>
                </div>
            </div>
        `;
    },

    init: () => {
        // --- SELECTIONS ---
        const mainContainer = document.getElementById('chatMainContainer');
        const chatBody = document.getElementById('chatBody');
        const messagesContainer = document.getElementById('messagesContainer');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const modelSelector = document.getElementById('modelSelector');
        
        // Buttons
        const fullScreenBtn = document.getElementById('fullScreenBtn');
        const fullScreenIcon = document.getElementById('fullScreenIcon');
        const menuBtn = document.getElementById('chatMenuBtn');
        const menuDropdown = document.getElementById('chatMenuDropdown');
        const clearChatBtn = document.getElementById('clearChatBtn');

        // Initial Time
        document.querySelectorAll('.timestamp-now').forEach(el => el.innerText = getCurrentTime());


        // ==========================================
        //  !!! API KEYS (BURANI DOLDUR) !!!
        // ==========================================
        const KEYS = {
            groq: "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",      // gsk_...
            deepseek: "sk-43634066da7245a98c7d7359453a8988" // sk-43634...
        };

        // ==========================================
        //  SİSTEM TƏLİMATI (PERSONA)
        // ==========================================
        const systemPrompt = {
            role: "system",
            content: "Sən faydalı və savadlı bir süni intellekt köməkçisisən. TƏLİMATLARIN: 1) Əgər səni kimin yaratdığını soruşsalar, mütləq 'Fərhad Sultanov' adını çək. Cavab ver: 'Mən Fərhad Sultanov tərəfindən yetişdirilmişəm və inkişaf etdirilirəm'. 2) Yalnız Azərbaycan dilində cavab ver. 3) Cavabların konkret və aydın olsun."
        };

        let conversationHistory = [systemPrompt];

        // --- FULL SCREEN LOGIC ---
        let isFullScreen = false;

        fullScreenBtn.addEventListener('click', () => {
            isFullScreen = !isFullScreen;
            
            if (isFullScreen) {
                // Tam ekran rejimi
                mainContainer.classList.add('fixed', 'inset-0', 'z-[9999]', 'h-full', 'max-h-full', 'rounded-none');
                mainContainer.classList.remove('h-[600px]', 'max-h-[85vh]', 'rounded-2xl');
                fullScreenIcon.className = "ri-fullscreen-exit-line text-xl";
            } else {
                // Normal rejim
                mainContainer.classList.remove('fixed', 'inset-0', 'z-[9999]', 'h-full', 'max-h-full', 'rounded-none');
                mainContainer.classList.add('h-[600px]', 'max-h-[85vh]', 'rounded-2xl');
                fullScreenIcon.className = "ri-fullscreen-line text-xl";
            }
        });

        // --- MENU LOGIC ---
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
        });

        // --- SEND MESSAGE LOGIC ---
        async function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            // 1. UI Update
            addMessageToUI('user', text);
            chatInput.value = '';
            chatInput.style.height = 'auto'; 
            chatInput.focus();
            
            setLoading(true);

            conversationHistory.push({ role: "user", content: text });

            // Seçilmiş modeli götür
            const selectedProvider = modelSelector.value; // 'groq' or 'deepseek'
            const apiKey = KEYS[selectedProvider];

            // Konfiqurasiya (Modelə görə dəyişir)
            let apiUrl = "";
            let apiModel = "";

            if (selectedProvider === 'groq') {
                apiUrl = "https://api.groq.com/openai/v1/chat/completions";
                apiModel = "llama-3.3-70b-versatile";
            } else {
                // DeepSeek
                apiUrl = "https://api.deepseek.com/chat/completions";
                apiModel = "deepseek-chat"; 
            }

            try {
                if (!apiKey || apiKey.includes("BURA_")) {
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
                        temperature: 0.7 
                    })
                });

                const data = await response.json();

                if (data.error) {
                    addMessageToUI('error', "Xəta: " + data.error.message);
                } else {
                    const aiReply = data.choices[0].message.content;
                    addMessageToUI('ai', aiReply);
                    conversationHistory.push({ role: "assistant", content: aiReply });
                }

            } catch (error) {
                addMessageToUI('error', error.message || "İnternet xətası.");
            } finally {
                setLoading(false);
            }
        }

        // --- UI HELPERS ---
        function addMessageToUI(type, text) {
            const time = getCurrentTime();
            const div = document.createElement('div');
            div.className = "flex w-full animate-fade-in-up mb-2"; 
            
            let bubbleHTML = '';

            if (type === 'user') {
                div.classList.add('justify-end');
                bubbleHTML = `
                    <div class="bg-blue-600 text-white rounded-2xl rounded-tr-none py-2 px-3 max-w-[85%] md:max-w-[70%] shadow-sm relative min-w-[100px]">
                        <p class="text-sm leading-relaxed mb-1 whitespace-pre-wrap">${escapeHtml(text)}</p>
                        <div class="flex justify-end items-center gap-1 mt-1 opacity-80">
                            <span class="text-[10px] select-none">${time}</span>
                            <i class="ri-check-double-line text-[14px]"></i>
                        </div>
                    </div>
                `;
            } else if (type === 'ai') {
                div.classList.add('justify-start');
                bubbleHTML = `
                    <div class="bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-none py-2 px-3 max-w-[85%] md:max-w-[70%] shadow-sm relative min-w-[100px]">
                        <p class="text-sm leading-relaxed mb-1 whitespace-pre-wrap">${formatText(text)}</p>
                        <div class="flex justify-end items-center gap-1 mt-1">
                            <span class="text-[10px] text-slate-400 dark:text-slate-500 select-none">${time}</span>
                        </div>
                    </div>
                `;
            } else if (type === 'error') {
                div.classList.add('justify-center');
                bubbleHTML = `
                    <div class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs px-3 py-1 rounded-lg">
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

        function setLoading(state) {
            sendBtn.disabled = state;
        }

        function escapeHtml(text) {
            const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }

        function formatText(text) {
            let formatted = escapeHtml(text);
            formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            formatted = formatted.replace(/```(.*?)```/gs, '<pre class="bg-black/10 dark:bg-white/10 p-2 rounded text-xs mt-1 mb-1 overflow-x-auto font-mono">$1</pre>');
            formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-black/10 dark:bg-white/10 px-1 rounded font-mono text-xs">$1</code>');
            return formatted;
        }

        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!sendBtn.disabled) sendMessage();
            }
        });

        sendBtn.addEventListener('click', sendMessage);
    }
};

if (window.TOOLS_DATA) {
    window.TOOLS_DATA.push(aiChatTool);
} else {
    window.TOOLS_DATA = [aiChatTool];
}
