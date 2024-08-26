const { test, expect } = require("@playwright/test");

test("Client Playwright Test", async ({ page }) => {
  const products = page.locator(".card-body");
  const productName = "ADIDAS ORIGINAL";
  const email = "swati.a.rastogi@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Formul@1");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
  console.log(expect(bool).toBeTruthy());
  await page.locator("text=Checkout").click();
  const input = page.locator("[placeholder*='Country']");
  await input.fill("india", { delay: 500 });
  await input.press("Backspace");
  await input.press("Backspace");

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("[type*='button']").count();
  for (let i = 0; i < optionsCount; i++) {
    let text = await dropdown.locator("[type*='button']").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("[type*='button']").nth(i).click();
      break;
    }
  }

  expect(page.locator(".mt-5 [type*='text']").first()).toHaveText(email);
  await page.locator(".action__submit.ng-star-inserted").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  await page.locator(".fa-handshake-o").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);
    if (rowOrderId.includes(orderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  //await page.locator(".email-container").waitFor();
  //const orderIdDetails = await page.locator(".col-text").textContent();
  //expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
