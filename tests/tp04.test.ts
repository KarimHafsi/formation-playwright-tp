import { test, expect, Page } from '@playwright/test';

const email = 'test.test@test.com';
const password = 'test1234';
const product = {
  title: `Machine à café rouge de la marque nespresso`,
  price: `50.00 €`
};

test(`Vérification de la persistance des données entre onglets et fenêtres`, async ({ browser }) => {
  // Créer un nouveau contexte de navigateur (une nouvelle fenêtre)
  const context = await browser.newContext();
  const page = await context.newPage();

  // Naviguer vers la page d'accueil de l'application
  await page.goto(`./home`);

  // Effectuer la connexion
  await page.locator('#style_avatar_wrapper__pEGIQ span').nth(1).click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Mot de passe').fill(password);
  await page.getByRole('button', { name: 'Connexion', exact: true }).click();

  // Vérifier que l'email est affiché après connexion
  await verifyLogin(page);

  // Ouvrir un nouvel onglet dans le même contexte
  const newTab = await context.newPage();
  await newTab.goto(`./home`);

  // Vérifier que l'email est affiché après connexion dans le nouvel onglet
  await verifyLogin(newTab);

  // Faire défiler la page vers le bas pour afficher le produit
  await newTab.mouse.wheel(0, 300);

  // Survoler le produit pour afficher le bouton d'ajout au panier
  await newTab.getByText(product.title).hover();

  // Cliquer sur le bouton d'ajout au panier
  await newTab.locator(`//h5[contains(text(), "${product.title.substring(0, 10)}")]/following-sibling::button`).click();

  // Ouvrir le Panier
  await newTab.locator(`#style_content_cart_wrapper__mqNbf`).click();

  // Vérifier que l'article est bien ajouté au panier
  await verifyBasket(newTab, product.title.substring(0, 10), product.price);

  // Ouvrir une nouvelle fenêtre (nouveau contexte de navigateur)
  const newWindowContext = await browser.newContext();
  const newWindow = await newWindowContext.newPage();
  await newWindow.goto(`./home`);

  // Vérifier que l'email est affiché après connexion dans la nouvelle fenêtre
  await verifyLogin(newWindow);

  // Cliquer sur le bouton Panier
  await newWindow.locator(`#style_content_cart_wrapper__mqNbf`).click();

  // Vérifier que les éléments sont bien ajoutés au panier dans la nouvelle fenêtre
  await verifyBasket(newWindow, product.title.substring(0, 10), product.price);
});

async function verifyLogin(page: Page) {
  await expect.soft(page.locator('#style_avatar_wrapper__pEGIQ')).toContainText(email);
}

async function verifyBasket(page: Page, productTitle: string, productPrice: string) {
  await expect.soft(page.locator(`//div[@id='style_card_wrapper__hrc1I']/div[1]//p[1]`)).toContainText(productTitle);
  await expect.soft(page.locator(`//div[@id='style_card_wrapper__hrc1I']/div[1]//p[2]`)).toContainText(productPrice);
}
