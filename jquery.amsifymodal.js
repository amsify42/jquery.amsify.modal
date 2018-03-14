(function($) {

    $.fn.amsifyModal = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            type          : 'bootstrap',
        }, options);

        /**
         * initialization begins from here
         * @type {Object}
         */
        var AmsifyModal = function() {
            this.modalSelector = {
              message : '#amsify-message-modal',
              confirm : '#amsify-confirm-modal',
              load    : '#amsify-load-modal',
            };
            this.confirmMessage = 'Are you sure, you want to proceed?';

        };


        AmsifyModal.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             * @param  {object} settings
             */
            _init               : function(selector, settings) {
                this.setMessageModal();
            },

            setMessageModal     : function() {
                if(AmsifyHelper.detectIE()) {
                  if($(this.modalSelector.message).html() === undefined) {
                    this.appendModal('message');
                  }   
                } else if(!$(this.modalSelector.message).length) {
                  this.appendModal('message');
                }
            },

            appendModal         : function(name) {
              var modal = {};
              if(name == 'confirm') {
                modal = this.prepareConfirmModal();
              } else if(name == 'load') {
                modal = this.prepareLoadModal();
              } else if(name == 'message') {
                modal = this.prepareMessageModal();
              }
              AmsifyHelper.addHTML(modal);
            },


            /**
             * create object of message modal structure
             * @param  {selector} modalSelector
             * @param  {object}   config
             * @return {object}
             */
            prepareMessageModal : function() {
                if(settings.type == 'bootstrap') {
                  return [
                          {'<div/>': { 'id': this.modalSelector.message.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-dialog message-modal-dialog'}, 'appendTo': this.modalSelector.message},
                          {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': '.message-modal-dialog'},
                          {'<div/>': { 'class':'modal-header message-modal-header'}, 'appendTo': '.message-modal-content'},
                          {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.message-modal-header'},
                          {'<h4/>': { 'class':'modal-title message-modal-title', 'text':'Message'}, 'appendTo': '.message-modal-header'},
                          {'<div/>': { 'class':'modal-body message-modal-body message-text'}, 'appendTo': '.message-modal-content'},
                          {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': '.message-modal-content'},
                          {'<a/>'  : { 'class':'btn btn-success', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.message-modal-footer'}
                  ];
                } else if(settings.type == 'materialize') {
                  return [
                          {'<div/>': { 'id': this.modalSelector.message.substring(1), 'class':'modal', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': this.modalSelector.message},
                          {'<h4/>': { 'class':'modal-title message-modal-title', 'text':'Message'}, 'appendTo': '.message-modal-content'},
                          {'<div/>': { 'class':'message-text'}, 'appendTo': '.message-modal-content'},
                          {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': this.modalSelector.message},
                          {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.message-modal-footer'}
                  ];
                } else {
                  return [
                           {'<div/>': { 'id': this.modalSelector.message.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                           {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': this.modalSelector.message},
                           {'<div/>': { 'class':'modal-header message-modal-header message-modal-title', 'text':'Message'}, 'appendTo': '.message-modal-content'},
                           {'<div/>': { 'class':'modal-body message-modal-body'}, 'appendTo': '.message-modal-content'},
                           {'<p/>'  : { 'class':'message-text', 'text':'Are you sure?'}, 'appendTo': '.message-modal-body'},
                           {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': '.message-modal-content'},
                           {'<a/>'  : { 'class':'modal-btn btn-green amsify-modal-close','text':'Close', 'href':"#"}, 'appendTo': '.message-modal-footer'}
                  ];
                }
            },

            /**
             * create object of confirm modal structure
             * @param  {selector} modalSelector
             * @param  {object}   config
             * @return {object}
             */
            prepareConfirmModal : function() {
                if(settings.type == 'bootstrap') {
                  return [
                          {'<div/>': { 'id': this.modalSelector.confirm.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-dialog confirm-modal-dialog'}, 'appendTo': this.modalSelector.confirm},
                          {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': '.confirm-modal-dialog'},
                          {'<div/>': { 'class':'modal-header confirm-modal-header'}, 'appendTo': '.confirm-modal-content'},
                          {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.confirm-modal-header'},
                          {'<h4/>': { 'class':'modal-title confirm-modal-title', 'text':'Confirmation'}, 'appendTo': '.confirm-modal-header'},
                          {'<div/>': { 'class':'modal-body confirm-modal-body confirmation-text'}, 'appendTo': '.confirm-modal-content'},
                          {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': '.confirm-modal-content'},
                          {'<a/>'  : { 'class':'btn btn-warning danger confirm-action-link', 'text':'Confirm', 'href':"#"}, 'appendTo': '.confirm-modal-footer'},
                          {'<a/>'  : { 'class':'btn btn-success', 'text':'Cancel', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.confirm-modal-footer'}
                  ];
                } else if(settings.type == 'materialize') {
                  return [
                          {'<div/>': { 'id': this.modalSelector.confirm.substring(1), 'class':'modal', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': this.modalSelector.confirm},
                          {'<h4/>': { 'class':'modal-title confirm-modal-title', 'text':'Confirmation'}, 'appendTo': '.confirm-modal-content'},
                          {'<div/>': { 'class':'confirmation-text'}, 'appendTo': '.confirm-modal-content'},
                          {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': this.modalSelector.confirm},
                          {'<a/>'  : { 'class':'modal-action waves-effect waves-red btn-flat confirm-action-link', 'text':'Confirm', 'href':"#"}, 'appendTo': '.confirm-modal-footer'},
                          {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Cancel', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.confirm-modal-footer'}
                  ];
                } else {
                  return [
                           {'<div/>': { 'id': this.modalSelector.confirm.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                           {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': this.modalSelector.confirm},
                           {'<div/>': { 'class':'modal-header confirm-modal-header', 'text':'Modal Header'}, 'appendTo': '.confirm-modal-content'},
                           {'<div/>': { 'class':'modal-body confirm-modal-body'}, 'appendTo': '.confirm-modal-content'},
                           {'<p/>'  : { 'class':'confirmation-text', 'text':'Are you sure?'}, 'appendTo': '.confirm-modal-body'},
                           {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': '.confirm-modal-content'},
                           {'<a/>'  : { 'class':'modal-btn btn-red confirm-action-link', 'text':'Confirm', 'href':"#"}, 'appendTo': '.confirm-modal-footer'},
                           {'<a/>'  : { 'class':'modal-btn btn-green amsify-modal-close','text':'Cancel', 'href':"#"}, 'appendTo': '.confirm-modal-footer'}
                  ];
                }
            },


            /**
             * create object of load modal structure
             * @param  {selector} modalSelector
             * @param  {object}   config
             * @return {object}
             */
            prepareLoadModal : function(modalSelector, config) {
                if(settings.type == 'bootstrap') {
                  return [
                        {'<div/>': { 'id': this.modalSelector.load.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                        {'<div/>': { 'class':'modal-dialog modal-lg load-modal-dialog'}, 'appendTo': this.modalSelector.load},
                        {'<div/>': { 'class':'modal-content load-modal-content'}, 'appendTo': '.load-modal-dialog'},
                        {'<div/>': { 'class':'modal-header load-modal-header'}, 'appendTo': '.load-modal-content'},
                        {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.load-modal-header'},
                        {'<h4/>':  { 'id': 'default-modal-Label', 'class':'modal-title load-modal-title', 'text':''}, 'appendTo': '.load-modal-header'},
                        {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                        {'<div/>': { 'class':'modal-body load-modal-body default-modal-content'}, 'appendTo': '.load-modal-content'},
                        {'<div/>': { 'class':'modal-footer load-modal-footer'}, 'appendTo': '.load-modal-content'},
                        {'<a/>'  : { 'class':'btn btn-success', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.load-modal-footer'},
                  ];
                } else if(settings.type == 'materialize') {
                  return [
                            {'<div/>': { 'id': this.modalSelector.load.substring(1), 'class':'modal modal-fixed-footer', }, 'prependTo': 'body'},
                            {'<div/>': { 'class':'modal-content load-modal-content'}, 'appendTo': this.modalSelector.load},
                            {'<h4/>':  { 'id': 'default-modal-Label', 'class':'modal-title load-modal-title', 'text':''}, 'appendTo': '.load-modal-content'},
                            {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                            {'<div/>': { 'class':'default-modal-content'}, 'appendTo': '.load-modal-content'},
                            {'<div/>': { 'class':'modal-footer load-modal-footer'}, 'appendTo': this.modalSelector.load},
                            {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.load-modal-footer'}
                  ];
                } else {
                  return [
                         {'<div/>': { 'id': this.modalSelector.load.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                         {'<div/>': { 'class':'modal-content modal-large load-modal-content'}, 'appendTo': this.modalSelector.load},
                         {'<div/>': { 'id': 'default-modal-Label', 'class':'modal-header load-modal-header', 'text':'Modal Header'}, 'appendTo': '.load-modal-content'},
                         {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                         {'<div/>': { 'class':'modal-body load-modal-body'}, 'appendTo': '.load-modal-content'},
                         {'<p/>'  : { 'class':'default-modal-content'}, 'appendTo': '.load-modal-body'},
                         {'<div/>': { 'class':'modal-footer load-modal-footer'}, 'appendTo': '.load-modal-content'},
                         {'<a/>'  : { 'class':'modal-btn btn-green amsify-modal-close','text':'Close', 'href':"#"}, 'appendTo': '.load-modal-footer'},
                  ];
                }
            },
           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyModal)._init(this, settings);
        });

    };

}(jQuery));