declare namespace Koa {
    type Application = import('koa')
    type Middleware = import('koa').Middleware
    type Next = import('koa').Next
    type extendableContext = import('koa').ExtendableContext
    type baseContext = import('koa').BaseContext
    type request = import('koa').Request
    type Response = import('koa').Response
    interface HasParams {
        params: {
            [property: string]: string
        }
    }
    interface ExternalObject {
        [property: string]: any
    }
    interface ExtendableContext extends ExternalObject, extendableContext, HasParams { }
    interface BaseContext extends ExternalObject, baseContext, HasParams { }
    interface Request extends request, HasParams { }
}
declare namespace Puppeteer {
    type Page = import('puppeteer').Page
    type Browser = import('puppeteer').Browser 
    type JsHandle = import('puppeteer').JSHandle
    type ElementHandle = import('puppeteer').ElementHandle
}
declare namespace Own {
    interface ExternalObject {
        [property: string]: any
    }
    // interface Iterator{
    //     [Symbol.iterator](): { next(): { value?: number, done: boolean }, [property: string]: any }
    // }
}