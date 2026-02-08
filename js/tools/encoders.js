const encodersTool = {
    id: "encoders-decoders",
    title: "Encoders & Decoders",
    description: "Base64, URL və JWT tokenləri üçün çevirici və oxuyucu alət.",
    icon: "ri-exchange-box-line", 
    category: "Encoders & Decoders", // <--- Yeni Kateqoriya
    keywords: ["base64", "url", "jwt", "token", "encode", "decode", "hash"],

    render: () => {
        return `
            <div class="space-y-4 animate-fade-in h-full flex flex-col">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 dark:bg-dark-900 p-3 rounded-xl border border-gray-200 dark:border-dark-700">
                    
                    <div class="flex items-center gap-2 w-full md:w-auto">
                        <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <i class="ri-function-line text-xl"></i>
                        </div>
                        <select id="encType" class="flex-1 md:w-56 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-purple-500 transition">
                            <option value="BASE64">Base64 Encoder/Decoder</option>
                            <option value="URL">URL Encoder/Decoder</option>
                            <option value="JWT">JWT Debugger (Decode)</option>
                        </select>
                    </div>

                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="btnEncode" class="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md flex items-center justify-center gap-2">
                            <i class="ri-lock-2-line"></i> Encode
                        </button>
                        <button id="btnDecode" class="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md flex items-center justify-center gap-2">
                            <i class="ri-lock-unlock-line"></i> Decode
                        </button>
                        <button id="btnClear" class="bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 py-2 px-3 rounded-lg transition">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4 flex-1 min-h-[400px]">
                    <div class="flex-1 flex flex-col">
                        <div class="flex justify-between items-center mb-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Giriş (Dəyər)</label>
                            <span id="inputLabel" class="text-xs text-purple-500 font-medium">Text / Raw</span>
                        </div>
                        <textarea id="encInput" class="flex-1 p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl resize-none outline-none text-slate-600 dark:text-slate-300 font-mono text-sm focus:border-purple-500 transition custom-scroll" placeholder="Mətni bura daxil edin..."></textarea>
                    </div>
                    
                    <div class="flex-1 flex flex-col">
                        <div class="flex justify-between items-center mb-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Nəticə</label>
                            <button onclick="navigator.clipboard.writeText(document.getElementById('encOutput').value)" class="text-xs text-blue-500 hover:underline cursor-pointer">Kopyala</button>
                        </div>
                        <textarea id="encOutput" readonly class="flex-1 p-4 bg-slate-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl resize-none outline-none text-purple-700 dark:text-purple-400 font-mono text-sm custom-scroll" placeholder="Nəticə..."></textarea>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        const input = document.getElementById('encInput');
        const output = document.getElementById('encOutput');
        const typeSelect = document.getElementById('encType');
        const btnEncode = document.getElementById('btnEncode');
        const btnDecode = document.getElementById('btnDecode');

        // Mod dəyişəndə UI tənzimləmələri
        typeSelect.addEventListener('change', () => {
            const type = typeSelect.value;
            input.value = '';
            output.value = '';
            
            if (type === 'JWT') {
                btnEncode.disabled = true;
                btnEncode.classList.add('opacity-50', 'cursor-not-allowed');
                btnEncode.title = "JWT yalnız decode edilə bilər";
                input.placeholder = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
            } else {
                btnEncode.disabled = false;
                btnEncode.classList.remove('opacity-50', 'cursor-not-allowed');
                btnEncode.title = "";
                input.placeholder = "Mətni bura daxil edin...";
            }
        });

        // ENCODE
        btnEncode.addEventListener('click', () => {
            const val = input.value;
            if(!val) return;
            const type = typeSelect.value;

            try {
                if (type === 'BASE64') {
                    // Unicode support üçün
                    output.value = btoa(unescape(encodeURIComponent(val)));
                } else if (type === 'URL') {
                    output.value = encodeURIComponent(val);
                }
            } catch (e) {
                output.value = "Xəta: " + e.message;
            }
        });

        // DECODE
        btnDecode.addEventListener('click', () => {
            const val = input.value.trim();
            if(!val) return;
            const type = typeSelect.value;

            try {
                if (type === 'BASE64') {
                    output.value = decodeURIComponent(escape(atob(val)));
                } 
                else if (type === 'URL') {
                    output.value = decodeURIComponent(val);
                } 
                else if (type === 'JWT') {
                    // JWT Parsing Logic
                    const parts = val.split('.');
                    if (parts.length !== 3) throw new Error("Yanlış JWT formatı");

                    const header = JSON.parse(atob(parts[0]));
                    const payload = JSON.parse(atob(parts[1]));
                    
                    output.value = "HEADER:\n" + JSON.stringify(header, null, 2) + 
                                   "\n\nPAYLOAD:\n" + JSON.stringify(payload, null, 2);
                }
            } catch (e) {
                output.value = "Xəta: Format düzgün deyil!\n" + e.message;
            }
        });

        // Clear
        document.getElementById('btnClear').addEventListener('click', () => {
            input.value = '';
            output.value = '';
        });
    }
};

// SİSTEMƏ ƏLAVƏ ET
if (window.TOOLS_DATA) {
    window.TOOLS_DATA.push(encodersTool);
} else {
    window.TOOLS_DATA = [encodersTool];
}