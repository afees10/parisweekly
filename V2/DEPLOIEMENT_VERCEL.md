# Guide de Déploiement Vercel - ParcoursParis (Mis à jour)

## Problème actuel : 404 NOT_FOUND

Si tu as toujours l'erreur 404 après avoir poussé, c'est presque toujours à cause des réglages dans Vercel.

## Configuration exacte à mettre dans Vercel

Va dans ton projet → **Settings** → **General** → **Build & Development Settings**

Règle comme ceci :

- **Framework Preset** : `Other`
- **Root Directory** : **Laisser VIDE** (supprime le `./` si présent !)
- **Build Command** : Laisser **VIDE**
- **Output Directory** : `.` (juste un point)
- **Install Command** : Laisser **VIDE**

Puis clique sur **Save**.

## Après avoir sauvegardé

1. Va dans l'onglet **Deployments**
2. Clique sur les 3 points à côté du dernier déploiement
3. Clique sur **Redeploy**

## Analyse du log que tu as envoyé

Le log montre :
```
Running "vercel build"
Vercel CLI 54.4.1
```

**C’est le problème.** Vercel est en train d’essayer de lancer un build (via `vercel build`), alors que ton site est 100% statique (juste un `index.html`).

### Solution prioritaire (à faire maintenant)

Va dans **Settings → General → Build & Development Settings** et mets :

- **Framework Preset** : Other
- **Root Directory** : (vide) ou `./`
- **Build Command** : **(vide)** ← vide complètement
- **Output Directory** : `.`
- **Install Command** : **(vide)** ← vide complètement

Puis **Save**, et fais un **Redeploy** sur le dernier commit.

---

## Si ça ne marche toujours pas

1. Supprime le projet actuel sur Vercel
2. Recommence l'import depuis GitHub
3. Sur l'écran d'import, mets exactement :
   - Framework Preset : Other
   - Root Directory : (vide)
   - Build Command : (vide)
   - Output Directory : .
   - Install Command : (vide)

## Fichier vercel.json recommandé

Le fichier `vercel.json` dans le repo doit contenir :

```json
{
  "outputDirectory": ".",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

Dernière mise à jour : 28 mai 2026
