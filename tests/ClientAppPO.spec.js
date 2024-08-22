const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");

const dataSet = JSON.parse(
  JSON.stringify(require("../utils/placeorderTestData.json"))
);

for (const data of dataSet) {
  test(`Client Playwright Test ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getcartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPagePage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPagePage.SubmitAndGetOrderId();
    console.log(orderId);

    const ordersHistoryPage = poManager.getordersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}
/*
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageobjects/LoginPage");
const { DashboardPage } = require("../pageobjects/DashboardPage");

test("Client Playwright Test", async ({ page }) => {
  const productName = "ADIDAS ORIGINAL";
  const username = "swati.a.rastogi@gmail.com";
  const password = "Formul@1";
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goTo();
  await loginPage.validLogin(username, password);
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();

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

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rowCount = await page.locator("tbody tr");

  for (let j = 0; j < (await rowCount.count()); j++) {
    const rowOrderId = await rowCount.nth(j).locator("th").textContent();
    if (orderID.includes(rowOrderId)) {
      await rowCount.nth(j).locator(".btn").first().click();
      break;
    }
  }

  const orderDetails = await page.locator(".col-text").textContent();
  expect(orderID.includes(orderDetails)).toBeTruthy();
});
*/
