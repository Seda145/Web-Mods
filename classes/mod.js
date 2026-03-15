/*****
** A Mod (short for modification) is a component which adds functionality to a larger whole.
** It handles creation and removal of other mods, and registers them to its own Mod tree.
** A Mod registers to a central mod registry.
** On removal, a mod cleans its own references.
*****/
class Mod {
    #bIsDestroying = false;
    #bIsCreating = true;
    #modID = crypto.randomUUID();
    #mods = new Map();
    #parentMod = null;
    #registry = null;

    create(inParentMod, inRegistry, inPrepData = {}) {
        this.#parentMod = inParentMod;

        this.#registry = inRegistry;

        this.prepareCreation(inPrepData);

        this.getRegistry()?.register(this);

        this.#bIsCreating = false;
    }

    prepareCreation(inPrepData) {
        // Override. Don't call manually.
        if (!this.isCreating()) {
            console.error("Don't call prepareCreation directly. Call create.");
        }
    }

    prepareRemoval() {
        // Override. Don't call manually.
        if (!this.isDestroying()) {
            console.error("Don't call prepareRemoval directly. Call destroy.");
        }
    }

    isDestroying() {
        return this.#bIsDestroying;
    }

    isCreating() {
        return this.#bIsCreating;
    }

    getModID() {
        return this.#modID;
    }

    getMods() {
        return this.#mods;
    }

    getRegistry() {
        return this.#registry;
    }

    setRegistry(inRegistry) {
        return this.#registry = inRegistry;
    }

    destroy() {
        this.#bIsDestroying = true;
        
        if (this.getParentMod() != null && this.getParentMod().getMods().has(this.getModID())) {
            // If there is a parent mod, the parent must unregister this mod from itself.
            this.getParentMod().removeMod(this);
        }
        else {
            // Unregister immediately, to avoid leaving Mods in that are destroying.
            this.getRegistry()?.unregister(this);

            // Override prepareRemoval to implement additional cleaning logic to children.
            this.prepareRemoval();

            for (const modVal of this.getMods().values()) {
                this.removeMod(modVal);
            }

            this.#parentMod = null;
            this.#registry = null;
            this.getMods().clear();
        }
    }

    getMod(inID) {
        return this.getMods().get(inID);
    }

    getParentMod() {
        return this.#parentMod;
    }

    makeModPropName(inClass) {
        // Using the class name (with first char lowercase) as a name for parent mod property injection.
        return inClass.name.charAt(0).toLowerCase() + inClass.name.substring(1);
    }

    modProp(inMod, inPropertyName) {
        if (inMod == null || this.getMod(inMod.getModID()) == null) {
            console.error("Can only refer to child mod.");
            return;
        }

        // Just a check, cause passing a wrong argument is easily done. 
        // TODO disable if no longer used.
        const isInPropertyNameString = typeof inPropertyName === 'string';
        if (inPropertyName != null && !isInPropertyNameString) {
            console.error("Invalid modProp inPropertyName type detected.");
        }

        const prop = isInPropertyNameString
            ? inPropertyName 
            : this.makeModPropName(inMod.constructor);

        if (this[prop] != null) {
            console.error(`The property: ${prop}, already exists on: ${this.constructor.name}`);
            return;
        }

        // Inject self into parent as a property.
        // I do this to further avoid creating pointers to components manually.
        // Simply avoid adding properties to your Mod class suffixed "Mod" manually.
        this[prop] = inMod;
        inMod.parentModProp = prop;
    }

    addMod(InModClass, inPrepData = {}) {
        let newMod = new InModClass();
        this.getMods().set(newMod.getModID(), newMod);
        newMod.create(this, this.getRegistry(), inPrepData);
        return newMod;
    }

    addModProp(InModClass, inPropertyName, inPrepData = {}) {
        // Can be preferred over combining addMod and ModProp, as it assigns the property early.
        let newMod = new InModClass();
        this.getMods().set(newMod.getModID(), newMod);
        this.modProp(newMod, inPropertyName);
        newMod.create(this, this.getRegistry(), inPrepData);
        return newMod;
    }

    removeMod(inMod) {
        if (inMod == null) {
            return;
        }

        // Unregister immediately, to avoid leaving Mods in that are destroying.
        // This is important, otherwise inMod.destroy loops the request back to this.removeMod.
        this.getMods().delete(inMod.getModID());
        
        // If we assigned the mod reference directly to a parent property, remove it from the parent.
        delete this[inMod.parentModProp];

        // Process inMod destruction in steps.
        inMod.destroy();
    }

    removeModByID(inID) {
        let theMod = this.getMods().get(inID);
        this.removeMod(theMod);
    }

    filterMods(inFunc) {
        return this.getMods().values().filter(inFunc);
    }

    getModsInstanceOfClass(inClass) {
        return this.filterMods((x) => { return x instanceof inClass; });
    }

    getModsOfExactClass(inClass) {
        return this.filterMods((x) => { return x.constructor == inClass; });
    }
}