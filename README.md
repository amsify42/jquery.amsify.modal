# Amsify Jquery Modal 
This Jquery plugin helps in showing bootstrap, materialize or custom modal for confirming redirection or loading data in modal throuh Ajax request.

#### Requires
1. **jquery.js** library
2. **jquery.amsify.helper.js** file which is there in my **jquery.amsify.helper** repository


There are three types of modals which you can use and load it with message or data wherever required
## 1. Message Modal
This will open default modal with messsage
```js
  $.amsifyMessageModal('My Message');
```
If you are using css frameworks like bootstrap or materialize and want to use the modal, you can call this same method with second parameter.
```js
  $.amsifyMessageModal('My Message', 'bootstrap');
  $.amsifyShowMessage('My Message', 'materialize');
```

## 2. Confirm Modal
```js
  $.amsifyConfirmModal();
```
This method will not directly open modal, instead it will create on click event with default selector .amsify-modal-confirm
```html
<a href="#" class="amsify-modal-confirm" data-href="http://site.com/redirect"></a>
```
So whichever element is having this class will fire event to show the modal with default confirmation message and redirect to the url assigned to attribute **data-href**
<br/>
Again if you are using css frameworks bootstrap or materialize, you can pass option like this
```js
  $.amsifyConfirmModal({
    type: 'bootstrap'
  });
```
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
If you want to call ajax onclick modal confirm button, you can add **data-ajax** attribute to element like this
```html
<a href="#" class="amsify-modal-confirm" data-ajax="http://site.com/call-ajax"></a>
```
**Note:** whatever technology you are using from backend, data should return **json array response** with atleast these keys
#### On Success
```js
 { 
  status:'success', 
  message: 'Action success'
}
```
#### On failure
```js
 {
  status:'error',
  message: 'Action failure'
}
```

## 3. Load Modal
```js
  $.amsifyLoadModal();
```
This method will also not directly open modal, instead it will create on click event with default selector .amsify-modal-load
```html
<a href="#" class="amsify-modal-load" data-href="http://site.com/open-form"></a>
```
So whichever element is having this class will fire event to load the modal with content by calling ajax method from **data-href** attribute.
**Note:** Json response this ajax request get should send html in array key **html**
```js
  {
    status : 'success',
    html : '<h1>Modal Content</h1>'
  }
```
If you are using css frameworks bootstrap or materialize, you can pass option like this
```js
  $.amsifyLoadModal({
    type: 'bootstrap'
  });
```
```js
  $.amsifyLoadModal({
    type: 'materialize'
  });
```
