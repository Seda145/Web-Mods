/*****
** 
*****/
class ListenerMod extends Mod {
    #abortController = new AbortController();

    prepareRemoval() {
        this.abort();
        this.#abortController = null;

        super.prepareRemoval();
    }

    getAbortController() {
        return this.#abortController;
    }

    abort() {
        this.getAbortController().abort();
    }

    listen(inElement, inEvent, inMethod, inOptions = {}) {
        if (inOptions.signal == null) {
            // Because we always want to abort before destroying self.
            inOptions.signal = this.getAbortController().signal;
        }
        // bindObject: Expected self or parent.
        const bind = inOptions.bind ?? this.getParentMod();
        inElement.addEventListener(inEvent, inMethod.bind(bind), inOptions);
    }
}