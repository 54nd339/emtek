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
        let count = 0;
        const maxStars = 1200; // Number of stars

        // Create a separate canvas for a single star's gradient texture
        const canvas2 = document.createElement('canvas');
        const ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        const half = canvas2.width / 2;
        const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#fff');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        // Helper function to generate a random number within a range
        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }
            if (min > max) {
                [min, max] = [max, min]; // Swap variables
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Helper function to calculate the maximum orbit radius
        function maxOrbit(x, y) {
            const max = Math.max(x, y);
            const diameter = Math.round(Math.sqrt(max * max + max * max));
            return diameter / 2;
        }

        // Star constructor
        const Star = function() {
            this.orbitRadius = random(maxOrbit(w, h));
            this.radius = random(60, this.orbitRadius) / 12;
            this.orbitX = w / 2;
            this.orbitY = h / 2;
            this.timePassed = random(0, maxStars);
            this.speed = random(this.orbitRadius) / 900000; // Adjusted speed
            this.alpha = random(2, 10) / 10;
            stars.push(this);
        };

        // Method to draw a star
        Star.prototype.draw = function() {
            const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
            const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
            const twinkle = random(10);

            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05;
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05;
            }

            ctx.globalAlpha = this.alpha;
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
            this.timePassed += this.speed;
        };

        // Create all the stars
        for (let i = 0; i < maxStars; i++) {
            new Star();
        }

        // The animation loop
        function animation() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < stars.length; i++) {
                stars[i].draw();
            }

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
