async function generateQuiz() {
    const question = document.getElementById('question').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    const customLink = document.getElementById('customLink').value;
    const personalLink = document.getElementById('personalLink').value;
    const imageFile = document.getElementById('imageUpload').files[0];
    const statusMessage = document.getElementById('statusMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Xóa các thông báo lỗi trước đó
    errorMessage.innerText = '';
    statusMessage.innerText = '';

    // Kiểm tra nếu các trường không được nhập đủ
    if (!question || !correctAnswer || !customLink || !personalLink || !imageFile) {
        errorMessage.innerText = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }

    // Đọc ảnh dưới dạng Base64
    const reader = new FileReader();
    reader.onloadend = async function () {
        const imageData = reader.result;

        // Nội dung của trang câu hỏi được tạo
        const content = `
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${question}</title>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        background-color: #f0f4f8;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 40px;
                        color: #333;
                    }
                    h2 {
                        font-size: 28px;
                        margin-bottom: 20px;
                    }
                    button {
                        margin: 10px;
                        padding: 12px;
                        font-size: 18px;
                        cursor: pointer;
                        border: none;
                        border-radius: 4px;
                        background-color: #007bff;
                        color: white;
                        font-weight: bold;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                    img {
                        max-width: 100%;
                        margin-top: 20px;
                        display: none;
                    }
                    .info {
                        display: none;
                    }
                    #resultMessage {
                        margin-top: 20px;
                        font-size: 18px;
                        color: green;
                    }
                </style>
            </head>
            <body>
                <h2>${question}</h2>

                <!-- Đáp án -->
                <button id="correctAnswerButton" onclick="checkAnswer(true)">Có</button>
                <button id="incorrectAnswerButton" onclick="checkAnswer(false)">Không</button>

                <!-- Kết quả hiển thị khi chọn đúng -->
                <div id="resultMessage"></div>

                <!-- Hiển thị ảnh sau khi trả lời đúng -->
                <div id="imageSection">
                    <img id="uploadedImage" src="${imageData}" alt="Uploaded Image">
                </div>

                <!-- Hiển thị thông tin cá nhân sau khi trả lời đúng -->
                <div id="personalInfoSection" class="info">
                    <p>Thông tin cá nhân: <a href="${personalLink}" target="_blank">Xem trang cá nhân</a></p>
                </div>

                <script>
                    function checkAnswer(isCorrect) {
                        if (isCorrect) {
                            document.getElementById('resultMessage').innerText = 'Bạn đã chọn đúng!';
                            document.getElementById('uploadedImage').style.display = 'block';
                            document.getElementById('personalInfoSection').style.display = 'block';
                        } else {
                            moveIncorrectAnswer(event.target);
                        }
                    }

                    function moveIncorrectAnswer(element) {
                        const x = Math.random() * (window.innerWidth - element.offsetWidth);
                        const y = Math.random() * (window.innerHeight - element.offsetHeight);
                        element.style.position = 'absolute';
                        element.style.left = x + 'px';
                        element.style.top = y + 'px';
                    }
                </script>
            </body>
            </html>
        `;

        // URL GitHub chính và phần tên link tùy chỉnh do người dùng nhập
        const repoOwner = 'wang2k8'; // Tên người dùng GitHub của bạn
        const repoName = 'ban-chon-gi-nao'; // Tên repository của bạn
        const fileName = `${customLink}.html`; // Sử dụng tên link người dùng đã nhập
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`;
        const token = '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'; // Thay bằng GitHub Personal Access Token của bạn

        // Encode nội dung thành base64
        const encodedContent = btoa(unescape(encodeURIComponent(content)));

        // Dữ liệu để gửi tới API GitHub
        const data = {
            message: `Tạo trang con: ${fileName}`,
            content: encodedContent
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                statusMessage.innerText = `Trang câu hỏi đã được tạo! Xem tại: https://wang2k8.github.io/ban-chon-gi-nao/${customLink}`;
                window.open(`https://wang2k8.github.io/ban-chon-gi-nao/${customLink}`, '_blank');
            } else {
                const errorData = await response.json();
                errorMessage.innerText = 'Không thể tạo trang. Vui lòng kiểm tra lại thông tin GitHub.';
                console.error('Lỗi khi tạo trang:', errorData);
            }
        } catch (error) {
            errorMessage.innerText = 'Đã xảy ra lỗi trong quá trình tạo trang.';
            console.error('Lỗi:', error);
        }
    };

    reader.readAsDataURL(imageFile);
}
