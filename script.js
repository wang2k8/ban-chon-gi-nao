let incorrectAttempts = 0;

function checkAnswer(isCorrect, button) {
    if (isCorrect) {
        // Nếu câu trả lời đúng
        document.getElementById('resultMessage').innerHTML = 'Chúc mừng! Bạn đã chọn đúng.';
        document.getElementById('imageSection').style.display = 'block';
        document.getElementById('personalInfoSection').style.display = 'block';
    } else {
        // Nếu câu trả lời sai
        incorrectAttempts++;
        moveIncorrectAnswer(button);
    }
}

function moveIncorrectAnswer(button) {
    const randomX = Math.random() * (window.innerWidth - button.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - button.offsetHeight);

    // Di chuyển nút câu trả lời sai đến vị trí ngẫu nhiên
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';

    // Nhân đôi/nhiều nút câu trả lời đúng sau một số lần cố gắng
    if (incorrectAttempts === 15) {
        alert('Bạn đã cố gắng 15 lần! Nhân đôi câu trả lời đúng.');
        createAdditionalButton(2);
    } else if (incorrectAttempts === 25) {
        alert('Bạn đã cố gắng 25 lần! Nhân 3 câu trả lời đúng.');
        createAdditionalButton(3);
    } else if (incorrectAttempts === 35) {
        alert('Bạn đã cố gắng 35 lần! Nhân 5 câu trả lời đúng và phóng to.');
        createAdditionalButton(5);
    }
}

function createAdditionalButton(multiplier) {
    const correctButton = document.getElementById('correctAnswerButton');
    
    for (let i = 0; i < multiplier - 1; i++) {
        const newButton = correctButton.cloneNode(true);
        newButton.style.transform = 'scale(' + (1 + Math.random()) + ')'; // Phóng to ngẫu nhiên
        newButton.onclick = () => checkAnswer(true, newButton);
        document.body.appendChild(newButton);
    }
}
