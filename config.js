// Hier kommt deine Firebase-Konfiguration hinein.
// Firebase-Konsole -> Projekteinstellungen (Zahnrad) -> "Meine Apps" -> Web-App -> "SDK-Einrichtung und -Konfiguration" -> "Konfiguration".
// Ersetze den ganzen Block unten durch deinen. Solange hier "DEIN_API_KEY" steht, läuft die App im Demo-Modus (nur auf diesem Gerät).
// Diese Werte sind nicht geheim. Geschützt werden deine Daten durch die Firestore-Regeln.

export const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN-PROJEKT.firebaseapp.com",
  projectId: "DEIN-PROJEKT",
  storageBucket: "DEIN-PROJEKT.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000",
  // Nur ändern, wenn du beim Anlegen der Firestore-Datenbank eine eigene Datenbank-ID eingetragen hast:
  databaseId: "(default)"
};
