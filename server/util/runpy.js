const { exec } = require('child_process');
const pythonScriptPath = './python_scripts/app.py'; 
// Thay thế đường dẫn này bằng đường dẫn thư mục chứa file Python (app.py)


exec('python3 ' + pythonScriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Lỗi khi chạy mã Python: ${error.message}`);
      return;
    }
    if (stderr) {
        console.error(`Lỗi khi chạy mã Python: ${stderr}`);
        return;
      }
      // Xử lý kết quả từ mã Python nếu cần
      console.log(`Kết quả từ mã Python: ${stdout}`);
    });