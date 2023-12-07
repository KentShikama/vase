document.addEventListener('DOMContentLoaded', function () {
    const vase = document.getElementById('vase');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicTracks = ['sample-12s.mp3', 'sample-9s.mp3'];
    let flowerCount = 0;

    // Function to generate a random color
    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    // Function to generate a random flower SVG
    function generateFlower() {
        const petalColor = getRandomColor();
        const centerColor = petalColor;
        const petalSize = Math.floor(Math.random() * 15) + 10; // Size between 10 and 25
        const centerX = 50;
        const centerY = 50;
        const petals = [];

        // Create petals
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2; // Distribute petals evenly around the center
            const x = centerX + Math.cos(angle) * petalSize;
            const y = centerY + Math.sin(angle) * petalSize;
            const petal = `<ellipse cx="${x}" cy="${y}" rx="${petalSize}" ry="20" fill="${petalColor}"/>`;
            petals.push(petal);
        }

        // Combine petals and center into one SVG
        return `<svg height="100" width="100">
            ${petals.join('')}
            <circle cx="${centerX}" cy="${centerY}" r="15" fill="${centerColor}" />
        </svg>`;
    }

    // Function to draw a vase using SVG
    function drawVase() {
        vase.innerHTML = `<svg height="150" width="100">
            <rect x="20" y="50" width="60" height="100" style="fill:blue;stroke:black;stroke-width:2" />
        </svg>`;
    }

    drawVase(); // Initial vase drawing

    document.getElementById('addFlower').addEventListener('click', function () {
        flowerCount++;
        vase.innerHTML += generateFlower(); // Add a random flower

        // Change music
        if (flowerCount < musicTracks.length) {
            musicPlayer.src = musicTracks[flowerCount];
            musicPlayer.play();
        } else {
            // Restart the music playlist when it reaches the end
            flowerCount = 0;
            musicPlayer.src = musicTracks[0];
            musicPlayer.play();
        }
    });
});
