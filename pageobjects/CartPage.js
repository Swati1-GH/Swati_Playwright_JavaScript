const { test, expect } = require("@Playright_Swati/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.checkout = page.locator("text='Checkout'");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.cart = page.locator("button[routerlink*='myorders']");
  }

  async VerifyProductIsDisplayed(productName) {
    await this.cartProducts.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async Checkout() {
    await this.checkout.click();
  }

  async getProductLocator(productName) {
    return this.page.locator("h3:has-text(" + productName + ")");
  }
}

module.exports = { CartPage };
