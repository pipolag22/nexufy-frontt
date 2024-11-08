README for Frontend
## Nexufy Frontend
### Introduction
This repository contains the frontend of Nexufy, a platform that connects producers and suppliers of
inputs, facilitating the publication and management of products. The interface is developed in React
and utilizes a variety of libraries for a dynamic and responsive design.
### Technologies Used
- **Framework**: React with Vite
- **Main Libraries**:
 - Axios (for HTTP communication)
 - Bootstrap (for responsive design)
 - visx (for graphs)
 - Moment (for date management)
 - SweetAlert2 (for interactive alerts)
### Prerequisites
- Node.js and npm
- Git
### Clone the Repository
```bash
git clone https://github.com/Feezca/nexufy-front.git
cd nexufy-front
```
### Configuration and Execution
Install the dependencies and start the development server:
```bash
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.
### Backend Connection
The frontend is configured to communicate with the backend at `https://nexufy-2.onrender.com`.
Ensure that the backend is running for full functionality.
### Project Architecture
- **Services**: Services such as `loginService`, `registerService`, and `getProductsByCustomerId`
use `axios` and `fetch` to interact with the backend API.
- **UI Components**: Uses Bootstrap for responsive design and visx for graphs.
### Main Features
- **Platform Navigation**: All users can view listings and search for products.
- **Product Management**: Administrators can create and manage their own products.
- **Statistics**: Super administrators can view statistics on products and users.
### Vercel Rewrite Configuration
The `vercel.json` file configures rewrites to connect the frontend with the backend:
```json
{
 "rewrites": [
 {
 "source": "/api/:path*",
 "destination": "https://nexufy-2.onrender.com/api/:path*"
 }
 ]
}
```
### Usage Instructions
- **Login and Registration**: Users can register and log in to access functionality based on their role.
- **User Preferences**:
 - Light-Dark Mode.
 - Language Selection: Spanish and English.
- **Product Publication**: Only users with `ROLE_ADMIN` or higher can publish products.
- **Statistics**: Access to statistics is restricted to `ROLE_SUPERADMIN`.
