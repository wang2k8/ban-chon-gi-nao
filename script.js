function generateQuiz() {
    const question = document.getElementById('question').value;
    const personalLink = document.getElementById('personalLink').value;
    const imageUpload = document.getElementById('imageUpload').files[0];
    const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked');

    if (!question || !personalLink || !imageUpload || !correctAnswer) {
        alert('Vui lòng nhập đầy đủ thông tin và chọn câu trả lời đúng!');
        return;
    }

    const quizData = {
        question,
        answers: ["Có", "Không"],
        correctAnswer: correctAnswer.value,
        personalLink,
        imageUploadURL: URL.createObjectURL(imageUpload)
    };

    // Lưu dữ liệu vào localStorage
    localStorage.setItem('quizData', JSON.stringify(quizData));

    // Tạo đường link mới
    const quizPageLink = `${personalLink}/quiz.html`; // Đường link đến trang quiz
    window.location.href = quizPageLink; // Chuyển hướng đến trang quiz
}

function loadQuiz() {
    const quizData = JSON.parse(localStorage.getItem('quizData'));

    if (!quizData) {
        alert('Không tìm thấy dữ liệu!');
        return;
    }

    // Hiển thị câu hỏi và các câu trả lời trên trang quiz
    const quizContainer = document.createElement('div');
    quizContainer.innerHTML = `
        <h2>${quizData.question}</h2>
        <button onclick="checkAnswer('Có')">Có</button>
        <button onclick="checkAnswer('Không')">Không</button>
    `;
    document.body.appendChild(quizContainer);
}

function checkAnswer(selectedAnswer) {
    const quizData = JSON.parse(localStorage.getItem('quizData'));
    if (!quizData) {
        alert('Không tìm thấy dữ liệu!');
        return;
    }

    const correctAnswer = quizData.correctAnswer;

    if (selectedAnswer === correctAnswer) {
        alert('Chúc mừng! Bạn đã chọn câu trả lời đúng.');
    } else {
        alert('Xin lỗi! Bạn đã chọn câu trả lời sai.');
    }
}
