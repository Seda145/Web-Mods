/*****
** 
*****/
class HeaderMod extends ElementMod {
    getHTMLTemplate() {
        return `
<header class="header-mod">
    <div class="max-width-wrap">
        <p>Welcome. Read Readme.md.<p>
        <p>I built this application using my new Mod system. Type app in the console to inspect it.<p>
    </div>
</header>
        `;
    }
}