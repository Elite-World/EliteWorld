'use server';

import { Client } from '@notionhq/client';
import { Resend } from 'resend';

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID_LEADS || '';

export async function submitConsultationAction(formData: FormData) {
  try {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const objective = formData.get('objective') as string;
    const details = formData.get('details') as string;

    const fullName = `${firstName} ${lastName}`.trim();

    // 1. Send to Notion
    if (NOTION_DATABASE_ID && process.env.NOTION_API_KEY) {
      try {
        const notion = new Client({ auth: process.env.NOTION_API_KEY });
        await notion.pages.create({
          parent: { database_id: NOTION_DATABASE_ID },
          properties: {
            "Last Name": {
              title: [
                { text: { content: lastName || "Unknown" } }
              ]
            },
            "First Name": {
              rich_text: [
                { text: { content: firstName || "" } }
              ]
            },
            "Email": {
              email: email || null
            },
            "Whatsapp": {
              rich_text: [
                { text: { content: whatsapp || "" } }
              ]
            },
            "Objective": {
              rich_text: [
                { text: { content: objective || "" } }
              ]
            },
            "Additional Details": {
              rich_text: [
                { text: { content: details || "" } }
              ]
            }
          }
        });
      } catch (notionError: any) {
        console.error("Notion API Error:", notionError.message);
        // Note: we continue even if Notion fails, so we can still try to send the email
      }
    }

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Elite World Advisory <onboarding@resend.dev>', // Resend sandbox testing email
          to: 'advisory@eliteworld.top', // The user's requested email
          subject: `New Consultation Request: ${fullName}`,
          html: `
            <h2>New Advisory Consultation Request</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp/WeChat:</strong> ${whatsapp}</p>
            <p><strong>Objective:</strong> ${objective}</p>
            <p><strong>Details:</strong></p>
            <blockquote>${details || 'No additional details provided.'}</blockquote>
          `
        });
      } catch (emailError: any) {
        console.error("Resend API Error:", emailError.message);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "Failed to submit consultation" };
  }
}
