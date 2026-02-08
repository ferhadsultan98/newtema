const generatorsTool = {
    id: "all-generators",
    title: "All Generators",
    description: "UUID, Şifrə, Lorem Ipsum və QR Kod yaratmaq üçün universal generator.",
    icon: "ri-shuffle-line",
    category: "Generators", // <--- Yeni Kateqoriya
    keywords: ["uuid", "guid", "password", "lorem", "ipsum", "qr", "code", "generator", "random"],

    render: () => {
        return `
            <div class="space-y-4 animate-fade-in h-full flex flex-col">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 dark:bg-dark-900 p-3 rounded-xl border border-gray-200 dark:border-dark-700">
                    
                    <div class="flex items-center gap-2 w-full md:w-auto">
                        <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <i class="ri-refresh-line text-xl"></i>
                        </div>
                        <select id="genType" class="flex-1 md:w-60 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition">
                            <option value="UUID">UUID / GUID Generator</option>
                            <option value="PASS">Random Password Generator</option>
                            <option value="LOREM">Lorem Ipsum Generator</option>
                            <option value="QR">QR Code Generator</option>
                        </select>
                    </div>

                    <button id="btnGenerate" class="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-8 rounded-lg transition shadow-md flex items-center justify-center gap-2">
                        <i class="ri-flashlight-line"></i> Yarat (Generate)
                    </button>
                </div>

                <div class="flex flex-col md:flex-row gap-4 flex-1 min-h-[400px]">
                    
                    <div class="md:w-1/3 flex flex-col gap-4">
                        <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-700 h-full">
                            <h3 class="font-bold text-slate-700 dark:text-white mb-4 border-b border-gray-100 dark:border-dark-700 pb-2">Ayarlar</h3>
                            
                            <div id="settingsUUID" class="settings-group text-sm text-slate-500">
                                <p>UUID v4 standartına uyğun unikal ID yaradılacaq.</p>
                                <p class="mt-2">Heç bir əlavə parametr tələb olunmur.</p>
                            </div>

                            <div id="settingsPASS" class="settings-group hidden flex flex-col gap-3">
                                <div>
                                    <label class="text-xs font-bold text-slate-500">Uzunluq: <span id="passLengthVal">16</span></label>
                                    <input type="range" id="passLength" min="6" max="64" value="16" class="w-full mt-1 accent-emerald-600">
                                </div>
                                <label class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                    <input type="checkbox" id="passUpper" checked class="w-4 h-4 rounded text-emerald-600"> Böyük Hərflər (A-Z)
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                    <input type="checkbox" id="passNumbers" checked class="w-4 h-4 rounded text-emerald-600"> Rəqəmlər (0-9)
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                    <input type="checkbox" id="passSymbols" checked class="w-4 h-4 rounded text-emerald-600"> Simvollar (!@#)
                                </label>
                            </div>

                            <div id="settingsLOREM" class="settings-group hidden">
                                <label class="text-xs font-bold text-slate-500">Abzas (Paraqraf) sayı:</label>
                                <input type="number" id="loremCount" value="3" min="1" max="20" class="w-full mt-1 p-2 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg outline-none">
                            </div>

                            <div id="settingsQR" class="settings-group hidden">
                                <label class="text-xs font-bold text-slate-500">Link və ya Mətn:</label>
                                <textarea id="qrText" class="w-full h-32 mt-1 p-2 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg outline-none resize-none text-sm" placeholder="https://farhadsultanov.info"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex-1 flex flex-col">
                        <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-700 h-full flex flex-col relative">
                            <div class="flex justify-between items-center mb-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Nəticə</label>
                                <button onclick="copyGeneratorOutput()" class="text-xs text-emerald-500 hover:underline cursor-pointer flex items-center gap-1">
                                    <i class="ri-file-copy-line"></i> Kopyala
                                </button>
                            </div>

                            <textarea id="genOutput" readonly class="flex-1 p-4 bg-slate-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl resize-none outline-none text-slate-700 dark:text-slate-300 font-mono text-lg custom-scroll" placeholder="Nəticə burada görünəcək..."></textarea>
                            
                            <div id="qrOutputContainer" class="hidden absolute inset-0 bg-white dark:bg-dark-800 rounded-xl flex items-center justify-center z-10 p-4">
                                <div class="text-center">
                                    <img id="qrImage" src="" class="w-48 h-48 mx-auto border-4 border-white shadow-lg mb-4" alt="QR Code">
                                    <p class="text-xs text-slate-400">Yükləmək üçün şəklə sağ klikləyin</p>
                                </div>
                                <button onclick="closeQrView()" class="absolute top-2 right-2 p-2 bg-gray-100 dark:bg-dark-700 rounded-full hover:bg-gray-200 transition">
                                    <i class="ri-close-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        const typeSelect = document.getElementById('genType');
        const btnGen = document.getElementById('btnGenerate');
        const output = document.getElementById('genOutput');
        
        // Settings Groups
        const groups = {
            'UUID': document.getElementById('settingsUUID'),
            'PASS': document.getElementById('settingsPASS'),
            'LOREM': document.getElementById('settingsLOREM'),
            'QR': document.getElementById('settingsQR')
        };

        // 1. UI Change Logic
        typeSelect.addEventListener('change', () => {
            const val = typeSelect.value;
            // Hide all
            Object.values(groups).forEach(el => el.classList.add('hidden'));
            // Show selected
            groups[val].classList.remove('hidden');
            
            // QR view reset
            document.getElementById('qrOutputContainer').classList.add('hidden');
            output.value = '';
        });

        // Password Slider UI
        document.getElementById('passLength').addEventListener('input', (e) => {
            document.getElementById('passLengthVal').innerText = e.target.value;
        });

        // 2. Generate Logic
        btnGen.addEventListener('click', () => {
            const type = typeSelect.value;
            output.value = '';
            document.getElementById('qrOutputContainer').classList.add('hidden');

            if (type === 'UUID') {
                output.value = crypto.randomUUID();
            } 
            else if (type === 'PASS') {
                output.value = generatePassword();
            } 
            else if (type === 'LOREM') {
                output.value = generateLorem();
            } 
            else if (type === 'QR') {
                const text = document.getElementById('qrText').value;
                if(!text) return alert("Zəhmət olmasa mətn daxil edin!");
                
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
                document.getElementById('qrImage').src = qrUrl;
                document.getElementById('qrOutputContainer').classList.remove('hidden');
            }
        });

        // --- Helper Functions ---

        function generatePassword() {
            const len = document.getElementById('passLength').value;
            const useUpper = document.getElementById('passUpper').checked;
            const useNum = document.getElementById('passNumbers').checked;
            const useSym = document.getElementById('passSymbols').checked;

            const lower = "abcdefghijklmnopqrstuvwxyz";
            const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const num = "0123456789";
            const sym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

            let chars = lower;
            if(useUpper) chars += upper;
            if(useNum) chars += num;
            if(useSym) chars += sym;

            let pass = "";
            for (let i = 0; i < len; i++) {
                pass += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return pass;
        }

        function generateLorem() {
            const count = document.getElementById('loremCount').value;
            const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            
            let result = "";
            for(let i=0; i<count; i++) {
                result += text + "\n\n";
            }
            return result.trim();
        }

        // Qlobal funksiyalar (window-a bağlayırıq ki, HTML-dən işləsin)
        window.closeQrView = () => {
            document.getElementById('qrOutputContainer').classList.add('hidden');
        };

        window.copyGeneratorOutput = () => {
            const out = document.getElementById('genOutput');
            out.select();
            document.execCommand('copy');
        };
    }
};

// SİSTEMƏ ƏLAVƏ ET
if (window.TOOLS_DATA) {
    window.TOOLS_DATA.push(generatorsTool);
} else {
    window.TOOLS_DATA = [generatorsTool];
}