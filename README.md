# Amsify Jquery Modal 
This Jquery plugin helps in showing bootstrap, materialize or custom modal for confirming redirection or loading data in modal throuh Ajax request.

#### Requires
1. **jquery.js** library
2. **jquery.amsify.helper.js** file which is there in my **jquery.amsify.helper** repository

There are three types of modals which you can use and load it with message or data wherever required
1. Message Modal
This will open default modal with messsage
```js
  $.amsifyMessageModal('My Message');
```
If you are using css frameworks like bootstrap or materialize and want to use the modal, you can call this same method with second parameter.
```js
  $.amsifyMessageModal('My Message', 'bootstrap');
  $.amsifyShowMessage('My Message', 'materialize');
```

2. Confirm Modal
This method will not directly open modal, instead it will create on click event with default selector .amsify-modal-confirm
```html
<a href="#" class="amsify-modal-confirm"></a>
```
So which ever element is having this class will fire event to open the modal with default confirmation messagee.
```js
  $.amsifyConfirmModal();
```
Again if you are using css frameworks bootstrap or materialize, you can pass option like this
```js
  $.amsifyConfirmModal({
    type: 'bootstrap'
  });
```
### or
```js
  $.amsifyConfirmModal({
    type: 'materialize'
  });
```
If you want to use different selector and message, you pass option like this
```js
  $.amsifyConfirmModal({
    type: 'bootstrap',
    confirmSelector: '.open-confirm',
    confirmText : 'Different confirmation message'
  });
```
3. Load Modal
```js
  $.amsifyLoadModal();
```
