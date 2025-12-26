# BoloForms Signature Engine (Full-Stack)

A responsive PDF signature injection engine that allows users to place a signature on a document. It ensures the signature remains anchored regardless of screen size and provides a security audit trail using SHA-256 hashing.

## 🚀 Live Demo
- *Frontend (Vercel):* [(https://bolo-forms-engine.vercel.app/)]
- *Backend (Render):* [(https://boloforms-engine.onrender.com)]

## ✨ Key Features
- *Responsive Signature Placement:* Uses percentage-based coordinates to keep the signature anchored to the correct paragraph across mobile and desktop.
- *PDF Injection:* Uses pdf-lib to permanently "burn" the signature into the PDF at the exact location.
- *Security Audit Trail:* Generates unique SHA-256 hashes before and after signing to verify document integrity.
- *Aspect Ratio Management:* Ensures signature images aren't stretched or distorted.

## 🛠 Tech Stack
- *Frontend:* React.js, Vite, Tailwind CSS, Axios, React-Draggable.
- *Backend:* Node.js, Express, PDF-lib, Crypto (for Hashing).

## ⚙ Installation & Setup
1. Clone the repo: git clone [(https://github.com/Shivam34-oss/BoloForms-Engine)]
2. *Backend:* - cd backend
   - npm install
   - node server.js
3. *Frontend:*
   - cd frontend
   - npm install
   - npm run dev

## 🧠 Logic Explained
The core challenge was bridging the gap between *Browser Pixels (CSS)* and *PDF Points (72 DPI)*. 
- *Frontend Math:* (Position / Container Size) * 100 -> Sends % to Backend.
- *Backend Math:* (Percentage / 100) * PDF Page Dimension -> Maps to exact PDF coordinates.
-
