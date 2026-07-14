# changelog

## Unreleased

### Added

- Added the standard `formResetCallback()` to restore `initialValue` and clear validation state.

### Changed

- The interactive switch surface now uses a native button with switch semantics, forwarded ARIA state, native disabled behavior, and programmatic focus support.
- Standardized `invalid` custom-state and `ariaInvalid` updates in validation display and cleanup callbacks.
- Added the React `initialValue` prop and forwarded `value` and `initialValue` directly as React 19 custom-element properties.
- Standardized all custom theme recipes on `jb-switch.<theme>-style`, public parts, and custom-state selectors.

### Fixed

- Preserved property-assigned values during connection when no `value` attribute is present.

## [] - 2026-03-11
### new features:
    - support react standard props
    - add styling story and documentation with reusable style recipes.
    - add `component` and `trigger` CSS parts.
    - add `active`, `inactive`, `loading`, and `disabled` custom states.
    - add public CSS variables for switch size, captions, trigger fill, bar border, focus, disabled, and motion styling.

## [1.6.0] - 2025-10-01
### new features:
    - add i18n support

## [1.5.0] - 2025-04-26
### changed:
    - refactor event system and use `jb-core` event modules.
    - use jb design system color palette.

## [1.4.0] - 2024-02-1
### new features:
    - move react component from `jb-switch-react` to `jb-switch/react`

## [1.3.0] - 2024-01-23
### new features:
    - support async validation

## [1.2.0] - 2024-01-23
### new features:
    - add validation module
    - add name and other form related attributes
## [1.1.1] - 2024-01-30
### fixed
    - fix md file styling section

## [1.1.0] - 2024-01-30
### new features:
    - add custom css variable

## [1.0.1] - 2024-01-30
### fixed
    - fix loading styles

## [1.0.0] - 2024-01-09
### changed
    - switch to web-component and port original react component to web component 

