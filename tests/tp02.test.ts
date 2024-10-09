import { test, expect, } from '@playwright/test';

const password = '123456789';
const email = generateRandomEmail();

test(`Vérification de l'inscription d'un nouvel utilisateur avec des informations valides`, async ({ page }) => {
  // Naviguer vers la page d'accueil de l'application
  await page.goto('./home');

  // Cliquer sur le deuxième élément du conteneur d'avatars (par exemple, pour ouvrir un menu utilisateur ou une option de connexion)
  await page.locator('#style_avatar_wrapper__pEGIQ span').nth(1).click();

  // Sélectionner l'onglet "Inscription" pour accéder au formulaire d'inscription
  await page.getByRole('tab', { name: 'Inscription' }).click();

  // Cliquer sur le champ Email pour le sélectionner
  await page.getByPlaceholder('Email').click();

  // Remplir le champ Email avec la variable `email`
  await page.getByPlaceholder('Email').fill(email);

  // Remplir le champ Mot de passe avec la variable `password`
  await page.getByPlaceholder('Mot de passe', { exact: true }).fill(password);

  // Remplir le champ "Confirmer votre mot de passe" avec la variable `password`
  await page.getByPlaceholder('Confirmer votre mot de passe').fill(password);

  // Cliquer sur le conteneur du champ mot de passe (peut-être pour activer une option de visibilité ou autre)
  await page.locator('#style_container_input_password__T_UVh').first().click();

  // Cliquer sur le bouton d'inscription pour soumettre le formulaire
  await page.getByRole('button', { name: 'Inscription' }).click();

  // Vérifier que le conteneur d'avatars contient bien le texte correspondant à l'email (pour valider que l'inscription a réussi)
  await expect(page.locator('#style_avatar_wrapper__pEGIQ')).toContainText(email);
});

function generateRandomEmail() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let email = '';
  for (let i = 0; i < 10; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  email += '@zenity.fr';
  console.log(email);
  
  return email;
}