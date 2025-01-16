import { test, expect } from '@playwright/test';

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle'});

  await page.getByLabel('Nome do Restaurante').fill('Pizza Shop')
  await page.getByLabel('Nome do Usuário').fill('john doe')
  await page.getByLabel('Seu E-mail').fill('john.doe@ia.com')
  await page.getByLabel('Telefone').fill('11999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
});

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle'});

  await page.getByLabel('Nome do Restaurante').fill('Invalid name')
  await page.getByLabel('Nome do Usuário').fill('john doe')
  await page.getByLabel('Seu E-mail').fill('john.doe@ia.com')
  await page.getByLabel('Telefone').fill('11999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar o restaurante')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
});

test('navigate do new login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle'});

  await page.getByRole('link', { name: 'Fazer login' }).click();

  expect(page.url()).toContain('/sign-in')
});
