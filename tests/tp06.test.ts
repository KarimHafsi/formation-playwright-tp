import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test(`Évaluation de l'accessibilité d'une page`, async ({ page }) => {
  // Naviguer vers la page à tester
  await page.goto('https://youtube.com');

  // Créer une instance d'AxeBuilder
  const axe = new AxeBuilder({ page });

  // Exécuter l'évaluation de l'accessibilité
  const results = await axe.analyze();

  // Afficher les résultats dans la console
  console.log(`Résultats de l'évaluation de l'accessibilité :`, results);

  // Vérifier le nombre d'erreurs d'accessibilité
  expect.soft(results.violations.length).toBe(0); // Vérifie qu'il n'y a pas de violations

  // Affichage des violations
  if (results.violations.length > 0) {
    console.log('Éléments non conformes :');
    results.violations.forEach(violation => {
      console.log(`\nViolation : ${violation.description}`);
      violation.nodes.forEach(node => {
        console.log(`  - Élément : ${node.html}`);
      });
    });
  }
});
