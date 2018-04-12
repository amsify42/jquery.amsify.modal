Amsify Jquery Modal
-------------------

This folder having three different plugin files.
<br/>

## Requires
1. [AmsifyHelper](https://github.com/amsify42/jquery.amsify.helper)

These 3 types can be passed to all these 3 modal plugins
```txt
1. bootstrap (default)
2. materialize
3. amsify
```
Based on type you pass, modal will be prepended to the body of html.
```js
	$('selector').amsifyConfirm({
		type: 'materialize',
	});
	$('selector').amsifyLoad({
		type: 'materialize',
	});
	$('selector').amsifyMessage({
		type: 'materialize',
	});
```

# Table of Contents
1. [Confirm](#confirm)
2. [Load](#load)
3. [Message](#message)

## Confirm
```html
	<a href="http://site.com/delete/1" class="delete">DELETE</a>
```
This will show the confirm modal popup on click and redirect to href link when confirmed.
```js
	$('.delete').amsifyConfirm();
```
For ajax call after cofirmation, you can set **data-ajax** attribute to the element like this
```html
	<a href="#" class="delete" data-ajax="http://site.com/delete/1">DELETE</a>
```

## Load
```html
	<a href="#" data-ajax="http://site.com/load-content" #="load">LOAD</a>
```
This will show modal popup with content in it passed in ajax response of action set in **data-ajax** attribute
```js
	$('#load').amsifyLoad();
```
Ajax response should return html to load in modal popup body
```js
	{
		status: true,
		html: '<div>...</div>'
	}
```

## Message
```html
	<a href="#" data-message="My Message" class="message">SHOW</a>
```
This will simply show message popup onclick, with the message set in **data-message** attribute.
```js
	$('.message').amsifyMessage();
```
For showing modal title as well, set **data-title** to the element
```html
	<a href="#" data-title="My Title" data-message="My Message" class="message">SHOW</a>
```
