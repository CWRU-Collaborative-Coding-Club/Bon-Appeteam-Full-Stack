edit this readme later
but we should ahve one

# Bon-Appe Application
Welcome to the Bon-Appe project! This application provides a seamless integration of a back-end server and a front-end interface to deliver a robust and user-friendly experience. Follow the instructions below to set up, run, and explore the application.

## Overview
The Bon-Appe app is designed to streamline meal planning, tracking, and progress visualization. This mobile app carries nutritional data on the current meal plan options at Case Western Reserve University, and combines a dynamic back-end server and an interactive front-end interface, the app enables users to:
1. Track their nutritional progress.
2. Receive personalized meal recommendations.
3. Maintain a seamless user experience powered by real-time data integration.
4. 

## Technologies Used
- Front-End: React Native (with Expo framework)
- Back-End: Express.js (Node.js)
- Database: 
- Styling: React Native Paper and custom styles
- Version Control: Git and GitHub

## Setup
Before running the application, make sure you have the following installed on your machine:
- Node.js (v14 or later)
- npm (Node Package Manager)
- Expo CLI (for running the front-end)

### Installation
1. Clone repository
```
git clone https://github.com/CWRU-Collaborative-Coding-Clube/Bon-Appeteam-Full-Stack.git
```
2. Navigate to the project directory
```
cd Bon-Appeteam-Full-Stack
```
3. Install dependencies for the back end
```
cd Bon-Appeteam-Back-end
npm install
```
4. Install dependencies for the front end
```
cd Bon-Appeteam-Front-end
npm install
```

## Running the application
The application has two main components: the back-end server and the front-end interface. Follow the steps below to run them:
1. Start the Back-End Server
Navigate to the back-end directory and run the server:
```
cd Bon-Appeteam-Back-end
node express.js
```
This command starts the back-end server and makes the API endpoints accessible. Leave this terminal running in the background.
2. Start the Front-End App
In a new terminal, navigate to the front-end directory and run the app:
```
cd Bon-Appeteam-Front-end
npx expo start
```
Expo CLI will launch, providing options to run the app on:
- A physical device (using the Expo Go app)
- An emulator/simulator (iOS or Android)
- A web browser
