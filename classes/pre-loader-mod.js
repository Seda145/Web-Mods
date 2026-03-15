/*****
** Class which caches files to file paths, for reuse.
** Useful when there is no default browser caching. 
** For example, when you want to draw the same image multiple times on a canvas.
*****/
class PreLoaderMod extends Mod {
    #cache = new Map();

    prepareRemoval() {
        this.getCache().clear();

        super.prepareRemoval();
    }

    getCache() {
        return this.#cache;
    }

    isDataInLoadState(inData) {
        return inData instanceof Promise;
    }

    isDataInCompleteState(inData) {
        return inData != null && !this.isDataInLoadState(inData);
    }

    isLoading(inPath) {
        return this.isDataInLoadState(this.getCache().get(inPath));
    }
    
    hasLoaded(inPath) {
        return this.isDataInCompleteState(this.getCache().get(inPath));
    }

    getLoadedData(inPath) {
        const data = this.getCache().get(inPath);
        return this.isDataInCompleteState(data) ? data : null;
    }

    unloadData(inPath) {
        this.getCache().delete(inPath);
    }

    requestThroughCache(inPath, inCallBackFunc, inType) {
        // inPath:          System path string to a file we want to load.
        // inType:          file type matching the file at inPath.
        // inCallBackFunc:  Function to call when inObj is loaded.

        // cached data is null OR a promise OR the loaded result.
        const cachedData = this.getCache().get(inPath);

        if (this.isDataInCompleteState(cachedData)) {
            // The data is already there and ready.
            // console.log("Data is in complete state.");
            
            // console.log(inCallBackFunc);
            inCallBackFunc(cachedData);
        }
        else if (this.isDataInLoadState(cachedData)) {
            // We're already loading, and just interested in when it's loaded.
            // console.log("Data is in load state.");

            // We got here, so cachedData must be of type Promise.
            // For every request to this data in load state, we make a promise to await a complete state.
            // When that state is reached, a series of callback functions will be called.
            cachedData.then(() => {
                // console.log(cachedData);

                if (!this.hasLoaded(inPath)) {
                    // Just a check to be sure. It shouldn't be reached.
                    // console.error("Data is not registered as loaded, but it should be.");
                    return;
                }

                // Now we call this same method again.
                // With the data loaded, it will process the callback function.
                this.requestThroughCache(inPath, inCallBackFunc, inType);

                // Error caught elsewhere, so catch is empty;
            }).catch(inErr => {}); 
        }
        else {
            // console.log("Data is in null state.");

            let promise = null;
            let objToLoad = null;

            if (inType == EPreloaderFileType.image) {
                objToLoad = new Image();
                objToLoad.src = inPath;
                promise = objToLoad.decode();
            }

            if (promise == null) {
                console.error("Could not create promise.");
                return;
            }

            // ! Cache the promise!
            this.getCache().set(inPath, promise);

            promise.then(() => {
                // Update the cache to contain the loaded data instead of promise.
                this.getCache().set(inPath, objToLoad);
                // console.log(`Loaded file into cache for path: ${inPath}`);
                // console.log(objToLoad);
                
            }).catch((inErr) => {
                console.error(`Error loading data for path: ${inPath}, error: ${inErr}`);
                // I'm not removing the path from the cache here rn.
            });

            // Now we call this same method again.
            // With the promise inside the cache, we can attach the callback.
            this.requestThroughCache(inPath, inCallBackFunc, inType);
        }
    }

    loadImage(inPath, inCallBackFunc) {
        this.requestThroughCache(inPath, inCallBackFunc, EPreloaderFileType.image);
    }
}