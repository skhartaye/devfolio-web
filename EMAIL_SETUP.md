# Email Setup Instructions

Your contact form now uses Resend to send emails directly from the backend.

## Setup Steps

1. **Sign up for Resend** (Free tier includes 100 emails/day)
   - Go to https://resend.com/signup
   - Create a free account

2. **Get your API Key**
   - Go to https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the API key

3. **Add API Key to Environment Variables**
   - Open `.env.local` file in your project root
   - Add your API key:
     ```
     RESEND_API_KEY=re_your_actual_api_key_here
     ```

4. **Restart your development server**
   ```bash
   npm run dev
   ```

## How It Works

- User fills out the contact form
- Form data is sent to `/api/contact` endpoint
- Backend uses Resend to send email to `mercadoskhartaye@gmail.com`
- User receives success/error message

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email at mercadoskhartaye@gmail.com
4. You should receive an email with the contact details

## Production Setup (Optional)

For production, you can verify your own domain with Resend:

1. Go to https://resend.com/domains
2. Add your domain (e.g., skhartaye.dev)
3. Add the DNS records provided by Resend
4. Update the `from` field in `app/api/contact/route.ts`:
   ```typescript
   from: 'Contact Form <noreply@skhartaye.dev>'
   ```

## Troubleshooting

- **Error 401**: Check your API key is correct
- **Error 500**: Check server logs for details
- **No email received**: Check spam folder, verify API key is set
- **Development mode**: Resend works in development with the test API key

## Alternative: Keep mailto (No Backend)

If you prefer not to use a backend service, you can revert to the mailto approach by removing the API route and restoring the previous contact form code.
