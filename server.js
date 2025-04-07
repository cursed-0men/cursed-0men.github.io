const express = require('express');
const path = require('path');
const session = require('express-session');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const credentials = require('./credentials.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for session management
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/zen-mode.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'zen-mode.html'));
});

app.get('/habit-tracker.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'habit-tracker.html'));
});

// Authentication routes
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID || client_id, 
    process.env.GOOGLE_CLIENT_SECRET || client_secret, 
    process.env.GOOGLE_REDIRECT_URI || redirect_uris[0]
);

app.get('/auth', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.send'],
    });
    res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    req.session.email = tokens.email;
    res.redirect('/');
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.tokens = null;
    req.session.email = null;
    res.redirect('/login');
});

// Function to send email notification
async function sendEmailNotification(req, email, subject, text) {
    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID || client_id, 
        process.env.GOOGLE_CLIENT_SECRET || client_secret, 
        process.env.GOOGLE_REDIRECT_URI || redirect_uris[0]
    );
    auth.setCredentials(req.session.tokens);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: email,
            clientId: process.env.GOOGLE_CLIENT_ID || client_id,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || client_secret,
            refreshToken: req.session.tokens.refresh_token,
            accessToken: req.session.tokens.access_token,
        },
    });

    const mailOptions = {
        from: email,
        to: email,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
}

// Create multiple Google Calendar events for 21 days
app.post('/create-multiple-events', async (req, res) => {
    const { events } = req.body;

    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID || client_id, 
        process.env.GOOGLE_CLIENT_SECRET || client_secret, 
        process.env.GOOGLE_REDIRECT_URI || redirect_uris[0]
    );
    auth.setCredentials(req.session.tokens);

    const calendar = google.calendar({ version: 'v3', auth });

    try {
        for (const event of events) {
            const startDate = new Date(event.start);
            const duration = event.duration || 21; // Default to 21 days if not specified

            for (let i = 0; i < duration; i++) {
                const eventStart = new Date(startDate);
                eventStart.setDate(startDate.getDate() + i);
                const eventEnd = new Date(eventStart);
                eventEnd.setDate(eventEnd.getDate() + 1); // 1-day events

                await calendar.events.insert({
                    calendarId: 'primary',
                    resource: {
                        summary: event.title,
                        start: {
                            dateTime: eventStart.toISOString(),
                            timeZone: 'Asia/Kolkata',
                        },
                        end: {
                            dateTime: eventEnd.toISOString(),
                            timeZone: 'Asia/Kolkata',
                        },
                    },
                });

                // Send email notification
                await sendEmailNotification(req, req.session.email, 'New Habit Added', `You have added a new habit: ${event.title} for ${duration} days.`);
            }
        }

        res.status(200).send('Events created and notifications sent successfully');
    } catch (error) {
        console.error('Error creating calendar events or sending email:', error);
        res.status(500).send('Error creating events or sending notifications');
    }
});

// Create Google Calendar event with specified start and end date
app.post('/create-event', async (req, res) => {
    const { title, start, duration } = req.body;

    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID || client_id, 
        process.env.GOOGLE_CLIENT_SECRET || client_secret, 
        process.env.GOOGLE_REDIRECT_URI || redirect_uris[0]
    );
    auth.setCredentials(req.session.tokens);

    const calendar = google.calendar({ version: 'v3', auth });

    try {
        const events = [];
        const startDate = new Date(start);

        for (let i = 0; i < duration; i++) {
            const eventStart = new Date(startDate);
            eventStart.setDate(startDate.getDate() + i);
            const eventEnd = new Date(eventStart);
            eventEnd.setDate(eventEnd.getDate() + 1); // 1-day events

            events.push({
                summary: title,
                start: {
                    dateTime: eventStart.toISOString(),
                    timeZone: 'Asia/Kolkata',
                },
                end: {
                    dateTime: eventEnd.toISOString(),
                    timeZone: 'Asia/Kolkata',
                },
            });
        }

        for (const event of events) {
            await calendar.events.insert({
                calendarId: 'primary',
                resource: event,
            });

            console.log('Sending email to:', req.session.email);
            await sendEmailNotification(req, req.session.email, 'New Habit Added', `You have added a new habit: ${title} for ${duration} days.`);
        }

        res.status(200).send('Events created and notification sent successfully');
    } catch (error) {
        console.error('Error creating calendar event or sending email:', error);
        res.status(500).send('Error creating event or sending notification');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
