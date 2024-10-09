import { test, expect, } from '@playwright/test';

test(`Le titre de la page d'accueil s'affiche correctement`, async ({ page }) => {
  // Naviguer vers la page d'accueil
  await page.goto('https://zenity.fr');
  
  // Afficher l'URL de la page dans la console
  console.log(`L'URL de la page est : ${page.url()}`);
  
  // Afficher le titre de la page dans la console
  console.log(`Le titre de la page affichée est : ${await page.title()}`);

  // Vérifier que le titre de la page correspond à l'expression régulière spécifiée
  await expect(page).toHaveTitle(/Pure Player du Test Logiciel \| Zenity/);
});

test(`Le titre de la page Identité s'affiche correctement`, async ({ page }) => {
  // Naviguer vers la page d'accueil
  await page.goto('https://zenity.fr/identite');
  
  // Afficher l'URL de la page dans la console
  console.log(`L'URL de la page est : ${page.url()}`);
  
  // Afficher le titre de la page dans la console
  console.log(`Le titre de la page affichée est : ${await page.title()}`);

  // Vérifier que le titre de la page correspond à l'expression régulière spécifiée
  await expect(page).toHaveTitle(/Identité \| Zenity/);
});

test(`Le titre de la page inside Zenity s'affiche correctement`, async ({ page }) => {
  // Naviguer vers la page d'accueil
  await page.goto('https://zenity.fr/inside-zenity');
  
  // Afficher l'URL de la page dans la console
  console.log(`L'URL de la page est : ${page.url()}`);
  
  // Afficher le titre de la page dans la console
  console.log(`Le titre de la page affichée est : ${await page.title()}`);

  // Vérifier que le titre de la page correspond à l'expression régulière spécifiée
  await expect(page).toHaveTitle(/Inside Zenity \| Zenity/);
});

test(`Le titre de la page Formation s'affiche correctement`, async ({ page }) => {
  // Naviguer vers la page d'accueil
  await page.goto('https://zenity.fr/formation');
  
  // Afficher l'URL de la page dans la console
  console.log(`L'URL de la page est : ${page.url()}`);
  
  // Afficher le titre de la page dans la console
  console.log(`Le titre de la page affichée est : ${await page.title()}`);

  // Vérifier que le titre de la page correspond à l'expression régulière spécifiée
  await expect(page).toHaveTitle(/Formation \| Zenity/);
});