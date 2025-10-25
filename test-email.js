import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

// Debug log environment variables
console.log('Environment variables:', {
    EMAIL_SERVER: process.env.EMAIL_SERVER ? '***' : 'Not set',
    EMAIL_PORT: process.env.EMAIL_PORT ? '***' : 'Not set',
    EMAIL_USER: process.env.EMAIL_USER ? '***' : 'Not set',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? '***' : 'Not set',
    EMAIL_FROM: process.env.EMAIL_FROM ? '***' : 'Not set',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? '***' : 'Not set',
    NODE_ENV: process.env.NODE_ENV || 'development'
});

async function sendTestEmail() {
    // Create a test account if in development
    let testAccount;
    if (process.env.NODE_ENV === 'development') {
        testAccount = await nodemailer.createTestAccount();
    }

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER || testAccount?.smtp?.host,
        port: parseInt(process.env.EMAIL_PORT || testAccount?.smtp?.port || '587', 10),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER || testAccount?.user,
            pass: process.env.EMAIL_PASSWORD || testAccount?.pass
        },
        tls: {
            rejectUnauthorized: false // Only for development!
        }
    });

    // Verify connection configuration
    try {
        await transporter.verify();
        console.log('Server is ready to take our messages');
    } catch (error) {
        console.error('SMTP Connection Error:', error);
        throw new Error(`SMTP Connection Error: ${error.message}`);
    }

    // Send test email
    const info = await transporter.sendMail({
        from: `"Chronokl Test" <${process.env.EMAIL_FROM || testAccount?.user}>`,
        to: process.env.ADMIN_EMAIL || 'test@example.com',
        subject: 'Test Email from Chronokl',
        text: 'This is a test email from Chronokl',
        html: '<p>This is a <b>test email</b> from Chronokl</p>'
    });

    console.log('Message sent: %s', info.messageId);
    
    // Preview only available when sending through an Ethereal account
    if (testAccount) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}

sendTestEmail().catch(console.error);
