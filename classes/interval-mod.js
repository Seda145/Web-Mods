/*****
** 
*****/
class IntervalMod extends Mod {
    #intervalHandle = null;

    prepareCreation(inPrepData) {
        super.prepareCreation(inPrepData);

        if (inPrepData.interval != null) {
            this.setInterval(inPrepData.interval.func, inPrepData.interval.speed);
        }
    }

    prepareRemoval() {
        this.clearInterval();

        super.prepareRemoval();
    }

    getIntervalHandle() {
        return this.#intervalHandle;
    }

    clearInterval() {
        window.clearInterval(this.getIntervalHandle());
        this.#intervalHandle = null;
    }

    setInterval(inFunc, inSpeed) {
        this.clearInterval();
        this.#intervalHandle = window.setInterval(() => {
            inFunc();
        }, inSpeed);
    }
}