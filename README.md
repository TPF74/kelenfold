# Kelenföld átszállás – Kapolcs u.

Saját használatú webalkalmazás: az M4 Kelenföld vasútállomás végállomásán leszállva megmutatja, melyik buszt érdemes elérni a Kapolcs utca felé, élő BKK FUTÁR-adatokból.

## Fájlok

- `index.html` – maga az alkalmazás
- `manifest.webmanifest`, `sw.js`, `icons/` – a telepíthető (kezdőképernyős) működéshez

## Telepítés GitHub Pages-re

1. GitHub-on: **New repository**. Név pl. `kelenfold`. Láthatóság: Public (az ingyenes Pages ehhez kell). Az API-kulcs nincs a fájlokban, csak a telefonod böngészőjében tárolódik.
2. A repóban: **Add file → Upload files**, húzd be a mappa teljes tartalmát (az `icons` mappával együtt), majd **Commit changes**.
3. **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, mappa = `/ (root)`, **Save**.
4. 1–2 perc múlva elérhető: `https://<felhasználónév>.github.io/kelenfold/`
5. Telefonon nyisd meg ezt a címet, majd:
   - Android / Chrome: menü → **Telepítés** vagy **Hozzáadás a kezdőképernyőhöz**
   - iPhone / Safari: Megosztás → **Főképernyőhöz adás**
6. Az első indításkor a Beállításokban add meg az API-kulcsot.

## Frissítés

Új verziónál töltsd fel újra a módosított fájlokat ugyanígy. Az app a következő megnyitáskor a friss változatot tölti be (a saját fájlokat előbb a hálózatról kéri).

## Diagnosztika

Beállítások → **Diagnosztika mentése**. A fájl az API-kulcs nélkül tartalmazza a nyers FUTÁR-válaszokat; ezt kell visszaküldeni a fejlesztéshez.
