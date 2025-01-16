import { test, expect } from '@playwright/test';

test('display day orders amount metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await page.waitForTimeout(2000)

    expect(page.getByText('50').first())
    expect(page.getByText('+10% em relação a ontem'))
});

test('display month orders amount metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    expect(page.getByText('20', { exact: true }))
    expect(page.getByText('+7% em relação ao mês passado'))
});

test('display month canceled orders amount metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    expect(page.getByText('50').nth(1))
    expect(page.getByText('+5% em relação ao mês anterior'))
});

test('display month revenue orders amount metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    expect(page.locator('span').filter({ hasText: 'R$ 200,00' }))
    expect(page.getByText('+10% em relação ao mês passado'))
});
