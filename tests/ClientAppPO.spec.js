const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageobjects/LoginPage");

test("Client Playwright Test", async ({ page }) => {
  const product = page.locator(".card-body");
  const productName = "ADIDAS ORIGINAL";
  const username = "swati.a.rastogi@gmail.com";
  const loginPage = new LoginPage(page);
  loginPage.goTo();
  loginPage.validLogin(username, password);
  // await page.goto("https://rahulshettyacademy.com/client/");
  //await page.locator("[id='userEmail']").fill(email);
  //await page.locator("[id='userPassword']").fill("Formul@1");
  //await page.locator("[id='login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  const loginPage = new LoginPage(page);
  const titles = await page.locator(".card-body b").allTextContents();
  //console.log(titles);
  const count = await product.count();
  for (let i = 0; i < count; ++i) {
    if ((await product.nth(i).locator("b").textContent()) === productName) {
      await product.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('Adidas Original')").isVisible();
  console.log(expect(bool).toBeTruthy());
  await page.locator("text='Checkout'").click();

  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    username
  );
  await page.locator(".action__submit ").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderID = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log("orderid is" + orderID);
  /*
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rowCount = await page.locator(" tbody tr");

  for (let j = 0; j < rowCount.count; j++) {
    const rowOrderId = await rowCount.nth(j).locator("th");
    if (orderID.includes(rowOrderId)) {
      await rows.nth(i).locator(".btn").first().click();
      break;
    }
  }

  const orderDetails = await page.locator(".col-text").textContent();
  expect(orderID.includes(orderDetails)).toBeTruthy();
  */
});
