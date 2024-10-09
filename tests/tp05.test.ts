import { test, expect } from '@playwright/test';
import * as fs from 'fs'; // Import du module file system

test(`Interception et sauvegarde du corps de la réponse dans un fichier json`, async ({ page }) => {
  const responsePromise = page.waitForResponse(response =>
    response.url() === 'https://api-ztrain.onrender.com/product/' &&
    response.status() === 200 &&
    response.request().method() === 'GET'
  );

  await page.goto('./home');
  const response = await responsePromise;

  // Récupération du corps de la réponse en JSON
  const responseBody = await response.json();

  // Définition du chemin d'enregistrement du fichier JSON
  const jsonFilePath = './test-data/tp05_product_response.json';

  // Création du fichier json avec le contenu du corps de la réponse
  fs.writeFileSync(jsonFilePath, JSON.stringify(responseBody, null, 2)); // Pretty print avec 2 espaces
  console.log(`Response body saved to ${jsonFilePath}`);

});

test(`Remplacement de la réponse API avec un fichier JSON local`, async ({ page }) => {
  const jsonMockPath = './test-data/tp05_product_response_mock.json';

  // Lecture le fichier JSON local
  const data = fs.readFileSync(jsonMockPath, 'utf8'); // Spécifier 'utf8' pour obtenir un string

  // Analyse les données JSON
  const responseBodyMock = JSON.parse(data);
  console.log(responseBodyMock);

  // Configuration l'interception de l'appel API et remplacer les données du JSON
  await page.route('https://api-ztrain.onrender.com/product/', async route => {
    await route.fulfill({
      contentType: 'application/json', // Définir le type de contenu
      body: JSON.stringify(responseBodyMock) // Envoyer le corps de réponse fictif
    });
  });

  // Navigation vers la page d'accueil
  await page.goto('./home', { waitUntil: 'networkidle' });

  // Scroll de la page vers le bas pour afficher le produit
  await page.mouse.wheel(0, 300);
  const productElements = page.getByText("PC Portable 15.6\" FHD IPS Argent naturel (Intel core i5, RAM 8 Go, SSD 512 Go, AZERTY, Windows 10)");

  // Verification qu'il y a deux éléments trouvés
  const count = await productElements.count();
  expect(count).toBe(2);

  // Capture d'écran de toute la page
  await page.screenshot({ path: './test-data/tp05_product_appears_twice.png', fullPage: true });

});
