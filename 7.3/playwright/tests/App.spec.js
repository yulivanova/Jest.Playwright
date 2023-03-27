const { test, expect, chromium } = require("@playwright/test");
const { email, password, notEmail, notPassword} = require("../user.js");

test("Successful authorization", async ({ page }) => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });

  await page.goto("https://netology.ru/?modal=sign_in", { timeout: 60000 });
  await page.click('[name="email"]');   
  await page.fill('[placeholder="Email"]', email);    
  await page.click('[name="password"]');
  await page.fill('[placeholder="Пароль"]', password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page).toHaveURL("https://netology.ru/profile");
  const header = await page.locator("h2").first();
  await expect(header).toHaveText("Мои курсы и профессии");
  await page.screenshot({ path: "screenshot.png" });
  
  await browser.close();
});

test("Unsuccessful authorization", async ({ page }) => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });

  await page.goto("https://netology.ru/?modal=sign_in", { timeout: 60000 });
  await page.click('[name="email"]');   
  await page.fill('[placeholder="Email"]', notEmail);    
  await page.click('[name="password"]');
  await page.fill('[placeholder="Пароль"]', notPassword);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator("data-testid=login-error-hint")).toContainText("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: "screenshotErr.png" });
  
  await browser.close();
});