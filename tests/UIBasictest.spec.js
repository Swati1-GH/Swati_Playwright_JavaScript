const { test, expect } = require("@playwright/test");

test("Browser Context Playwright Test", async ({ browser }) => {
  //const context = await browser.newContext({ ignoreHTTPSErrors: true });

  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signIn = page.locator("[id='signInBtn']");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("rahulshettyl");
  await page.locator("[type='password']").fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();

  //console.log(await cardTitles.first().textContent());
  //console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("[id='signInBtn']");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await page.locator("#terms").click();
  console.log(await page.locator("#terms").isChecked());
  await expect(page.locator("[href*='documents']")).toHaveAttribute(
    "class",
    "blinkingTextss"
  );

  //await page.pause();
});

test("Open sub page", async ({ browser }) => {
  //const context = await browser.newContext({ ignoreHTTPSErrors: true });

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("[href*='documents']").click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domainName = arrayText[1].split(" ")[0];
  console.log(domainName);
  await page.locator("#username").fill(domainName);
  await page.pause();
  console.log(await page.locator("#username").textContent());
});
