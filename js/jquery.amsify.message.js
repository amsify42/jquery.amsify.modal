(function($) {

    $.fn.amsifyMessage = function(options) {

        // Merging default settings with custom
        var settings = $.extend({
            type      : 'bootstrap',
            message   : 'Hello World',
        }, options);

        /**
         * Global variable for this object context
         */
        var _self;
        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifyMessage = function() {
            /**
             * Assigning this context to _self
             * @type {object}
             */
            _self               = this;
            this.selector       = null;
            this.modalSelector  = '#amsify-message-modal';
            this.titleClass     = '.message-modal-title';
            this.messageClass   = '.message-text';
        };


        AmsifyMessage.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             */
            _init  : function(selector) {
                this.selector = selector;
                this.setModal();
                this.setEvents();
            },

            setModal  : function() {
                if(AmsifyHelper.detectIE()) {
                  if($(this.modalSelector).html() === undefined) {
                    this.appendModal();
                  }   
                } else if(!$(this.modalSelector).length) {
                  this.appendModal();
                }
            },

            appendModal         : function() {
              AmsifyHelper.addHTML(this.prepareModal());
            },

            setEvents : function() {
              $(this.selector).click(function(e){
                  e.preventDefault();
                  if($(this).data('title')) {
                    $(_self.modalSelector).find(_self.titleClass).html($(this).data('title'));
                  } else {
                    $(_self.modalSelector).find(_self.titleClass).html('Message');
                  }
                  if($(this).data('message')) {
                    $(_self.modalSelector).find(_self.messageClass).html($(this).data('message'));
                  } else {
                    $(_self.modalSelector).find(_self.messageClass).html(settings.message);
                  }
                  if(settings.type == 'bootstrap') {
                    $(_self.modalSelector).modal('show');
                  } else if(settings.type == 'materialize') {
                    $(_self.modalSelector).modal('open');
                  } else {
                    $(_self.modalSelector).css({'display' : 'block', 'visibility' : 'visible'});
                  }
              });
              if(settings.type == 'materialize') {
                $(document).ready(function(){
                  $('.modal').modal();
                });
              }
              if(settings.type == 'amsify') {
                $(_self.modalSelector).find('.amsify-modal-close').click(function(e){
                    $(_self.modalSelector).css({'display' : 'none', 'visibility' : 'none'});
                });
              }
            },

            /**
             * create object of message modal structure
             * @param  {selector} modalSelector
             * @param  {object}   config
             * @return {object}
             */
            prepareModal : function() {
              if(settings.type == 'bootstrap') {
                  return [
                          {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-dialog message-modal-dialog'}, 'appendTo': this.modalSelector},
                          {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': '.message-modal-dialog'},
                          {'<div/>': { 'class':'modal-header message-modal-header'}, 'appendTo': '.message-modal-content'},
                          {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.message-modal-header'},
                          {'<h4/>': { 'class':'modal-title '+this.titleClass.substring(1), 'text':'Message'}, 'appendTo': '.message-modal-header'},
                          {'<div/>': { 'class':'modal-body message-modal-body '+this.messageClass.substring(1), 'text': settings.message}, 'appendTo': '.message-modal-content'},
                          {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': '.message-modal-content'},
                          {'<a/>'  : { 'class':'btn btn-success', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.message-modal-footer'}
                  ];
                } else if(settings.type == 'materialize') {
                  return [
                          {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'modal', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': this.modalSelector},
                          {'<h4/>': { 'class':'modal-title '+this.titleClass.substring(1), 'text':'Message'}, 'appendTo': '.message-modal-content'},
                          {'<div/>': { 'class': this.messageClass.substring(1), 'text': settings.message}, 'appendTo': '.message-modal-content'},
                          {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': this.modalSelector},
                          {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.message-modal-footer'}
                  ];
                } else {
                  return [
                           {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                           {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': this.modalSelector},
                           {'<div/>': { 'class':'modal-header message-modal-header '+this.titleClass.substring(1), 'text':'Message'}, 'appendTo': '.message-modal-content'},
                           {'<div/>': { 'class':'modal-body message-modal-body'}, 'appendTo': '.message-modal-content'},
                           {'<p/>'  : { 'class': this.messageClass.substring(1), 'text': settings.message}, 'appendTo': '.message-modal-body'},
                           {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': '.message-modal-content'},
                           {'<a/>'  : { 'class':'modal-btn btn-green amsify-modal-close','text':'Close', 'href':"#"}, 'appendTo': '.message-modal-footer'}
                  ];
                }  
            },
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyMessage)._init(this, settings);
        });

    };

}(jQuery));