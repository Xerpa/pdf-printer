const puppeteer = require('puppeteer');

const [ , , inputUrl, outputFile] = process.argv

async function main () {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  try {
    var response = await page.goto(inputUrl, {waitUntil: 'load'});
  } catch(err) {
    console.log('Error: ', err);
    process.exit(1);
  }

  if (response.ok) {
    await page.pdf({path: outputFile, format: 'A4', landscape: true, printBackground: true});
  } else {
    console.log('Error: Invalid status(', response.status, ')');
    process.exit(1);
  }

  await browser.close();
}

if (inputUrl && outputFile) {
  main()
} else {
  console.log('inputUrl and outputFile are required')
  throw new Error('inputUrl and outputFile are required');
}
