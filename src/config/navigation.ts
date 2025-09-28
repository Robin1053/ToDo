// src/config/navigation.ts

// Hauptnavigation
export const navigationItems = [
  { label: "Home",    url: "/"               },
  { label: "ToDo",    url: "/todo"           },
  { label: "Notes",   url: "/notes"          },
];

// Menü für Nutzer ohne Session
export const MenuItemsNoSession = [
  { label: "Login",     url: "/auth/signin" },
  { label: "Register",  url: "/auth/signup" },
];

// Menü für eingeloggte Nutzer
export const HeaderMenuItemsSession = [
  { label: "Profile",   url: "/profile"     },
  { label: "Dashboard", url: "/dashboard"   },
  { label: "Logout"                         },
];

export const pages = navigationItems.map(item => item.label);