function YouTube() {
    window.open("https://www.youtube.com/@VinterstadenRP-sn6sj")
}

function Discord() {
    window.open("https://discord.gg/yTEuW8FcFR")
}

function TikTok() {
    window.open("https://www.tiktok.com/@vinterstadenrp")
}

function Join() {
    window.open("https://www.roblox.com/groups/3812713/LightStudios#!/about")
}

document.addEventListener("DOMContentLoaded", function() {
    // Array med bakgrunnsbilder
    const backgrounds = [
        'images/image1.png',
        'images/image2.png',
        'images/image3.png',
        'images/image4.png',
        'images/image5.png',
        'images/image6.png',
        'images/image7.png',
        'images/image8.png',
        'images/image9.png'
    ];

    // Forhåndslaste alle bakgrunnsbilder
    backgrounds.forEach(function(image) {
        const img = new Image();
        img.src = image;
    });

    // Velg et tilfeldig bilde fra arrayen
    const randomIndex = Math.floor(Math.random() * backgrounds.length);

    // Sett bakgrunnsbildet på body-elementet
    document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
});
