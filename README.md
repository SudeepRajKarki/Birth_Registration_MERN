Birth Registration System


✨ Welcome to the Birth Registration System! 🍼
✨ A secure and efficient web platform to register and manage birth records.
✨ Built using React for the frontend and Node.js/Express with MongoDB for the backend, featuring user authentication, admin approvals, PDF generation, QR verification, and a smooth user experience. 🚀

🌟 Features

🔐 Authentication

✅ User Register/Login with email verification 📧

✅ Password recovery using reset link 🔄


📝 Birth Registration

✅ Users can submit birth registration forms with required details 🖊️

✅ Admin approval/decline workflow with status tracking ✅

✅ Declined registrations are tracked (not deleted) for audit purposes 📜


📄 PDF & Verification

✅ Generate PDF of approved registrations 🖨️

✅ Each registration includes a unique QR code for verification 🔍

✅ QR-based verification for public and official validation ✅


📊 Admin Panel

✅ Admins can view all registrations with filters (Pending, Approved) 🎛️

✅ Approve/Decline registrations with reason 📝

✅ Track all declined and approved submissions ✅


📌 User Dashboard

✅ Users can view their submitted registrations and their status 🕒

✅ Update personal information (if allowed) ✏️

🛠️ Tech Stack

🔹 Frontend: React, Tailwind CSS / Bootstrap

🔹 Backend: Node.js, Express.js

🔹 Database: MongoDB

🔹 Authentication: JWT

🔹 PDF Generation: PDFKit / jsPDF

🔹 QR Code Generation & Verification: qrcode package

🔧 Installation & Setup
Backend Setup 🖥️

1️⃣ Clone the repository:

git clone <repository-url>
cd birth_registration_backend


2️⃣ Install dependencies:

npm install


3️⃣ Configure .env file:

MongoDB URI

JWT secret key

Email credentials (for notifications)

4️⃣ Run the backend server:

npm run dev

Frontend Setup 🌐

1️⃣ Navigate to the frontend folder:

cd birth_registration_frontend


2️⃣ Install dependencies:

npm install


3️⃣ Start the React development server:

npm run dev


🚀 Usage

User registers and logs in 🧑‍💻

Submit birth registration form 📝

Admin approves or declines the registration ✅

Generate PDF & QR code for approved records 🖨️

Verify registration using QR code 🔍

Track registration status from dashboard 


🤝 Contributing

Contributions are welcome! 💡
Feel free to fork the repo, submit issues, or open a pull request.

❤️ Support

If you like this project, please ⭐ star the repository! 🌟

