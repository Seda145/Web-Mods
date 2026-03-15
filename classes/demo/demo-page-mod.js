/*****
** 
*****/
class DemoPageMod extends ElementMod {
    getHTMLTemplate() {
        return `
<div class="demo-page-mod">
    <h1>How does the Mod system work?</h1>

    <p>Mods (modifications) are reusable components which add functionality to a larger whole. When destroyed, they clean up automatically. The system is based on my experience in game development, which websites can benefit from. An entire application can be built from nested mods.</p>

    <p>An example comparable to the (HTML) structure of a website, the entire app can be build with Mods:</p>

<pre>
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
</pre>

    <p>Every mod:</p>

    <ul>
        <li>Is registered to the central registry by a unique ID (optional, but useful!).</li>
        <li>References its parent and Mods it added, providing a (Mod) tree structure.</li>
        <li>Provides reusable functionality and automation to a larger whole.</li>
        <li>Automatically cleans up its traces (references, listeners, elements, intervals, etc.)</li>
    </ul>

    <p>More Mods == less work. More importantly, it simplifies management, automates, and reduces error probability by doing so.</p>
    
</div>
        `;
    }
}