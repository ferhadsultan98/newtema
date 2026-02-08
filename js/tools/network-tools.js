const networkTool = {
    id: "network-system-pro",
    title: "Advanced System & Network",
    description: "IP, Ping, Sürət, Videokart (GPU), RAM və ətraflı sistem analizi.",
    icon: "ri-router-line",
    category: "Network & System",
    keywords: ["ip", "gpu", "cpu", "ram", "ping", "speed", "device", "info"],

    render: () => {
        return `
            <div class="space-y-6 animate-fade-in h-full flex flex-col pb-10">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <i class="ri-earth-line text-8xl text-blue-500"></i>
                        </div>
                        <h3 class="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <i class="ri-map-pin-user-line text-blue-500"></i> IP & Məkan
                        </h3>
                        
                        <div id="ipLoading" class="animate-pulse flex flex-col gap-2">
                            <div class="h-8 bg-gray-200 dark:bg-dark-700 rounded w-3/4"></div>
                            <div class="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2"></div>
                            <span class="text-xs text-slate-400">Alternativ serverlər yoxlanılır...</span>
                        </div>

                        <div id="adblockMsg" class="hidden bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl text-center">
                            <i class="ri-shield-keyhole-line text-3xl text-red-500 mb-2 block"></i>
                            <h4 class="font-bold text-red-600 dark:text-red-400">Bağlantı Bloklandı</h4>
                            <p class="text-xs text-red-500 mt-1">Görünür Adblock istifadə edirsiniz. IP məlumatlarını görmək üçün bu səhifəlik söndürün.</p>
                            <button onclick="refreshIP()" class="mt-3 text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded transition">Yenidən Cəhd Et</button>
                        </div>

                        <div id="ipContent" class="hidden space-y-3 relative z-10">
                            <div>
                                <label class="text-xs text-slate-500 uppercase font-bold">Public IP</label>
                                <div class="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 select-all" id="dispIP">...</div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-xs text-slate-500 uppercase font-bold">Ölkə</label>
                                    <div class="font-medium text-slate-800 dark:text-white flex items-center gap-2">
                                        <span id="dispFlag" class="text-xl"></span> <span id="dispCountry">...</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="text-xs text-slate-500 uppercase font-bold">Şəhər</label>
                                    <div class="font-medium text-slate-800 dark:text-white" id="dispCity">...</div>
                                </div>
                            </div>
                            <div>
                                <label class="text-xs text-slate-500 uppercase font-bold">ISP (Provayder)</label>
                                <div class="font-medium text-slate-800 dark:text-white" id="dispISP">...</div>
                            </div>
                        </div>
                        <button onclick="refreshIP()" class="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-dark-700 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition z-20" title="Yenilə">
                            <i class="ri-refresh-line"></i>
                        </button>
                    </div>

                    <div class="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm flex flex-col justify-between relative overflow-hidden">
                         <div class="absolute top-0 right-0 p-4 opacity-10">
                            <i class="ri-speed-mini-line text-8xl text-emerald-500"></i>
                        </div>
                        <h3 class="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <i class="ri-dashboard-3-line text-emerald-500"></i> Şəbəkə Performansı
                        </h3>

                        <div class="flex-1 flex flex-col gap-6">
                            <div class="flex items-center justify-between border-b border-gray-100 dark:border-dark-700 pb-4">
                                <div>
                                    <div class="text-xs font-bold text-slate-500 uppercase">Ping</div>
                                    <div id="pingResult" class="text-4xl font-bold text-slate-300 dark:text-dark-600 transition-colors">-- <span class="text-sm text-gray-400">ms</span></div>
                                </div>
                                <i class="ri-pulse-line text-3xl text-gray-300 dark:text-dark-600" id="pingIcon"></i>
                            </div>

                            <div>
                                <div class="text-xs font-bold text-slate-500 uppercase">Download</div>
                                <div class="flex items-end gap-2">
                                    <div id="dlResult" class="text-5xl font-black text-slate-300 dark:text-dark-600 transition-colors">0.0</div>
                                    <div class="text-lg font-bold text-slate-400 mb-2">Mbps</div>
                                </div>
                                <div class="w-full bg-gray-100 dark:bg-dark-900 h-3 rounded-full mt-3 overflow-hidden">
                                    <div id="dlProgress" class="h-full bg-emerald-500 w-0 transition-all duration-300"></div>
                                </div>
                            </div>
                        </div>

                        <p id="testStatus" class="text-xs text-center text-slate-400 mt-4 font-mono">Server tələb etmir (Frontend only)</p>

                        <button id="btnPing" class="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                            <i class="ri-play-circle-line text-xl"></i> Testi Başlat
                        </button>
                    </div>
                </div>

                <div class="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm">
                    <h3 class="text-lg font-bold text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-2">
                        <i class="ri-macbook-line text-purple-500"></i> Cihaz və Sistem Analizi
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 flex flex-col gap-1">
                            <div class="flex items-center gap-2 mb-1">
                                <i class="ri-computer-line text-purple-500"></i>
                                <span class="text-xs font-bold text-slate-400 uppercase">OS & Platforma</span>
                            </div>
                            <div class="font-bold text-slate-800 dark:text-white" id="sysOS">...</div>
                            <div class="text-xs text-slate-500 truncate" id="sysPlatform">...</div>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 flex flex-col gap-1">
                            <div class="flex items-center gap-2 mb-1">
                                <i class="ri-chrome-line text-orange-500"></i>
                                <span class="text-xs font-bold text-slate-400 uppercase">Brauzer</span>
                            </div>
                            <div class="font-bold text-slate-800 dark:text-white" id="sysBrowser">...</div>
                            <div class="text-xs text-slate-500" id="sysEngine">Engine: ...</div>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 flex flex-col gap-1">
                            <div class="flex items-center gap-2 mb-1">
                                <i class="ri-cpu-line text-red-500"></i>
                                <span class="text-xs font-bold text-slate-400 uppercase">CPU & RAM</span>
                            </div>
                            <div class="font-bold text-slate-800 dark:text-white" id="sysCPU">...</div>
                            <div class="text-xs text-slate-500" id="sysRAM">RAM: ...</div>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 flex flex-col gap-1">
                            <div class="flex items-center gap-2 mb-1">
                                <i class="ri-vidicon-line text-pink-500"></i>
                                <span class="text-xs font-bold text-slate-400 uppercase">Videokart (GPU)</span>
                            </div>
                            <div class="font-bold text-slate-800 dark:text-white text-sm leading-tight" id="sysGPU">Təyin edilir...</div>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 flex flex-col gap-1">
                            <div class="flex items-center gap-2 mb-1">
                                <i class="ri-aspect-ratio-line text-blue-500"></i>
                                <span class="text-xs font-bold text-slate-400 uppercase">Ekran</span>
                            </div>
                            <div class="font-bold text-slate-800 dark:text-white" id="sysScreen">...</div>
                            <div class="text-xs text-slate-500" id="sysPixel">DPI: ...</div>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 flex flex-col gap-1">
                            <div class="flex items-center gap-2 mb-1">
                                <i class="ri-battery-charge-line text-green-500"></i>
                                <span class="text-xs font-bold text-slate-400 uppercase">Batareya</span>
                            </div>
                            <div class="font-bold text-slate-800 dark:text-white" id="sysBattery">Yoxdur/Desktop</div>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 flex flex-col gap-1">
                            <div class="flex items-center gap-2 mb-1">
                                <i class="ri-wifi-line text-cyan-500"></i>
                                <span class="text-xs font-bold text-slate-400 uppercase">Bağlantı Tipi</span>
                            </div>
                            <div class="font-bold text-slate-800 dark:text-white" id="sysNetType">...</div>
                        </div>

                        <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-100 dark:border-dark-700 flex flex-col gap-1">
                            <div class="flex items-center gap-2 mb-1">
                                <i class="ri-time-line text-yellow-500"></i>
                                <span class="text-xs font-bold text-slate-400 uppercase">Saat Qurşağı</span>
                            </div>
                            <div class="font-bold text-slate-800 dark:text-white text-sm" id="sysTime">...</div>
                        </div>

                    </div>
                </div>
            </div>
        `;
    },

    init: () => {
        // --- 1. SMART IP FETCHING (Adblock Bypassing Logic) ---
        window.refreshIP = async () => {
            const loading = document.getElementById('ipLoading');
            const content = document.getElementById('ipContent');
            const adblockMsg = document.getElementById('adblockMsg');
            
            loading.classList.remove('hidden');
            content.classList.add('hidden');
            adblockMsg.classList.add('hidden');

            // API Siyahısı (Biri işləməsə digəri yoxlanacaq)
            const apis = [
                { url: 'https://ipwho.is/', type: 'json' }, // Ən detallı
                { url: 'https://api.ipify.org?format=json', type: 'simple' }, // Ən sadə (Backup)
                { url: 'https://ipapi.co/json/', type: 'json' }  // Populyar
            ];

            let success = false;

            for (const api of apis) {
                try {
                    const controller = new AbortController();
                    const id = setTimeout(() => controller.abort(), 3000); // 3 saniyə timeout

                    const res = await fetch(api.url, { signal: controller.signal });
                    clearTimeout(id);

                    if (!res.ok) throw new Error("Blocked");
                    
                    const data = await res.json();
                    
                    // Dataları doldur
                    if(api.type === 'simple') {
                        document.getElementById('dispIP').innerText = data.ip;
                        document.getElementById('dispCountry').innerText = "Sadə rejim";
                        document.getElementById('dispCity').innerText = "-";
                        document.getElementById('dispISP').innerText = "-";
                        document.getElementById('dispFlag').innerText = "🏳️";
                    } else {
                        document.getElementById('dispIP').innerText = data.ip;
                        document.getElementById('dispCountry').innerText = data.country || data.country_name;
                        document.getElementById('dispCity').innerText = data.city;
                        document.getElementById('dispISP').innerText = data.connection?.isp || data.org;
                        const code = data.country_code || data.countryCode;
                        document.getElementById('dispFlag').innerText = code ? getFlagEmoji(code) : '🌍';
                    }

                    success = true;
                    break; // Biri işlədisə dövrü dayandır

                } catch (e) {
                    console.warn(`API Failed: ${api.url}`);
                    continue; // Növbətiyə keç
                }
            }

            loading.classList.add('hidden');

            if (success) {
                content.classList.remove('hidden');
            } else {
                // Hamsı uğursuz oldusa -> Deməli Adblock var
                adblockMsg.classList.remove('hidden');
            }
        };

        // --- 2. GPU Məlumatını Alan Funksiya ---
        function getGPUInfo() {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) return "WebGL Dəstəklənmir";
                
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (!debugInfo) return "Naməlum GPU";
                
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                
                // Mətni təmizləmək (Angle və s. sözləri silmək üçün)
                return renderer.replace(/ANGLE \(/, '').replace(/\)/, '');
            } catch (e) {
                return "Təyin edilmədi";
            }
        }

        // --- 3. Sistem Məlumatlarını Doldur ---
        const ua = navigator.userAgent;
        
        // OS Təyini
        let os = "Naməlum";
        if (ua.indexOf("Win") !== -1) os = "Windows";
        if (ua.indexOf("Mac") !== -1) os = "MacOS";
        if (ua.indexOf("Linux") !== -1) os = "Linux";
        if (ua.indexOf("Android") !== -1) os = "Android";
        if (ua.indexOf("iOS") !== -1) os = "iOS";
        
        // Brauzer Təyini
        let browser = "Naməlum";
        if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
        else if (ua.indexOf("Opr") !== -1) browser = "Opera";
        else if (ua.indexOf("Edg") !== -1) browser = "Edge";
        else if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
        else if (ua.indexOf("Safari") !== -1) browser = "Safari";

        // RAM (Yalnız Chrome/Edge dəstəkləyir)
        const ram = navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : "N/A";
        
        // Cores
        const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Nüvə` : "N/A";

        // Connection
        const conn = navigator.connection ? navigator.connection.effectiveType.toUpperCase() : "WiFi/LAN";

        // UI Update
        document.getElementById('sysOS').innerText = os;
        document.getElementById('sysPlatform').innerText = navigator.platform;
        document.getElementById('sysBrowser').innerText = browser;
        document.getElementById('sysEngine').innerText = navigator.product; // Gecko/Webkit
        document.getElementById('sysCPU').innerText = cores;
        document.getElementById('sysRAM').innerText = "RAM: " + ram;
        document.getElementById('sysGPU').innerText = getGPUInfo();
        document.getElementById('sysScreen').innerText = `${window.screen.width} x ${window.screen.height}`;
        document.getElementById('sysPixel').innerText = `Ratio: ${window.devicePixelRatio}x | Color: ${window.screen.colorDepth}-bit`;
        document.getElementById('sysNetType').innerText = conn;
        document.getElementById('sysTime').innerText = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Battery
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                const updateBattery = () => {
                    const level = Math.round(battery.level * 100) + "%";
                    const status = battery.charging ? "⚡" : "";
                    document.getElementById('sysBattery').innerText = `${level} ${status}`;
                };
                updateBattery();
            });
        }

        // --- 4. Speed Test Logic (Öncəki kimi) ---
        document.getElementById('btnPing').addEventListener('click', async () => {
            const btn = document.getElementById('btnPing');
            const pingRes = document.getElementById('pingResult');
            const dlRes = document.getElementById('dlResult');
            const statusEl = document.getElementById('testStatus');
            const pingIcon = document.getElementById('pingIcon');
            const bar = document.getElementById('dlProgress');
            
            btn.disabled = true;
            btn.classList.add('opacity-75');
            bar.style.width = "0%";
            dlRes.innerText = "0.0";

            // Ping
            const start = Date.now();
            try {
                await fetch('https://www.google.com/favicon.ico?' + start, { mode: 'no-cors' });
                const latency = Date.now() - start;
                pingRes.innerHTML = `${latency} <span class="text-sm text-gray-500">ms</span>`;
                pingIcon.className = "ri-pulse-line text-3xl text-emerald-500";
            } catch(e) { pingRes.innerText = "Error"; }

            // Download
            statusEl.innerText = "Sürət ölçülür...";
            bar.style.width = "30%";
            
            const imageLink = "https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2500&q=80"; 
            const size = 5200000; 
            const dlStart = performance.now();
            const img = new Image();
            
            img.onload = function() {
                const duration = (performance.now() - dlStart) / 1000;
                const speed = ((size * 8) / duration / 1024 / 1024).toFixed(1);
                dlRes.innerText = speed;
                bar.style.width = "100%";
                statusEl.innerText = "Tamamlandı";
                btn.disabled = false;
                btn.classList.remove('opacity-75');
            };
            img.onerror = () => { btn.disabled = false; statusEl.innerText = "Xəta"; };
            img.src = imageLink + "&t=" + Math.random();
        });

        function getFlagEmoji(countryCode) {
            return String.fromCodePoint(...countryCode.toUpperCase().split('').map(c => 127397 + c.charCodeAt()));
        }

        setTimeout(window.refreshIP, 500);
    }
};

if (window.TOOLS_DATA) window.TOOLS_DATA.push(networkTool);
else window.TOOLS_DATA = [networkTool];