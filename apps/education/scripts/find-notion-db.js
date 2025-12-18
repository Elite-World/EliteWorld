const { Client } = require('@notionhq/client');

// Using the key provided by the user in the chat
const auth = 'ntn_V88787815245wDv1iRXUIDhzz3Noyxq8fZoLOJadxBX7bo';

const notion = new Client({ auth });

(async () => {
  console.log('Attempting to list databases...');
  try {
    // Using raw request to be safe from SDK wrapper issues
    const response = await notion.request({
      path: 'search',
      method: 'post',
      body: {
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time'
        }
      }
    });

    console.log(`Success! Found ${response.results.length} accessible database(s):`);
    
    response.results.forEach(db => {
      // Extract title safely
      const title = db.title && db.title.length > 0 
        ? db.title.map(t => t.plain_text).join('') 
        : 'Untitled';
        
      console.log('--------------------------------------------------');
      console.log(`Name: "${title}"`);
      console.log(`ID:   ${db.id}`);
      console.log(`URL:  ${db.url}`);
    });
    
    if (response.results.length === 0) {
      console.log('--------------------------------------------------');
      console.log('No databases found. Please ensure you have shared the database with the integration.');
      console.log('Go to the Database page -> ... menu -> Connections -> Add connections -> Select your integration.');
    }

  } catch (error) {
    console.error('Error connecting to Notion:', error.code, error.message);
    if (error.code === 'unauthorized') {
      console.error('The API Key seems invalid. Please double check the "Internal Integration Secret".');
    }
  }
})();
