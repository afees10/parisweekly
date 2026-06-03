module.exports = async function handler(req, res) {
    // 1. Gestion des requêtes CORS Preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).end();
    }

    // Configuration des en-têtes standard pour les requêtes GET
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // 2. Paramètre dynamique avec fallback par défaut à 100
        const rawLimit = req.query?.limit ? parseInt(req.query.limit, 10) : 100;
        
        // Sécurisation : Limiter entre 1 et 100 pour éviter les abus ou surcharges de l'API
        const safeLimit = Math.max(1, Math.min(rawLimit, 100));

        // 3. Construction de l'URL vers l'API de Paris Open Data
        const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${safeLimit}&order_by=date_start%20DESC`;
        
        const apiRes = await fetch(url);
        
        // 4. Gestion robuste des erreurs HTTP
        if (!apiRes.ok) {
            throw new Error(`Paris API HTTP Error: ${apiRes.status}`);
        }
        
        const data = await apiRes.json();
        
        // 5. Retour des résultats (sécurisé avec un tableau vide par défaut)
        return res.status(200).json({ 
            success: true, 
            records: data.results || [] 
        });

    } catch (err) {
        // Log interne pour le débogage de la fonction serverless
        console.error("Fetch Error:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
};