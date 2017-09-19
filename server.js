const puppeteer = require('puppeteer');

const [ , , inputUrl, outputFile] = process.argv

async function main () {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  try {
    await page.goto(inputUrl, {waitUntil: 'load'});
  } catch(err) {
    console.log('Error: ', err);
    process.exit(1);
  }
  await page.pdf({path: outputFile, format: 'A4', landscape: true, printBackground: true});

  await browser.close();
}

if (inputUrl && outputFile) {
  main()
} else {
  console.log('inputUrl and outputFile are required')
  throw new Error('inputUrl and outputFile are required');
}
