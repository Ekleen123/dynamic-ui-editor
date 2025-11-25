# 🎨 Dynamic UI Editor for Customizable Designs Version B (Branch 2 different update)


A **React + Vite + TailwindCSS** based **Dynamic UI Editor** that allows users to customize and live-preview UI components in real time — typography, layout, color, spacing, buttons, borders, and more — all without touching code.

🚀 **Live Demo:** [https://dynamic-ui-editor-lemon.vercel.app/](https://dynamic-ui-editor-lemon.vercel.app/)

---

## 🧩 **Project Overview**

This project simulates real-world design customization scenarios often seen in dashboards or SaaS platforms — where clients and designers request quick UI tweaks.  
The editor allows modifying a pre-built Figma-based UI dynamically, giving instant visual feedback.

Users can:
- Adjust typography, spacing, shadows, colors, and corner radii.
- Change layout structure between two designs.
- Modify gallery spacing and image styles.
- Switch between desktop and mobile previews.
- Export configurations as JSON (optional).

---

## 🛠️ **Tech Stack**

| Layer | Technology |
|-------|-------------|
| Frontend | React 18 (Vite) |
| Styling | Tailwind CSS |
| State Management | React Hooks (useState, useEffect) |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

## ⚙️ **Core Features**

| Category | Customizable Properties |
|-----------|--------------------------|
| **Typography** | Font Family (Roboto, Inter, Poppins), Font Weight (400–700), Font Size (10–60px) |
| **Buttons** | Border Radius, Shadow (none → large), Alignment (left, center, right), Background & Text Color |
| **Galleries** | Alignment (grid-left, center, right), Image Spacing, Border Radius |
| **General Layout** | Card Corner Radius, Container Padding, Section Background Color |
| **Stroke / Border** | Stroke Color, Stroke Weight |
| **Layouts** | Switch between Layout A and Layout B |
| **Live Preview** | Real-time updates to all properties |
| **Responsive** | Mobile layout auto-adjusts gallery columns to 2 |

---
##  Features

- 🎛️ Real-time design editor with live preview  
- 🧠 JSON export/import for UI configurations  
- 🧩 Switch between **layout styles** (A & B)  
- 📱 Responsive previews — **Desktop** and **Mobile** modes  
- 🖋️ Customize:
  - Font family, weight, and size  
  - Button radius, color, shadow, and alignment  
  - Gallery alignment, spacing, and swatch size  
  - Card radius, background, and border styling  

---

## ⚙️ Setup and Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ekleen123/dynamic-ui-editor.git
cd dynamic-ui-editor
```

Install dependencies:
```
npm install
```

Start the development server:
```
npm run dev

```
Build for production:
```
npm run build

```
Preview the production build:
```
npm run preview
```
## 💾 Export & Import

Export JSON — Click the "Export JSON" button to download your UI configuration.

Import JSON — Upload a previously saved configuration file to restore your settings instantly.

