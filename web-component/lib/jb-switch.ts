import CSS from './jb-switch.css';
import VariablesCSS from './variables.css';
import { ValidationHelper, ValidationItem, ValidationResult, type WithValidation, type ShowValidationErrorParameters } from 'jb-validation';
import { type JBFormInputStandards } from 'jb-form';
import { ElementsObject, ValidationValue } from './types.js';
import {registerDefaultVariables} from 'jb-core/theme';
import { renderHTML } from './render';
import { dictionary } from './i18n';
import { i18n } from 'jb-core/i18n';

export * from './types.js';
export class JBSwitchWebComponent extends HTMLElement implements WithValidation, JBFormInputStandards<boolean> {
  static get formAssociated() { return true; }
  #value = false;
  //when we call on before change we save new value here so when user use event.target.value he will see new value but after the event bubble done we null it.
  //it mostly defined here for react eco-system
  #ChangeEventPreservedValue: boolean | null = null;
  elements!: ElementsObject;
  #disabled = false;
  #internals?: ElementInternals;
  get value(): boolean {
    if (this.#ChangeEventPreservedValue !== null) {
      return this.#ChangeEventPreservedValue;
    }
    return this.#value;
  }
  set value(value: boolean) {
    const booleanValue = Boolean(value);
    if (this.#value !== booleanValue) {
      this.#value = booleanValue;
    }
    this.#updateDomForValueChange();
    this.#setFormValue();
  }
  #setFormValue() {
    if (this.#internals && typeof this.#internals.setFormValue === "function") {
      this.#internals.setFormValue(`${this.#value}`);
    }
  }
  #isLoading = false;
  get isLoading() {
    return this.#isLoading;
  }
  get form(){
    return this.#internals?.form??null;
  }
  set isLoading(value: boolean) {
    this.#isLoading = Boolean(value);
    this.#setState("loading", this.#isLoading);
    if (this.#isLoading) {
      this.elements.triggerCircleBar.classList.add('--loading');
    } else {
      this.elements.triggerCircleBar.classList.remove('--loading');
    }
  }
  #validation = new ValidationHelper({
    clearValidationError:this.clearValidationError.bind(this),
    getValue:() => (this.value),
    getValidations:this.#getInsideValidationsCallback.bind(this),
    getValueString: () =>(this.value ? 'true' : 'false'),
    setValidationResult:this.#setValidationResult.bind(this),
    showValidationError:this.showValidationError.bind(this)
  })
  get validation(){
    return this.#validation;
  }
  get name(){
    return this.getAttribute('name') || '';
  }
  initialValue = false;
  get isDirty(): boolean{
    return this.#value !== this.initialValue;
  }
  #required = false;
  set required(value:boolean){
    this.#required = Boolean(value);
    this.#validation.checkValiditySync({showError:false});
  }
  get required() {
    return this.#required;
  }
  isAutoValidationDisabled= false;
  get disabled(){
    return this.#disabled;
  }
  set disabled(value:boolean){
    this.#disabled = Boolean(value);
    this.#setState("disabled", this.#disabled);
  }
  constructor() {
    super();
    if (typeof this.attachInternals === "function") {
      //some browser don't support attachInternals
      this.#internals = this.attachInternals();
      this.#internals.role = "switch";
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
    const event = new CustomEvent('load', { bubbles: true, composed: false });
    this.dispatchEvent(event);
  }
  callOnInitEvent(): void {
    const event = new CustomEvent('init', { bubbles: true, composed: false });
    this.dispatchEvent(event);
  }
  initWebComponent(): void {
    const shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
      clonable:true,
      serializable:true
    });
    registerDefaultVariables();
    const html = `<style>${CSS} ${VariablesCSS}</style>\n${renderHTML()}`;
    const element = document.createElement('template');
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.elements = {
      componentWrapper: shadowRoot.querySelector('.jb-switch-web-component')!,
      falseText: shadowRoot.querySelector('.false-text')!,
      trueText: shadowRoot.querySelector('.true-text')!,
      switch: shadowRoot.querySelector('.switch-svg')!,
      triggerCircleBar: shadowRoot.querySelector('.trigger-circle-bar')!,
      triggerButton: shadowRoot.querySelector('.trigger-button')!,
    };
    this.registerEventListener();
  }
  registerEventListener(): void {
    this.elements.componentWrapper.addEventListener('click', () => this.#onComponentClick());
  }
  initProp() {
    this.value = this.getAttribute('value') === "true";
    this.required = this.getAttribute('required') === "" || this.getAttribute('required') === "true";
    this.disabled = this.getAttribute('disabled') === "" || this.getAttribute('disabled') === "true";
    this.isLoading = this.getAttribute('loading') === "" || this.getAttribute('loading') === "true";
  }
  static get observedAttributes(): string[] {
    return ['true-title', "false-title", 'value', 'name', 'disabled', 'loading', 'required'];
  }
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  onAttributeChange(name: string, value: string | null): void {
    switch (name) {
      case 'value':
        this.value = value === "true";
        break;
      case 'true-title':
        this.elements.trueText.innerText = value ?? "";
        break;
      case 'false-title':
        this.elements.falseText.innerText = value ?? "";
        break;
      case 'disabled':
        this.disabled = value === "" || value === "true";
        break;
      case 'loading':
        this.isLoading = value === "" || value === "true";
        break;
      case 'required':
        this.required = value === "" || value === "true";
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
    if (!isEventPrevented) {
      this.value = !this.#value;
      const DispatchedEvent = this.#dispatchOnChangeEvent();
      if(DispatchedEvent.defaultPrevented){
        this.value = !this.#value;
      }
    }
  }
  #dispatchOnBeforeChangeEvent(): boolean {
    const event = new CustomEvent('before-change', { cancelable: true });
    this.dispatchEvent(event);
    const prevented = event.defaultPrevented;
    return prevented;
  }
  #dispatchOnChangeEvent() {
    const event = new Event('change',{bubbles:true,cancelable:true,composed:true});
    this.dispatchEvent(event);
    return event;
  }
  /**
   * @public
   */
  //TODO: find a way to manage focus and keyboard control
  focus() {
    //public method
  }
  #updateDomForValueChange() {
    this.#setState("active", this.value);
    this.#setState("inactive", !this.value);
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
  #setState(state: string, isActive: boolean) {
    const states = (this.#internals as any)?.states;
    if (isActive) {
      states?.add(state);
    } else {
      states?.delete(state);
    }
  }
  /**
* @description this method called on every checkValidity calls and update validation result of #internal
*/
  #setValidationResult(result: ValidationResult<ValidationValue>) {
    if (result.isAllValid) {
      this.#internals?.setValidity({}, '');
    } else {
      const states: ValidityStateFlags = {};
      let message = "";
      result.validationList.forEach((res) => {
        if (!res.isValid) {
          if (res.validation.stateType) { states[res.validation.stateType] = true; }
          if (message === '') { message = res.message??""; }
        }
      });
      this.#internals?.setValidity(states, message);
    }
  }
  #getInsideValidationsCallback():ValidationItem<ValidationValue>[]{
    if(this.#required){
      return [{
        validator:(value)=>value!==false,
        message:dictionary.get(i18n,'requireMessage')
      }];
    }
    return [];
  }
  showValidationError(params: ShowValidationErrorParameters) {
    //TODO: implement it
  }
  clearValidationError() {
    //TODO: implement it
  }
  get validationMessage(){
    return this.#internals?.validationMessage??"";
  }

  checkValidity(){
    return this.#validation.checkValiditySync({showError:false}).isAllValid;
  }
  reportValidity(){
    return this.#validation.checkValiditySync({showError:true}).isAllValid;
  }
}
const myElementNotExists = !customElements.get('jb-switch');
if (myElementNotExists) {
  window.customElements.define('jb-switch', JBSwitchWebComponent);
}
