// 1. Alət Obyektini Yaradırıq
const apiTesterTool = {
    id: "api-tester",
    title: "API Request Tester",
    description: "REST API sorğuları (GET, POST, PUT, DELETE) göndərmək və yoxlamaq üçün alət.",
    icon: "ri-global-line", 
category: "Development",
    keywords: ["api", "http", "rest", "postman"], 


    // 2. Görüntü (HTML)
    render: () => {
        return `
            <div class="space-y-4 animate-fade-in h-full flex flex-col">
                <div class="flex flex-col md:flex-row gap-2 shrink-0">
                    <select id="apiMethod" class="bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg px-4 py-3 font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <input type="text" id="apiUrl" placeholder="https://api..." value="https://jsonplaceholder.typicode.com/todos/1" class="flex-1 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg px-4 py-3 text-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-primary font-mono text-sm">
                    <button id="apiSendBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg shadow-blue-500/30 flex items-center gap-2">
                        <i class="ri-send-plane-fill"></i> Send
                    </button>
                </div>

                <div class="flex flex-col md:flex-row gap-4 flex-1 min-h-[400px]">
                    <div class="flex-1 flex flex-col">
                        <label class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Request Body (JSON)</label>
                        <textarea id="apiBody" class="flex-1 p-4 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl resize-none outline-none text-slate-600 dark:text-slate-300 font-mono text-xs focus:border-primary transition" placeholder='{\n  "key": "value"\n}'></textarea>
                    </div>
                    
                    <div class="flex-1 flex flex-col">
                        <label class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Response</label>
                        <div id="apiResponse" class="flex-1 p-4 bg-slate-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl overflow-auto font-mono text-xs text-slate-700 dark:text-green-400 whitespace-pre">Waiting for request...</div>
                    </div>
                </div>
            </div>
        `;
    },

    // 3. Məntiq (JavaScript Funksionallığı)
    init: () => {
        const sendBtn = document.getElementById('apiSendBtn');
        
        // Düyməyə klik hadisəsi
        sendBtn.addEventListener('click', async () => {
            const url = document.getElementById('apiUrl').value;
            const method = document.getElementById('apiMethod').value;
            const body = document.getElementById('apiBody').value;
            const out = document.getElementById('apiResponse');
            
            // Loading effekti
            out.innerHTML = "Loading...";
            sendBtn.disabled = true;
            sendBtn.classList.add('opacity-75');

            try {
                const opts = { 
                    method, 
                    headers: { 'Content-Type': 'application/json' } 
                };
                
                // Body əlavə et (əgər GET deyilsə)
                if (method !== 'GET' && body.trim()) {
                    try {
                        JSON.parse(body); // JSON-un düzgünlüyünü yoxla
                        opts.body = body;
                    } catch (e) {
                        throw new Error("JSON Body formatı səhvdir!");
                    }
                }

                // Sorğunu göndər
                const res = await fetch(url, opts);
                const data = await res.json();

                // Nəticəni ekrana yaz
                out.innerHTML = `<span class="${res.ok ? 'text-green-600' : 'text-red-600'} font-bold">Status: ${res.status}</span>\n` + JSON.stringify(data, null, 2);
            
            } catch (e) {
                out.innerHTML = `<span class="text-red-500 font-bold">Error:</span> ${e.message}`;
            } finally {
                sendBtn.disabled = false;
                sendBtn.classList.remove('opacity-75');
            }
        });
    }
};

// 4. SİSTEMƏ ƏLAVƏ ET (Vacib hissə!)
if (window.TOOLS_DATA) {
    window.TOOLS_DATA.push(apiTesterTool);
} else {
    window.TOOLS_DATA = [apiTesterTool];
}