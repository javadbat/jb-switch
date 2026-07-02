import type { JBSwitchWebComponent } from 'jb-switch';
import { expect, waitFor } from 'storybook/test';

export function getSwitch(canvasElement: HTMLElement, index = 0) {
  const switchElement = canvasElement.querySelectorAll<JBSwitchWebComponent>('jb-switch')[index];
  expect(switchElement).toBeTruthy();
  expect(switchElement!.shadowRoot).toBeTruthy();
  return switchElement!;
}

export function getSwitchWrapper(switchElement: JBSwitchWebComponent) {
  const wrapper = switchElement.shadowRoot?.querySelector<HTMLElement>('.jb-switch-web-component');
  expect(wrapper).toBeTruthy();
  return wrapper!;
}

export function getSwitchSvg(switchElement: JBSwitchWebComponent) {
  const svg = switchElement.shadowRoot?.querySelector<SVGSVGElement>('.switch-svg');
  expect(svg).toBeTruthy();
  return svg!;
}

export function getTrueText(switchElement: JBSwitchWebComponent) {
  const text = switchElement.shadowRoot?.querySelector<HTMLElement>('.true-text');
  expect(text).toBeTruthy();
  return text!;
}

export function getFalseText(switchElement: JBSwitchWebComponent) {
  const text = switchElement.shadowRoot?.querySelector<HTMLElement>('.false-text');
  expect(text).toBeTruthy();
  return text!;
}

export function getTriggerCircleBar(switchElement: JBSwitchWebComponent) {
  const circle = switchElement.shadowRoot?.querySelector<SVGCircleElement>('.trigger-circle-bar');
  expect(circle).toBeTruthy();
  return circle!;
}

export async function waitForSwitchValue(switchElement: JBSwitchWebComponent, value: boolean) {
  await waitFor(() => {
    expect(switchElement.value).toBe(value);
    expect(getSwitchSvg(switchElement).classList.contains('--active')).toBe(value);
    expect(getTrueText(switchElement).classList.contains('--active')).toBe(value);
    expect(getFalseText(switchElement).classList.contains('--active')).toBe(!value);
  });
}

export async function appendEventSwitch(canvasElement: HTMLElement) {
  const events: string[] = [];
  const switchElement = document.createElement('jb-switch') as JBSwitchWebComponent;

  switchElement.setAttribute('true-title', 'on');
  switchElement.setAttribute('false-title', 'off');
  switchElement.setAttribute('required', '');
  switchElement.addEventListener('load', () => events.push('load'));
  switchElement.addEventListener('init', () => events.push('init'));
  switchElement.addEventListener('before-change', () => events.push('before-change'));
  switchElement.addEventListener('change', () => events.push('change'));

  canvasElement.appendChild(switchElement);

  await waitFor(() => {
    expect(events).toEqual(expect.arrayContaining(['load', 'init']));
  });

  return { switchElement, events };
}
