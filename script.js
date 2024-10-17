function generateQuiz() {
    const question = document.getElementById('question').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    const incorrectAnswer = document.getElementById('incorrectAnswer').value;
    const imageUpload = document.getElementById('imageUpload').files[0];
    const personalLink = document.getElementById('personalLink').value;

    if (!question || !correctAnswer || !incorrectAnswer || !personalLink) {
        alert('Vui lòng nhập đầy đủ thông tin.');
        return;
    }

    // Tạo nội dung cho trang mới
    const newWindow = window.open("", "_blank");

    // Viết HTML cho trang mới
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${question}</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f3f4f6;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 40px;
                    color: #333;
                }
                h2 {
                    margin-bottom: 20px;
                }
                button {
                    margin: 10px;
                    padding: 12px;
                    font-size: 18px;
                    cursor: pointer;
                }
                img {
                    max-width: 100%;
                    margin-top: 20px;
                }
                .link {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <h2>${question}</h2>
            <button onclick="checkAnswer('yes')">${correctAnswer}</button>
            <button onclick="moveIncorrectAnswer(this)">${incorrectAnswer}</button>
            ${imageUpload ? `<img src="${URL.createObjectURL(imageUpload)}" alt="Uploaded Image">` : ''}
            <div class="link"><a href="${personalLink}" target="_blank">Link trang cá nhân</a></div>
            <script>
                let incorrectAttempts = 0;

                function checkAnswer(selectedAnswer) {
                    if (selectedAnswer === 'yes') {
                        alert('Chúc mừng! Bạn đã chọn đúng.');
                    } else {
                        alert('Xin lỗi! Bạn đã chọn sai.');
                    }
                }

                function moveIncorrectAnswer(button) {
                    incorrectAttempts++;
                    const randomX = Math.random() * (window.innerWidth - button.offsetWidth);
                    const randomY = Math.random() * (window.innerHeight - button.offsetHeight);

                    button.style.position = 'absolute';
                    button.style.left = randomX + 'px';
                    button.style.top = randomY + 'px';

                    // Nhân đôi/nhiều nút câu trả lời đúng
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
                    const newButton = document.createElement('button');
                    newButton.textContent = 'Câu trả lời đúng x' + multiplier;
                    newButton.onclick = () => checkAnswer('yes');
                    newButton.style.transform = 'scale(' + (1 + multiplier / 10) + ')'; // Phóng to ngẫu nhiên
                    document.body.appendChild(newButton);
                }
            </script>
        </body>
        </html>
    `);

    newWindow.document.close(); // Đóng document để đảm bảo tất cả nội dung đã được render
}
