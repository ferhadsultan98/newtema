const apiService = {
    // Ümumi GET sorğusu funksiyası
    get: async (endpoint) => {
        try {
            const response = await fetch(`${window.CONFIG.API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const result = await response.json();
            return result.data; // Backend-dən gələn data strukturu (adətən { data: [...] })
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            return null;
        }
    }
};

window.apiService = apiService;