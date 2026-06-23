'use server';

import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { NOTION_CONFIG } from '@repo/tooling/notion';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionX = new NotionAPI();

export async function unlockArticle(articleId: string, passwordAttempt: string) {
  if (!process.env.NOTION_API_KEY) {
    throw new Error('Server configuration error');
  }

  try {
    // 1. Fetch the properties of the Notion page to check the real password
    // Convert hyphenated UUID back to non-hyphenated if necessary, or just pass it
    const page: any = await notion.pages.retrieve({ page_id: articleId });
    
    const P = NOTION_CONFIG.PROPERTIES;
    const actualPassword = page.properties['Password']?.rich_text?.[0]?.plain_text;

    if (!actualPassword) {
      // If there's no password set in the DB, it shouldn't be gated anyway.
      return { success: false, message: 'Article is not password protected.' };
    }

    if (actualPassword !== passwordAttempt) {
      return { success: false, message: 'Incorrect password.' };
    }

    // 2. Password matches! Fetch the full recordMap via NotionX
    // Since this is the server action, we return the FULL recordMap without slicing it.
    const recordMap = await notionX.getPage(articleId);

    // 1. Globally unwrap blocks to fix notion-client double-wrapping
    Object.keys(recordMap.block).forEach(key => {
      const b = recordMap.block[key];
      if ((b as any)?.value?.value) {
        recordMap.block[key] = {
          role: b.role || (b as any).value.role,
          value: (b as any).value.value
        };
      }
    });

    // Optional: We can still remove the Quote block with "Password" so it doesn't render 
    // as an ugly quote block in the final article.
    const pageBlockId = Object.keys(recordMap.block).find(id => id.replace(/-/g, '') === articleId.replace(/-/g, ''));
    if (pageBlockId) {
      const pageBlock = recordMap.block[pageBlockId];
      if (pageBlock?.value?.content) {
        const contentIds: string[] = pageBlock.value.content;
        const markerIndex = contentIds.findIndex(id => {
          const b = recordMap.block[id];
          const blockData = b?.value;
          if (blockData?.type === 'quote') {
            const titleArr = blockData.properties?.title;
            if (titleArr && titleArr[0] && titleArr[0][0]) {
              return titleArr[0][0].trim().toLowerCase() === 'password';
            }
          }
          return false;
        });

        if (markerIndex !== -1) {
          const markerId = contentIds[markerIndex];
          contentIds.splice(markerIndex, 1);
          delete recordMap.block[markerId];
        }
      }
    }

    return { success: true, recordMap };
  } catch (error) {
    console.error('Error unlocking article:', error);
    return { success: false, message: 'Failed to unlock article. Please try again later.' };
  }
}
