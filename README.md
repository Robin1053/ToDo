# Todo App

Eine moderne, responsive Todo-Anwendung gebaut mit Next.js, React und Material-UI (MUI).

## 🚀 Features

- **Responsive Design**: Funktioniert perfekt auf Desktop und Mobile
- **Modern UI**: Saubere Benutzeroberfläche mit Material-UI Komponenten
- **TypeScript**: Vollständig typisiert für bessere Entwicklungserfahrung
- **Next.js 15**: Neueste Features und Performance-Optimierungen
- **Custom Hooks**: Wiederverwendbare Logik für bessere Code-Organisation
- **Modulare Komponenten**: Saubere Trennung von UI-Komponenten

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15.4.5
- **UI Framework**: React 19.1.0
- **UI Komponenten**: Material-UI (MUI) v7.3.1
- **Styling**: TailwindCSS v4 + Styled Components
- **Sprache**: TypeScript 5
- **Icons**: Material-UI Icons
- **Fonts**: Google Fonts (Roboto, Sour Gummy, Pacifico)

## 📦 Installation

### Voraussetzungen
- Node.js 18+ 
- npm, yarn, pnpm oder bun

### Setup

1. **Repository klonen**
```bash
git clone https://github.com/Robin1053/ToDo
cd todo-react
```

2. **Dependencies installieren**
```bash
npm install
# oder
yarn install
# oder
pnpm install
# oder
bun install
```

3. **Entwicklungsserver starten**
```bash
npm run dev
# oder
yarn dev
# oder
pnpm dev
# oder
bun dev
```

4. **Anwendung öffnen**
   
   Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

## 🏗️ Projektstruktur

```
src/
├── app/
│   ├── globals.css          # Globale Styles
│   ├── layout.tsx           # Root Layout
│   └── page.tsx             # Hauptseite
├── components/
│   └── header/
│       ├── header.tsx       # Haupt-Header Komponente
│       ├── headerLogo.tsx   # Logo & Mobile Menu
│       └── ProfileMenu.tsx  # Benutzer-Profil Menu
├── config/
│   └── navigation.ts        # Navigation Konfiguration
└── hooks/
    └── useMenuHandlers.ts   # Custom Hook für Menu-Logik
```

## 🎨 Komponenten-Architektur

### Header-System
- **Header.tsx**: Haupt-Container mit AppBar und Layout
- **HeaderLogo.tsx**: Responsive Logo und Mobile Navigation
- **ProfileMenu.tsx**: Benutzer-Avatar und Settings Menu

### Custom Hooks
- **useMenuHandlers**: Zentrale State-Verwaltung für alle Menus
- Vermeidet Code-Duplikation zwischen Komponenten

### Konfiguration
- **navigation.ts**: Zentrale Definition von Navigation-Items und Settings
- Einfach erweiterbar für neue Seiten

## 🔧 Konfiguration

### Navigation anpassen

Bearbeite `src/config/navigation.ts`:

```typescript
export const pages = ["Home", "ToDo", "Notes", "Deine Neue Seite"];
export const settings = ["Profile", "Account", "Dashboard", "Logout"];
```

### Farben ändern

In `src/components/header/header.tsx`:

```typescript
<AppBar position="static" sx={{ backgroundColor: "deine-farbe", color: "text-farbe" }}>
```

### Fonts anpassen

In `src/app/layout.tsx` kannst du die Google Fonts ändern.

## 📱 Responsive Design

Die Anwendung passt sich automatisch verschiedenen Bildschirmgrößen an:

- **Desktop (md+)**: Logo links, Navigation mittig, Profil rechts
- **Mobile (xs-sm)**: Hamburger Menu links, Logo mittig, Profil rechts

## 🚧 Entwicklung

### Verfügbare Scripts

```bash
npm run dev      # Entwicklungsserver mit Turbopack
npm run build    # Production Build erstellen
npm run start    # Production Server starten
npm run lint     # Code Linting
```

### Code-Qualität

- **TypeScript**: Vollständige Typisierung
- **ESLint**: Code-Qualität und Konsistenz
- **Prettier**: Automatische Code-Formatierung (empfohlen)

## 🔮 Geplante Features

- [ ] Todo CRUD Funktionalität
- [ ] Notizen-System
- [ ] Benutzer-Authentifizierung (NextAuth.js)
- [ ] Firebase Integration
- [ ] Drag & Drop für Todos
- [ ] Dark Mode Toggle
- [ ] PWA Funktionalität

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushe zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt steht unter der MIT Lizenz - siehe [LICENSE](LICENSE) Datei für Details.

## 📞 Kontakt

Bei Fragen oder Problemen öffne gerne ein Issue im Repository.

---

**Happy Coding! 🎉**