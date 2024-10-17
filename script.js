function generateQuiz() {
    const question = document.getElementById('question').value;
    const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked').value;
    const imageUpload = document.getElementById('imageUpload').files[0];

    if (!question || !correctAnswer) {
        alert('Vui lòng nhập câu hỏi và chọn câu trả lời đúng.');
        return;
    }

    // Tạo phần hiển thị quiz
    const quizDisplay = document.getElementById('quizDisplay');
    quizDisplay.innerHTML = ''; // Xóa nội dung cũ nếu có
    quizDisplay.style.display = 'block'; // Hiển thị khung quiz

    const questionElement = document.createElement('h2');
    questionElement.textContent = question;
    quizDisplay.appendChild(questionElement);

    const answerYesButton = document.createElement('button');
    answerYesButton.textContent = 'Có';
    answerYesButton.onclick = () => checkAnswer('yes', correctAnswer);
    quizDisplay.appendChild(answerYesButton);

    const answerNoButton = document.createElement('button');
    answerNoButton.textContent = 'Không';
    answerNoButton.onclick = () => checkAnswer('no', correctAnswer);
    quizDisplay.appendChild(answerNoButton);

    // Nếu có ảnh, hiển thị ảnh lên
    if (imageUpload) {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(imageUpload);
        imageElement.style.maxWidth = '100%';
        imageElement.style.marginTop = '20px';
        quizDisplay.appendChild(imageElement);
    }
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        alert('Chúc mừng! Bạn đã chọn đúng.');
    } else {
        alert('Rất tiếc! Câu trả lời của bạn sai.');
    }
}
