document.getElementById('numAnswers').addEventListener('change', function () {
    const numAnswers = parseInt(this.value);
    const answersContainer = document.getElementById('answersContainer');
    
    // Xóa các câu trả lời cũ
    answersContainer.innerHTML = '';

    // Tạo input cho các câu trả lời và checkbox chọn câu trả lời đúng
    for (let i = 1; i <= numAnswers; i++) {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-group';

        const answerLabel = document.createElement('label');
        answerLabel.textContent = `Câu trả lời ${i}:`;

        const answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerInput.id = `answer${i}`;
        answerInput.name = `answer${i}`;
        answerInput.placeholder = `Nhập câu trả lời ${i}`;
        
        const correctAnswerCheckbox = document.createElement('input');
        correctAnswerCheckbox.type = 'checkbox';
        correctAnswerCheckbox.id = `correct${i}`;
        correctAnswerCheckbox.name = 'correctAnswer';
        correctAnswerCheckbox.value = i;

        const checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = 'Đúng';
        checkboxLabel.setAttribute('for', `correct${i}`);

        answerDiv.appendChild(answerLabel);
        answerDiv.appendChild(answerInput);
        answerDiv.appendChild(correctAnswerCheckbox);
        answerDiv.appendChild(checkboxLabel);

        answersContainer.appendChild(answerDiv);
    }
});

function generateQuiz() {
    const question = document.getElementById('question').value;
    const numAnswers = document.getElementById('numAnswers').value;
    const personalLink = document.getElementById('personalLink').value;
    const imageUpload = document.getElementById('imageUpload').files[0];

    // Thu thập tất cả câu trả lời
    const answers = [];
    let correctAnswerIndex = null;

    for (let i = 1; i <= numAnswers; i++) {
        const answerText = document.getElementById(`answer${i}`).value;
        const correctCheckbox = document.getElementById(`correct${i}`);

        if (answerText) {
            answers.push(answerText);

            // Kiểm tra nếu câu trả lời này được chọn là đúng
            if (correctCheckbox.checked) {
                correctAnswerIndex = i - 1; // Lưu chỉ số câu trả lời đúng
            }
        }
    }

    if (!question || !personalLink || !imageUpload || answers.length !== parseInt(numAnswers) || correctAnswerIndex === null) {
        alert('Vui lòng nhập đầy đủ thông tin và chọn câu trả lời đúng!');
        return;
    }

    const quizData = {
        question,
        numAnswers,
        correctAnswerIndex,
        answers,
        personalLink,
        imageUploadURL: URL.createObjectURL(imageUpload)
    };

    // Lưu dữ liệu vào localStorage
    localStorage.setItem('quizData', JSON.stringify(quizData));
    window.location.href = personalLink + '/quiz';
}

function load
