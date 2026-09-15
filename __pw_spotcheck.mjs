import { chromium, devices } from "playwright";
const iphone = devices["iPhone 13"];
const browser = await chromium.launch();
const context = await browser.newContext({ ...iphone });
const page = await context.newPage();

const pages = [
  ["home", "http://localhost:3000/"],
  ["experts", "http://localhost:3000/experts"],
  ["reels", "http://localhost:3000/reels"],
  ["blog", "http://localhost:3000/blog"],
  ["dashboard", "http://localhost:3000/dashboard"],
];

for (const [name, url] of pages) {
  await page.goto(url, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(600);
  await page.screenshot({ path: `./__pw_shots2/${name}.png` });
}
await browser.close();
console.log("DONE");
