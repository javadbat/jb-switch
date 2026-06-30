import type { JBSwitchWebComponent } from 'jb-switch';

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-switch': JBSwitchType;
    }
    interface JBSwitchType extends React.DetailedHTMLProps<React.HTMLAttributes<JBSwitchWebComponent>, JBSwitchWebComponent> {
      class?: string,
      name?: string,
      "true-title"?: string,
      "false-title"?: string,
    }
  }
}
