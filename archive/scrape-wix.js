const { chromium } = require('playwright');

async function scrapeWixWebsite() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Loading website...');
    await page.goto('https://www.wbdcommunity.com', { waitUntil: 'networkidle' });
    
    // Wait for Wix content to load
    await page.waitForTimeout(3000);
    
    // Extract basic page information
    const title = await page.title();
    console.log('Page Title:', title);
    
    // Extract navigation links
    const navLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('nav a, [data-testid*="nav"] a, [role="navigation"] a'));
      return links.map(link => ({
        text: link.textContent?.trim(),
        href: link.href
      })).filter(link => link.text && link.text.length > 0);
    });
    
    console.log('\nNavigation Links:');
    navLinks.forEach(link => console.log(`- ${link.text}: ${link.href}`));
    
    // Extract main content
    const content = await page.evaluate(() => {
      const contentElements = [];
      
      // Try to find headings
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      headings.forEach(h => {
        if (h.textContent?.trim()) {
          contentElements.push({
            type: h.tagName.toLowerCase(),
            text: h.textContent.trim()
          });
        }
      });
      
      // Try to find paragraphs
      const paragraphs = Array.from(document.querySelectorAll('p'));
      paragraphs.forEach(p => {
        if (p.textContent?.trim() && p.textContent.trim().length > 10) {
          contentElements.push({
            type: 'p',
            text: p.textContent.trim()
          });
        }
      });
      
      // Try to find any text content in divs
      const divs = Array.from(document.querySelectorAll('div'));
      divs.forEach(div => {
        const text = div.textContent?.trim();
        if (text && text.length > 20 && !text.includes('function') && !text.includes('{')) {
          // Check if this text isn't already captured in paragraphs or headings
          const isAlreadyCaptured = contentElements.some(el => el.text === text);
          if (!isAlreadyCaptured) {
            contentElements.push({
              type: 'div',
              text: text.substring(0, 200) + (text.length > 200 ? '...' : '')
            });
          }
        }
      });
      
      return contentElements;
    });
    
    console.log('\nContent Elements:');
    content.forEach((element, index) => {
      console.log(`${index + 1}. [${element.type.toUpperCase()}] ${element.text}`);
    });
    
    // Extract images
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt || '',
        width: img.width,
        height: img.height
      })).filter(img => img.src && !img.src.includes('data:'));
    });
    
    console.log('\nImages found:');
    images.forEach((img, index) => {
      console.log(`${index + 1}. ${img.alt || 'No alt text'}: ${img.src}`);
    });
    
    // Extract contact information
    const contactInfo = await page.evaluate(() => {
      const text = document.body.textContent || '';
      const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const phones = text.match(/(\+44|0)[\d\s\-\(\)]{10,}/g) || [];
      return { emails: [...new Set(emails)], phones: [...new Set(phones)] };
    });
    
    console.log('\nContact Information:');
    if (contactInfo.emails.length > 0) {
      console.log('Emails:', contactInfo.emails.join(', '));
    }
    if (contactInfo.phones.length > 0) {
      console.log('Phones:', contactInfo.phones.join(', '));
    }
    
  } catch (error) {
    console.error('Error scraping website:', error);
  } finally {
    await browser.close();
  }
}

scrapeWixWebsite();