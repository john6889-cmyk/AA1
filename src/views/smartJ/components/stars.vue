<template>
  <div id="stars" style="height: 100vh;position: absolute;left: 0;top:0;width: 100%; background: url('../assets/img/背景.png') no-repeat;
  background-size: 100% 100%;">
    <canvas id="canvasStar"></canvas>
  </div>
</template>

<script>

    export default {
        name: "stars",
        mounted() {
            let canvas = document.getElementById('canvasStar');
            let ctx = canvas.getContext('2d');
            let w = canvas.width = document.getElementById('stars').offsetWidth;
            let h = canvas.height = document.getElementById('stars').offsetHeight;
            let hue = 217;
            let stars = [];
            let count = 0;
            let maxStars = 500;
            // Cache gradient
            let canvas2 = document.createElement('canvas');
            let ctx2 = canvas2.getContext('2d');
            canvas2.width = 100;
            canvas2.height = 100;
            let half = canvas2.width / 2;
            let gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
            gradient2.addColorStop(0.025, '#fff');
            gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
            gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
            gradient2.addColorStop(1, 'transparent');
            ctx2.fillStyle = gradient2;
            ctx2.beginPath();
            ctx2.arc(half, half, half, 0, Math.PI * 2);
            ctx2.fill();

            // End cache
            function random(min, max) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }

                if (min > max) {
                    let hold = max;
                    max = min;
                    min = hold;
                }
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            let Star = function () {
                this.orbitRadius = random(w / 2 - 50);
                this.radius = random(100, this.orbitRadius) / 10;
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(this.orbitRadius) / 1000000;
                this.alpha = random(2, 10);
                count++;
                stars[count] = this;
            }
            Star.prototype.draw = function () {
                // let x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX;
                let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
                let y = Math.cos(this.timePassed) * this.orbitRadius/2 + this.orbitY;
                let twinkle = random(10);
                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.05;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.05;
                }
                ctx.globalAlpha = this.alpha;
                ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                this.timePassed += this.speed;
            }
            for (let i = 0; i < maxStars; i++) {
                new Star();
            }

            function animation() {
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
                ctx.fillRect(0, 0, w, h)

                ctx.globalCompositeOperation = 'lighter';
                for (let i = 1, l = stars.length; i < l; i++) {
                    stars[i].draw();
                }
                ;

                window.requestAnimationFrame(animation);
            }
            animation();
        }
    }
</script>

<style scoped>

</style>
