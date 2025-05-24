# HireMe – Job Posting Platform Backend

A role-based backend system built using **Express.js + MongoDB**, supporting job posting, job applications with CV upload, mock payments, and admin control.

---

##  Tech Stack use

* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose
* **Authentication**: JWT (Role-based)
* **File Upload**: Multer
* **Payment**: Mock logic (100 Taka per application)
* **Validation**: Built-in + custom logic

---

## Roles & Permissions of user

| Role       | Permissions                                                               |
| ---------- | ------------------------------------------------------------------------- |
| Admin      | Manage users, jobs, view all applications                                 |
| Employee   | Post/edit/delete own jobs, view applications to their jobs, accept/reject |
| Job Seeker | View jobs, apply with CV & payment, view their application history        |

---

##  Structure of Folder

```
/src
|__ config/         # DB connection
|__ constants/      # All enums/constants used across the app
|__ controllers/    # Route logic handlers
|__ models/         # Mongoose schemas
|__ routes/         # Route files
|__ middlewares/    # Auth, role, file upload
|__ validator/      # Input validation
uploads/            # Uploaded CVs
server.js           # Entry point
.env                # Env config
```

---

##  How to SetUp

1. Clone the repo
2. Run `npm install`
3. Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/hireme
JWT_SECRET=your_jwt_secret_here
```

4. Create `uploads/` folder manually
5. Run server:

```bash
npm run dev
```

---

## 🔗 API Endpoints

###  Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

###  Admin (Protected: `admin`)

* `GET /api/admin/users`
* `GET /api/admin/jobs`
* `GET /api/admin/applications`

### Employee (Protected: `employee`)

* `POST /api/jobs` - Create job
* `GET /api/recruiter/applications` - View applications to own jobs
* `PATCH /api/recruiter/applications/:appId` - Accept/Reject application

### Job Seeker (Protected: `seeker`)

* `GET /api/jobs` - View jobs
* `POST /api/applications/apply` - Apply with CV + payment
* `GET /api/seeker/applications` - View application history

---

### Input Validation

We use [Zod](https://github.com/colinhacks/zod) for runtime input validation on all key endpoints including:

- User registration and login  
- Job creation by employees  
- Job application by seekers

This ensures data correctness and helpful error messages for invalid inputs.

---

### Constants & Enums

To improve code readability, maintainability, and avoid hardcoded values, all user roles and application statuses are managed via centralized constants:

- `ROLES` — defines valid user roles: `admin`, `employee`, `seeker`
- `APPLICATION_STATUS` — tracks job application status: `pending`, `accepted`, `rejected`
- `PAYMENT_STATUS` — tracks payment state: `paid`, `pending`

These constants are defined in `src/constants/index.js` and used across:
- Mongoose schema enums
- Role-based access middleware
- Controllers (status assignments and checks)
- Zod input validation schemas

---

## File Upload

* Only `.pdf` and `.docx` allowed
* Max size: 5MB
* Uses Multer with disk storage in `/uploads`

---

## Payment Logic

* Simulated payment
* Automatically marked as `paid`
* Invoice is saved per application (100 Taka)

---

## Deliverables

* ✅ Complete Express.js backend
* ✅ ERD PDF ([Download here](./HireMe_ERD.pdf))
* ✅ Postman Collection ([Download here](./HireMe_API_Postman_Collection.json))
* ✅ Postman Collection (see project files)
* ✅ Clean structured code with roles

