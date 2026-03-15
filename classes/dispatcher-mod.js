/*****
** 
*****/
class DispatcherMod extends ElementMod {
    getHTMLTemplate() {
        return `<div class="dispatcher-mod"></div>`;
    }

    dispatch(inEvent) {
        this.getElement().dispatchEvent(inEvent);
    }
}