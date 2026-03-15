/*****
** 
*****/
class RegistryMod extends Mod {
    #modRegistry = new Map();

    prepareCreation(inPrepData) {
        super.prepareCreation(inPrepData);

        this.addModProp(DispatcherMod);
    } 

    prepareRemoval() {
        // If the registry is going to be removed, everything else should already be breaking / broken down.
        // So I'm not unregistering stuff here through unregister method.
        this.getModRegistry().clear();

        super.prepareRemoval();
    }

    getModRegistry() {
        return this.#modRegistry;
    }

    addMod(InModClass) {
        return super.addMod(InModClass, this);
    }

    register(inMod) {
        this.getModRegistry().set(inMod.getModID(), inMod);
    }

    unregister(inMod) {
        this.getModRegistry().delete(inMod.getModID());
    }
}