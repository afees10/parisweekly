module.exports = async function handler(req, res) {
    // 1. Handle CORS Preflight (OPTIONS request) gracefully
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).end();
    }

    // Standard Headers for actual requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // 2. Dynamic Parameters: Extract 'limit' from the query string (e.g., ?limit=50)
        // We parse it as an integer and fallback to 100 if it's missing or invalid.
        const rawLimit = req.query?.limit ? parseInt(req.query.limit, 10) : 100;
        
        // Safety check: Ensure the limit is between 1 and 100 to prevent API abuse or crashes
        const safeLimit = Math.max(1, Math.min(rawLimit, 100));

        // 3. Inject the dynamic limit into the API URL
        const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${safeLimit}&order_by=date_start%20DESC`;
        
        const apiRes = await fetch(url);
        
        // 4. Robust Error Handling
        if (!apiRes.ok) {
            throw new Error(`Paris API HTTP ${apiRes.status}`);
        }
        
        const data = await apiRes.json();
        
        // 5. Safe return
        return res.status(200).json({ 
            success: true, 
            records: data.results || [] 
        });

    } catch (err) {
        // Log the error internally for debugging, then return a clean 500 response
        console.error("Fetch Error:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
};