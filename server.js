const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Data storage (in production, use a database)
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// API Routes

// Get all account interests
app.get('/api/account-interests', (req, res) => {
    try {
        const dataFile = path.join(dataDir, 'account_interests.json');
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf-8');
            res.json(JSON.parse(data));
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error reading account interests:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Submit account interest form
app.post('/api/account-interest', (req, res) => {
    try {
        const { fullName, email, phone, primaryDoc, timestamp } = req.body;

        // Validate input
        if (!fullName || !email || !phone || !primaryDoc) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Store data
        const dataFile = path.join(dataDir, 'account_interests.json');
        let interests = [];
        
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf-8');
            interests = JSON.parse(data);
        }

        const newEntry = {
            id: Date.now(),
            fullName,
            email,
            phone,
            primaryDoc,
            timestamp,
            status: 'pending'
        };

        interests.push(newEntry);
        fs.writeFileSync(dataFile, JSON.stringify(interests, null, 2));

        console.log('Account interest submitted:', newEntry);
        res.json({ success: true, message: 'Account interest recorded', id: newEntry.id });
    } catch (error) {
        console.error('Error submitting account interest:', error);
        res.status(500).json({ success: false, message: 'Error processing request' });
    }
});

// Get all contact messages
app.get('/api/contacts', (req, res) => {
    try {
        const dataFile = path.join(dataDir, 'contacts.json');
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf-8');
            res.json(JSON.parse(data));
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error reading contacts:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Submit contact form
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, phone, queryType, message, timestamp } = req.body;

        // Validate input
        if (!name || !email || !phone || !queryType || !message) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Store data
        const dataFile = path.join(dataDir, 'contacts.json');
        let contacts = [];
        
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf-8');
            contacts = JSON.parse(data);
        }

        const newContact = {
            id: Date.now(),
            name,
            email,
            phone,
            queryType,
            message,
            timestamp,
            status: 'new'
        };

        contacts.push(newContact);
        fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2));

        console.log('Contact message submitted:', newContact);
        res.json({ success: true, message: 'Message received', id: newContact.id });
    } catch (error) {
        console.error('Error submitting contact:', error);
        res.status(500).json({ success: false, message: 'Error processing request' });
    }
});

// Get banking info
app.get('/api/banking-info', (req, res) => {
    const info = {
        rules: {
            title: 'Indian Banking Rules',
            authority: 'RBI and Banking Regulation Act, 1949',
            requirements: [
                'Customer protection policies',
                'Fair practices code',
                'Legal risk management',
                'Anti-money laundering (AML)',
                'Know Your Customer (KYC)'
            ]
        },
        accountOpening: {
            documents: [
                'Passport',
                'PAN Card',
                'Voter\'s ID',
                'Aadhaar',
                'Driving License',
                'Ration Card',
                'Latest Electricity/Telephone Bill'
            ],
            requirements: [
                'KYC verification mandatory',
                'Address verification required',
                'Government-issued ID',
                'Recent address proof'
            ]
        },
        loans: {
            eligibility: {
                ageMin: 21,
                ageMaxSalaried: 60,
                ageMaxSelfEmployed: 65,
                minIncome: '₹15,000 - ₹25,000/month',
                creditScore: '700+'
            },
            products: [
                { name: 'Home Loans', rate: '~8.6% p.a.' },
                { name: 'Personal Loans', rate: '9% onwards' },
                { name: 'Pensioner Schemes', rate: 'Special Rates' },
                { name: 'Auto Loans', rate: 'Competitive Rates' }
            ]
        }
    };
    res.json(info);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Bank Portal API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🏦 Bank Portal API running on http://localhost:${PORT}`);
    console.log(`📁 Data directory: ${dataDir}`);
});
