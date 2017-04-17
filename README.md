# Amsify Jquery Modal 
This Jquery plugin helps in showing bootstrap, materialize or custom modal for confirming redirection or loading data in modal throuh Ajax request.

#### Requires
1. **jquery.js** library
2. **jquery.amsify.helper.js** file which is there in my **jquery.amsify.helper** repository


There are three types of modals which you can use and load it with message or data wherever required
## 1. Message Modal
You can initialilze modals like this
```js
    $.amsifyMessageModal();
```
If you are using css frameworks like bootstrap or materialize, you can pass option to initialize
```js
    $.amsifyMessageModal({
      type : 'bootstrap'
    });
```
```js
    $.amsifyMessageModal({
      type : 'materialize'
    });
```
Now you can call this method to open default modal with messsage
```js
  $.amsifyMessageModal('My Message');
```
for bootstrap or materialize modals, you can call this same method with second parameter.
```js
  $.amsifyMessageModal('My Message', 'bootstrap');
  $.amsifyShowMessage('My Message', 'materialize');
```

## 2. Confirm Modal
Confirm modal initialization
```js
  $.amsifyConfirmModal();
```
This modal will not open by calling method, instead it will create on click event with default selector **.amsify-modal-confirm**
```html
<a href="#" class="amsify-modal-confirm" data-href="http://site.com/redirect"></a>
```
So whichever element is having this class will fire event to show the modal with default confirmation message and redirect to the url assigned to attribute **data-href**
<br/>
Again if you are using css frameworks bootstrap or materialize, you can pass option to initialize
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
**Note:** whatever technology you are using from backend, data response should return **json array** with atleast these keys
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
This modal will also not open by calling method, instead it will create on click event with default selector **.amsify-modal-load**
```html
<a href="#" class="amsify-modal-load" data-href="http://site.com/load-form"></a>
```
So whichever element is having this class will fire event to load the modal with content by calling ajax method from **data-href** attribute.
<br/>
**Note:** The json response we get from this ajax request should send html in array key **html** and **title** if required to show in modal title.
```js
  {
    status : 'success',
    title : 'Contact Form',
    html : '<form>...</form>'
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
If the same modal having some form and again ajax to be called on form submission, then form submit button should have this class **.confirm-action-form** and click event should have this one more attribute
```html
<a href="#" class="amsify-modal-load" data-href="http://site.com/open-form" data-ajax="http://site.com/submit-form"></a>
```
```js
  {
    status : 'success',
    title : 'Contact Form',
    html : '<form><input type="submit" class="confirm-action-form"></form>'
  }
```
After successful form submission, modal will close. If you want to redirect instead of closing modal, you can add one more attribute to the click event like this
```html
<a href="#" class="amsify-modal-load" 
    data-href="http://site.com/load-form" 
    data-ajax="http://site.com/submit-form"
    data-ajax-redirect="http://site.com/redirect"
></a>
```

If this click element is associated with table, let say you want to add/update/delete row from table through ajax request based on form action.
</br>
You should include **jquery.amsify.table plugin** which is there in my respository with same name and initialize it.

### 1. If you want to add row to html table, your click element can be inside or outside of table.
```html
    <a class="btn btn-warning pull-right amsify-modal-load" 
    data-type="add" 
    data-href="http://site.com/load-form" 
    data-ajax="http://site.com/submit-form">Add Form</a>
    <table>...</table>
```
As you can see we have created element outside the table with three attributes **data-type**, **data-href**, **data-ajax**.
<br/>
**data-type** attribute must contain operation name **add** or **update** or **delete**, by default it is **delete**.
<br/>
Now, whatever the response data['html'] will come by calling ajax method will be be added to first row of html.

### 2. If you want to update/delete row of html table, your click element must be inside table row.
```html
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Some Title</td>
            <td>
                <a class="btn btn-primary amsify-modal-load"
                data-type="update"
                data-href="http://site.com/load-form" 
                data-ajax="http://site.com/submit-form">Edit Form</a>
            </td>
            <td>
                <a class="btn btn-primary amsify-modal-confirm"
                data-type="delete" 
                data-ajax="http://site.com/delete-row">Edit Form</a>
            </td>
        </tr>
    </tbody>
</table>
```
Based on json response data, row from table will be updated or deleted. 
<br/>
If you are updating the row then response data['html'] must be the row content.
<br/>
If you are deleting the row no data['html'] is required. 
<br/>
**Note:** We are using class **.amsify-modal-confirm** in delete element as we do not want to load any data.
