const puppeteer = require('puppeteer');
const CREDS = require('./creds');

(async () => {
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.goto('https://github.com/login', {waitUntil: 'networkidle2'});
  // await page.screenshot({path: 'screenshots/example2.png'});
  
  // await page.pdf({path: 'screenshots/hn.pdf', format: 'A4'});

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://github.com/login');

  const USERNAME_SELECTOR = '#login_field';
  const PASSWORD_SELECTOR = '#password';
  const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

  const search_text = '#dashboard-repos-filter-left';

  const menu_profile = '#account-switcher-left';
  const backstartup = '#account-switcher-left > details-menu > fuzzy-list > ul > li:nth-child(2)';

  const readmore = 'body > div.application-main > div > div > div > main > div.border.rounded-1.shelf.intro-shelf.js-notice > div > div > a.btn.btn-primary.shelf-cta.mx-2.mb-3'


  await page.click(USERNAME_SELECTOR);
	await page.keyboard.type(CREDS.username, {delay: 100});

	await page.click(PASSWORD_SELECTOR);
	await page.keyboard.type(CREDS.password, {delay: 100});

  const navigationPromise = page.waitForNavigation();

  await page.click(BUTTON_SELECTOR);
  console.log("Inicio Sesion");
  await navigationPromise; 

  console.log("Cargo Inicio");

  // await page.click(search_text);
	// await page.keyboard.type('pevitt', {delay: 100});

  console.log("Click Pevitt");

  // await page.waitFor(2000);

  await page.click(menu_profile);

  await page.waitFor(1000);

  await page.click(backstartup);

  await navigationPromise; 
  // await page.waitForNavigation();
  console.log("Load backstartup");
  await page.waitFor(5000);

  //Get News
  // const pushed_info = '#dashboard > div > div:nth-child(3)';
  // let inner = await page.evaluate((sel) => {
  //   let html = document.querySelector(sel).innerHTML;
    
  //   return html;
  // }, pushed_info);
  // console.log(inner);
  // const pushed_info = '#org_your_repos > div.mb-3 > div > ul';
  // const divsCounts = await page.$$eval('#org_your_repos > div.mb-3 > div > ul', divs => divs.length);
  // console.log(divsCounts);
  //#dashboard > div > div:nth-child(3) > div:nth-child(1)
  //#dashboard > div > div:nth-child(3) > div:nth-child(2)
  //#dashboard > div > div:nth-child(3) > div:nth-child(1)

  const pushed_info = 'push';
  const select_info = '#dashboard > div > div:nth-child(3) > div';

  //#dashboard > div > div:nth-child(3) > div:nth-child(9) > div > div > div > div > div.d-flex.flex-justify-between.flex-items-baseline > div > a
  //#dashboard > div > div:nth-child(3) > div:nth-child(9) > div > div > div > div > div.d-flex.flex-justify-between.flex-items-baseline > div > a:nth-child(1)
  const selector_email = '#dashboard > div > div:nth-child(3) > div:nth-child(INDEX) > div > div > div > div > a:nth-child(1)'
  const selector_other = '#dashboard > div > div:nth-child(3) > div:nth-child(INDEX) > div > div > div > div > div.d-flex.flex-justify-between.flex-items-baseline > div > a:nth-child(1)';
  // let listLength = await page.evaluate((sel) => {
  //   return document.getElementsByClassName(sel).length;
  // }, pushed_info);

  let listLength = await page.evaluate((sel) => {
    return document.querySelectorAll(sel).length;
  }, select_info);

  console.log(listLength);
  let document;
  for (let i = 1; i <= listLength; i++) {
    let emailSelector = selector_email.replace("INDEX", i);
    let username = await page.evaluate((sel) => {
      if(document.querySelector(sel)){
        return document.querySelector(sel).text;
      }else{
        return 'No';
      }
    }, emailSelector);

    if(username == 'No'){
      emailSelector = selector_other.replace("INDEX", i);
      // console.log(i);
      // console.log(emailSelector);
      let username = await page.evaluate((sel) => {
        if(document.querySelector(sel)){
          return document.querySelector(sel).text;
        }else{
          return 'No';
        }
      }, emailSelector);
    }
    if(username == 'No'){
      console.log(username);
    }
    
    
  }

  // await browser.close();


})();