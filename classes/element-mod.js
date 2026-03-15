/*****
** 
*****/
class ElementMod extends Mod {
    #element = null;

    prepareCreation(inPrepData) {
        super.prepareCreation(inPrepData);

        if (inPrepData.html != null) {
            this.createElementFromHTML(inPrepData.html);
        }
        else {
            this.createElement();
        }

        if (inPrepData.eParent != null) {
            inPrepData.eParent.append(this.getElement());
        }
    }

	prepareRemoval() {
        this.removeElement();

        super.prepareRemoval();
    }

    getHTMLTemplate() {
        return (`<div class="element-mod"></div>`);
    }

    removeElement() {
        if (this.getElement() != null) {
            delete this.getElement().elementMod;
            this.getElement().remove();
            this.#element = null;
        }
    }

    createElementFromHTML(inHTML) {
        if (this.getElement() != null) {
            // I could allow this by first calling removeElement, 
            // But this case never happens to me (it would more likely be an error).
            console.error("The element has already been created");
            return null;
        }

        this.#element = UIUtils.createElement(inHTML);
        // Purely because this is helpful for debugging, I reference self here.
		// TODO comment when not used.
        // this.getElement().elementMod = this;
        return this.getElement();
    }

    getElement() {
        return this.#element;
    }

    createElement() {
        return this.createElementFromHTML(this.getHTMLTemplate());
    }
}