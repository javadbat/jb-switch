import {JBDictionary} from 'jb-core/i18n';
export type JBSwitchDictionary = {
  requireMessage:string,
  switchLabel:string,
}

/**
 * dictionary of jb switch. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-switch'
 * dictionary.setLanguage("fr", {
 *  requireMessage: (label:string| null)=>`${label} french require message`,
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary<JBSwitchDictionary>({
  "fa":{
    requireMessage:"سوییچ میبایست فعال شود",
    switchLabel:"کلید",
  },
  "en":{
    requireMessage:"Switch is required",
    switchLabel:"Switch",
  }
});
