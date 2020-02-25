// import { Forbbiden, ParameterException } from '~/core/http-exception'
// import { createAutoDestroyPage } from '~/app/utils/creatPage'
// module.exports.handler = (req, resp, context) => {
//   const {
//     schoolId,
//     password
//   } = req.queries;
//   quTuoLogin({
//       schoolId,
//       password,
//     })
//     .then(src => {
//       // Get screenshot successful return
//       resp.setStatusCode(200);
//       resp.send('ok')
//     })
//     .catch(err => {
//       // Get screenshot failed return
//       resp.setStatusCode(500);
//       resp.setHeader('content-type', 'text/plain');
//       resp.send(err.message);
//     });
//   async function quTuoLogin({
//     schoolId,
//     password
//   }) {
//     try {
//       await login(url.LOGIN, {
//         schoolId,
//         password
//       })
//     } catch (err) {
//       err.message = `登录失败,具体原因:${err.message}`;
//       throw err;
//     }
//   };

//   async function login(url, message) {
//     const page = await getPage();
//     await page.goto(url);
//     await confirmSchool(page);
//     // await selectSchool(page);
//     await inputMessage(page, message);
//   }
//   async function getPage() {
//     const browser = await setup.getBrowser(context);
//     const page = await browser.newPage();
//     //开启手机模式
//     await page.setDefaultNavigationTimeout(15000);
//     await page.emulate(PhoneConfig);
//     return page;
//   }
//   async function selectSchool(page) {
//     const searchInput = await page.waitForSelector('input[type = "search"]');
//     await searchInput.type(schoolName, {
//       delay: 20
//     });
//     let text = "";
//     while (text !== schoolName) {
//       try {
//         text = await page.$eval('li', e => (e.innerText).trim());
//       } catch (err) {}
//     }
//     sleep(200);
//     let li;
//     do {
//       li = await page.$('li');
//       if (li !== null) await li.click();
//     } while (li !== null)
//     // await confirmSchool(page);
//   }
//   async function confirmSchool(page) {
//     //confim the selected school
//     let loginLogo;
//     do {
//       loginLogo = await page.$eval('.login-logo', e => (e.innerText).trim());
//       if (loginLogo === schoolName) break;
//       else {
//         const toSearch = await page.waitForSelector('.login-title>a');
//         await sleep(100);
//         let i = 20;
//         while ((await page.$('input[type="password"]') !== null) && i > 0) {
//           try {
//             await sleep(30);
//             await toSearch.click();
//             i--;
//           } catch (err) {
//             break;
//           }
//         }
//         await selectSchool(page);
//       }
//     }
//     while (true)
//   }
//   async function inputMessage(page, {
//     password,
//     schoolId
//   }) {
//     await (await page.waitForSelector('input[type="text"]')).type(schoolId)
//     await (await page.waitForSelector('input[type="password"]')).type(password)
//     let button = await page.waitForSelector('button');
//     let i = 20;
//     while ((await page.$('input[type="password"]') !== null) && i > 0) {
//       try {
//         await sleep(40);
//         await button.click();
//         i--;
//       } catch (err) {
//         break;
//       }
//     }
//     if (i <= 0) {
//       throw new Error('账号密码错误');
//     }
//   }
// }