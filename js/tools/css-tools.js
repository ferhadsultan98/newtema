const cssTools = {
    id: "css-ui-studio",
    title: "CSS & UI Studio",
    description: "Frontend üçün CSS Minifier, Shadow, Gradient, Rəng Çevirici və Px-Rem alətləri.",
    icon: "ri-palette-line", 
    category: "CSS & Design", // <--- Yeni Kateqoriya
    keywords: ["css", "frontend", "minifier", "shadow", "gradient", "color", "hex", "rgb", "hsl", "px", "rem"],

    render: () => {
        return `
            <div class="space-y-4 animate-fade-in h-full flex flex-col">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 dark:bg-dark-900 p-3 rounded-xl border border-gray-200 dark:border-dark-700">
                    
                    <div class="flex items-center gap-2 w-full md:w-auto">
                        <div class="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                            <i class="ri-brush-line text-xl"></i>
                        </div>
                        <select id="cssToolType" class="flex-1 md:w-64 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg px-3 py-2 font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-pink-500 transition">
                            <option value="MINIFIER">CSS Minifier / Unminifier</option>
                            <option value="SHADOW">Box Shadow Generator</option>
                            <option value="GRADIENT">Gradient Generator</option>
                            <option value="COLOR">Color Converter (HEX/RGB)</option>
                            <option value="PXREM">Px to Rem Converter</option>
                        </select>
                    </div>
                </div>

                <div class="flex-1 min-h-[400px] bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 relative">
                    
                    <div id="viewMINIFIER" class="tool-view h-full flex flex-col gap-4">
                        <div class="flex gap-2">
                            <button id="btnCssMinify" class="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700">Minify (Sıxışdır)</button>
                            <button id="btnCssBeautify" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Beautify (Gözəlləşdir)</button>
                        </div>
                        <div class="flex flex-col md:flex-row gap-4 flex-1">
                            <textarea id="cssInput" class="flex-1 p-4 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl resize-none outline-none font-mono text-xs" placeholder="CSS kodunu bura atın..."></textarea>
                            <textarea id="cssOutput" readonly class="flex-1 p-4 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl resize-none outline-none font-mono text-xs text-blue-600 dark:text-blue-400" placeholder="Nəticə..."></textarea>
                        </div>
                    </div>

                    <div id="viewSHADOW" class="tool-view hidden h-full flex flex-col md:flex-row gap-8">
                        <div class="w-full md:w-1/3 space-y-4">
                            <h3 class="font-bold border-b pb-2">Tənzimləmələr</h3>
                            <div><label class="text-xs text-slate-500">Horizontal (X)</label><input type="range" id="shadowX" min="-50" max="50" value="10" class="w-full"></div>
                            <div><label class="text-xs text-slate-500">Vertical (Y)</label><input type="range" id="shadowY" min="-50" max="50" value="10" class="w-full"></div>
                            <div><label class="text-xs text-slate-500">Blur Radius</label><input type="range" id="shadowBlur" min="0" max="100" value="20" class="w-full"></div>
                            <div><label class="text-xs text-slate-500">Spread Radius</label><input type="range" id="shadowSpread" min="-50" max="50" value="0" class="w-full"></div>
                            <div><label class="text-xs text-slate-500">Color Opacity</label><input type="range" id="shadowOpacity" min="0" max="1" step="0.01" value="0.15" class="w-full"></div>
                            <div><label class="text-xs text-slate-500">Shadow Color</label><input type="color" id="shadowColor" value="#000000" class="w-full h-8 cursor-pointer rounded"></div>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-900 rounded-xl p-8 border border-gray-200 dark:border-dark-700">
                            <div id="shadowPreview" class="w-32 h-32 bg-white dark:bg-dark-800 rounded-xl flex items-center justify-center font-bold text-xs text-slate-400">Preview</div>
                            <code id="shadowCode" class="mt-8 p-3 bg-slate-800 text-green-400 rounded-lg text-xs font-mono w-full text-center cursor-pointer hover:bg-slate-700" onclick="copyText(this)">box-shadow: ...</code>
                        </div>
                    </div>

                    <div id="viewGRADIENT" class="tool-view hidden h-full flex flex-col md:flex-row gap-8">
                        <div class="w-full md:w-1/3 space-y-4">
                            <h3 class="font-bold border-b pb-2">Rənglər</h3>
                            <div class="flex gap-2">
                                <input type="color" id="gradColor1" value="#3b82f6" class="w-full h-10 rounded cursor-pointer">
                                <input type="color" id="gradColor2" value="#ec4899" class="w-full h-10 rounded cursor-pointer">
                            </div>
                            <div><label class="text-xs text-slate-500">Angle (Dərəcə)</label><input type="range" id="gradAngle" min="0" max="360" value="45" class="w-full"></div>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-900 rounded-xl p-8 border border-gray-200 dark:border-dark-700">
                            <div id="gradPreview" class="w-full h-40 rounded-xl shadow-lg"></div>
                            <code id="gradCode" class="mt-6 p-3 bg-slate-800 text-green-400 rounded-lg text-xs font-mono w-full text-center cursor-pointer hover:bg-slate-700" onclick="copyText(this)">background: linear-gradient(...)</code>
                        </div>
                    </div>

                    <div id="viewCOLOR" class="tool-view hidden h-full flex flex-col items-center justify-center gap-6">
                        <div class="w-full max-w-md">
                            <label class="font-bold text-sm mb-1 block">HEX Color</label>
                            <div class="flex gap-2">
                                <input type="text" id="inputHex" value="#3B82F6" class="flex-1 p-3 border rounded-lg dark:bg-dark-900 dark:border-dark-700 uppercase font-mono" maxlength="7">
                                <input type="color" id="inputColorPicker" value="#3B82F6" class="w-12 h-12 rounded-lg cursor-pointer border-none p-0">
                            </div>
                        </div>
                        <div class="w-full max-w-md grid grid-cols-2 gap-4">
                            <div class="bg-gray-50 dark:bg-dark-900 p-4 rounded-xl border border-gray-200 dark:border-dark-700">
                                <label class="text-xs text-slate-500 block mb-1">RGB</label>
                                <div id="outRGB" class="font-mono font-bold text-slate-700 dark:text-white select-all">rgb(59, 130, 246)</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-dark-900 p-4 rounded-xl border border-gray-200 dark:border-dark-700">
                                <label class="text-xs text-slate-500 block mb-1">HSL</label>
                                <div id="outHSL" class="font-mono font-bold text-slate-700 dark:text-white select-all">hsl(217, 91%, 60%)</div>
                            </div>
                        </div>
                    </div>

                    <div id="viewPXREM" class="tool-view hidden h-full flex flex-col items-center justify-center gap-8">
                        <div class="flex items-end gap-4">
                            <div>
                                <label class="text-xs font-bold text-slate-500 mb-2 block">Pikseller (px)</label>
                                <input type="number" id="pxInput" value="16" class="p-4 text-2xl font-bold w-32 text-center rounded-xl border border-gray-200 dark:bg-dark-900 dark:border-dark-700 dark:text-white outline-none focus:border-pink-500">
                            </div>
                            <i class="ri-arrow-right-line text-2xl text-slate-400 mb-4"></i>
                            <div>
                                <label class="text-xs font-bold text-slate-500 mb-2 block">REM</label>
                                <input type="number" id="remOutput" readonly class="p-4 text-2xl font-bold w-32 text-center rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 text-pink-600 dark:text-pink-400 outline-none">
                            </div>
                        </div>
                        <div class="text-sm text-slate-500">
                            Base size: <input type="number" id="baseSize" value="16" class="w-12 p-1 text-center border rounded bg-transparent font-bold"> px
                        </div>
                    </div>

                </div>
            </div>
        `;
    },

    init: () => {
        const select = document.getElementById('cssToolType');
        const views = document.querySelectorAll('.tool-view');

        // View Switching Logic
        select.addEventListener('change', () => {
            views.forEach(v => v.classList.add('hidden'));
            document.getElementById('view' + select.value).classList.remove('hidden');
        });

        // 1. CSS MINIFIER Logic
        document.getElementById('btnCssMinify').addEventListener('click', () => {
            let css = document.getElementById('cssInput').value;
            // Remove comments, newlines, extra spaces
            css = css.replace(/\/\*[\s\S]*?\*\//g, "")
                     .replace(/\n/g, "")
                     .replace(/\s*\{\s*/g, "{")
                     .replace(/\s*\}\s*/g, "}")
                     .replace(/\s*:\s*/g, ":")
                     .replace(/\s*;\s*/g, ";");
            document.getElementById('cssOutput').value = css;
        });

        document.getElementById('btnCssBeautify').addEventListener('click', () => {
            let css = document.getElementById('cssInput').value;
            // Simple Beautifier
            css = css.replace(/\{/g, " {\n  ")
                     .replace(/;/g, ";\n  ")
                     .replace(/\}/g, "\n}\n")
                     .replace(/\s*\{\s*/g, " { ") // clean up a bit
            document.getElementById('cssOutput').value = css.trim();
        });

        // 2. BOX SHADOW Logic
        const updateShadow = () => {
            const x = document.getElementById('shadowX').value;
            const y = document.getElementById('shadowY').value;
            const blur = document.getElementById('shadowBlur').value;
            const spread = document.getElementById('shadowSpread').value;
            const color = document.getElementById('shadowColor').value;
            const opacity = document.getElementById('shadowOpacity').value;
            
            // Hex to RGBA for opacity
            const r = parseInt(color.substr(1,2), 16);
            const g = parseInt(color.substr(3,2), 16);
            const b = parseInt(color.substr(5,2), 16);
            const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

            const css = `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
            document.getElementById('shadowPreview').style.boxShadow = css;
            document.getElementById('shadowCode').innerText = `box-shadow: ${css};`;
        };
        ['shadowX','shadowY','shadowBlur','shadowSpread','shadowOpacity','shadowColor'].forEach(id => {
            document.getElementById(id).addEventListener('input', updateShadow);
        });

        // 3. GRADIENT Logic
        const updateGradient = () => {
            const c1 = document.getElementById('gradColor1').value;
            const c2 = document.getElementById('gradColor2').value;
            const deg = document.getElementById('gradAngle').value;
            const css = `linear-gradient(${deg}deg, ${c1}, ${c2})`;
            
            document.getElementById('gradPreview').style.background = css;
            document.getElementById('gradCode').innerText = `background: ${css};`;
        };
        ['gradColor1','gradColor2','gradAngle'].forEach(id => {
            document.getElementById(id).addEventListener('input', updateGradient);
        });
        updateGradient(); // init

        // 4. COLOR CONVERTER Logic
        const hexToRgb = (hex) => {
            const r = parseInt(hex.substr(1,2), 16);
            const g = parseInt(hex.substr(3,2), 16);
            const b = parseInt(hex.substr(5,2), 16);
            return {r, g, b};
        }
        
        const updateColors = (hex) => {
            if(!/^#[0-9A-F]{6}$/i.test(hex)) return;
            
            const {r, g, b} = hexToRgb(hex);
            
            // RGB Output
            document.getElementById('outRGB').innerText = `rgb(${r}, ${g}, ${b})`;
            
            // HSL Calculation
            let r1=r/255, g1=g/255, b1=b/255;
            let max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
            let h, s, l = (max + min) / 2;

            if(max === min) { h = s = 0; } 
            else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case r1: h = (g1 - b1) / d + (g1 < b1 ? 6 : 0); break;
                    case g1: h = (b1 - r1) / d + 2; break;
                    case b1: h = (r1 - g1) / d + 4; break;
                }
                h /= 6;
            }
            document.getElementById('outHSL').innerText = `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
        };

        document.getElementById('inputHex').addEventListener('input', (e) => {
            document.getElementById('inputColorPicker').value = e.target.value;
            updateColors(e.target.value);
        });
        document.getElementById('inputColorPicker').addEventListener('input', (e) => {
            document.getElementById('inputHex').value = e.target.value;
            updateColors(e.target.value);
        });

        // 5. PX TO REM Logic
        const updateRem = () => {
            const px = document.getElementById('pxInput').value;
            const base = document.getElementById('baseSize').value;
            if(base > 0) {
                document.getElementById('remOutput').value = (px / base).toFixed(3).replace(/\.?0+$/, '');
            }
        };
        document.getElementById('pxInput').addEventListener('input', updateRem);
        document.getElementById('baseSize').addEventListener('input', updateRem);

        // Global Copy Helper
        window.copyText = (el) => {
            const txt = el.innerText;
            navigator.clipboard.writeText(txt);
            const old = el.innerText;
            el.innerText = "Kopyalandı!";
            setTimeout(() => el.innerText = old, 1000);
        };
    }
};

// SİSTEMƏ ƏLAVƏ ET
if (window.TOOLS_DATA) {
    window.TOOLS_DATA.push(cssTools);
} else {
    window.TOOLS_DATA = [cssTools];
}