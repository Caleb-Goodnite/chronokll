// src/lib/config/email.js
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';

export const emailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: env.EMAIL_USER,  // Your Gmail address
        pass: env.EMAIL_PASSWORD  // Your Gmail App Password
    },
    tls: {
        rejectUnauthorized: false
    }
};

export async function sendEmail({ to, subject, text, html }) {
    const transporter = nodemailer.createTransport(emailConfig);
    
    try {
        await transporter.sendMail({
            from: `"Chronokl" <${env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });
        return { success: true };
    } catch (error) {
        console.error('Email send failed:', error);
        return { success: false, error: error.message };
    }
}