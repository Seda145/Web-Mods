<img width="1000" height="300" alt="Banner_Web_mods" src="https://github.com/user-attachments/assets/37c61bd0-96df-48bd-989e-1e6aede84abd" />


# Readme

## -- Who am I? --

I am a web developer: 
- (HTML, JS, LESS, C#), (WordPress, Bolt, NopCommerce, Umbraco, Ferret Tale, Melonade).

Game developer: 
- (C++, LUA), (Unreal (Ferrefy), XRay (Road To The North)).

Designer: 
- Blender3D (models, logos, animations, etc.), Gimp (textures).

Musician:
- (bass guitar, guitar, piano), (Audacity, Rocksmith addict).

Many of my previous projects can be found online. I am known as "Seda145" and name "Roy Wierer".

Or, look at my GitHub profile for any other projects.

## -- Who is this for? --

I made this for javascript web / app developers. Study it, discuss it.

This is a method to manage modern apps that run on a single browser page. Such apps can consist of ever changing combinations of components that form the larger whole, the dynamic content of an app.

If the system should then simplify your implementation, testing and management process.

It works best when controlling the entire application, rather than part of it. Game developers will feel at home, used to similar techniques in modern game engines. It works best in environments in which component combinations are complex or change often.

The project is an active experiment. Study it. Customize it. I have tested it by porting and developing private projects (100% success), of which one is my (browser) game engine (Pareidolia), where I use the system everywhere applicable.

Also, look at the license.

## -- 1. Observation of "the website" --

Almost all websites work by navigating the browser from page to page. Previous page state (memory) is lost, then only partially rebuilt, causing a bad user experience:
- Data loss; 
- UI resets; 
- Glitchy / heavy / unresponsive feel.

User asks a solution from "A", is sent to "B", "C" ... . The "helpdesk experience".

## -- 2. An approach to solve that problem --

Fix: "Page" alters itself properly.

Challenge: Memory is preserved. Components load and unload. User feedback is continuous. 

Solution:

I call my system "Mods" (for modifications). A Mod is a component, a part of a larger whole. Mods solve the challenge by simplifying and automating app management, from creation, during lifetime, to destruction. It does so by both tracking and cleaning its traces for you. At the same time, the tracking system greatly enhances command based app control and debugging. Automation reduces programming time and removes developer errors (such as memory leaks).

Create anything you can think of, be it a simple website header or a complex game character, benefits included.

## -- Can I see it implemented in a project? --

Yes! I made my game engine "Pareidolia" with it. It's on my GitHub page.

Or, look at media below.

### Media:

#### Pareidolia app structure:

<img width="818" height="757" alt="Preview_Web_Mods_App_Code_Structure" src="https://github.com/user-attachments/assets/83f05973-3f14-466f-9f40-fafcf588599e" />


<img width="1255" height="677" alt="Preview_Web_Mods_App_Structure" src="https://github.com/user-attachments/assets/0b156d0a-d951-4045-9f2b-69e38b10bb1f" />


## -- How do I get started? --

The app is made for modern desktop web browsers, and tested on Chrome browser using Windows OS. English was used during testing. It does not use an internet connection.

Download the app to a location on your desktop.

To start the demo, open "/demo.htm" in your web browser. This loads a (very) minimal visual interface made from Mod components, enough to get you started.

Javascript developers can enjoy this. Interact with Mods from the console, and by inspecting them in your code editor.

## -- How does my Mod system work? --

Mods (modifications) are reusable components which add functionality to a larger whole. When destroyed, they clean up automatically. The system is based on my experience in game development, which websites can benefit from. An entire application can be built from nested mods. 

An example comparable to the (HTML) structure of a website, the entire app can be build from Mod instances:
- App
    - Registry
    - PreLoader
    - Header
        - NavigationPanel
            - NavigationButtonA
            - NavigationButtonB
    - PageInjector
        - GamePage
            - GameLevel
                - LevelBuilder
                - Viewport
                - CharacterA
                    - Transform
                        - Collision
                        - Navigator
                        - Visual
                        - Camera
                - CharacterB
                    - ...
                - ...
    - Footer

Every mod:
- Is registered to the central registry by a unique ID (optional, but useful!). 
- References its parent and Mods it added, providing a (Mod) tree structure.
- Provides reusable functionality and automation to a larger whole.
- Automatically cleans up its traces (references, listeners, elements, intervals, etc.)

More Mods == less work. More importantly, it simplifies management, automates, and reduces error probability by doing so.

## -- Other examples --

Look at my game engine "Pareidolia", which is implemented with Mods. It's on my GitHub page.

Or, browse through snippets below.

This example shows code for a (content) page navigator with smooth transitions, using my Mod system.

#
```
class PageInjectorMod extends ElementMod {
    getHTMLTemplate() {
        return `<main class="page-injector-mod max-width-wrap"></main>`;
    }

    unloadPage() {
        this.removeMod(this.pageMod);
        this.getElement().classList.remove("page-injector-mod-fade-in");
		this.removeMod(this.timeoutMod);
    }

    loadPage(inModClass) {
        this.unloadPage();
        this.addModProp(inModClass, 'pageMod', { eParent: this.getElement() });
        this.addModProp(TimeoutMod, null, { timeout: { time: 50, bDestroy: true, func: () => { this.getElement().classList.add("page-injector-mod-fade-in"); }}});
    }
}

// Using PageInjectorMod in a parent Mod:

class MyApp extends elementMod {
    prepareCreation(inPrepData) {
        super.prepareCreation(inPrepData);

        // Add page injector.
        this.addModProp(PageInjectorMod, null, { eParent: elementMod.getElement() });

        // Let's inject the first content page.
        this.pageInjectorMod.loadPage(DemoPageMod);
    }
}

// HTML result:

<div class="demo-mod">
    <main class="page-injector-mod max-width-wrap page-injector-mod-fade-in">
        <div class="demo-page-mod">
            <p>This is content for the demo page</p>
        </div>
    </main>
</div>

```
#

Example variations of ways to implement your class:

#
```
class MyHeaderElementMod extends ElementMod {
    getHTMLTemplate() {
        return (`<div class="my-header-element-mod"></div>`);
    }
}

class MyClass extends Mod {
    prepareCreation(inPrepData) {
        super.prepareCreation(inPrepData);

        // Example 1: MyHeaderElementMod extends ElementMod. Automatically build and attach element to:
        const headerX = this.addMod(MyHeaderElementMod, { eParent: this.getElement() });

        // Example 2: Build a new ElementMod with custom html (instead of creating class MyHeaderElementMod):
        const headerY = this.addMod(ElementMod, { eParent: this.getElement(), html: `<div class="my-header-element-mod"></div>` });
        
        // Example 3: Automatically build but manually attach element to:
        const headerZ = this.addMod(MyHeaderElementMod);
        document.body.append(headerZ.getElement());

        // Code remains clean. Mods handle their own destruction logic and don't leave traces.

        const listener = this.addMod(ListenerMod);
        listener.listen(this.element, "click", this.actOnClick);
        listener.listen(this.element, "keyup", this.actOnKeyUp);

        // Want to store a Mod as property on the parent Mod? Do:
        // Example 1: creates "this.debuggerMod"
        this.modProp(this.addMod(DebuggerMod));

        // Example 2: Alternative method.
        // this.addModProp(DebuggerMod);

        // Example 3: Alternative method with custom name.
        // this.addModProp(DebuggerMod, 'myDebuggerMod');

        // Example 4: addModProp with default name ('timeoutMod') and with prepData (setup data object).
        // On this specific example the TimeoutMod reads its prepdata to set a 1ms timeout and automatic cleanup + destruction after.
        // this.addModProp(TimeoutMod, null, { timeout: { time: 1, bDestroy: true, func: () => { document.body.classList.add("js-loaded-app"); }}});

        // Just like timeout, you can run interval as a oneliner.
        this.addMod(IntervalMod, { interval: { speed: 16, func: () => { //DoStuff }}});

        // A DispatcherMod creates its own element to dispatch events from.
		const dispatcher = this.addMod(DispatcherMod);
		dispatcher.dispatch(new Event('hello-world', { bubbles: false }));

        const intervalMod = this.addMod(IntervalMod);
        intervalMod.setInterval(1000, () => { console.log("testing 1 sec interval")});
    } 

    // prepareRemoval() {
        // Nothing to see here. Automated. Go build stuff.
    // }

    // Provides HTML for ElementMod to build its element with.
	getHTMLTemplate() {
        return (`<div class="my-class"></div>`);
    }

    /* Events */

    actOnClick(inEvent) { // Respond }
	
	actOnKeyUp(inEvent) { // Respond }
}
```
#

Instructing Mods is simple and flexible. Do it directly, from a parent Mod, or with the RegistryMod.

#

```
The many ways to instruct mods from different places also makes them easy to work with.
Previously I've shown how to add mods. Mods and traces are automatically removed when their parent is removed.
Here's how to delete them on demand:

Example 1: From a parent Mod, using a modProp that might be null.
this.removeMod(this.myModProp);

Example 2: From a parent Mod, using a modProp.
this.myModProp.destroy();

Example 3: From a parent Mod, using Mod id.
this.removeModByID(modId);

Example 4: From the list of inner Mods a parent tracks.
this.getMod(modId).destroy();

Example 5: From the registry, by Mod Id.
app.getRegistry().getModRegistry().get(modId).destroy();


```

#

The RegistryMod provides direct access to the full application (Mod) tree. There you can inspect, filter and instruct all at once. 
An app can function without a Registry. Do consider the advantages.

Benefits of having a registry are:
1. Find / filter through all Mod instances ("Find all instances of type Person, wearing blue shirt, in entire app").
2. Gain complete centralized app control.
3. Enhances debugging.

Try these lines in the console:

#

```
Example 1: Displays all Mods present in the registry.
app.getRegistry().getModRegistry();

Example 2: Returns all Mod instances inheriting from class.
app.getRegistry().getModRegistry().values().toArray().filter((x) => x instanceof ElementMod)

Example 3: Returns all Mod instances exactly of from class.
app.getRegistry().getModRegistry().values().toArray().filter((x) => x.constructor == HeaderMod)
```

When found, you can store a search result (Mod) to a console variable and instruct it directly.
