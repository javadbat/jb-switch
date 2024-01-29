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