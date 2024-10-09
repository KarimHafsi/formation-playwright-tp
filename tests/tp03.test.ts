import { test, expect, } from '@playwright/test';

const products = [
  {
    title: `PC Portable 15.6" FHD IPS Argent naturel (Intel core i5, RAM 8 Go, SSD 512 Go, AZERTY, Windows 10)`,
    price: `1325.80 €`
  },
  {
    title: `Machine à café rouge de la marque nespresso`,
    price: `50.00 €`
  },
  {
    title: `T-shirt en coton biologique`,
    price: `8.99 €`
  }
];

test(`Vérification de l'ajout de produits au panier depuis la page d'accueil`, async ({ page }) => {
  // Naviguer vers la page d'accueil de l'application
  await page.goto(`./home`);

  // Faire défiler la page vers le bas
  await page.mouse.wheel(0, 300);


  // Boucle pour chaque produit
  let i = 0;

  for (const product of products) {
    i +=1;
    
    // Survoler le produit pour afficher le bouton d'ajout
    await page.getByText(product.title).hover();
    
    // Cliquer sur le bouton d'ajout au panier
    await page.locator(`//h5[contains(text(), "${product.title.substring(0, 10)}")]/following-sibling::button`).click();

    // Cliquer sur le bouton Panier
    await page.locator(`//div[@id="style_content_cart_wrapper__mqNbf"]`).click();

    // Vérifier que les éléments sont bien ajoutés au panier
    await expect.soft(page.locator(`//div[@id='style_card_wrapper__hrc1I']/div[${i}]//p[1]`)).toContainText(product.title.substring(0, 10));
    await expect.soft(page.locator(`//div[@id='style_card_wrapper__hrc1I']/div[${i}]//p[2]`)).toContainText(product.price);

    // Fermer le panier
    await page.locator(`//h3[contains(text(), "Mon panier")]/preceding-sibling::div[1]`).click();
  }
});