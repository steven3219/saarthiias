# Student Performance Intelligence Portal (Sarrthilabs Assignment)

A production-ready Enterprise Portal designed to solve scalability constraints in managing UPSC aspirants, mentors, evaluators, and system admins.

## 🚀 Live Links & Submissions
* **Frontend Deployment UI:** [Insert Vercel/Netlify URL]
* **Backend API Gateway:** [Insert Render/Railway URL]
* **Postman Collection/Swagger Link:** Located in `/docs/Sarrthilabs_Collection.json`

---

## 🏛️ System Architecture & Design Document

### 1. Monorepo Structural Paradigm
The environment is decoupled cleanly into structured logical runtimes:
* `backend/`: Node-Express REST implementation processing event hooks and state queries.
* `frontend/`: Modular layouts prioritizing fast views and interface responsiveness.

### 2. Database & Data Optimization Methods
* **Indexed Architectures:** To sustain large transaction volumes seamlessly (10k+ users), high-traffic entities use compound indices:
    * `UserSchema`: `{ email: 1 }` (Accelerates auth operations).
    * `UserSchema`: `{ role: 1, 'profileMetrics.averageScore': -1 }` (Accelerates admin dashboards).
    * `TaskSchema`: `{ studentId: 1, dueDate: 1 }` (Optimizes dashboard views).
* **Pagination Framework:** Data lists are loaded dynamically via cursor-based parameters (`page`, `limit`) mapping aggregate stages `skip()` and `limit()` cleanly inside the controllers to protect server memory.

### 3. Authentication & RBAC Core Flow
State-handling utilizes cryptographically signed **JSON Web Tokens (JWT)**:
1. Short-lived Access Tokens verify incoming runtime requests.
2. Long-lived Refresh Tokens securely cycle sessions without disruption.
3. Access gates are enforced at both routing layers in the Frontend (NextJS Middleware) and Backend controllers (`authorize('Admin', 'Mentor')`).

### 4. AI Engine Workflow (Module 7 & 9)
Integrates **Gemini** to securely evaluate student metadata arrays (Scores, Task Completion Rates, Deadlines) against engineered prompt parameters, safely formatting JSON strings back to persistent MongoDB fields.

### 5. Instant Event WebSockets Model
Driven natively by standard `Socket.io` connection handlers. Rather than checking endpoints continuously via client poll routines, clients map distinct IDs on open connection loops, instantly signaling target clients when actions like `Task Assigned` or `Evaluation Processed` trigger.

---

## 📦 Setting Up Locally

### Backend Configuration
1. Navigate into the backend path: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file referencing the structure below:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sarrthi
JWT_SECRET=your_super_secret_access_key
GEMINI_API_KEY=AIzaSyYourGeminiKey Here