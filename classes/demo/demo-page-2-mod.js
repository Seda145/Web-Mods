/*****
** 
*****/
class DemoPage2Mod extends ElementMod {
    getHTMLTemplate() {
        return `
<div class="demo-page-2-mod">
    
    <h1>Mod implementations</h1>

    <p>This example shows code for the page navigator that you are currently using. Compact!</p>

<pre>
class PageInjectorMod extends ElementMod {
    getHTMLTemplate() {
        return ...;
    }

    unloadPage() {
        this.removeMod(this.pageMod);
        this.getElement().classList.remove("page-injector-mod-fade-in");
		this.removeMod(this.timeoutMod);
    }

    loadPage(inModClass) {
        this.unloadPage();
        this.addModProp(inModClass, 'pageMod', { eParent: this.getElement() });
        this.addModProp(TimeoutMod, null, { timeout: { time: 50, bDestroy: true, func: () => { this.getElement().classList.add("page-injector-mod-fade-in"); }}});
    }
}
</pre>
    
</div>
        `;
    }
}