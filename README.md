# AI-Powered Requirement Extraction

## Project Overview  
This web application allows users to input software requirements into a text area. It processes the input using an LLM (Google Gemini API) to extract structured information, which is then displayed in a table. The app uses a **credit-based system**, where users start with **20 credits**, and each processed requirement consumes **1 credit**. Once the credits run out, users are prompted with a message indicating they've reached the limit.

## Deployed Link
https://pyramyd-demo.vercel.app/

## Tech Stack  
### **Frontend:**  
- **Next.js** – A React framework for building the UI and handling API routes.  
- **TailwindCSS** – For fast and responsive styling.  
- **Redux** – For managing application state, including user credits and requirements data.  

### **Backend:**  
- **Next.js API Routes** – For handling requests to process the software requirements.  
- **Google Gemini API** – For extracting structured information from user-inputted requirements.  

### **Database:**  
- **Local Storage** – For storing user credits persistently on the client-side.  

### **Deployment:**  
- **Vercel** – For deploying the application to production with ease.

## Setup & Running Instructions  

### **1. Install Dependencies**  
```bash
npm install
```

### **2. Run Development Server**
```bash
npm run dev
```
