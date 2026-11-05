# Mein Vorrat

Web-App für Kühlschrank, Gefrierschrank und Speisekammer: Live-Barcode-Scanner, Produktnamen von Open Food Facts, MHD und Menge, Sync zwischen allen Geräten über Firebase.

## Einrichtung (einmalig, ca. 15 Minuten, kostenlos)

### 1. Firebase-Projekt anlegen
1. Öffne https://console.firebase.google.com und melde dich mit einem Google-Konto an.
2. „Projekt erstellen“ (oder „Firebase-Projekt erstellen“), Name z. B. `mein-vorrat`.
3. Google Analytics brauchst du nicht, du kannst es ausschalten.

Hinweis: Firebase hat sein Menü umgebaut. Die Bereiche heißen jetzt **Security** (Sicherheit) und **Databases & Storage** (Datenbanken und Speicher). Auf Deutsch können die Bezeichnungen leicht abweichen.

### 2. Anmeldung per E-Mail einschalten
1. Links: **Security → Authentication** → „Jetzt starten“ bzw. „Get started“.
2. Reiter **Sign-in method** (Anmeldemethode) → **E-Mail/Passwort** → aktivieren → **Speichern**.

### 3. Datenbank anlegen
1. Links: **Databases & Storage → Firestore** → **Create database** bzw. **Add database**.
2. Falls gefragt: **Standard edition** wählen (nicht Enterprise).
3. Falls nach einer **Database ID** gefragt wird: leer lassen bzw. `(default)` stehen lassen. Trägst du einen eigenen Namen ein, musst du ihn in `config.js` bei `databaseId` eintragen.
4. Standort in Europa wählen (z. B. `europe-west3` Frankfurt). Der Standort lässt sich später nicht ändern.
5. Startmodus: **Production mode** (Produktionsmodus) → **Create**.
6. In der Datenbank den Reiter **Rules** (Regeln) öffnen, alles löschen und den Inhalt der Datei `firestore.rules` einfügen → **Publish** (Veröffentlichen).

### 4. Web-App registrieren und config.js ausfüllen
1. Projektübersicht → Symbol **`</>`** (Web) → Name `Vorrat` → registrieren. „Firebase Hosting“ nicht ankreuzen.
2. Firebase zeigt einen Block `const firebaseConfig = { apiKey: ..., ... }`.
3. Öffne `config.js` und ersetze den Block dort durch deinen (nur den Teil in den geschweiften Klammern).

### 5. Auf GitHub Pages veröffentlichen
1. Konto auf https://github.com anlegen (kostenlos).
2. Oben rechts **+ → New repository**, Name `vorrat`, **Public** → **Create repository**.
3. Link **„uploading an existing file“** → alle Dateien aus diesem Ordner hineinziehen → **Commit changes**.
4. **Settings → Pages** → „Deploy from a branch“, Branch **main**, Ordner **/ (root)** → **Save**.
5. Nach 1–2 Minuten läuft die App unter `https://DEIN-NAME.github.io/vorrat/`.

### 6. Adresse in Firebase freigeben
Firebase → **Security → Authentication → Settings** (Einstellungen) → **Authorized domains** (Autorisierte Domains) → **Add domain** → `DEIN-NAME.github.io`.

### 7. Aufs Handy
- **Android (Chrome):** Adresse öffnen → Menü ⋮ → „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.
- **iPhone (Safari):** Adresse öffnen → Teilen-Symbol → „Zum Home-Bildschirm“.
- Beim ersten Start „Neues Konto anlegen“. Auf jedem weiteren Gerät mit derselben E-Mail anmelden.
- Wer den Vorrat mitbenutzen soll (z. B. Partnerin oder Partner), meldet sich mit demselben Konto an.

### Optional: Fremde Anmeldungen sperren
Die Adresse ist öffentlich. Fremde sehen deine Daten nie (das verhindern die Regeln), könnten aber eigene Konten anlegen. Wenn dein Konto steht: Firebase → **Authentication → Einstellungen → Nutzeraktionen** → „Registrierung aktivieren“ ausschalten.

## Gut zu wissen
- Die Werte in `config.js` sind nicht geheim. Geschützt werden die Daten durch die Firestore-Regeln.
- Die App funktioniert auch offline und gleicht sich ab, sobald wieder Netz da ist.
- Solange in `config.js` noch `DEIN_API_KEY` steht, läuft die App im Demo-Modus (Daten nur im Browser).
- Backup: Personen-Symbol oben rechts → „Backup herunterladen“.
- Nach einer Änderung an den Dateien in `sw.js` die Zahl bei `CACHE = "vorrat-v1"` erhöhen, damit alle Geräte die neue Version laden.
