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
    window.location.href = personalLink + '/quiz';
}

function loadQuiz() {
    const quizData = JSON.parse(localStorage.getItem('quizData'));

    if (!quizData) {
        alert('Không tìm thấy dữ liệu!');
        return;
    }

    // Hiển thị câu hỏi và các câu trả lời trên trang quiz
}
