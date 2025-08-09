// src/config/navigation.ts
export const navigationItems = [
  { label: "Home", url: "/" },
  { label: "ToDo", url: "/todo" },
  { label: "Notes", url: "/notes" }
];

// Für Rückwärtskompatibilität
export const pages = navigationItems.map(item => item.label);

export const settings = [
  "Profile", 
  "Account", 
  "Dashboard", 
  "Logout"
  // "noch zu implementieren"
];