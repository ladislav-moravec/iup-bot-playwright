import { test, expect } from '@playwright/test';

test('Go to page and click button', async ({ page }) => {
  // Go to the specified URL
  await page.goto('https://www.iup.cz/nasledne-vzdelavani/');

  // Wait for the button with specific class to appear and click it
  await page.waitForSelector('a.btn.btn-success.read_news_nv'); // Wait for button to be visible
  await page.click('a.btn.btn-success.read_news_nv'); // Click the button

  // Optionally, verify some action has taken place, e.g., check for a response
  await expect(page).toHaveURL('https://www.iup.cz/nasledne-vzdelavani/'); // Verify URL stays the same or add specific URL logic here

  // Additional verification could go here.
});


test('Login, fill in email and password, and submit form', async ({ page }) => {
  // Go to the specified page
  await page.goto('https://www.iup.cz/nasledne-vzdelavani/', { waitUntil: 'domcontentloaded' }); // Ensures the DOM is loaded

  // Click the 'Přihlásit se' link to navigate to the registration page
  await page.click('a[href="https://www.iup.cz/registrace/"]');

  // Verify navigation to the registration page
  await expect(page).toHaveURL('https://www.iup.cz/registrace/');

  // Fill in the email input field
  await page.fill('#email', 'moravec.ld@gmail.com');

  // Fill in the password input field
  await page.fill('#heslo', 'psIUP2121-');

  // Click the submit button to send the form
  await page.click('button[type="submit"].btn.btn-primary');

  // Wait for the page to load after submission (use an explicit wait here if necessary)
  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }); // Adjust timeout as needed

  // Click on the "Následné vzdělávání" link
  const nasledneLink = page.locator('a[href="/nasledne-vzdelavani/"][aria-current="page"]');
  await expect(nasledneLink).toBeVisible();  // Verify it's visible before clicking
  await nasledneLink.click();

  // Verify that the URL changes to the expected page
  await expect(page).toHaveURL('https://www.iup.cz/nasledne-vzdelavani/');

  // Wait for the "Studovat oblast legislativy ČNB" button to appear
  const studyButton = page.locator('a.spustitS[data-learn="true"][data-id="55887"]');
  await studyButton.waitFor({ state: 'visible', timeout: 5000 });  // Wait for the button to appear

  // Scroll to the button if it's not in view
  await studyButton.scrollIntoViewIfNeeded();

  // Click on the "Studovat oblast legislativy ČNB" button
  await studyButton.click();
});
