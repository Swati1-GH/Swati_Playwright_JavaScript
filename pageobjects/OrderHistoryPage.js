class OrderHistoryPage {
  constructor(page) {
    this.page = page;
    this.historyPage = page.locator(".btn-custom");
    this.ordersTable = page.locator(".thead-dark");
    this.rows = page.locator("tbody tr");
    this.orderIdDetails = page.locator(".col-text");
  }

  async searchOrderAndSelect(orderId) {
    await this.historyPage.nth(1).click();
    await this.ordersTable.waitFor();
    for (let j = 0; j < (await this.rows.count()); ++j) {
      const rowOrderId = await this.rows.nth(j).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await this.rows.nth(j).locator(".btn").first().click();
        break;
      }
    }
  }

  async getOrderId() {
    return await this.orderIdDetails.textContent();
    //expect(orderId.includes(orderDetails)).toBeTruthy();
  }
}

module.exports = { OrderHistoryPage };
