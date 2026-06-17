# jb-switch

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-switch)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-switch/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-switch)](https://www.npmjs.com/package/jb-switch)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-switch)

`jb-switch` is a form-associated boolean switch web component with captions, loading state, validation, and cancellable change flow.

- Submits `"true"` or `"false"` as a form value.
- Supports true and false captions.
- Supports loading animation.
- Supports disabled and required states.
- Dispatches cancellable `before-change` before committing a new value.
- Uses `jb-validation` for custom validation.

## When to use

Use `jb-switch` for a boolean setting that can be turned on or off.

Use `jb-checkbox` when the UI should look like a checkbox or when the boolean is part of a list of choices.

## Demo

- [Storybook](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch)

## Using With JS Frameworks

- [<img src="https://img.shields.io/badge/React.js-jb--switch%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" />](https://github.com/javadbat/jb-switch/tree/main/react)

## Installation

```sh
npm i jb-switch
```

```js
import 'jb-switch';
```

```html
<jb-switch name="enabled" true-title="Enabled" false-title="Disabled"></jb-switch>
```

## API reference

### Attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `value` | `boolean` | `false` | Switch value. Only `"true"` means true. |
| `name` | `string` | `""` | Form field name. |
| `true-title` | `string` | `""` | Caption shown on the true side. |
| `false-title` | `string` | `""` | Caption shown on the false side. |
| `disabled` | `boolean` | `false` | Disables user interaction. Empty attribute and `"true"` mean true. |
| `loading` | `boolean` | `false` | Shows loading animation. Empty attribute and `"true"` mean true. |
| `required` | `boolean` | `false` | Requires the value to be true for validation. Empty attribute and `"true"` mean true. |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `value` | `boolean` | no | Current boolean value. |
| `isLoading` | `boolean` | no | Shows or hides loading animation. |
| `disabled` | `boolean` | no | Enables or disables user interaction. |
| `required` | `boolean` | no | Requires the value to be true for validation. |
| `validation` | `ValidationHelper<boolean>` | yes | Validation helper from `jb-validation`; set `validation.list` for custom rules. |
| `form` | `HTMLFormElement \| null` | yes | Associated form from `ElementInternals`. |
| `name` | `string` | yes | Form field name from the `name` attribute. |
| `isDirty` | `boolean` | yes | `true` when current value differs from `initialValue`. |
| `validationMessage` | `string` | yes | Current validation message from `ElementInternals`. |

### Methods

| name | returns | description |
| --- | --- | --- |
| `checkValidity()` | `boolean` | Runs validation without showing an error message. |
| `reportValidity()` | `boolean` | Runs validation and requests visible error handling. |
| `focus()` | `void` | Public focus method placeholder. Keyboard focus management is not currently implemented. |
| `clearValidationError()` | `void` | Placeholder for clearing visible validation error UI. |

### Events

| event | cancelable | description |
| --- | --- | --- |
| `load` | no | Dispatched from `connectedCallback` before initialization. |
| `init` | no | Dispatched from `connectedCallback` after initialization. |
| `before-change` | yes | Dispatched before committing a user-triggered value change. Call `preventDefault()` to cancel. |
| `change` | yes | Dispatched after value changes. Call `preventDefault()` to revert the committed change. |

## Value

```js
const switchEl = document.querySelector('jb-switch');

console.log(switchEl.value);
switchEl.value = true;
```

```html
<jb-switch value="true"></jb-switch>
<jb-switch value="false"></jb-switch>
```

Only `value="true"` sets the value to true. `value="false"`, an empty value, or a missing value sets it to false.

## Cancellable change

Use `before-change` to cancel before the value commits. During this event, `event.target.value` returns the intended next value.

```js
const switchEl = document.querySelector('jb-switch');

switchEl.addEventListener('before-change', (event) => {
  if (event.target.value === true && !canEnable()) {
    event.preventDefault();
  }
});
```

`change` is also cancelable. If you call `preventDefault()` on `change`, the component reverts the value.

## Loading state

```html
<jb-switch loading></jb-switch>
```

```js
const switchEl = document.querySelector('jb-switch');

switchEl.isLoading = true;
switchEl.isLoading = false;
```

## Validation

Use `required` when the switch must be true.

```html
<jb-switch required></jb-switch>
```

Use `validation.list` for custom validation rules. For advanced validators, see [`jb-validation`](https://github.com/javadbat/jb-validation).

```js
const switchEl = document.querySelector('jb-switch');

switchEl.validation.list = [
  {
    validator: (value) => value === true,
    message: 'Switch must be enabled',
  },
];
```

## CSS parts and variables

| part | description |
| --- | --- |
| `true-text` | True-side caption. |
| `false-text` | False-side caption. |
| `svg-wrapper` | Wrapper around the switch SVG. |
| `switch` | The switch SVG. |
| `bar` | Switch background bar. |
| `trigger-button` | Movable trigger group. |
| `trigger-ring` | Ring inside the trigger button. |

| CSS variable name | description |
| --- | --- |
| `--jb-switch-bg-color-active` | Background color when value is true. |
| `--jb-switch-bg-color` | Background color when value is false. |
| `--jb-switch-ring-color` | Trigger ring color when value is false. |
| `--jb-switch-ring-color-active` | Trigger ring color when value is true. |

```css
jb-switch {
  --jb-switch-bg-color-active: green;
  --jb-switch-ring-color-active: green;
}
```

## Accessibility notes

- The component attaches `ElementInternals` and sets role to `switch` where supported.
- Keyboard control and focus behavior are not currently implemented.
- Use clear captions or surrounding label text so users know what setting the switch controls.

## Related Docs

- See [`jb-switch/react`](https://github.com/javadbat/jb-switch/tree/main/react) if you want to use this component in React.
- See [`jb-validation`](https://github.com/javadbat/jb-validation) for validation rules.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `jb-switch` once before using `<jb-switch>`.
- Use `value="true"` in HTML for true; `value="false"` is false.
- Use the `value` property for programmatic boolean updates.
- Use `isLoading` in JavaScript and `loading` in HTML.
- Listen to `before-change` to validate or confirm before committing.
- Listen to `change` for committed value changes.
- This package includes [`custom-elements.json`](./custom-elements.json) and points to it with the package.json `customElements` field. The field is documented by the Custom Elements Manifest project in [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages).
- In `custom-elements.json`, `exports.kind: "js"` describes JavaScript/TypeScript exports and `exports.kind: "custom-element-definition"` maps the `jb-switch` tag name to `JBSwitchWebComponent`.
