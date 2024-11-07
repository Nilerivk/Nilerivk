let basket = document.getElementById('basket');
let apple = document.getElementById('apple');
let scoreDisplay = document.getElementById('score');
let livesDisplay = document.getElementById('lives');
let gameOverDisplay = document.getElementById('gameOver');
let restartButton = document.getElementById('restartButton');

let score = 0;
let lives = 3;
let basketPosition = 150; // Posición inicial del cesto
let dropInterval; // Cambié a variable global para poder usarla en endGame

function moveBasket(e) {
    if (e.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 20;
    } else if (e.key === 'ArrowRight' && basketPosition < 300) {
        basketPosition += 20;
    }
    basket.style.left = basketPosition + 'px';
}

function dropApple() {
    // Reinicia la posición de la manzana
    let applePosition = Math.random() * (370); // Random para posición horizontal
    apple.style.left = applePosition + 'px';
    apple.style.top = '-50px';

    dropInterval = setInterval(() => { // Usamos la variable global aquí
        let currentTop = parseInt(apple.style.top);
        if (currentTop >= 600) {
            clearInterval(dropInterval);
            lives--;
            livesDisplay.textContent = 'Vidas: ' + lives;
            apple.style.top = '-50px'; // Reiniciar posición
            if (lives <= 0) {
                endGame();
            } else {
                dropApple(); // Caer otra manzana
            }
        } else {
            apple.style.top = currentTop + 5 + 'px';
        }

        if (isCaught(currentTop)) {
            score++;
            scoreDisplay.textContent = 'Puntuación: ' + score;
            clearInterval(dropInterval);
            apple.style.top = '-50px'; // Reiniciar posición
            dropApple(); // Caer otra manzana
        }
    }, 20);
}

function isCaught(currentTop) {
    let basketRect = basket.getBoundingClientRect();
    let appleRect = apple.getBoundingClientRect();

    return (
        currentTop >= 570 && 
        appleRect.left + appleRect.width > basketRect.left &&
        appleRect.left < basketRect.left + basketRect.width
    );
}

function endGame() {
    clearInterval(dropInterval); // Asegúrate de limpiar el intervalo al terminar el juego
    gameOverDisplay.style.display = 'block';
}

function restartGame() {
    score = 0;
    lives = 3;
    scoreDisplay.textContent = 'Puntuación: ' + score;
    livesDisplay.textContent = 'Vidas: ' + lives;
    gameOverDisplay.style.display = 'none';
    dropApple(); // Reiniciar la caída de la manzana
}

// Añadir event listener para evitar que se ejecute al cargar la página
document.addEventListener('keydown', moveBasket);
restartButton.addEventListener('click', restartGame);
dropApple(); // Comienza el juego
