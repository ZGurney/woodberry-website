const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport for desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Go to the website
  await page.goto('https://wbdcommunity.netlify.app');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'docs/screenshots/homepage-desktop.png', 
    fullPage: true 
  });
  
  // Mobile screenshot
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ 
    path: 'docs/screenshots/homepage-mobile.png', 
    fullPage: true 
  });
  
  // Screenshot of programs section
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.locator('#programmes').screenshot({ 
    path: 'docs/screenshots/programmes-section.png' 
  });
  
  // Contact form section
  await page.locator('#contact').screenshot({ 
    path: 'docs/screenshots/contact-section.png' 
  });
  
  // Take screenshots of individual program pages
  const pages = [
    'childrens-classes',
    'junior-youth-groups', 
    'community-leaders',
    'devotional-gatherings'
  ];
  
  for (const pageName of pages) {
    await page.goto(`https://wbdcommunity.netlify.app/${pageName}`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: `docs/screenshots/${pageName}.png`, 
      fullPage: true 
    });
  }
  
  await browser.close();
  console.log('Screenshots saved to docs/screenshots/');
})();