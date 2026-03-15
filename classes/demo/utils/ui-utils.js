/*****
** Independend global utility to work with widget content / styling.
*****/
class UIUtils {
	// Utils for creating elements.

	static createElement(inHTML) {
		// Helper method to create an element exactly as the html argument specifies, without leaving a wrapping parent container created by "createElement".
        const newElem = document.createElement("div");	
        newElem.innerHTML = inHTML;
        const innerElem = newElem.firstElementChild;
        // Remove old div parent reference.
        innerElem.remove();
        return innerElem;
	}

	static setInnerHTML(inParentElement, inHTML) {
        const newElem = UIUtils.createElement(inHTML);
        inParentElement.innerHTML = "";
		inParentElement.appendChild(newElem);
		return newElem;
	}

	static prependInnerHTML(inParentElement, inHTML) {
        const newElem = UIUtils.createElement(inHTML);
        inParentElement.prepend(newElem);
		return newElem;
	}

	static appendInnerHTML(inParentElement, inHTML) {
        const newElem = UIUtils.createElement(inHTML);
        inParentElement.append(newElem);
		return newElem;
	}

	static replaceElement(inParentElement, inHTML) {
        const newElem = UIUtils.createElement(inHTML);
		inParentElement.replaceWith(newElem);
		return newElem;
	}
}