
// src/config/navigation.ts
export const navigationItems = [
  { label: "Home", url: "/" },
  { label: "ToDo", url: "/todo" },
  { label: "Notes", url: "/notes" }
];

export const MenuItemsNoSession = [
  { label: "Login", url: "/auth/signin" },
  { label: "Register", url: "/auth/signup" },
]
export const HeaderMenuItemsSession = [
  { label: "Profile", url: "/Profile" },
  { label: "Dashboard", url: "/auth/register" },
  { label: "Logout", url: "/auth/logout" },
]

// Für Rückwärtskompatibilität
export const pages = navigationItems.map(item => item.label);

export const SettingsSession = [
  "Profile", 
  "Dashboard", 
  "Logout"
  // "noch zu implementieren"
];

export const SettingsNoSession = [
  "Login", 
  "Register"
  // "noch zu implementieren"
];