import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Re-use the existing Notion Provider logic to keep things clean, but for a Cron we can just use the raw client 
// to quickly query the last 24 hours.

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const SUBSCRIBERS_DB_ID = '37f211377454807ca364c974514e4fc7';
// Assuming your CMS database ID is configured here:
const CMS_DB_ID = process.env.NOTION_DATABASE_ID || '';

export async function GET(request: Request) {
  // 1. Authenticate the Cron request
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  if (!process.env.NOTION_API_KEY || !resend || !CMS_DB_ID) {
    return new NextResponse('Server configuration missing', { status: 500 });
  }

  try {
    // 2. Fetch Articles Published in the Last 24 Hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayIso = yesterday.toISOString();

    const articlesResponse = await fetch(`https://api.notion.com/v1/databases/${CMS_DB_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: 'Status',
              select: {
                equals: 'Published',
              },
            },
            {
              property: 'Date',
              date: {
                on_or_after: yesterdayIso,
              },
            },
          ],
        },
      }),
    });

    if (!articlesResponse.ok) {
      throw new Error(`Failed to fetch articles: ${await articlesResponse.text()}`);
    }

    const articlesData = await articlesResponse.json();
    const newArticles = articlesData.results as any[];

    if (newArticles.length === 0) {
      return NextResponse.json({ message: 'No new articles published today.' });
    }

    // 3. Extract Categories of the New Articles
    const newCategories = new Set<string>();
    newArticles.forEach((article) => {
      const category = article.properties?.Category?.select?.name;
      if (category) {
        newCategories.add(category);
      }
    });

    if (newCategories.size === 0) {
      return NextResponse.json({ message: 'New articles found, but no valid categories.' });
    }

    // 4. Fetch All Subscribers
    const subscribersResponse = await fetch(`https://api.notion.com/v1/databases/${SUBSCRIBERS_DB_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    });

    if (!subscribersResponse.ok) {
      throw new Error(`Failed to fetch subscribers: ${await subscribersResponse.text()}`);
    }

    const subscribersData = await subscribersResponse.json();
    const subscribers = subscribersData.results as any[];

    // 5. Match Subscribers to New Articles & Send Emails
    const emailPromises: Promise<any>[] = [];
    let emailsSent = 0;

    subscribers.forEach((sub) => {
      const email = sub.properties?.Email?.title?.[0]?.plain_text;
      const subCategories = sub.properties?.Categories?.multi_select?.map((c: any) => c.name) || [];

      if (!email) return;

      // Check if subscriber wants "All Updates" or specifically matches one of the new categories
      const wantsAll = subCategories.includes('All Updates');
      const matchedCategories = Array.from(newCategories).filter(c => subCategories.includes(c));

      if (wantsAll || matchedCategories.length > 0) {
        const categoriesText = wantsAll ? 'our latest topics' : matchedCategories.join(' and ');
        
        emailPromises.push(
          resend.emails.send({
            from: 'Elite World Insights <newsletter@updates.eliteworld.top>', 
            to: email,
            subject: 'New Insights Available from Elite World!',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <h2 style="color: #2563eb;">Fresh Insights Just For You</h2>
                <p>Hi there,</p>
                <p>We just published new content covering <strong>${categoriesText}</strong>!</p>
                <p>Head over to our website to read the latest updates and stay ahead of the curve.</p>
                <br/>
                <a href="https://eliteworld.education" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Read the Latest</a>
                <br/><br/>
                <p>Best regards,<br/><strong>The Elite World Team</strong></p>
              </div>
            `,
          })
        );
        emailsSent++;
      }
    });

    // Send all emails in parallel
    await Promise.allSettled(emailPromises);

    return NextResponse.json({ 
      success: true, 
      message: `Sent ${emailsSent} update emails.`,
      categoriesTriggered: Array.from(newCategories)
    });

  } catch (error: any) {
    console.error('Cron job error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
