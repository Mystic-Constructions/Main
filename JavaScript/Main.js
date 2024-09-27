function YouTube() {
    window.open("")
}

function Discord() {
    window.open("https://discord.gg/QsTVcpG2Tj")
}

function TikTok() {
    window.open("")
}

function Twitter() {
    window.open("https://x.com/MysticConst_RLX")
}


function Join() {
    window.open("https://www.roblox.com/groups/32011927/Mystic-Construction#!/about")
}

function PetsBay() {
    window.open("https://www.roblox.com/games/17458909777/Pets-Bay")
}

function WonderWorld() {
    window.open("https://www.roblox.com/games/17536932840/Wonder-World-RP")
}

document.addEventListener("DOMContentLoaded", function() {
    // Array med bakgrunnsbilder
    const backgrounds = [
        'images/Background1.png',
        'images/Background2.png'
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
