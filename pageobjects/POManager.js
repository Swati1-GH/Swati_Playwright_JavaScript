const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CartPage } = require("./CartPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }

  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }
}

module.exports = { POManager };
