# EmTeK CoE - Dynamic Portfolio Website

This project is a modern, single-page portfolio website for the "Electronics & Mobility Technology Center of Entrepreneurship (EmTeK CoE)". It features a dynamic, animated interface with content loaded from a central configuration file. The design incorporates a "glassmorphism" aesthetic with a celestial, animated starfield background.

---

## ✨ Features

* **Dynamic Content:** All text, links, and image paths are loaded from `config.json`, making content updates easy without touching the HTML or JavaScript.
* **Stunning Animations:** Smooth, performant animations powered by the GreenSock Animation Platform (GSAP) for section transitions and entrance effects.
* **Interactive Carousels:** The "Partners," "Startups," "Management," and "Mentors" sections feature touch-friendly, auto-scrolling carousels using Swiper.js.
* **Glassmorphism UI:** A modern, layered design using semi-transparent, blurred backgrounds to create a sense of depth.
* **Animated Starfield Background:** A lightweight, canvas-based animation provides a beautiful and dynamic background without sacrificing performance.
* **Fully Responsive:** The layout is optimized for a seamless experience on all devices, from desktops to mobile phones.
* **Preloader:** A loading spinner ensures that all assets are ready before the main content is displayed, preventing visual glitches.

---

## 🛠️ Technologies & Libraries

* **HTML5:** For the core structure of the website.
* **CSS3:** For custom styling, animations, and the glassmorphism effect.
* **JavaScript (ES6+):** For all dynamic functionality, content loading, and animations.
* **GSAP (GreenSock Animation Platform):** Used for all high-performance animations, including the banner sequence and scroll-triggered section reveals.
* **Swiper.js:** For creating responsive, touch-enabled carousels.
* **Tailwind CSS:** For utility-first CSS classes to structure layouts and elements.
* **Phosphor Icons:** For a clean and consistent icon set.

---

## 📂 Folder Structure

The project follows a clean and organized structure:

```
portfolio/
├── assets/
│   ├── partner1.png
│   └── ... (other local images)
├── app.js             # Main application logic, content loading, animations
├── config.json        # Central configuration for all site content
├── index.html         # Main HTML file
├── starfield.js       # Canvas-based animated starfield background
└── styles.css         # Custom styles, glassmorphism, preloader, etc.
```

---

## 🚀 Setup and Installation

To run this project locally, follow these simple steps:

1.  **Download the Files:** Place all the project files (`index.html`, `styles.css`, `app.js`, etc.) into a single folder.
2.  **Create an `assets` Folder:** Inside the main project folder, create a new folder named `assets` for your local images (like partner logos).
3.  **Use a Live Server:** Due to modern browser security policies (CORS), you cannot run the project by simply opening `index.html` in your browser. You must use a local development server.
    * **Recommended:** If you have Visual Studio Code, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension. Simply right-click on `index.html` and choose "Open with Live Server."
    * **Alternative:** If you have Python installed, navigate to the project directory in your terminal and run:
        ```bash
        python -m http.server
        ```
        Then, open your browser and go to `http://localhost:8000`.

---

## ⚙️ Configuration

All user-facing content can be easily updated in the **`config.json`** file.

### Editing Partner Logos

1.  Place your partner logo images inside the `/assets/` directory.
2.  Open `config.json`.
3.  Find the `partners` section.
4.  Update the `logo` paths to point to your local files. **Important:** Use relative paths (e.g., `assets/partner1.png`) and **do not** use a leading slash (e.g., `/assets/partner1.png`) to ensure they work both locally and in production.

    ```json
    "partners": {
      "title": "Our Esteemed Partners",
      "logos": [
        { "name": "Partner 1", "logo": "assets/partner1.png" },
        { "name": "Partner 2", "logo": "assets/partner2.png" }
      ]
    }
    ```

### Editing Other Content

You can change text, team member names, startup descriptions, social media links, and more by simply editing the corresponding sections in `config.json`. The website will automatically reflect your changes on the next reload.

---
