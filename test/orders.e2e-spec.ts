import { test, expect } from '@playwright/test';

test('list orders', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' });

    expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()

    expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()


    await page.waitForTimeout(2000)
});

test('paginate orders', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'Próxima Página' }).click()

    expect(page.getByRole('cell', { name: 'Customer 11', exact: true })).toBeVisible()

    expect(page.getByRole('cell', { name: 'Customer 20' })).toBeVisible()

    await page.getByRole('button', { name: 'Última Página' }).click()

    expect(page.getByRole('cell', { name: 'Customer 51', exact: true })).toBeVisible()

    expect(page.getByRole('cell', { name: 'Customer 60' })).toBeVisible()

    await page.getByRole('button', { name: 'Página anterior' }).click()

    expect(page.getByRole('cell', { name: 'Customer 41', exact: true })).toBeVisible()

    expect(page.getByRole('cell', { name: 'Customer 50' })).toBeVisible()

    await page.getByRole('button', { name: 'Primeira página' }).click()

    expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()

    expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()

    await page.waitForTimeout(2000)
});

test('filter order by id', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' });

    await page.getByPlaceholder('ID do pedido').fill('order-1')
    await page.getByRole('button', { name: 'Filtrar' }).click()

    expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()


});

test('filter order by customer name', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' });

    await page.getByPlaceholder('Nome do cliente').fill('Customer 10')
    await page.getByRole('button', { name: 'Filtrar' }).click()

    expect(page.getByRole('cell', { name: 'Customer 10', exact: true })).toBeVisible()
});

test('filter order by status', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' });

    await page.getByRole('combobox').click()
    await page.getByLabel('Pendente').getByText('Pendente').click()

    await page.getByRole('button', { name: 'Filtrar' }).click()

    const tableRows = await page.getByRole('cell', { name: 'Pendente', exact: true }).all()

    expect(tableRows).toHaveLength(10)

    await page.waitForTimeout(2000)
});

test('get order detail', async ({ page }) => {
    await page.goto('/orders', { waitUntil: 'networkidle' });

    await page.getByRole('row', { name: 'Detalhes do Pedido order-1 h' }).getByRole('button').first().click()
    
    expect(page.getByRole('heading', { name: 'ID do pedido: order-' })).toBeVisible()

    await page.waitForTimeout(2000)
});

