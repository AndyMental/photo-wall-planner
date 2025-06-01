import { test, expect } from '@playwright/test';

test.describe('Photo Wall Planner - Basic Flow', () => {
  test('should navigate through project creation flow', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Check homepage loads
    await expect(page).toHaveTitle(/Wall Story/);
    await expect(page.locator('h1')).toContainText('Transform Your Space');
    
    // Navigate to project creation
    await page.getByRole('button', { name: /start your project/i }).click();
    
    // Should be on frame inventory page
    await expect(page.url()).toContain('/projects/new');
    await expect(page.locator('h2')).toContainText('Frame Inventory');
    
    // Test frame inventory functionality
    await expect(page.getByText('4" x 6" Black')).toBeVisible();
    await expect(page.getByText('5" x 7" White')).toBeVisible();
    await expect(page.getByText('8" x 10" Natural Wood')).toBeVisible();
    
    // Continue to layout
    await page.getByRole('button', { name: /continue to layout/i }).click();
    
    // Should be on layout page
    await expect(page.url()).toContain('/projects/new/layout');
    await expect(page.locator('h2')).toContainText('Layout Generator');
    
    // Test layout options
    await expect(page.getByText('Grid 3x2')).toBeVisible();
    await expect(page.getByText('Grid 2x2')).toBeVisible();
    await expect(page.getByText('Asymmetric')).toBeVisible();
    
    // Continue to photos
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Should be on photos page
    await expect(page.url()).toContain('/projects/new/photos');
    await expect(page.locator('h2')).toContainText('Photo Selection');
    
    // Test photo filters
    await expect(page.getByText('All Photos')).toBeVisible();
    await expect(page.getByText('Faces')).toBeVisible();
    await expect(page.getByText('Landscapes')).toBeVisible();
    
    // Continue to visualization
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Should be on visualization page
    await expect(page.url()).toContain('/projects/new/visualization');
    await expect(page.locator('h2')).toContainText('AR Wall Visualization');
    
    // Test AR interface elements
    await expect(page.getByText('Wall Detection')).toBeVisible();
    await expect(page.getByText('Room Mode')).toBeVisible();
    
    // Continue to details
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Should be on details page
    await expect(page.url()).toContain('/projects/new/details');
    await expect(page.locator('h2')).toContainText('Project Details');
    
    // Test project details form
    await expect(page.getByText('Project Information')).toBeVisible();
    await expect(page.getByText('Estimated Cost')).toBeVisible();
    await expect(page.getByText('Timeline')).toBeVisible();
  });
  
  test('should handle navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links (even if they 404 for now)
    const myProjectsLink = page.getByRole('link', { name: /my projects/i });
    const layoutsLink = page.getByRole('link', { name: /layouts/i });
    const photosLink = page.getByRole('link', { name: /photos/i });
    
    await expect(myProjectsLink).toBeVisible();
    await expect(layoutsLink).toBeVisible();
    await expect(photosLink).toBeVisible();
  });
  
  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Check mobile responsiveness
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('button', { name: /start your project/i })).toBeVisible();
    
    // Test mobile navigation
    await page.getByRole('button', { name: /start your project/i }).click();
    await expect(page.url()).toContain('/projects/new');
  });
}); 