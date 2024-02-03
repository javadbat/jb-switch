# jb-switch
switch web-component
## usage
```html
<jb-switch true-title="my enable" false-title="my-disable"></jb-switch>
```
### set loading
```javascript

document.querySelector("jb-switch").isLoading = true; //true or false

```
### get/set value
```javascript
alert(document.querySelector("jb-switch").value);
document.querySelector("jb-switch").value = true; //true or false

```
## set custom style

in some cases in your project you need to change default style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component.
#### usage example:

```css
body{
  //if you want to change color of switch 
  --jb-switch-bg-color-active: green;
}
```
#### variable list
 
| css variable name                             | description                                                               |
| -------------                                 | -------------                                                             |
| --jb-switch-bg-color-active                   | background color of switch when value is true                             |
| --jb-switch-bg-color                          | background color of switch when value is false                            |
| --jb-switch-ring-color                        | trigger ring color when value is false                                    |
| --jb-switch-ring-color-active                 | trigger ring color when value is true                                     |
