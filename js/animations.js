document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Safe Custom Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    if(window.matchMedia("(pointer: fine)").matches && typeof gsap !== 'undefined') {
        // Only hide native cursor if JS is successfully running
        document.body.classList.add('custom-cursor-active'); 
        
        let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
        let ringX = mouseX, ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            gsap.set(cursorDot, { x: mouseX, y: mouseY });
        });

        gsap.ticker.add(() => {
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;
            gsap.set(cursorRing, { x: ringX, y: ringY });
        });

        // Hover states using event delegation for dynamic elements
        document.body.addEventListener('mouseover', (e) => {
            if(e.target.closest('a, button, .bento-tile, .timeline-item, .magnetic')) {
                cursorRing.classList.add('hover');
            }
        });
        document.body.addEventListener('mouseout', (e) => {
            if(e.target.closest('a, button, .bento-tile, .timeline-item, .magnetic')) {
                cursorRing.classList.remove('hover');
            }
        });
    }

    // 2. Cyberpunk Text Scramble
    function initScramble() {
        const chars = '!<>-_\\\\/[]{}—=+*^?#________';
        
        function scramble(el) {
            const original = el.getAttribute('data-text');
            if(!original) return;
            let iter = 0; const maxIter = 15;
            const interval = setInterval(() => {
                el.innerText = original.split('').map((c, i) => {
                    if(c === ' ') return ' ';
                    if(i < (iter/maxIter)*original.length) return c;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                iter++;
                if(iter > maxIter) clearInterval(interval);
            }, 40);
        }

        if(typeof ScrollTrigger !== 'undefined') {
            gsap.utils.toArray('.scramble-text').forEach(el => {
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 90%",
                    onEnter: () => scramble(el)
                });
            });
        }
    }

    // 3. GSAP Standard Fade Ups
    function initReveals() {
        if(typeof ScrollTrigger !== 'undefined') {
            gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
                gsap.fromTo(elem, 
                    { y: 40, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" } }
                );
            });
        }
    }

    // 4. 3D Card Tilts
    function initTilt() {
        if(!window.matchMedia("(pointer: fine)").matches) return;
        document.body.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.tilt-card');
            if(card) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height/2) / rect.height/2) * -8;
                const rotateY = ((x - rect.width/2) / rect.width/2) * 8;
                gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, ease: "power1.out", duration: 0.4 });
            }
        });
        document.body.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.tilt-card');
            if(card && typeof gsap !== 'undefined') {
                gsap.to(card, { rotationX: 0, rotationY: 0, ease: "elastic.out(1, 0.3)", duration: 1 });
            }
        });
    }

    // Let the DOM populate first, then initialize
    setTimeout(() => {
        initScramble();
        initReveals();
        initTilt();
    }, 200);
});
