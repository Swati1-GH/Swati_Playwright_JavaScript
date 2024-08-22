class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderIdDetails = page.locator(".col-text");
  }

  async searchOrderAndSelect(orderId) {
    await ordersTable.waitFor();
    for (let j = 0; j < (await this.rows.count()); j++) {
      const rowOrderId = await rowCount.nth(j).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await rowCount.nth(j).locator(".btn").first().click();
        break;
      }
    }
  }

  async getOrderId() {
    return await this.orderIdDetails.textContent();
    expect(orderId.includes(orderDetails)).toBeTruthy();
  }
}

module.exports = { OrdersHistoryPage };
