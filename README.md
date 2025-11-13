# Bank Website - Indian Banking Rules Portal

A responsive web application about Indian banking rules, regulations, and loan information.

## Features

- 📋 **Banking Rules** - Information about RBI and Banking Regulation Act
- 📝 **Account Opening** - Document requirements and KYC procedures
- 💰 **Loans & Offers** - Eligibility criteria and loan products
- 🧮 **EMI Calculator** - Calculate monthly EMI for loans
- 📞 **Contact Form** - Get in touch with inquiries
- 🎨 **Responsive Design** - Works on desktop, tablet, and mobile

## Project Structure

```
bank-website/
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # Frontend JavaScript
├── server.js           # Node.js backend
├── package.json        # Node.js dependencies
├── README.md           # This file
└── data/               # Data storage (created on first run)
    ├── account_interests.json
    └── contacts.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Steps

1. **Navigate to project directory:**
   ```bash
   cd bank-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Open `http://localhost:3000` in your web browser

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Account Interests
- **GET** `/api/account-interests` - Get all account interest submissions
- **POST** `/api/account-interest` - Submit account opening interest form

### Contact Messages
- **GET** `/api/contacts` - Get all contact messages
- **POST** `/api/contact` - Submit contact form

### Banking Information
- **GET** `/api/banking-info` - Get banking information and rules

## Request/Response Examples

### Submit Account Interest
```bash
POST /api/account-interest
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "primaryDoc": "aadhaar",
  "timestamp": "2025-11-13T10:30:00Z"
}

Response:
{
  "success": true,
  "message": "Account interest recorded",
  "id": 1731495000000
}
```

### Submit Contact Form
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91-9876543210",
  "queryType": "loan",
  "message": "I am interested in a home loan",
  "timestamp": "2025-11-13T10:30:00Z"
}

Response:
{
  "success": true,
  "message": "Message received",
  "id": 1731495000000
}
```

## Data Storage

The application stores submissions in JSON files in the `data/` directory:

- `account_interests.json` - Stores account opening inquiries
- `contacts.json` - Stores contact form submissions

For production, replace this with a proper database (MongoDB, PostgreSQL, etc.).

## EMI Calculator Formula

The EMI (Equated Monthly Installment) is calculated using:

```
EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)

Where:
P = Principal Loan Amount
r = Monthly Interest Rate (Annual Rate / 12 / 100)
n = Number of Months
```

## Features Overview

### 1. Banking Rules Section
- RBI regulations information
- Customer protection policies
- Compliance requirements

### 2. Account Opening Section
- List of required documents
- KYC verification checklist
- Account interest form

### 3. Loans Section
- Age eligibility criteria
- Income requirements
- Credit score information
- Various loan products
- Interactive EMI calculator

### 4. Contact Section
- Contact form for queries
- Query type selection
- Message submission

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Technologies Used

### Frontend
- HTML5
- CSS3 (Grid, Flexbox, Gradients)
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- CORS
- File System (for data storage)

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Real-time loan status tracking
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Document upload feature
- [ ] Payment gateway integration

## Development Notes

### Adding New Features
1. Update HTML structure in `index.html`
2. Add styling in `style.css`
3. Add functionality in `script.js`
4. Create new API endpoints in `server.js` if needed

### Debugging
- Open browser Developer Tools (F12)
- Check Console tab for JavaScript errors
- Check Network tab for API calls
- Check server console for backend logs

## Deployment

### Using Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Using Vercel (Frontend only)
```bash
vercel
```

### Using Docker
Create a `Dockerfile`:
```dockerfile
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

## Support

For issues or questions, contact through the website contact form.

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Disclaimer

This website provides general information about Indian banking rules and is based on public information from RBI and Banking Regulation Act, 1949. For official and updated information, always refer to the RBI official website: https://www.rbi.org.in/

---

**Last Updated:** November 13, 2025
