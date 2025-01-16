import { test, expect } from '@playwright/test';

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle'});

  await page.getByLabel('Seu e-mail').fill('example@example.com.br')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText('Enviamos um link de autenticação para seu e-mail')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
});

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle'});

  await page.getByLabel('Seu e-mail').fill('wrong.ia@example.com.br')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText('Credenciais inválidas')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
});

test('navigate to new restaurant registration', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle'});

  await page.getByRole('link', { name: 'Novo Estabelecimento' }).click();

  expect(page.url()).toContain('/sign-up')
});
