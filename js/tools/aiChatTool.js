const aiChatTool = {
    id: "ai-assistant-ultimate-pro",
    title: "AI Chat (Ultimate)",
    description: "DeepSeek və Llama dəstəkli, canlı yazı effektli, emosional arxa fonlu super çat.",
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

                /* 1. Sakit (Idle) */
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

                /* 2. Düşünür (Thinking - Deep Purple) */
                .bg-state-thinking {
                    background: linear-gradient(-45deg, #6366f1, #a855f7, #ec4899, #8b5cf6);
                    background-size: 300% 300%;
                    animation: gradientFlow 3s ease infinite; /* Daha sürətli */
                }
                .dark .bg-state-thinking {
                    background: linear-gradient(-45deg, #312e81, #581c87, #831843, #4c1d95);
                    background-size: 300% 300%;
                    animation: gradientFlow 3s ease infinite;
                }

                /* 3. Yazır (Writing - Tech Blue/Green) */
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

                /* 4. Xəta (Error - Red) */
                .bg-state-error {
                    background: linear-gradient(-45deg, #fee2e2, #fecaca, #ffedd5, #fff1f2);
                }
                .dark .bg-state-error {
                    background: linear-gradient(-45deg, #450a0a, #7f1d1d, #431407, #881337);
                }

                /* Kursör (Yazı yazarkən yanıb sönən çubuq) */
                .typing-cursor::after {
                    content: '▋';
                    display: inline-block;
                    vertical-align: bottom;
                    animation: blink 1s step-start infinite;
                    color: #3b82f6;
                    margin-left: 2px;
                }
                @keyframes blink { 50% { opacity: 0; } }

                /* Scrollbar gizlət */
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

                /* Code Block Header */
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
                
                <div class="bg-white/80 dark:bg-dark-900/80 backdrop-blur-md p-3 flex items-center justify-between border-b border-gray-200 dark:border-dark-700 z-50 relative shadow-sm transition-colors duration-300">
                    
                    <div class="flex items-center gap-3">
                        <div class="relative group">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <i class="ri-brain-line text-xl"></i>
                            </div>
                            <span id="aiStatusDot" class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-dark-800 rounded-full animate-pulse"></span>
                        </div>
                        
                        <div class="flex flex-col">
                            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                AI Assistant 
                                <span class="px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold uppercase tracking-wider">PRO</span>
                            </h3>
                            <div class="flex items-center gap-1">
                                <span class="text-[10px] text-slate-400">Model:</span>
                                <select id="modelSelector" class="bg-transparent text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase cursor-pointer focus:outline-none hover:text-blue-600 transition">
                                    <option value="deepseek">DeepSeek V3 (Reasoning)</option>
                                    <option value="groq">Llama 3 (Speed)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <button id="fullScreenBtn" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition text-slate-500">
                            <i id="fullScreenIcon" class="ri-fullscreen-line text-lg"></i>
                        </button>
                        <button id="clearChatBtn" class="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 hover:text-red-500 transition" title="Təmizlə">
                            <i class="ri-delete-bin-line text-lg"></i>
                        </button>
                    </div>
                </div>

                <div id="chatBody" class="flex-1 overflow-y-auto p-4 space-y-6 custom-scroll scroll-smooth relative z-10">
                    
                    <div id="welcomeMsg" class="flex justify-start w-full animate-fade-in-up">
                        <div class="bg-white/90 dark:bg-dark-800/90 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-sm py-3 px-4 max-w-[85%] shadow-sm border border-gray-100 dark:border-dark-700">
                            <p class="text-sm leading-relaxed">
                                Salam! <b>FS Tools AI</b> xidmətindəyəm. <br>
                                Kodlaşdırma, arxitektura və ya IT problemləri ilə bağlı mənə sual verə bilərsiniz. Həm "düşünürəm", həm də sürətlə yazıram. 😉
                            </p>
                            <span class="text-[10px] text-slate-400 block mt-2 text-right opacity-70">İndi</span>
                        </div>
                    </div>

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
                    <div class="text-center mt-2">
                        <span class="text-[9px] text-slate-400 font-medium tracking-wide">AI CAN MAKE MISTAKES. PLEASE CHECK IMPORTANT INFO.</span>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        // UI Elements
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

        // State Management
        let isTyping = false;
        
        const KEYS = {
            groq: "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", 
            deepseek: "sk-43634066da7245a98c7d7359453a8988"
        };

        const systemPrompt = {
            role: "system",
            content: `
                Sən "FS Tools" platforması üçün Fərhad Sultanov tərəfindən hazırlanmış ELİT AI köməkçisisən.
                Dil: Yalnız Azərbaycan dili.
                Üslub: Çox peşəkar, amma səmimi. Proqramçılarla danışırsan.
                Kod: Ən yaxşı təcrübələri (Clean Code) istifadə et.
                Qadağalar: Siyasət, söyüş, qanunsuz işlər yoxdur.
            `
        };

        let conversationHistory = [systemPrompt];

        // --- BACKGROUND CHANGER ---
        function setMood(mood) {
            // Remove all mood classes
            mainContainer.classList.remove('bg-state-idle', 'bg-state-thinking', 'bg-state-writing', 'bg-state-error');
            
            // Add new mood
            if (mood === 'idle') {
                mainContainer.classList.add('bg-state-idle');
                aiStatusDot.className = "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-dark-800 rounded-full";
            } else if (mood === 'thinking') {
                mainContainer.classList.add('bg-state-thinking');
                aiStatusDot.className = "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-purple-500 border-2 border-white dark:border-dark-800 rounded-full animate-ping";
            } else if (mood === 'writing') {
                mainContainer.classList.add('bg-state-writing');
                aiStatusDot.className = "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-white dark:border-dark-800 rounded-full animate-pulse";
            } else if (mood === 'error') {
                mainContainer.classList.add('bg-state-error');
                aiStatusDot.className = "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-dark-800 rounded-full";
            }
        }
        
        // Default init
        setMood('idle');

        // --- FULL SCREEN ---
        fullScreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                mainContainer.requestFullscreen().catch(err => {
                    mainContainer.classList.toggle('fixed');
                    mainContainer.classList.toggle('inset-0');
                    mainContainer.classList.toggle('z-[9999]');
                    mainContainer.classList.toggle('h-full');
                });
            } else {
                document.exitFullscreen();
            }
        });

        // --- CLEAR CHAT ---
        clearChatBtn.addEventListener('click', () => {
            messagesContainer.innerHTML = '';
            conversationHistory = [systemPrompt];
            setMood('idle');
            // Toast notification could go here
        });

        // --- MESSAGING LOGIC ---
        async function sendMessage() {
            const text = chatInput.value.trim();
            if (!text || isTyping) return;

            // 1. User Message
            addMessageToUI('user', text);
            chatInput.value = '';
            chatInput.style.height = 'auto';
            conversationHistory.push({ role: "user", content: text });

            // 2. Thinking State
            isTyping = true;
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="ri-loader-4-line animate-spin text-xl"></i>';
            
            setMood('thinking');
            thinkingIndicator.classList.remove('hidden');
            thinkingText.innerText = modelSelector.value === 'deepseek' ? "Dərin analiz gedir..." : "Sürətli cavab hazırlanır...";
            scrollToBottom();

            // API Prep
            const selectedProvider = modelSelector.value;
            const apiKey = KEYS[selectedProvider];
            let apiUrl = selectedProvider === 'groq' ? "[https://api.groq.com/openai/v1/chat/completions](https://api.groq.com/openai/v1/chat/completions)" : "[https://api.deepseek.com/chat/completions](https://api.deepseek.com/chat/completions)";
            let apiModel = selectedProvider === 'groq' ? "llama-3.3-70b-versatile" : "deepseek-chat";

            try {
                if (!apiKey || apiKey.includes("BURA_")) throw new Error("API Açarı yoxdur!");

                // Fake "Deep Thinking" Delay for effect (1-2 sec)
                await new Promise(r => setTimeout(r, 1500));

                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: apiModel,
                        messages: conversationHistory,
                        temperature: 0.7,
                        max_tokens: 2048
                    })
                });

                const data = await response.json();

                // 3. Writing State
                thinkingIndicator.classList.add('hidden');
                
                if (data.error) {
                    throw new Error(data.error.message);
                }

                setMood('writing');
                const aiReply = data.choices[0].message.content;
                conversationHistory.push({ role: "assistant", content: aiReply });
                
                // Start Typewriter Effect
                await typeWriterEffect(aiReply);

            } catch (error) {
                setMood('error');
                thinkingIndicator.classList.add('hidden');
                addMessageToUI('error', error.message || "Bağlantı xətası.");
            } finally {
                isTyping = false;
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="ri-arrow-up-line text-lg"></i>';
                if (!document.querySelector('.bg-state-error')) {
                    setMood('idle');
                }
                chatInput.focus();
            }
        }

        // --- UI HELPERS ---
        function addMessageToUI(type, text) {
            const div = document.createElement('div');
            div.className = `flex w-full animate-fade-in-up ${type === 'user' ? 'justify-end' : 'justify-start'}`;
            
            let innerHTML = '';
            
            if (type === 'user') {
                innerHTML = `
                    <div class="bg-slate-800 dark:bg-indigo-600 text-white rounded-[20px] rounded-tr-md py-2.5 px-4 max-w-[85%] md:max-w-[70%] shadow-lg relative">
                        <p class="text-sm leading-relaxed whitespace-pre-wrap">${escapeHtml(text)}</p>
                    </div>
                `;
            } else if (type === 'error') {
                innerHTML = `
                    <div class="bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 px-4 py-2 rounded-xl text-xs border border-red-200 dark:border-red-800 flex items-center gap-2">
                        <i class="ri-error-warning-line"></i> ${text}
                    </div>
                `;
            }

            div.innerHTML = innerHTML;
            messagesContainer.appendChild(div);
            scrollToBottom();
            return div; // Return for manipulation
        }

        // --- TYPEWRITER EFFECT ENGINE ---
        async function typeWriterEffect(fullText) {
            // Create the AI bubble container first
            const div = document.createElement('div');
            div.className = "flex w-full justify-start";
            div.innerHTML = `
                <div class="bg-white dark:bg-dark-800 text-slate-800 dark:text-slate-200 rounded-[20px] rounded-tl-sm py-3 px-5 max-w-[95%] md:max-w-[85%] shadow-md border border-gray-100 dark:border-dark-700 relative group">
                    <div class="ai-content text-sm leading-7 typing-cursor"></div>
                    
                    <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-100 dark:border-dark-700/50">
                        <div class="flex gap-2">
                            <button onclick="navigator.clipboard.writeText(this.closest('.group').querySelector('.ai-content').innerText)" class="text-xs text-slate-400 hover:text-blue-500 transition" title="Kopyala"><i class="ri-file-copy-line"></i></button>
                            <button class="text-xs text-slate-400 hover:text-green-500 transition" title="Yenidən"><i class="ri-refresh-line"></i></button>
                        </div>
                        <span class="text-[10px] text-slate-400 select-none">${getCurrentTime()}</span>
                    </div>
                </div>
            `;
            messagesContainer.appendChild(div);
            
            const contentArea = div.querySelector('.ai-content');
            
            // Text Processing Logic
            // We split by spaces to type "words" or characters. 
            // Better: Type chars, but detecting HTML/Markdown would be hard.
            // Strategy: Parse Markdown FIRST to HTML, then reveal text nodes? Too complex for snippet.
            // Strategy: Type raw text, but formatting appears at the end? No, looks ugly.
            // BEST STRATEGY FOR SNIPPET: Type fast character by character, then render Markdown at the end of chunks or full finish.
            // BUT user wants "pita pit" (typing). We will format MD AFTER typing is done to ensure clean render.
            // OR: We simulate typing by appending to a variable, formatting it on fly.

            let currentText = "";
            const speed = 15; // ms per char

            // Split into chars but keep Emoji pairs together if possible (simplified here)
            const chars = fullText.split(""); 

            for (let i = 0; i < chars.length; i++) {
                currentText += chars[i];
                
                // Live render is risky with partial markdown (e.g. partial bold **tes...).
                // So we just show raw text styled slightly, then SWAP to formatted HTML at the end.
                // OR: We escape HTML and show text.
                contentArea.innerText = currentText; 
                
                scrollToBottom();
                
                // Randomize speed slightly for human feel
                await new Promise(r => setTimeout(r, speed + Math.random() * 10));
            }

            // Typing finished
            contentArea.classList.remove('typing-cursor');
            
            // Now apply rich formatting (Markdown)
            contentArea.innerHTML = parseMarkdown(fullText);
            
            // Re-highlight code blocks
            setupCodeCopyButtons(contentArea);
            scrollToBottom();
        }

        // --- MARKDOWN PARSER (Gəlişdirilmiş) ---
        function parseMarkdown(text) {
            let html = escapeHtml(text);

            // 1. Code Blocks with Language Header
            html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                const language = lang || 'text';
                return `
                    <div class="my-3 rounded-lg overflow-hidden border border-gray-600/30 shadow-lg">
                        <div class="code-header">
                            <span class="font-bold uppercase tracking-wider text-[10px] text-blue-300">${language}</span>
                            <button class="copy-code-btn text-xs hover:text-white transition flex items-center gap-1" data-code="${encodeURIComponent(code)}">
                                <i class="ri-file-copy-line"></i> Copy
                            </button>
                        </div>
                        <pre class="bg-[#1e1e1e] text-[#d4d4d4] p-3 overflow-x-auto text-xs font-mono m-0 leading-5">${code}</pre>
                    </div>
                `;
            });

            // 2. Inline Code
            html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 text-red-500 dark:text-red-300 px-1.5 py-0.5 rounded text-xs font-mono font-bold">$1</code>');

            // 3. Bold (**text**)
            html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');

            // 4. Italic (*text*)
            html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-slate-600 dark:text-slate-300">$1</em>');

            // 5. Lists (- item)
            html = html.replace(/^\s*-\s+(.*)$/gm, '<li class="flex items-start gap-2 ml-2 mb-1"><span class="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span><span>$1</span></li>');
            // Wrap li in ul if needed (simplified regex, usually needs wrapper, but browsers handle loose li okay-ish or we wrap whole block)
            
            // 6. Paragraphs (Newlines to <br>) - inside code blocks protected by regex above
            // Clean up multiple newlines
            html = html.replace(/\n\n/g, '<br><br>');

            return html;
        }

        function setupCodeCopyButtons(container) {
            container.querySelectorAll('.copy-code-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent parent clicks
                    const code = decodeURIComponent(btn.getAttribute('data-code'));
                    navigator.clipboard.writeText(code);
                    
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="ri-check-line text-green-400"></i> Copied!';
                    setTimeout(() => btn.innerHTML = originalHTML, 2000);
                });
            });
        }

        function escapeHtml(text) {
            if (!text) return "";
            return text.replace(/&/g, "&amp;")
                       .replace(/</g, "&lt;")
                       .replace(/>/g, "&gt;")
                       .replace(/"/g, "&quot;")
                       .replace(/'/g, "&#039;");
        }

        function getCurrentTime() {
            return new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' });
        }

        function scrollToBottom() {
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        // Auto-resize Input
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Enter to Send
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
