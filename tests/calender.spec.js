import { test, expect } from "@playwright/test";

test("Calendar validations", async ({ page }) => {
  const month = "6";
  const date = "22";
  const year = "2027";

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label__label").click();
  await page.locator(".react-calendar__navigation__label__label").click();
  await page.getByText(year).click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(month) - 1)
    .click();
  await page.locator("//abbr [text()='" + date + "']").click();
});
