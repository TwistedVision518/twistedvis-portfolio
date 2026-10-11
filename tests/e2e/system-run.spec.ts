import { expect, test } from '@playwright/test';

test.describe('System Run', () => {
  test('starts with an observable run and exposes all stages', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto('/');
    await expect(page.getByText('TWISTEDVIS / SYSTEM RUN')).toBeVisible();
    await expect(page.locator('.device-readout strong')).toHaveText('Project Aerodactyl');
    await expect(page.getByRole('button', { name: /Select / })).toHaveCount(8);
    await expect(page.locator('.device-readout > span')).toHaveText('source / project');
    expect(consoleErrors).toEqual([]);
  });

  test('pauses on stage selection and exposes its evidence link', async ({ page }) => {
    await page.goto('/');
    const securityStage = page.getByRole('button', { name: 'Select security: L.I.E.S.' });
    await securityStage.focus();
    await expect(securityStage).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.locator('.device-live')).toHaveText(/paused/);
    await expect(page.locator('.device-readout strong')).toHaveText('L.I.E.S.');
    await expect(page.locator('.device-readout a')).toHaveAttribute('href', 'https://github.com/TwistedVision518/L.I.E.S');
    await expect(securityStage).toHaveAttribute('aria-current', 'step');
  });

  test('replay resets to the source stage and resumes the run', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Select maintainer signal: systems with personality' }).click();
    await page.getByRole('button', { name: 'Replay system run' }).click();

    await expect(page.locator('.device-readout strong')).toHaveText('Project Aerodactyl');
    await expect(page.locator('.trace-count')).toHaveText(/01 \/ 08/);
    await expect(page.locator('.device-live')).toHaveText(/playing/);
  });

  test('keeps the reduced-motion mobile layout usable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    await expect(page.getByText('TWISTEDVIS / SYSTEM RUN')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play system run', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  });
});
