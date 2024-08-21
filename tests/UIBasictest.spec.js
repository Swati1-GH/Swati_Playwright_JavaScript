const { test, expect } = require("@playwright_Swati/test");

test("Browser Playwright Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const cardTitles = page.locator(".card-body a");
  const signIn = page.locator("#signInBtn");
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await userName.fill("rahulshetty");
  await password.fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  console.log(await cardTitles.nth(2).textContent());
  console.log(await cardTitles.last().textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("UI Tests", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");
  await userName.fill("rahulshetty");
  await password.fill("learning");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();

  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#okayBtn").click();

  await page.locator("#terms").click();

  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("Child windows handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").fill(domain);
  //await page.pause();
  console.log(await page.locator("#username").textContent());
});
