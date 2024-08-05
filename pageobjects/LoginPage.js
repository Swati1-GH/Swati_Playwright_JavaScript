class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInbutton = page.locator("[id='login']");
    this.userName = page.locator("[id='userEmail']");
    this.password = page.locator("[id='userPassword']");
  }

  async goTo() {
    await this.page.goTo("https://rahulshettyacademy.com/client/");
  }

  async validLogin(username, password) {
    await this.userName.fill(email);
    await this.password.fill("Formul@1");
    await this.signInbutton.click();
  }
}

module.export = { LoginPage };
