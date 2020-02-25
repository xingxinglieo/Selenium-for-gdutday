"use strict";
// async function inputMessage(page, {
//     password,
//     schoolId
// }) {
//     await (await page.waitForSelector('input[type="text"]')).type(schoolId)
//     await (await page.waitForSelector('input[type="password"]')).type(password)
//     let button = await page.waitForSelector('button');
//     let i = 20;
//     while ((await page.$('input[type="password"]') !== null) && i > 0) {
//         try {
//             await sleep(40);
//             await button.click();
//             i--;
//         } catch (err) {
//             break;
//         }
//     }
//     if (i <= 0) {
//         throw new Error('账号密码错误');
//     }
// }
// }
