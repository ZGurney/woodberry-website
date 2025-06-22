const { chromium } = require('playwright');
const fs = require('fs');

const urls = [
  'https://www.wbdcommunity.com/children-s-classes',
  'https://www.wbdcommunity.com/copy-of-children-s-classes',
  'https://www.wbdcommunity.com/copy-of-junior-youth-groups', 
  'https://www.wbdcommunity.com/copy-of-promoters-of-community-wellbeing',
  'https://www.wbdcommunity.com/devotional-gatherings',
  'https://www.wbdcommunity.com/about',
  'https://www.wbdcommunity.com/calendar'
];

async function scrapePage(page, url) {
  try {
    console.log(`\n=== SCRAPING: ${url} ===`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const title = await page.title();
    console.log('Page Title:', title);
    
    // Extract content
    const content = await page.evaluate(() => {
      const contentElements = [];
      
      // Get headings
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      headings.forEach((h, index) => {
        if (h.textContent?.trim()) {
          contentElements.push({
            type: h.tagName.toLowerCase(),
            text: h.textContent.trim(),
            order: index
          });
        }
      });
      
      // Get paragraphs
      const paragraphs = Array.from(document.querySelectorAll('p'));
      paragraphs.forEach((p, index) => {
        const text = p.textContent?.trim();
        if (text && text.length > 15 && !text.includes('function') && !text.includes('{')) {
          contentElements.push({
            type: 'p',
            text: text,
            order: index + 1000
          });
        }
      });
      
      // Get list items
      const listItems = Array.from(document.querySelectorAll('li'));
      listItems.forEach((li, index) => {
        const text = li.textContent?.trim();
        if (text && text.length > 5) {
          contentElements.push({
            type: 'li',
            text: text,
            order: index + 2000
          });
        }
      });
      
      // Sort by order to maintain structure
      return contentElements.sort((a, b) => a.order - b.order);
    });
    
    console.log('\nContent:');
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
      })).filter(img => img.src && !img.src.includes('data:') && !img.src.includes('icon'));
    });
    
    if (images.length > 0) {
      console.log('\nImages:');
      images.forEach((img, index) => {
        console.log(`${index + 1}. ${img.alt || 'No alt text'}: ${img.src}`);
      });
    }
    
    // Extract links
    const links = await page.evaluate(() => {
      const linkElements = Array.from(document.querySelectorAll('a'));
      return linkElements.map(link => ({
        text: link.textContent?.trim(),
        href: link.href
      })).filter(link => link.text && link.text.length > 0 && !link.href.includes('javascript:'));
    });
    
    if (links.length > 0) {
      console.log('\nLinks:');
      links.forEach((link, index) => {
        if (link.href !== url) { // Don't show self-links
          console.log(`${index + 1}. ${link.text}: ${link.href}`);
        }
      });
    }
    
    return {
      url,
      title,
      content,
      images,
      links
    };
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return { url, error: error.message };
  }
}

async function scrapeAllPages() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const results = [];
  
  for (const url of urls) {
    const result = await scrapePage(page, url);
    results.push(result);
  }
  
  await browser.close();
  
  // Save results to JSON file
  fs.writeFileSync('website-content.json', JSON.stringify(results, null, 2));
  console.log('\n=== Content saved to website-content.json ===');
}

scrapeAllPages();