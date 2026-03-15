/*****
** 
*****/
class PageInjectorMod extends ElementMod {
    getHTMLTemplate() {
        return `<main class="page-injector-mod max-width-wrap"></main>`;
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