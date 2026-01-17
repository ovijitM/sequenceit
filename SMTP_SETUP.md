# SMTP Email Configuration Guide

This project now supports two email methods:

1. **EmailJS** (existing) - No backend required
2. **SMTP via Google** (new) - Uses Gmail SMTP with nodemailer

## Setting up SMTP with Google Gmail

### 1. Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### 2. Generate App Password

1. Go to **App passwords**: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: "Verve Digital Website"
5. Click **Generate**
6. Copy the 16-character app password

### 3. Add Environment Variables

Create or update your `.env` file:

```env
# SMTP Configuration for Google
SMTP_EMAIL=sequenceitbd@gmail.com
SMTP_PASSWORD=your_16_character_app_password_here
```

### 4. Deploy to Vercel

If deploying to Vercel, add these environment variables in your project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `SMTP_EMAIL` = `sequenceitbd@gmail.com`
   - `SMTP_PASSWORD` = `your_app_password`

## How It Works

### Contact Form

- Users can select between **SMTP (Google)** or **EmailJS** from a dropdown
- Default is set to **SMTP (Google)**
- Form submissions are sent to `sequenceitbd@gmail.com`

### API Endpoint

- **Route**: `/api/send-email`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Company Name",
    "message": "Message content"
  }
  ```

### Email Format

The received email will include:

- Sender's name
- Sender's email (set as reply-to)
- Company name (if provided)
- Message content
- Professional HTML formatting

## Testing Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` file with your SMTP credentials:

   ```env
   SMTP_EMAIL=sequenceitbd@gmail.com
   SMTP_PASSWORD=your_app_password_here
   ```

3. Start both the development server and API server:

   ```bash
   npm run dev:all
   ```

   Or run them separately in two terminals:
   - Terminal 1: `npm run dev` (Frontend on port 8080)
   - Terminal 2: `npm run dev:api` (API server on port 3001)

4. Open your browser to `http://localhost:8080`

5. The contact form will proxy API requests from port 8080 to port 3001

## Important Notes

- **EmailJS** configuration remains unchanged and continues to work
- The **SMTP** method is now the default option in the contact form
- Both email methods are fully functional and can be switched on-the-fly
- Never commit your `.env` file with real credentials
- Use App Passwords, not your regular Gmail password
- The SMTP method requires a backend, so it uses Vercel Serverless Functions

## Troubleshooting

### "Invalid login" error

- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google account

### Emails not being received

- Check your spam/junk folder
- Verify the SMTP_EMAIL environment variable is correct
- Check Vercel logs for any errors

### Local development issues

- Make sure your `.env` file is in the root directory
- Restart the development server after changing environment variables
