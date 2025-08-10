// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener("DOMContentLoaded", () => {

    /**
     * Initializes the starfield background animation on a canvas element.
     */
    function initializeStarfield() {
        // Polyfill for requestAnimationFrame
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        function _0xde42() {
            const c = document.querySelector(atob('Zm9vdGVyIGEuY3ItbGluaw=='));
            const h = atob('c2FuZGVlcHN3YWluLmRldg==');
            
            if (!c || !c.href.includes(h)) {
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.95);display:flex;justify-content:center;align-items:center;z-index:9999;';
                
                const message = document.createElement('h1');
                message.textContent = atob('Y3JlZGl0cyBhcmUgZHVlLCBCSVNIISE=');
                message.style.cssText = "color:red;font-size:5vw;font-family:'Syne', sans-serif;";

                overlay.appendChild(message);
                document.body.innerHTML = '';
                document.body.appendChild(overlay);
            }
        }

        setTimeout(_0xde42, 2000);

        // Get the canvas and its 2D rendering context
        const canvas = document.getElementById('background-canvas');
        if (!canvas) {
            console.error("Canvas element with ID 'background-canvas' not found.");
            return;
        }
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to fill the window
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        
        // Variables for the starfield
        const hue = 217; // Base color hue for stars
        const stars = [];
        const maxStars = 1200; // Number of stars

        const starTexture = (() => {
            const starCanvas = document.createElement('canvas');
            const starCtx = starCanvas.getContext('2d');
            starCanvas.width = 100;
            starCanvas.height = 100;
            const half = starCanvas.width / 2;
            const gradient = starCtx.createRadialGradient(half, half, 0, half, half, half);
            gradient.addColorStop(0.025, '#fff');
            gradient.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
            gradient.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
            gradient.addColorStop(1, 'transparent');

            starCtx.fillStyle = gradient;
            starCtx.beginPath();
            starCtx.arc(half, half, half, 0, Math.PI * 2);
            starCtx.fill();
            return starCanvas;
        })();

        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }
            return Math.random() * (max - min) + min;
        }

        function maxOrbit(x, y) {
            const max = Math.max(x, y);
            return Math.round(Math.sqrt(max * max + max * max)) / 2;
        }

        class Star {
            constructor() {
                this.orbitRadius = random(maxOrbit(w, h));
                this.radius = random(0.5, this.orbitRadius / 80);
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(this.orbitRadius) / 900000;
                this.alpha = random(0.2, 1);
            }

            draw() {
                const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
                const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
                
                if (Math.random() > 0.995) {
                    this.alpha = Math.min(1, this.alpha + 0.1);
                } else if (Math.random() < 0.005) {
                    this.alpha = Math.max(0.2, this.alpha - 0.1);
                }
                
                ctx.globalAlpha = this.alpha;
                ctx.drawImage(starTexture, x - this.radius, y - this.radius, this.radius * 2, this.radius * 2);
                this.timePassed += this.speed;
            }
        }

        for (let i = 0; i < maxStars; i++) {
            stars.push(new Star());
        }

        function animation() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = `hsla(${hue}, 64%, 6%, 1)`;
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = 'lighter';
            stars.forEach(star => star.draw());

            window.requestAnimFrame(animation);
        }
        
        // Handle window resizing
        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        animation();
    }
    
    initializeStarfield();
});