// src/routes/api/contact/+server.js
import { sendEmail, emailConfig } from '$lib/config/email';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const { name, email, idea } = await request.json();
        
        // Send email to yourself with the form data
        const result = await sendEmail({
            to: emailConfig.auth.user,  // Sends to YOUR email address
            subject: `New Tool Idea from ${name || 'Anonymous'}`,
            text: `Name: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\nIdea: ${idea}`,
            html: `
                <h1>New Tool Idea Submission</h1>
                <p><strong>Name:</strong> ${name || 'Not provided'}</p>
                <p><strong>Email:</strong> ${email || 'Not provided'}</p>
                <p><strong>Idea:</strong></p>
                <p>${idea}</p>
            `
        });

        if (!result.success) {
            throw new Error('Failed to send email');
        }

        return json({ success: true, message: 'Idea submitted successfully!' });
    } catch (error) {
        console.error('Error:', error);
        return json({ success: false, error: error.message }, { status: 500 });
    }
}