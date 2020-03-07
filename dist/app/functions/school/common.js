"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as crawler from 'crawler';
const axios_1 = require("axios");
const cheerio = require("cheerio");
// const Crawler:new()=>CrawlerType  = require('crawler');
axios_1.default.defaults.withCredentials = true;
class Cookie {
    static verifyUrl(username) {
        return `http://authserver.gdut.edu.cn/authserver/needCaptcha.html?username=${username}_={ + new Date()}`;
    }
    static async getCookie(username, password) {
        let data = {};
        const context = await axios_1.default.get(this.loginUrl);
        const cookies = context.headers["set-cookie"][0];
        const $ = cheerio.load(context.data);
        const inputs = $('input[type="hidden"]');
        inputs.map((_, input) => {
            data[input.attribs["name"]] = input.attribs.value;
        });
        debugger;
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: cookies,
                "User-Agent": "User-Agent,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
            },
        };
        axios_1.default.get(this.verifyUrl("3118005362"), config);
        data = { username, password, ...data };
        const res = await axios_1.default.post(Cookie.loginUrl, data, config);
        debugger;
        return cookies;
        //  .send(data)
    }
}
exports.Cookie = Cookie;
Cookie.loginUrl = "http://authserver.gdut.edu.cn/authserver/login";
// public static final String LOGIN_URL = "http://authserver.gdut.edu.cn/authserver/login?service=http://jxfw.gdut.edu.cn/new/ssoLogin";
//     Map<String, String> getCookie() {
//         Connection.Response response = null;
//         //构建html用于解析
//         Document doc = null;
//         try {
//             doc = response.parse();
//         } catch (IOException e) {
//             e.printStackTrace();
//         }
//         //查找到登录表单
//         Element content = doc.getElementById("casLoginForm");
//         //获取到所有input元素
//         Elements links = content.getElementsByTag("input");
//         //提取type=hidden的元素加入到Map data中
//         Map<String, String> data = new HashMap<>(10);
//         for (Element link : links) {
//             if ("hidden".equals(link.attr("type"))) {
//                 data.put(link.attr("name"), link.attr("value"));
//             }
//         }
//         data.put("username", username);
//         data.put("password", password);
//         //构建post请求
//         Connection.Response res = null;
//         try {
//             res = Jsoup.connect(LOGIN_URL)
//                     .timeout(5000)
//                     //这里添加上一次获取到的cookies
//                     .cookies(response.cookies())
//                     //这里添加dataMap
//                     .data(data)
//                     //这里设置请求方式
//                     .method(Connection.Method.POST)
//                     //因为教务系统ssl有毒，所有我们把安全认证关了
//                     .validateTLSCertificates(false)
//                     .execute();
//         } catch (IOException e) {
//             e.printStackTrace();
//         }
//         //返回
//         return res.cookies();
//     }
