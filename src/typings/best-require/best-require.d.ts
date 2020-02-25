declare module 'best-require' {
    interface Map {
        [property: string]: string
    }
    function bestRequire(root: string, map?: Map): Function;
    export = bestRequire;
}
