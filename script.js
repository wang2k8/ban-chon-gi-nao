async function generateQuiz() {
    const question = document.getElementById('question').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    const incorrectAnswer = document.getElementById('incorrectAnswer').value;
    const personalLink = document.getElementById('personalLink').value;

    if (!question || !correctAnswer || !incorrectAnswer || !personalLink) {
        alert('Vui lòng nhập đầy đủ thông tin.');
        return;
    }

    // Nội dung trang con cần tạo
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
                }
                .link {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <h2>${question}</h2>
            <button onclick="alert('Chúc mừng! Bạn đã chọn đúng.')">${correctAnswer}</button>
            <button id="incorrectAnswerBtn" onclick="moveIncorrectAnswer(this)">${incorrectAnswer}</button>
            <div class="link"><a href="${personalLink}" target="_blank">Link trang cá nhân</a></div>
        </body>
        </html>
    `;

    // Tạo file HTML với tên dựa trên câu hỏi
    const fileName = question.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html';

    // API URL để tạo file trên GitHub repository
    const repoOwner = 'your-username'; // Thay bằng tên người dùng GitHub của bạn
    const repoName = 'your-repo-name'; // Thay bằng tên repository của bạn
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`;
    const token = 'your-github-token'; // Thay bằng GitHub Personal Access Token của bạn

    // Base64 encode content
    const encodedContent = btoa(unescape(encodeURIComponent(content)));

    // Cấu trúc dữ liệu để gửi yêu cầu tạo file qua API
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
            alert(`Trang câu hỏi đã được tạo! Xem tại: https://${repoOwner}.github.io/${repoName}/${fileName}`);
            window.open(`https://${repoOwner}.github.io/${repoName}/${fileName}`, '_blank');
        } else {
            const errorData = await response.json();
            console.error('Lỗi khi tạo trang:', errorData);
            alert('Không thể tạo trang. Vui lòng kiểm tra lại.');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Đã xảy ra lỗi trong quá trình tạo trang.');
    }
}
