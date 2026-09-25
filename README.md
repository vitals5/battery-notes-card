# 🔋 Battery Notes Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/github/v/release/vitals5/battery-notes-card?style=for-the-badge)](https://github.com/vitals5/battery-notes-card/releases)
[![License](https://img.shields.io/github/license/vitals5/battery-notes-card?style=for-the-badge)](LICENSE)

Eine moderne, hochgradig konfigurierbare **Home Assistant Dashboard Card** (Lovelace) als Gegenstück zur beliebten [Battery Notes](https://github.com/andrew-codechimp/HA-Battery-Notes) Integration von Andrew CodeChimp.

Die Karte aggregiert und visualisiert automatisch alle mit Battery Notes gepflegten Geräte in einer übersichtlichen, interaktiven Tabelle – inklusive Batteriestand (farbiger Balken), Batterietyp (z. B. `CR2032`, `2x AAA`), Datum des letzten Batteriewechsels, Notizen und einem **Direkt-Aktionsbutton zum Erfassen des Batteriewechsels**.

---

*English version available below.*

---

## ✨ Features

- 🔍 **Automatische Erkennung**: Findet alle Geräte und Entitäten, die mit Battery Notes verknüpft sind, ohne dass jedes Gerät manuell konfiguriert werden muss.
- 📊 **Tabellarische Übersicht**: Zeigt Gerätename, Batteriestand (Prozent & visueller Farbbalken), Batterietyp/-anzahl, letzter Wechsel, Status und Notiz.
- 🔄 **Direkter Batteriewechsel**: Ein Klick auf den Aktions-Button führt direkt `battery_notes.set_battery_replaced` aus und quittiert den Wechsel mit visueller Rückmeldung.
- 🔎 **Live-Suche & Schnellfilter**: Filtere in Echtzeit nach Gerätenamen, Batterietyp (z. B. `"CR2032"` eingeben, um alle passenden Geräte zu sehen) oder schalte per Klick auf *Alle*, *Niedrig (< 20%)* oder *Kritisch (< 10%)*.
- ↕️ **Sortierbare Spalten**: Durch Klick auf Spaltenüberschriften nach Batteriestand, Name, Typ oder letztem Wechsel auf- oder absteigend sortieren.
- 🎨 **Visueller UI-Editor**: Vollständig über die Home Assistant Benutzeroberfläche konfigurierbar (kein YAML-Zwang).
- 📱 **Responsiv durch Container Queries**: Passt sich automatisch schmalen Dashboards, Seitenleisten und Mobilgeräten an.
- 🌐 **Mehrsprachig**: Deutsche und englische Texte werden automatisch anhand deiner Home Assistant Spracheinstellung geladen.

---

## 📦 Installation via HACS (Empfohlen)

### Schritt 1: Benutzerdefiniertes Repository hinzufügen
1. Öffne **HACS** in deinem Home Assistant.
2. Klicke oben rechts auf das Dreipunkt-Menü (**⋮**) und wähle **Benutzerdefinierte Repositories** (*Custom repositories*).
3. Gib folgende Repository-URL ein:
   ```text
   https://github.com/vitals5/battery-notes-card
   ```
4. Wähle als Typ **Dashboard** (oder *Lovelace*).
5. Klicke auf **Hinzufügen** (*Add*).

### Schritt 2: Karte herunterladen
1. Suche in HACS nach **Battery Notes Card**.
2. Klicke auf **Herunterladen** (*Download*).
3. Lade nach Aufforderung das Dashboard im Browser neu (oder drücke `Strg + F5`).

---

## 🛠️ Manuelle Installation

1. Lade die Datei `battery-notes-card.js` aus den [Releases](https://github.com/vitals5/battery-notes-card/releases) oder dem `dist/`-Verzeichnis herunter.
2. Kopiere die Datei in dein Home Assistant Konfigurationsverzeichnis unter `config/www/battery-notes-card.js`.
3. Gehe in Home Assistant zu **Einstellungen** ➔ **Dashboards** ➔ **Ressourcen** (Dreipunkt-Menü oben rechts) und füge eine neue Ressource hinzu:
   - **URL:** `/local/battery-notes-card.js?v=1.0.0`
   - **Ressourcentyp:** `JavaScript-Modul`
4. Lade dein Dashboard neu.

---

## 🚀 Verwendung

### Über den visuellen Editor
1. Klicke auf deinem Dashboard auf **Dashboard bearbeiten** ➔ **Karte hinzufügen**.
2. Suche nach **Battery Notes Card**.
3. Passe Titel, sichtbare Spalten, Sortierung und Filter im visuellen Editor nach deinen Wünschen an.

### Über YAML

#### 1. Standardkonfiguration (Automatische Erkennung aller Geräte)
```yaml
type: custom:battery-notes-card
title: Batteriestände
```

#### 2. Warn-Karte: Nur schwache Batterien anzeigen
```yaml
type: custom:battery-notes-card
title: Batteriewechsel erforderlich
filter_low_only: true
show_filters: false
columns:
  name: true
  battery: true
  type: true
  last_replaced: true
  actions: true
```

#### 3. Kompakte Ansicht (ideal für Seitenleisten)
```yaml
type: custom:battery-notes-card
title: Batterien
compact: true
show_summary: false
show_search: false
sort_by: battery
sort_direction: asc
columns:
  name: true
  battery: true
  type: true
  last_replaced: false
  actions: true
```

#### 4. Erweiterte Konfiguration mit allen Optionen
```yaml
type: custom:battery-notes-card
title: Alle Batterien & Notizen
icon: mdi:battery-heart-variant
show_header: true
show_summary: true
show_search: true
show_filters: true
compact: false
confirm_replace: true
sort_by: battery
sort_direction: asc
filter_threshold: 20
hide_unavailable: false
max_rows: 25
exclude_entities:
  - sensor.test_sensor_battery_type
columns:
  name: true
  battery: true
  type: true
  last_replaced: true
  status: true
  note: true
  actions: true
```

---

## ⚙️ Konfigurationsoptionen (Configuration Reference)

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `type` | string | **Erforderlich** | `custom:battery-notes-card` |
| `title` | string | `Batteriestände` | Titel der Karte |
| `icon` | string | `mdi:battery-heart-variant` | MDI-Icon im Kartenkopf |
| `sort_by` | string | `battery` | Standardsortierung: `battery`, `name`, `type`, `last_replaced`, `status` |
| `sort_direction`| string | `asc` | Sortierrichtung: `asc` (aufsteigend) oder `desc` (absteigend) |
| `show_header` | boolean | `true` | Kopfzeile mit Titel und Icon anzeigen |
| `show_summary` | boolean | `true` | Zähler-Badges (Gesamt, Niedrig, In Ordnung) anzeigen |
| `show_search` | boolean | `true` | Interaktive Suchleiste anzeigen |
| `show_filters` | boolean | `true` | Schnellfilter-Pills (*Alle*, *Niedrig*, *Kritisch*) anzeigen |
| `compact` | boolean | `false` | Kompaktere Polsterung und Schriftgröße aktivieren |
| `confirm_replace` | boolean | `true` | Sicherheitsabfrage vor dem Markieren als gewechselt |
| `filter_low_only`| boolean | `false` | Nur Geräte mit niedrigem Batteriestand anzeigen |
| `filter_threshold`| number | `20` | Schwellenwert in % für "Niedriger Batteriestand" |
| `hide_unavailable`| boolean | `false` | Nicht verfügbare Entitäten ausblenden |
| `max_rows` | number | - | Maximale Anzahl an angezeigten Tabellenzeilen |
| `exclude_entities`| list | `[]` | Liste von Entitäten oder Geräten, die ignoriert werden sollen |
| `columns` | object | *(siehe unten)* | Steuert die Sichtbarkeit einzelner Spalten |

### Spalten-Konfiguration (`columns`)

| Spalte | Standard | Beschreibung |
| :--- | :--- | :--- |
| `columns.name` | `true` | Gerätename (Klick öffnet More-Info-Dialog) |
| `columns.battery` | `true` | Batteriestand (Prozent, Icon und Farbbalken) |
| `columns.type` | `true` | Batterietyp & Menge (z. B. `2x AAA`, `CR2032`) |
| `columns.last_replaced` | `true` | Datum des letzten Wechsels (relativ formatiert) |
| `columns.status` | `true` | Status-Badge (*OK* oder *Niedrig*) |
| `columns.note` | `false` | Notiz-Text aus Battery Notes |
| `columns.actions` | `true` | Aktionsbutton "Gewechselt" |

---

## 🤝 Danksagung & Verwandte Projekte

Diese Karte wurde speziell als Ergänzung zur Integration [Battery Notes](https://github.com/andrew-codechimp/HA-Battery-Notes) von [@Andrew-CodeChimp](https://github.com/andrew-codechimp) entwickelt. Bitte installiere zuerst die Integration via HACS, damit die benötigten Batterie-Informationen und Entitäten in Home Assistant verfügbar sind.

---

## 📄 Lizenz

Dieses Projekt steht unter der [MIT Lizenz](LICENSE).
