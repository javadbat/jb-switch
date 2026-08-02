# jb-switch React component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-switch)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-switch/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-switch-react)](https://www.npmjs.com/package/jb-switch-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-switch)

React wrapper for [`jb-switch`](https://github.com/javadbat/jb-switch). It imports and registers the underlying form-associated switch web component.

## Demo

Explore the [basic switch demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--normal), [loading behavior](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--loading-action-test), [cancellable changes](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test), and [RTL captions](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--rtl). For standalone code, use the [CodeSandbox preview](https://3f63dj.csb.app/samples/jb-switch) or [CodeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBSwitch.tsx).

## Installation

```sh
npm install jb-switch
```

```jsx
import { JBSwitch } from 'jb-switch/react';

<JBSwitch value={enabled} trueTitle="Active" falseTitle="Inactive" />;
```

## When to use

Use `JBSwitch` for a boolean setting that can be toggled on or off and should show both active and inactive labels. See the [basic switch demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--normal).

Use `JBCheckbox` when the UI represents agreement, selection, or a single boolean option in a form rather than an immediate setting.

## Props

| prop | type | description |
| --- | --- | --- |
| `value` | `boolean` | Current boolean value; see the [controlled value demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--normal). |
| `name` | `string` | Form field name. |
| `trueTitle` | `string` | Caption shown on the true side; see [RTL captions](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--rtl). |
| `falseTitle` | `string` | Caption shown on the false side; see [RTL captions](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--rtl). |
| `isLoading` | `boolean` | Shows loading animation; see the [loading demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--loading-action-test). |
| `disabled` | `boolean` | Disables user interaction. |
| `required` | `boolean` | Requires the value to be true for validation; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test). |
| `validationList` | `ValidationItem<boolean>[]` | Custom validation rules from `jb-validation`; see [validation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test). |

## Events

| prop | event | description |
| --- | --- | --- |
| `onLoad` | `load` | Called before initialization; see the [event demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test). |
| `onInit` | `init` | Called after initialization; see the [event demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test). |
| `onBeforeChange` | `before-change` | Cancellable event called before committing a user-triggered value change; see [cancellable changes](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test). |
| `onChange` | `change` | Cancellable event called after value changes. Prevent default to revert the value; see [cancellable changes](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test). |

## Controlled value

Use a boolean `value` with `onChange` to keep the switch synchronized with React state; see the [normal interaction](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--normal).

```jsx
const [enabled, setEnabled] = useState(false);

<JBSwitch
  value={enabled}
  trueTitle="Active"
  falseTitle="Inactive"
  onChange={(event) => setEnabled(event.target.value)}
/>;
```

## Value

Read `event.target.value` in `onBeforeChange` for the intended next value and in `onChange` for the committed value. See the [initial/reset flow](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--initial-value) and [controlled precedence](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--initial-value-does-not-override-value).

`value` is a boolean. Read `event.target.value` in `onBeforeChange` for the next value and in `onChange` for the committed value.

## Loading state

Set `isLoading` while an async save is running; see the [loading action demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--loading-action-test).

```jsx
<JBSwitch
  value={enabled}
  isLoading={isSaving}
  trueTitle="Enabled"
  falseTitle="Disabled"
/>;
```

## Cancellable change

Use `onBeforeChange` to reject a toggle before it commits, or prevent default on `onChange` to revert it. The [event demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test) covers both paths.

```jsx
<JBSwitch
  value={enabled}
  onBeforeChange={(event) => {
    if (event.target.value === true && !canEnable()) {
      event.preventDefault();
    }
  }}
  onChange={(event) => setEnabled(event.target.value)}
/>;
```

## Validation

Use `required` and `validationList` when the switch must be true; see the [validation demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--event-test).

```jsx
<JBSwitch
  required
  validationList={[
    {
      validator: (value) => value === true,
      message: 'Switch must be enabled',
    },
  ]}
/>;
```

## Styling

The React component uses the same CSS variables and parts as the web component. See the shared [web-component styling guidance](../README.md#css-parts-and-variables) and the [style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch-style--gallery).

```css
.feature-switch {
  --jb-switch-bg-color-active: green;
  --jb-switch-ring-color-active: green;
}
```

```jsx
<JBSwitch className="feature-switch" value={enabled} />
```

## CSS parts and variables

Use the same CSS parts and variables as the web component. The `Styling` section above shows the React class-based pattern; see the [style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch-style--gallery).

## Accessibility notes

Use clear `trueTitle` and `falseTitle` text so the current state is understandable. Set `disabled` while a save operation is in progress if the setting should not be toggled repeatedly. See the [basic switch](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--normal) and [RTL caption](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--rtl) demos.

## Captions and RTL

Use `trueTitle` and `falseTitle` to explain both states. The [RTL demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbswitch--rtl) shows the captions in a right-to-left layout.

## Shared Documentation

For web-component behavior, form association, validation, events, CSS parts, and CSS variables, see [`jb-switch`](https://github.com/javadbat/jb-switch).

## Related Docs

- See [`jb-validation`](https://github.com/javadbat/jb-validation) for validation rules.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `JBSwitch` from `jb-switch/react`; the wrapper imports and registers the underlying `jb-switch` web component.
- Use `value` as a boolean prop.
- Use `isLoading` in React, not the HTML `loading` attribute.
- Use `trueTitle` and `falseTitle`, not `true-title` and `false-title`.
- Use `event.target.value` in `onChange` for the new boolean value.
- Use `onBeforeChange` to cancel before committing a user-triggered change.
