const formattersTool = {
    id: "code-formatters",
    title: "Code Formatters",
    description: "JSON, HTML, XML və SQL kodlarını səliqəli formata salmaq üçün universal alət.",
    icon: "ri-file-code-line", 
    category: "Formatters & Converters", // <--- Yeni Kateqoriya
    keywords: ["json", "xml", "html", "sql", "beautify", "format", "indent"],

    render: () => {
        return `
            <div class="space-y-4 animate-fade-in h-full flex flex-col">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 dark:bg-dark-900 p-3 rounded-xl border border-gray-200 dark:border-dark-700">
                    
                    <div class="flex items-center gap-2 w-full md:w-auto">
                        <span class="text-sm font-bold text-slate-500 hidden md:inline">Dil:</span>
                        <select id="fmtType" class="flex-1 md:w-48 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary">
                            <option value="JSON">JSON</option>
                            <option value="HTML">HTML / XML</option>
                            <option value="SQL">SQL</option>
                        </select>
                    </div>

                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="fmtBeautifyBtn" class="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-md flex items-center justify-center gap-2">
                            <i class="ri-magic-line"></i> Beautify
                        </button>
                        <button id="fmtMinifyBtn" class="flex-1 md:flex-none bg-slate-200 dark:bg-dark-700 hover:bg-slate-300 dark:hover:bg-dark-600 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
                            <i class="ri-file-zip-line"></i> Minify
                        </button>
                        <button id="fmtClearBtn" class="bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 py-2 px-3 rounded-lg transition">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4 flex-1 min-h-[400px]">
                    <div class="flex-1 flex flex-col">
                        <label class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Giriş (Input)</label>
                        <textarea id="fmtInput" class="flex-1 p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl resize-none outline-none text-slate-600 dark:text-slate-300 font-mono text-xs focus:border-primary transition custom-scroll" placeholder="Kodu bura yapışdırın..."></textarea>
                    </div>
                    
                    <div class="flex-1 flex flex-col">
                        <label class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Nəticə (Output)</label>
                        <textarea id="fmtOutput" readonly class="flex-1 p-4 bg-slate-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl resize-none outline-none text-green-700 dark:text-green-400 font-mono text-xs custom-scroll" placeholder="Formatlanmış kod..."></textarea>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        const input = document.getElementById('fmtInput');
        const output = document.getElementById('fmtOutput');
        const typeSelect = document.getElementById('fmtType');

        // --- MƏNTİQ ---

        // 1. Beautify (Gözəlləşdirmək)
        document.getElementById('fmtBeautifyBtn').addEventListener('click', () => {
            const code = input.value;
            const type = typeSelect.value;
            if(!code) return;

            try {
                if(type === 'JSON') {
                    const parsed = JSON.parse(code);
                    output.value = JSON.stringify(parsed, null, 4);
                } 
                else if (type === 'HTML') {
                    output.value = formatHTML(code);
                }
                else if (type === 'SQL') {
                    output.value = formatSQL(code);
                }
            } catch(e) {
                output.value = "Xəta: " + e.message;
            }
        });

        // 2. Minify (Sıxışdırmaq)
        document.getElementById('fmtMinifyBtn').addEventListener('click', () => {
            const code = input.value;
            const type = typeSelect.value;
            if(!code) return;

            try {
                if(type === 'JSON') {
                    output.value = JSON.stringify(JSON.parse(code));
                }
                else if(type === 'HTML') {
                    output.value = code.replace(/>\s+</g, '><').trim();
                }
                else if(type === 'SQL') {
                    output.value = code.replace(/\s+/g, ' ').trim();
                }
            } catch(e) {
                output.value = "Xəta: " + e.message;
            }
        });

        // 3. Təmizləmək
        document.getElementById('fmtClearBtn').addEventListener('click', () => {
            input.value = '';
            output.value = '';
        });

        // --- KÖMƏKÇİ FUNKSİYALAR (Vanilla JS) ---
        
        // Sadə HTML Formatlayıcı
        function formatHTML(html) {
            let formatted = '';
            let indent = '';
            html.split(/>\s*</).forEach(function(element) {
                if (element.match( /^\/\w/ )) {
                    indent = indent.substring(2);
                }
                formatted += indent + '<' + element + '>\r\n';
                if (element.match( /^<?\w[^>]*[^\/]$/ ) && !element.startsWith("input")  && !element.startsWith("img") && !element.startsWith("br")) { 
                    indent += '  ';
                }
            });
            return formatted.substring(1, formatted.length-3);
        }

        // Sadə SQL Formatlayıcı
        function formatSQL(sql) {
            const keywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "GROUP BY", "INSERT", "UPDATE", "DELETE", "HAVING", "LIMIT", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN"];
            let formatted = sql;
            keywords.forEach(key => {
                const regex = new RegExp(`\\b${key}\\b`, 'gi');
                formatted = formatted.replace(regex, `\n${key}`);
            });
            return formatted.trim();
        }
    }
};

// SİSTEMƏ ƏLAVƏ ET
if (window.TOOLS_DATA) {
    window.TOOLS_DATA.push(formattersTool);
} else {
    window.TOOLS_DATA = [formattersTool];
}