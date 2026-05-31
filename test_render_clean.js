const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { NotionRenderer } = require('react-notion-x');

const recordMap = JSON.parse(fs.readFileSync('recordMap.json', 'utf8'));

if (recordMap?.block) {
  Object.keys(recordMap.block).forEach((key) => {
    const block = recordMap.block[key];
    if (block?.value && !block.value.id) {
      delete recordMap.block[key];
    }
  });
}

try {
  const element = React.createElement(NotionRenderer, { recordMap });
  ReactDOMServer.renderToString(element);
  console.log("Render successful");
} catch (e) {
  console.error("Render failed:");
  console.error(e.stack);
}
