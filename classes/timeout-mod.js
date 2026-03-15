/*****
** 
*****/
class TimeoutMod extends Mod {
    #timeoutHandle = null;

    prepareCreation(inPrepData) {
        super.prepareCreation(inPrepData);

        if (inPrepData.timeout != null) {
            this.setTimeout(inPrepData.timeout.func, inPrepData.timeout.time, inPrepData.timeout.bDestroy);
        }
    }

    prepareRemoval() {
        this.clearTimeout();

        super.prepareRemoval();
    }

    getTimeoutHandle() {
        return this.#timeoutHandle;
    }

    clearTimeout() {
        window.clearTimeout(this.getTimeoutHandle());
        this.#timeoutHandle = null;
    }

    setTimeout(inFunc, inTime, bInDestroy = false) {
        this.clearTimeout();
        
        this.#timeoutHandle = window.setTimeout(() => {
            inFunc();
			if (bInDestroy) {
				this.destroy();
			}
        }, inTime);
    }
}