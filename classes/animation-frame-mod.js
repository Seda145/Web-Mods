/*****
** 
*****/
class AnimationFrameMod extends Mod {
    prepareCreation(inPrepData) {
        super.prepareCreation(inPrepData);

        this.requestAnimationFrame();
    }

    cancelAnimationFrame() {
        window.cancelAnimationFrame(this.requestAnimationFrameHandle);
        delete this.requestAnimationFrameHandle;
    }

    requestAnimationFrame() {
        // Stop first, or we lose the handle to a running request.
        this.cancelAnimationFrame();

        this.requestAnimationFrameHandle = window.requestAnimationFrame((inTimestamp) => {
            this.getParentMod().actOnAnimationFrame(inTimestamp);
            this.requestAnimationFrame();
        });
    }

    prepareRemoval() {
        this.cancelAnimationFrame();

        super.prepareRemoval();
    }
}