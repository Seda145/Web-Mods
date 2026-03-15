/*****
** 
*****/
class NavigationPanelMod extends ElementMod {
    getHTMLTemplate() {
        return `
<div class="navigation-panel-mod">
    <div class="max-width-wrap navigation-panel-button-wrap">
        
    </div>
</div>
        `;
    }

    addNavigationButton(inText, inPageModClass) {
        // This is an example how to build new "Mods" dynamically.
        const buttonMod = this.addMod(ElementMod, { html: `<div class="button-type-1"><p>${inText}</p></div>` });
   
        // Set up button navigation interaction.
        buttonMod.addMod(ListenerMod).listen(buttonMod.getElement(), "click", () => {
            app.pageInjectorMod.loadPage(inPageModClass);
        });

        // Add it to our button wrapping element.
        this.getElement().querySelector(".navigation-panel-button-wrap").append(buttonMod.getElement());
    }
}