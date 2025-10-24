const player = document.getElementById('player');
const labubu = document.getElementById('labubu'); 
const gameArea = document.getElementById('game-area');

//Obtener elementos del panel de config
const playerSpeedSlider = document.getElementById('player-speed');
const labubuSpeedSlider = document.getElementById('labubu-speed'); 
const musicToggle = document.getElementById('music-toggle');
const gameMusic = document.getElementById('game-music');
const disableBgBtn = document.getElementById('disable-bg-btn'); 
const startGameBtn = document.getElementById('start-game-btn'); 

let playerPosition = { x: 100, y: 100 };
let labubuPosition = { x: 300, y: 300 }; 

//Variables de config
let playerSpeed = parseInt(playerSpeedSlider.value);
let labubuSpeed = parseInt(labubuSpeedSlider.value); 

//Event Listeners del Panel de config

playerSpeedSlider.addEventListener('input', (event) => {
    playerSpeed = parseInt(event.target.value);
});

labubuSpeedSlider.addEventListener('input', (event) => { 
    labubuSpeed = parseInt(event.target.value); 
});

musicToggle.addEventListener('change', () => {
    if (musicToggle.checked) {
        gameMusic.play();
    } else {
        gameMusic.pause();
    }
});

//cambiar fondo del juego
function changeGameBackground(newBackground) {
    if (newBackground.includes('.') || newBackground.includes('/')) {
        gameArea.style.backgroundImage = `url(${newBackground})`;
        gameArea.style.backgroundColor = 'transparent';
    } else {
        gameArea.style.backgroundColor = newBackground;
        gameArea.style.backgroundImage = 'none'; 
    }
}


disableBgBtn.addEventListener('click', () => {
    changeGameBackground('black'); 
});

// boton de inicio
function startGame() {
    startGameBtn.style.display = 'none';
    gameLoop();
}

// funcion del boton de inicio
startGameBtn.addEventListener('click', startGame);



window.addEventListener('keydown', (event) => {
    //tecla minuscula para mover el personaje, no tengo flechas en mi teclado
    const key = event.key.toLowerCase(); 
    
    switch (key) {
        case 'w':
            if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
        break;
        case 's':
            if (playerPosition.y < gameArea.clientHeight - 50) playerPosition.y += playerSpeed;
        break;
        case 'a':
            if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
        break;
        case 'd':
            if (playerPosition.x < gameArea.clientWidth - 50) playerPosition.x += playerSpeed;
        break;
    }
    updatePositions();
});


function moveLabubu() {
    if (labubuPosition.x < playerPosition.x) {labubuPosition.x += labubuSpeed;
      } else if (labubuPosition.x > playerPosition.x) {labubuPosition.x -= labubuSpeed;
      }
    if (labubuPosition.y < playerPosition.y) {labubuPosition.y += labubuSpeed;
      } else if (labubuPosition.y > playerPosition.y) {labubuPosition.y -= labubuSpeed;
      }
    updatePositions();
    checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    labubu.style.transform = `translate(${labubuPosition.x}px, ${labubuPosition.y}px)`; 
}

function checkCollision() {
    if (
        Math.abs(playerPosition.x - labubuPosition.x) < 50 && 
        Math.abs(playerPosition.y - labubuPosition.y) < 50 
    ) {
        alert('¡Labubu te atrapó!'); 
        playerPosition = { x: 100, y: 100 };
        labubuPosition = { x: 300, y: 300 }; 
    }
}

function gameLoop() {
    moveLabubu(); 
    requestAnimationFrame(gameLoop);
}


updatePositions();
