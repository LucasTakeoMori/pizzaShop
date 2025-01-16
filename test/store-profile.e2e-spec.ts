import { test, expect } from '@playwright/test';

test('update profile successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'John Doe' }).click()
    await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()
    
    await page.getByLabel('Nome').fill('ia assistant')
    await page.getByLabel('Descrição').fill('testing description input to generating by ia')
    
    await page.getByRole('button', { name: 'Salvar' }).click()

    await page.waitForLoadState('networkidle')

    const toast = page.getByText('Perfil atualizado com sucesso!')

    expect(toast).toBeVisible()

    await page.getByRole('button', { name: 'Close' }).click()

    await expect(page.getByRole('button', {name: 'ia assistant'})).toBeVisible()
});
