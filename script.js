async function generateQuiz() {
    const question = document.getElementById('question').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    const personalLink = document.getElementById('personalLink').value;
    const imageFile = document.getElementById('imageUpload').files[0];
    const statusMessage = document.getElementById('statusMessage');

    // Kiểm tra nếu các trường không được nhập đủ
    if (!question || !correctAnswer || !personalLink || !imageFile) {
        statusMessage.innerText = 'Vui lòng nhập đầy đủ thông tin trước khi tạo trang câu hỏi!';
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
                        display: none;
                    }
                    .info {
                        display: none;
                    }
                    .link {
                        margin-top: 20px;
                    }
                    #resultMessage {
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <h2>${question}</h2>

                <!-- Đáp án -->
                <button id="correctAnswerButton" onclick="checkAnswer(true, this)">Có</button>
                <button id="incorrectAnswerButton" onclick="checkAnswer(false, this)">Không</button>

                <!-- Kết quả hiển thị khi chọn đúng -->
                <div id="resultMessage"></div>

                <!-- Hiển thị ảnh sau khi trả lời đúng -->
                <div id="imageSection">
                    <img id="uploadedImage" src="${imageData}" alt="Uploaded Image">
                </div>

                <!-- Hiển thị thông tin cá nhân sau khi trả lời đúng -->
                <div id="personalInfoSection" class="info">
                    <p>Thông tin cá nhân: <a id="personalLink" href="${personalLink}" target="_blank">Xem trang cá nhân</a></p>
                </div>

                <script src="script.js"></script>
            </body>
            </html>
        `;

        // Gửi dữ liệu lên GitHub để tạo file
        const repoOwner = 'your-username'; // Thay bằng tên người dùng GitHub của bạn
        const repoName = 'your-repo-name'; // Thay bằng tên repository của bạn
        const fileName = question.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html';
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`;
        const token = 'your-github-token'; // Thay bằng GitHub Personal Access Token của bạn

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
                statusMessage.innerText = `Trang câu hỏi đã được tạo! Xem tại: https://${repoOwner}.github.io/${repoName}/${fileName}`;
                window.open(`https://${repoOwner}.github.io/${repoName}/${fileName}`, '_blank');
            } else {
                const errorData = await response.json();
                console.error('Lỗi khi tạo trang:', errorData);
                statusMessage.innerText = 'Không thể tạo trang. Vui lòng kiểm tra lại.';
            }
        } catch (error) {
            console.error('Lỗi:', error);
            statusMessage.innerText = 'Đã xảy ra lỗi trong quá trình tạo trang.';
        }
    };

    reader.readAsDataURL(imageFile);
}
