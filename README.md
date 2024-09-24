# 🗂️ Task Manager App

Welcome to the **Task Manager App**! This application helps you manage your tasks efficiently while providing a relaxing Zen mode experience. 🌼

## 🌟 Features

- **Task Management**: Add, delete, and mark tasks as complete. 📋
- **Priority Selection**: Assign priority levels to tasks for better organization. 📊
- **Completion Ring**: Visual representation of your task completion percentage. 🎯
- **Zen Mode**: Focus on your tasks with a Pomodoro timer and motivational quotes. ⏳
- **Google Calendar Integration**: Seamlessly sync your tasks and habits with Google Calendar for better planning. 📅

## 🔑 Google API Integration

This application uses the Google Calendar API to create events for tasks and habits. Here's how it works:

1. **Authentication**: Users can authenticate using their Google accounts. This allows the app to access the user's calendar securely.
2. **Event Creation**: When a habit or task is added, the app creates a corresponding event in the user's Google Calendar.
3. **Email Notifications**: Users receive email notifications for new tasks and habits added to the calendar, ensuring they stay on track. 📧

To ensure the security of your Google API credentials:
- The sensitive information (like API keys) has been hidden in this repository. Make sure to keep them safe and private. You can add your credentials in a `.env` file or similar, as needed.

## 📚 Technologies Used

- **HTML/CSS**: For the structure and styling of the application. 🖥️
- **JavaScript**: To handle dynamic interactions and logic. 🚀
- **Google Calendar API**: For calendar functionalities. ☁️
- **Flexbox**: For responsive layout design. 📐

## 🚀 Getting Started

1. Clone this repository: 
   ```bash
   git clone https://github.com/cursed-0men/task-manager.git
   

## 📖 **Documentation**

For more details on how to use the app, check the in-app instructions or visit the [Google Calendar API documentation](https://developers.google.com/calendar). Here are some key points:

- **Task Management**: Easily add tasks with names and priority levels. Tasks can be marked as complete or deleted as needed.
- **Zen Mode**: Engage in focused work sessions using the Pomodoro timer. Start, pause, or reset your timer as required.
- **Google Calendar Integration**: Tasks added to the application automatically sync with your Google Calendar. You can view your tasks alongside your other scheduled events.
- **Notifications**: Stay informed with email notifications for any new tasks or habits added to your Google Calendar.

### 📝 Setup Instructions for Google API

1. **Create a Google Cloud Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project.

2. **Enable the Google Calendar API**:
   - In the APIs & Services dashboard, click on "Enable APIs and Services."
   - Search for "Google Calendar API" and enable it for your project.

3. **Create Credentials**:
   - Navigate to the "Credentials" tab.
   - Click "Create Credentials" and choose "OAuth client ID."
   - Configure the consent screen and set the application type as "Web application."
   - Add authorized redirect URIs as needed (e.g., `http://localhost:3000` for local testing).
   - Download the credentials JSON file and save it securely.

4. **Set Up Environment Variables**:
   - Create a `.env` file in the project root.
   - Add your Google API credentials in the following format:
     ```
     GOOGLE_CLIENT_ID=your_client_id
     GOOGLE_CLIENT_SECRET=your_client_secret
     ```

5. **Follow the instructions in `zen-mode.js`** to configure the application to use your credentials.

---

## 🙌 **Contributing**

Contributions are welcome! If you'd like to contribute to the project, please follow these guidelines:

1. **Fork the repository**:
   - Click on the "Fork" button at the top right of the repository page.

2. **Create a new branch**:
   ```bash
   git checkout -b feature/YourFeatureName

