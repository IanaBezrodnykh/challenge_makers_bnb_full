## Structure

    This repo contains two applications:

    -   A frontend React App
    -   A backend api server

    These two applications will communicate through HTTP requests, and need to be
    run separately.

## SETUP:

### 1. Create .env file for environmental vars in backend and frontend folders:

    Backend:
    MONGODB_URL="mongodb://0.0.0.0/challenge_makersbnb_full"

    Frontend:
    VITE_BACKEND_URL="http://localhost:8000"

### 2. To install dependencies:

    Run "npm install" once you are in frontend folder and run it again once you are in backend folder.

### 3. To run servers:

    Run "npm run dev" once you are in frontend folder and run it again once you are in backend folder.

### 4. You can now access your React webpage here: http://localhost:5173/

    (Note that your backend runs here: http://localhost:8000)
