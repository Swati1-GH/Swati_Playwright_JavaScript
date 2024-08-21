class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInbutton = page.locator("[id='login']");
    this.userName = page.locator("[id='userEmail']");
    this.password = page.locator("[id='userPassword']");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };
