# Quick Start Guide

## 🚀 Get the Website Running in 5 Minutes

### Step 1: Install Node.js
Download from: https://nodejs.org/ (LTS version recommended)

### Step 2: Navigate to Project
```bash
cd "c:\Users\Ashok\OneDrive\Desktop\Cursor.ai\New folder\bank-website"
```

### Step 3: Install Dependencies
```bash
npm install
```
This installs Express and CORS packages needed for the backend.

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
🏦 Bank Portal API running on http://localhost:3000
📁 Data directory: ...\data
```

### Step 5: Open in Browser
Go to: http://localhost:3000

## 📁 Project Files

| File | Purpose |
|------|---------|
| `index.html` | Main website with all sections |
| `style.css` | Beautiful styling and layouts |
| `script.js` | Frontend interactivity |
| `server.js` | Backend API server |
| `package.json` | Project dependencies |

## 🎯 Features You Can Try

1. **Navigate Sections** - Click navbar links to explore different pages
2. **Submit Forms** - Try the account interest and contact forms
3. **EMI Calculator** - Enter loan amount, rate, and tenure to calculate monthly payment
4. **Responsive Design** - Resize browser to see mobile layout

## 📊 What Gets Saved

When you submit forms:
- Data goes to `data/account_interests.json` or `data/contacts.json`
- Check these files to see stored data

## 🔍 API Testing

You can test the API using curl or any API tool:

```bash
# Health check
curl http://localhost:3000/api/health

# Get banking info
curl http://localhost:3000/api/banking-info

# Submit account interest
curl -X POST http://localhost:3000/api/account-interest \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"John Doe\",\"email\":\"john@test.com\",\"phone\":\"9876543210\",\"primaryDoc\":\"aadhaar\"}"
```

## 🛑 Stop the Server

Press `Ctrl + C` in terminal to stop the server.

## 💡 Next Steps

- Customize colors in `style.css`
- Add more sections to `index.html`
- Add database integration (MongoDB, PostgreSQL)
- Deploy to Heroku or Vercel

## ⚠️ Troubleshooting

### Port 3000 already in use?
```bash
npm start -- --port 3001
```

### npm not found?
Make sure Node.js is installed and added to PATH. Restart your terminal.

### Styles not loading?
Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

## 📞 Forms Data Location

After submitting forms, check:
- `data/account_interests.json` - Account inquiries
- `data/contacts.json` - Contact messages

Happy coding! 🎉
