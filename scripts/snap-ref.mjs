import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('https://datawhalechina.github.io/easy-vibe/zh-cn/', {
  waitUntil: 'networkidle2',
  timeout: 30000,
});
await page.screenshot({ path: '/tmp/ref-hero.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
await page.screenshot({ path: '/tmp/ref-full.png', fullPage: true });
await browser.close();
console.log('done');
