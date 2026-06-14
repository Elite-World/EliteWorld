'use server';

import { Client } from '@notionhq/client';
import { Resend } from 'resend';

const DATABASE_ID = '37f211377454807ca364c974514e4fc7';

export async function subscribeToNewsletter(email: string, categories: string[]) {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email');
  }

  // Fallback to empty array if undefined
  const safeCategories = Array.isArray(categories) ? categories : [];

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  try {
    // 1. Check if user already exists
    if (process.env.NOTION_API_KEY) {
      const existingResponse = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: 'Email',
            title: {
              equals: email,
            },
          },
        }),
      });

      if (!existingResponse.ok) {
        throw new Error('Failed to check existing subscriber');
      }

      const existingData = await existingResponse.json();

      const multiSelectCategories = safeCategories.map((cat) => ({ name: cat }));

      if (existingData.results.length > 0) {
        // Update existing subscriber
        const pageId = existingData.results[0].id;
        
        // Overwrite categories instead of merging
        await notion.pages.update({
          page_id: pageId,
          properties: {
            Categories: {
              multi_select: multiSelectCategories,
            },
          },
        });
        
        // Send an "Updated" email instead of Welcome
        if (resend) {
          const { data, error: sendError } = await resend.emails.send({
            from: 'Elite World Insights <newsletter@updates.eliteworld.top>', 
            to: email,
            subject: 'Subscription Updated - Elite World',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <h2 style="color: #2563eb;">Subscription Updated</h2>
                <p>Hi there,</p>
                <p>Your subscription preferences have been successfully updated to: <strong>${safeCategories.join(', ')}</strong>.</p>
                <br/>
                <p>Best regards,<br/><strong>The Elite World Team</strong></p>
              </div>
            `,
          });
          
          if (sendError) {
            console.error('Resend API Error (Update):', sendError);
          } else {
            console.log('Update email sent successfully:', data);
          }
        } else {
          console.warn('RESEND_API_KEY is missing. Update email not sent.');
        }
        return { success: true, updated: true };
      } else {
        // Create new subscriber
        await notion.pages.create({
          parent: { database_id: DATABASE_ID },
          properties: {
            Email: {
              title: [
                {
                  text: {
                    content: email,
                  },
                },
              ],
            },
            Categories: {
              multi_select: multiSelectCategories,
            },
            'Subscribed Date': {
              date: {
                start: new Date().toISOString(),
              },
            },
          },
        });
      }
    } else {
      console.warn('NOTION_API_KEY not found. Skipping Notion insert.');
    }

    // 2. Send Welcome Email
    if (resend) {
      const { data, error: sendError } = await resend.emails.send({
        from: 'Elite World Insights <newsletter@updates.eliteworld.top>', 
        to: email,
        subject: 'Welcome to Elite World Insights!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #2563eb;">Welcome to Elite World!</h2>
            <p>Hi there,</p>
            <p>Thank you for subscribing to our updates! You have successfully subscribed to: <strong>${safeCategories.join(', ')}</strong>.</p>
            <p>We'll be sending you the latest insights, tips, and news directly to your inbox so you never miss an update.</p>
            <br/>
            <p>Best regards,<br/><strong>The Elite World Team</strong></p>
          </div>
        `,
      });

      if (sendError) {
        console.error('Resend API Error (Welcome):', sendError);
      } else {
        console.log('Welcome email sent successfully:', data);
      }
    } else {
      console.warn('RESEND_API_KEY not found. Skipping welcome email.');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    // We throw an error so the frontend can catch it and show the error state
    throw new Error(error.message || 'Failed to subscribe');
  }
}
