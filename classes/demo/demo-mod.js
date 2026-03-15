/*****
** 
*****/
class DemoMod extends Mod {
    prepareCreation(inPrepData) {
        super.prepareCreation(inPrepData);

        console.log("Hi! I am Roy Wierer (Seda145).\r\n\r\nCurious how my app works?\r\n\r\nType app into the console to inspect its current state. Everything is custom made.\r\n\r\nThis app works 100% offline.\r\n\r\nEnjoy!\r\n\r\n\r\n\r\n");

        // With the registry set first, all Mods added later on with addMod get the same Registry.
        // Here I don't set the prop as "registryMod" because Mods will refer to the central registry without having their own RegistryMod. 
        // It's also currently a private prop, so injection wouldn't work.
        this.setRegistry(this.addMod(RegistryMod));

        // Find and attach our own new element to a parent element on the document.
        const eParent = document.querySelector('[data-component="app"]');
        const elementMod = this.addMod(ElementMod, { html: this.getHTMLTemplate() });
        eParent.replaceWith(elementMod.getElement());

        // Add header.
        this.addMod(HeaderMod, { eParent: elementMod.getElement() });

        // Add navigation panel.
        const navigationPanelMod = this.addMod(NavigationPanelMod, { eParent: elementMod.getElement() });
        // And navigation buttons
        navigationPanelMod.addNavigationButton("Page 1", DemoPageMod);
        navigationPanelMod.addNavigationButton("Page 2", DemoPage2Mod);

        // Add page injector.
        this.addModProp(PageInjectorMod, null, { eParent: elementMod.getElement() });

        // Add footer.
        this.addMod(FooterMod, { eParent: elementMod.getElement() });

        // Let's inject the first content page.
        this.pageInjectorMod.loadPage(DemoPageMod);
    } 

    getHTMLTemplate() {
        return `<div class="demo-mod"></div>`;
    }
}