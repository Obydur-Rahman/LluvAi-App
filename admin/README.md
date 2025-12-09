# Admin Panel - Complete Standalone React App

## 📁 Project Structure

```
admin/
├── src/
│   ├── pages/
│   │   ├── AdminLogin.jsx         - Admin login page
│   │   └── AdminDashboard.jsx     - Main dashboard
│   ├── components/
│   │   ├── Navbar.jsx             - Top navigation
│   │   └── PaymentCard.jsx        - Payment card component
│   ├── context/
│   │   └── AdminContext.jsx       - Admin context for state
│   ├── styles/
│   │   ├── AdminLogin.css         - Login page styles
│   │   ├── AdminDashboard.css     - Dashboard styles
│   │   ├── Navbar.css             - Navbar styles
│   │   └── PaymentCard.css        - Card styles
│   ├── App.jsx                    - Main app component
│   ├── main.jsx                   - Entry point
│   └── index.css                  - Global styles
├── index.html                     - HTML template
├── vite.config.js                - Vite configuration
├── package.json                  - Dependencies
└── .env                          - Environment variables
```

## 🚀 Setup

### 1. Install Dependencies

```bash
cd admin
npm install
```

### 2. Configure Environment

Edit `.env`:

```
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Run Admin Panel

```bash
npm run dev
```

Admin panel runs on: **http://localhost:5174**

## 🔑 Features

### ✅ Admin Login

- Email & password authentication
- Checks if user has `isAdmin: true`
- Stores token in localStorage
- Redirects to dashboard on success

### ✅ Payment Dashboard

- Lists all **pending** payments
- Shows payment cards with key info:
  - User name & email
  - Amount in BDT
  - Payment method (bKash/Rocket/Nagad)
  - Transaction ID
  - Date submitted

### ✅ Review Payment

- Click any payment card to review
- Modal shows all details
- Add admin notes (optional)
- **Two action buttons:**
  - ✅ **Approve** - Credits user immediately
  - ❌ **Reject/Cancel** - Payment rejected, no credits

### ✅ Real-time Updates

- Dashboard auto-refreshes after approve/reject
- Payments disappear after action
- Toast notifications for feedback

## 📱 UI Components

### Login Page

- Professional gradient background
- Email & password fields
- Test credentials displayed
- Loading state on button

### Dashboard

- Payment stats counter
- Grid of payment cards
- Responsive design
- Modal overlay for details

### Payment Card

- Color-coded payment method
- Pending status badge
- User information
- Amount highlight
- Review button

### Modal

- Detailed payment view
- User & transaction details
- Admin notes textarea
- Approve/Reject buttons
- Close button

## 🔐 Authentication

- Admin login required
- JWT token stored in localStorage
- Protected routes (dashboard)
- Auto-redirect to login if not authenticated
- Logout button in navbar

## 🎨 Design

- Modern gradient colors (#667eea to #764ba2)
- Responsive grid layout
- Smooth animations & transitions
- Color-coded payment methods
- Professional styling

## 🔌 API Integration

### Login

```
POST /api/user/login
Body: { email, password }
Response: { token, user { isAdmin } }
```

### Get Pending Payments

```
GET /api/payment/pending
Headers: Authorization: Bearer {token}
Response: { payments[] }
```

### Approve Payment

```
POST /api/payment/approve
Headers: Authorization: Bearer {token}
Body: { paymentId, adminNotes }
```

### Reject Payment

```
POST /api/payment/reject
Headers: Authorization: Bearer {token}
Body: { paymentId, adminNotes }
```

## 🧪 Testing

### Test Admin Credentials

```
Email: admin@test.com
Password: password123
(Set isAdmin: true in MongoDB first)
```

### Test Flow

1. Make user admin in MongoDB
2. Start admin app: `npm run dev`
3. Login with admin email
4. See pending payments
5. Click a payment to review
6. Add notes (optional)
7. Click Approve or Reject
8. See success notification
9. Payment removed from list

## 📊 What Admin Sees

### On Dashboard

- Count of pending payments
- Grid of payment cards
- Each card shows:
  - Payment method (color badge)
  - User name & email
  - Amount in BDT
  - Transaction ID
  - Date submitted

### On Click

- Modal with full details
- All transaction info
- Notes textarea
- Two action buttons

## ✅ Approve Payment

- User gets instant credits
- Payment marked "approved"
- Admin notes saved
- Payment disappears from pending list

## ❌ Reject/Cancel Payment

- User gets NO credits
- Payment marked "rejected"
- Admin notes saved
- Payment disappears from pending list

## 🎯 Key Endpoints

All requests require: `Authorization: Bearer {token}`

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | /api/user/login      | Admin login          |
| GET    | /api/payment/pending | Get pending payments |
| POST   | /api/payment/approve | Approve payment      |
| POST   | /api/payment/reject  | Reject payment       |

## 🔄 Admin Workflow

```
1. Admin opens admin app → http://localhost:5174
2. Admin logs in with credentials
3. Dashboard shows pending payments
4. Admin reviews payment details
5. Admin adds notes if needed
6. Admin clicks Approve or Reject
7. System processes action:
   - Update payment status
   - Credit user (if approved)
   - Save admin notes
8. Payment removed from list
9. Toast notification shows result
```

## 🎁 Features

✅ Standalone React app
✅ Professional UI/UX
✅ Real-time payment list
✅ Beautiful cards
✅ Modal review interface
✅ One-click approve/reject
✅ Admin notes support
✅ Toast notifications
✅ Responsive design
✅ Protected routes
✅ Logout functionality
✅ Gradient theme

## 📝 Notes

- Admin panel runs on **port 5174** (separate from client on 5173)
- Completely independent React app
- Connects to same backend API
- Full CRUD operations on payments
- Professional design ready for production

## 🚀 Deploy

For production:

1. Build: `npm run build`
2. Deploy dist folder to hosting
3. Update VITE_BACKEND_URL to production backend
4. Point admin.yourdomain.com to dist folder

---

**Admin Panel Ready! 🎉**
