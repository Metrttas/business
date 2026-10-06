# Dein Business: Websites, Shops, Chatbots & Automatisierungen auf Fiverr

**Das Modell:** Du verkaufst digitale Dienstleistungen auf Fiverr. Kunden kommen über die Plattform
zu dir, alles läuft schriftlich, ohne Telefon und ohne persönliche Treffen. Die eigentliche Arbeit
(Design, Code, Texte, Kundennachrichten) machen wir zusammen, und das meiste davon übernehme ich.

---

## Was ist hier drin?

```
README.md                    ← diese Anleitung (fang hier an)
fiverr/
  profil.md                  ← Texte für dein Verkäuferprofil
  nachrichten-vorlagen.md    ← fertige Antworten für alle Kundensituationen
  gigs/
    01-landing-page.md       ← Gig 1: Landing Page      ($79–299)
    02-business-website.md   ← Gig 2: Firmen-Website     ($149–549)
    03-shopify-store.md      ← Gig 3: Shopify-Shop       ($99–499)
    04-ai-chatbot.md         ← Gig 4: KI-Chatbot          ($99–449)
    05-automation.md         ← Gig 5: Automatisierungen   ($59–349)
  gig-bilder/                ← fertige Galerie-Bilder (1280×769) zum Hochladen
portfolio/
  index.html                 ← Portfolio-Übersicht
  demos/                     ← 5 Demo-Projekte (fiktive Firmen, klar als Demo markiert)
scripts/
  make-gig-images.js         ← erzeugt Screenshots und Gig-Bilder neu
```

---

## Ehrliche Erwartungen

| Zeitraum | Realistisch | Warum |
|---|---|---|
| Monat 1 | 0–5 Aufträge, 0–500 € | Ohne Bewertungen wirst du kaum gefunden. Das ist die schwerste Phase. |
| Monat 2–3 | 50–150 €/Tag | Erste Bewertungen sind da, Fiverr zeigt dich öfter an. |
| Ab Monat 4–6 | 300 €+/Tag möglich | Wenn du dranbleibst, schnell lieferst und die Preise erhöhst. |

Fiverr behält **20 %** von jedem Auftrag. Das Geld wird erst nach einer Wartezeit freigegeben
(bei neuen Verkäufern ca. 14 Tage nach Abschluss).

**Was den Unterschied macht:** schnell antworten, pünktlich liefern, gute Bewertungen sammeln.
Nichts davon erfordert Reden.

---

## Bevor du startest: Checkliste

- [ ] **Mindestens 18 Jahre alt.** Das verlangt Fiverr.
- [ ] **Gewerbe anmelden** beim Gewerbeamt deiner Stadt (oft online, ca. 20–60 €). Webdesign ist meistens ein Gewerbe.
- [ ] **Finanzamt:** Danach kommt der „Fragebogen zur steuerlichen Erfassung“ (über ELSTER).
      Für den Anfang passt meist die **Kleinunternehmerregelung**: Bis 25.000 € Umsatz im Vorjahr
      und 100.000 € im laufenden Jahr fällt keine Umsatzsteuer an.
- [ ] **Alle Einnahmen angeben.** Fiverr meldet Verkäufer-Einnahmen an die Steuerbehörden (EU-Regel „DAC7“).
- [ ] **Auszahlung:** PayPal oder Bankkonto bereithalten.
- [ ] **Fiverr-App** aufs Handy, damit du Anfragen sofort siehst.

> Das ist keine Steuer- oder Rechtsberatung. Bei Unsicherheit kostet eine Erstberatung beim
> Steuerberater wenig und erspart Ärger.

---

## Schritt für Schritt

### Schritt 1: Fiverr-Konto anlegen
1. Auf fiverr.com registrieren und „Become a Seller“ wählen.
2. ⚠️ **Benutzername gut überlegen**, man kann ihn später nicht mehr ändern (Tipps in `fiverr/profil.md`).
3. Identität verifizieren, wenn Fiverr danach fragt.

### Schritt 2: Profil ausfüllen
Texte aus [`fiverr/profil.md`](fiverr/profil.md) kopieren: Titel, Beschreibung, Sprachen, Skills.

### Schritt 3: Gigs anlegen
Für jedes Gig die Datei in [`fiverr/gigs/`](fiverr/gigs/) öffnen und Feld für Feld übernehmen:
Titel → Kategorie → Suchtags → Pakete → Extras → Beschreibung → FAQ → Anforderungen → Galerie.

**Empfohlene Reihenfolge** (nach dem Anteil, den ich selbst erledigen kann):
1. **Landing Page:** baue ich fast komplett
2. **Business-Website:** baue ich fast komplett
3. **KI-Chatbot:** ich baue alles, du richtest einmal einen kostenlosen Server nach Anleitung ein
4. **Automatisierungen:** ich plane und baue, du klickst nach Anleitung im Account des Kunden
5. **Shopify:** du klickst am meisten selbst, ich gebe genaue Anleitungen

Du kannst trotzdem alle 5 gleichzeitig starten. Bei Fiverr können neue Verkäufer nur eine begrenzte
Zahl Gigs haben, 5 passen aber.

**Galerie:** Die Bilder aus `fiverr/gig-bilder/` hochladen. Zu jedem Gig gehören 2 Bilder
(z. B. `01-landing-page-1.png` als Titelbild und `01-landing-page-2.png`).

### Schritt 4: Portfolio online stellen (optional, aber hilfreich)
Damit kannst du Kunden die Demos live zeigen, vor allem den Chatbot zum Ausprobieren.
1. Kostenloses Konto bei **Netlify** anlegen.
2. Auf `app.netlify.com/drop` den ganzen Ordner `portfolio/` ins Fenster ziehen.
3. Du bekommst einen Link wie `dein-name.netlify.app`. Fertig.

Auf Fiverr selbst nutzt du die **Portfolio-Funktion** im Profil (Bilder + Beschreibung).

### Schritt 5: Täglich (10–20 Minuten)
- In der App online sein und Nachrichten **innerhalb von 1–2 Stunden** beantworten.
- Laufende Aufträge vorantreiben (siehe unten).
- Nach den ersten 5–10 Bewertungen: **Preise erhöhen** (Zielpreise stehen in jeder Gig-Datei).

---

## So arbeiten wir bei einem Auftrag zusammen

```
Kunde schreibt dir auf Fiverr
        │  du kopierst mir die Nachricht: „Kunde schreibt: …“
        ▼
Ich schreibe die Antwort / das Angebot ──► du schickst es ab
        │
Kunde bestellt und beantwortet die Anforderungen
        │  du gibst mir Anforderungen + Dateien (Logo, Texte, Bilder)
        ▼
Ich baue das Projekt in kunden/<kundenname>/
        │
Vorschau-Link (Netlify Drop) ──► du schickst ihn mit Vorlage 6
        │
Änderungswünsche ──► zurück zu mir ──► neue Version
        │
Lieferung: ZIP + Anleitung ──► „Deliver Now“ in Fiverr (Vorlage 7)
```

**Pro Auftrag kostet dich das meist 30–90 Minuten**: Nachrichten kopieren, Dateien hochladen,
liefern. Bei Shopify und Automatisierungen ist es etwas mehr, weil du selbst klicken musst.

> 🔒 Halte dieses Repository **privat**, sobald Kundendaten (Texte, Logos, E-Mails) hier liegen.

---

## Fiverr-Regeln: wichtig, sonst droht die Sperre

- **Alles über Fiverr:** keine E-Mail-Adressen, Telefonnummern, WhatsApp oder Zahlungen außerhalb (Vorlage 10).
- **Keine gekauften oder getauschten Bewertungen.** Auch nicht „unter Freunden“.
- **Nicht um 5 Sterne bitten** und keine Rabatte für Bewertungen anbieten. „Honest feedback“ ist okay.
- **Nur ein Verkäuferkonto.**
- **Ehrlich bleiben:** Die Demos sind Konzepte für erfundene Firmen und als solche markiert.
  Gib sie nie als echte Kundenprojekte aus. Wenn Fiverr beim Anlegen nach KI-Nutzung fragt, antworte wahrheitsgemäß.

---

## Wie es weitergeht, wenn es läuft

1. **Preise erhöhen:** nach 5–10 Bewertungen, dann alle paar Wochen weiter.
2. **Pflege-Abos verkaufen** ($39–59 im Monat): Damit baust du wiederkehrendes Einkommen auf.
   50 Abos à $50 sind $2.500 im Monat, ohne neue Kunden zu suchen.
3. **Upwork dazunehmen:** größere Aufträge, aber Kunden wollen dort öfter telefonieren.
4. **Eigenes Produkt:** Vorlagen oder ein kleines Tool, das ohne Kunden verkauft wird. Das ist langfristig.
