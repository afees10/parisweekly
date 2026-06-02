// api/events.js — Fonction serverless Vercel (@vercel/node)
module.exports = async function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

    try {
        // Semaine en cours : lundi → dimanche
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0=dim, 1=lun...
        const monday = new Date(now);
        monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
        monday.setHours(0, 0, 0, 0);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 0);

        const dateFrom = monday.toISOString().split('T')[0];
        const dateTo   = sunday.toISOString().split('T')[0];

        // Appel API Ville de Paris (pas de CORS côté serveur)
        const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records`
            + `?limit=30`
            + `&order_by=date_start%20ASC`
            + `&where=date_start%20>%3D%20'${dateFrom}'%20AND%20date_start%20<%3D%20'${dateTo}'`;

        const apiRes = await fetch(url, {
            headers: { Accept: 'application/json' }
        });

        if (!apiRes.ok) {
            throw new Error(`Paris API répondu HTTP ${apiRes.status}`);
        }

        const json = await apiRes.json();
        const records = (json.results || []).filter(r => r.title && r.title.trim().length > 3);

        const DAY_NAMES = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];

        const activities = records.slice(0, 25).map((r, i) => {
            const startDate = r.date_start ? new Date(r.date_start) : new Date();
            const day     = DAY_NAMES[startDate.getDay()];
            const dateStr = startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
            const timeStr = r.date_start ? r.date_start.substring(11, 16) : '14:00';

            // Durée
            let duration = '2h';
            if (r.date_end && r.date_start) {
                const diffH = (new Date(r.date_end) - new Date(r.date_start)) / 3600000;
                if (diffH > 0 && diffH < 24) {
                    const h = Math.floor(diffH), m = Math.round((diffH - h) * 60);
                    duration = h > 0 ? (m > 0 ? `${h}h${m}` : `${h}h`) : `${m}min`;
                }
            }

            // Prix
            let price = 0, priceLabel = 'Gratuit';
            const pt = (r.price_type || '').toLowerCase();
            if (pt && pt !== 'gratuit' && pt !== 'non renseigné') {
                const raw = parseFloat((r.price_detail || '').replace(/[^0-9.]/g, '')) || 0;
                price = raw > 0 ? raw : 8;
                priceLabel = raw > 0 ? `${raw}\u20ac` : 'Payant';
                if ((r.price_detail || '').toLowerCase().includes('\u00e9tudiant')) {
                    priceLabel += ' (- \u00e9tudiant)';
                }
            }

            // GPS
            let coordinates = [48.8566 + (Math.random()-0.5)*0.04, 2.3522 + (Math.random()-0.5)*0.04];
            if (r.geo_point_2d && r.geo_point_2d.lat) {
                coordinates = [parseFloat(r.geo_point_2d.lat), parseFloat(r.geo_point_2d.lon)];
            } else if (r.lat_lon_field && r.lat_lon_field.lat) {
                coordinates = [parseFloat(r.lat_lon_field.lat), parseFloat(r.lat_lon_field.lon)];
            }

            // Arrondissement
            let arrondissement = 'Paris';
            if (r.address_zipcode) {
                const num = parseInt(String(r.address_zipcode).slice(-2), 10);
                if (num >= 1 && num <= 20) arrondissement = `${num}e`;
            }

            // Description — supprime le HTML
            const desc = (r.description || r.lead_text || 'Événement proposé par la Ville de Paris.')
                .replace(/<[^>]+>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .substring(0, 350);

            return {
                id: 200 + i,
                title: r.title.trim(),
                day, date: dateStr, time: timeStr, duration,
                category: mapCategory(r.category || r.tags || ''),
                price, priceLabel,
                location: r.address_name || r.place_name || r.address_street || 'Paris',
                arrondissement, description: desc,
                spots: 'Selon disponibilité',
                studentDiscount: price === 0,
                coordinates,
                metro: r.transport || '',
                tips: `Source : Ville de Paris \u2022 ${dateStr}`,
                imageUrl: r.cover_url || r.image || null,
                sourceUrl: r.url || 'https://www.paris.fr/quefaire',
                isLive: true
            };
        });

        return res.status(200).json({
            success: true,
            source: 'paris-open-data',
            week: `${dateFrom} \u2192 ${dateTo}`,
            count: activities.length,
            activities
        });

    } catch (err) {
        console.error('[ParcoursParis] Erreur:', err.message);
        return res.status(503).json({ success: false, error: err.message });
    }
};

function mapCategory(raw) {
    const s = (Array.isArray(raw) ? raw.join(' ') : String(raw)).toLowerCase();
    if (s.includes('concert') || s.includes('musique') || s.includes('festival')) return 'Sorties';
    if (s.includes('expo') || s.includes('mus\u00e9e') || s.includes('culture'))   return 'Culture';
    if (s.includes('th\u00e9\u00e2tre') || s.includes('spectacle'))                return 'Culture';
    if (s.includes('sport') || s.includes('running') || s.includes('yoga'))       return 'Sport';
    if (s.includes('nature') || s.includes('jardin') || s.includes('balade'))     return 'Nature';
    if (s.includes('street') || s.includes('art') || s.includes('graffiti'))      return 'Art';
    if (s.includes('food') || s.includes('gastronomie') || s.includes('march\u00e9')) return 'Gastronomie';
    if (s.includes('histoire') || s.includes('patrimoine'))                        return 'Histoire';
    if (s.includes('soir\u00e9e') || s.includes('nuit'))                           return 'Sorties';
    return 'Culture';
}
