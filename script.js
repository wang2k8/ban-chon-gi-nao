let incorrectAttempts = 0;

function generateQuiz() {
    const question = document.getElementById('question').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    const incorrectAnswer = document.getElementById('incorrectAnswer').value;
    const imageUpload = document.getElementById('imageUpload').files[0];

    if (!question || !correctAnswer || !incorrectAnswer) {
        alert('Vui lòng nhập đầy đủ thông tin.');
        return;
    }

    // Tạo phần hiển thị quiz
    const quizDisplay = document.getElementById('quizDisplay');
    quizDisplay.innerHTML = ''; // Xóa nội dung cũ nếu có
    quizDisplay.style.display = 'block'; // Hiển thị khung quiz

    const questionElement = document.createElement('h2');
    questionElement.textContent = question;
    quizDisplay.appendChild(questionElement);

    // Tạo nút cho câu trả lời đúng
    const correctButton = document.createElement('button');
    correctButton.textContent = correctAnswer;
    correctButton.onclick = () => checkAnswer(true);
    quizDisplay.appendChild(correctButton);

    // Tạo nút cho câu trả lời sai
    const incorrectButton = document.createElement('button');
    incorrectButton.textContent = incorrectAnswer;
    incorrectButton.onclick = () => moveIncorrectAnswer(incorrectButton);
    quizDisplay.appendChild(incorrectButton);

    // Nếu có ảnh, hiển thị ảnh lên
    if (imageUpload) {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(imageUpload);
        imageElement.style.maxWidth = '100%';
        imageElement.style.marginTop = '20px';
        quizDisplay.appendChild(imageElement);
    }
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        alert('Chúc mừng! Bạn đã chọn đúng.');
    } else {
        alert('Xin lỗi! Bạn đã chọn sai.');
    }
}

function moveIncorrectAnswer(button) {
    incorrectAttempts++;
    
    // Di chuyển nút đến vị trí ngẫu nhiên
    const randomX = Math.random() * (window.innerWidth - button.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - button.offsetHeight);
    
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';

    // Nhân đôi, nhân 3, hoặc nhân 5 câu trả lời đúng
    if (incorrectAttempts === 15) {
        alert('Bạn đã cố gắng 15 lần! Nhân đôi câu trả lời đúng.');
        createAdditionalButton(2);
    } else if (incorrectAttempts === 25) {
        alert('Bạn đã cố gắng 25 lần! Nhân 3 câu trả lời đúng.');
        createAdditionalButton(3);
    } else if (incorrectAttempts === 35) {
        alert('Bạn đã cố gắng 35 lần! Nhân 5 câu trả lời đúng.');
        createAdditionalButton(5);
    }
}

function createAdditionalButton(multiplier) {
    const quizDisplay = document.getElementById('quizDisplay');
    const correctButton = document.createElement('button');
    correctButton.textContent = 'Câu trả lời đúng x' + multiplier;
    correctButton.onclick = () => checkAnswer(true);
    quizDisplay.appendChild(correctButton);

    // Phóng to các nút đúng
    const buttons = quizDisplay.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.transform = `scale(${multiplier})`;
        button.style.transition = 'transform 0.5s';
    });
}
