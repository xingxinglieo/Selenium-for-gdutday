export function getElementTrimInnerText(e: Element[]):string[]
export function getElementTrimInnerText(e: Element):string
export function getElementTrimInnerText(e: Element | Element[]):any  {
    if (e instanceof Array) return e.map(e => (e.innerText as string).trim())
    else return (e.innerText as string).trim();
}
    