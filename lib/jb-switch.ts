import HTML from './jb-switch.html';
import CSS from './jb-switch.scss';
import { ElementsObject } from './types';

export class JBSwitchWebComponent extends HTMLElement {
    static get formAssociated() { return true; }
    #value = false;
    //when we call on before change we save new value here so when user use event.target.value he will see new value but after the event bubble done we null it.
    //it mostly defined here for react eco-system
    #ChangeEventPreservedValue:boolean | null = null;
    elements!: ElementsObject;
    #disabled = false;
    internals_?: ElementInternals;
    get value(): boolean {
        if(this.#ChangeEventPreservedValue !== null){
            return this.#ChangeEventPreservedValue;
        }
        return this.#value;
    }
    set value(value: boolean) {
        if (this.#value !== value) {
            this.#value = value;
        }
        this.#updateDomForValueChange();
        //comment for typescript problem
        if (this.internals_ && typeof this.internals_.setFormValue == "function") {
            this.internals_.setFormValue(`${value}`);
        }
    }
    #isLoading = false;
    get isLoading(){
        return this.#isLoading;
    }
    set isLoading(value:boolean){
        this.#isLoading = value;
        if(value){
            this.elements.triggerCircleBar.classList.add('--loading');
        }else{
            this.elements.triggerCircleBar.classList.remove('--loading');
        }
    }
    constructor() {
        super();
        if (typeof this.attachInternals == "function") {
            //some browser don't support attachInternals
            this.internals_ = this.attachInternals();
        }
        this.initWebComponent();
    }
    connectedCallback(): void {
        // standard web component event that called when all of dom is bound
        this.callOnLoadEvent();
        this.initProp();
        this.callOnInitEvent();

    }
    callOnLoadEvent(): void {
        const event = new CustomEvent('load', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    callOnInitEvent(): void {
        const event = new CustomEvent('init', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    initWebComponent(): void {
        const shadowRoot = this.attachShadow({
            mode: 'open',
            delegatesFocus: true,
        });
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            componentWrapper: shadowRoot.querySelector('.jb-switch-web-component')!,
            falseText: shadowRoot.querySelector('.false-text')!,
            trueText: shadowRoot.querySelector('.true-text')!,
            switch: shadowRoot.querySelector('.switch-svg')!,
            triggerCircleBar:shadowRoot.querySelector('.trigger-circle-bar')!,
            triggerButton:shadowRoot.querySelector('.trigger-button')!,
        };
        this.registerEventListener();
    }
    registerEventListener(): void {
        this.elements.componentWrapper.addEventListener('click', () => this.#onComponentClick());
    }
    initProp() {
        this.#disabled = false;
        this.value = this.getAttribute('value') === "true" || false;
    }
    static get observedAttributes(): string[] {
        return ['true-title', "false-title", 'value', 'name', 'disabled',];
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name: string, value: string): void {
        switch (name) {
            case 'value':
                this.value = Boolean(value);
                break;
            case 'name':
                this.elements.componentWrapper.setAttribute('name', value);
                break;
            case 'true-title':
                this.elements.trueText.innerText = value;
                break;
            case 'false-title':
                this.elements.falseText.innerText = value;
                break;
            case 'disabled':
                if (value == '' || value === "true") {
                    this.#disabled = true;
                } else if (value == "false" || value == null || value == undefined) {
                    this.#disabled = false;
                }
                break;

        }

    }
    #onComponentClick(): void {
        if (this.#disabled) {
            return;
        }
        this.#ChangeEventPreservedValue = !this.#value;
        const isEventPrevented = this.#dispatchOnBeforeChangeEvent();
        this.#ChangeEventPreservedValue = null;
        if(!isEventPrevented){
            this.value = !this.#value;
            this.#dispatchOnChangeEvent();
        }
    }
    #dispatchOnBeforeChangeEvent(): boolean {
        const event = new CustomEvent('before-change',{cancelable:true});
        this.dispatchEvent(event);
        const prevented = event.defaultPrevented;
        return prevented;
    }
    #dispatchOnChangeEvent(): void {
        const event = new CustomEvent('change');
        this.dispatchEvent(event);
    }
    /**
     * @public
     */
    //TODO: find a way to manage focus and keyboard control
    focus() {
        //public method
        //this.elements.input.focus();
    }
    #updateDomForValueChange() {
        if (this.value) {
            this.elements.falseText.classList.remove("--active");
            this.elements.trueText.classList.add("--active");
            this.elements.switch.classList.add('--active');
        } else {
            this.elements.trueText.classList.remove("--active");
            this.elements.falseText.classList.add("--active");
            this.elements.switch.classList.remove('--active');
        }

    }
}
const myElementNotExists = !customElements.get('jb-switch');
if (myElementNotExists) {
    window.customElements.define('jb-switch', JBSwitchWebComponent);
}
