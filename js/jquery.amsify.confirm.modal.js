/**
 * Amsify Jquery Confirm Modal 2.0
 * http://www.amsify42.com
 */
(function($) {

    $.fn.amsifyConfirm = function(options) {

        // Merging default settings with custom
        var settings = $.extend({
            type      : 'bootstrap',
            message   : 'Are you sure, you want to proceed?',
        }, options);

        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifyConfirm = function() {
            this.selector       = null;
            this.modalSelector  = '#amsify-confirm-modal';
            this.actionClass    = '.confirm-action-link';
        };


        AmsifyConfirm.prototype = {
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
              var _self = this;
              $(this.selector).click(function(e){
                  e.preventDefault();
                  if(settings.type == 'bootstrap') {
                    $(_self.modalSelector).modal('show');
                  } else if(settings.type == 'materialize') {
                    $(_self.modalSelector).modal('open');
                  } else {
                    $(_self.modalSelector).css({'display' : 'block', 'visibility' : 'visible'});
                  }
                  if($(this).data('ajax')) {
                    $(_self.modalSelector).find(_self.actionClass).attr('data-ajax', $(this).data('ajax'));
                  } else if($(this).attr('href')) {
                    $(_self.modalSelector).find(_self.actionClass).attr('href', $(this).attr('href'));
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
              $(this.actionClass).click(function(e){
                $(this).addClass('disabled').attr('disabled', true).text('Working...');
                $confirm = $(this);
                if($(this).data('ajax')) {
                  e.preventDefault();
                  var ajaxConfig = {
                    afterSuccess : function() {
                      $confirm.removeClass('disabled').attr('disabled', false).text('Confirm');
                      if(settings.type == 'bootstrap') {
                        $(_self.modalSelector).modal('hide');
                      } else if(settings.type == 'materialize') {
                        $(_self.modalSelector).modal('close');
                      } else {
                        $(_self.modalSelector).css({'display' : 'none', 'visibility' : 'none'});
                      }
                    }
                  };
                  AmsifyHelper.callAjax($(this).data('ajax'), {}, ajaxConfig, 'GET');
                }
              });
            },

            /**
             * create object of confirm modal structure
             * @param  {selector} modalSelector
             * @param  {object}   config
             * @return {object}
             */
            prepareModal : function() {
                if(settings.type == 'bootstrap') {
                  return [
                          {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-dialog confirm-modal-dialog'}, 'appendTo': this.modalSelector},
                          {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': '.confirm-modal-dialog'},
                          {'<div/>': { 'class':'modal-header confirm-modal-header'}, 'appendTo': '.confirm-modal-content'},
                          {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.confirm-modal-header'},
                          {'<h4/>': { 'class':'modal-title confirm-modal-title', 'text':'Confirmation'}, 'appendTo': '.confirm-modal-header'},
                          {'<div/>': { 'class':'modal-body confirm-modal-body confirmation-text', 'text': settings.message}, 'appendTo': '.confirm-modal-content'},
                          {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': '.confirm-modal-content'},
                          {'<a/>'  : { 'class':'btn btn-warning danger '+this.actionClass.substring(1), 'text':'Confirm', 'href':"#", 'data-ajax': ''}, 'appendTo': '.confirm-modal-footer'},
                          {'<a/>'  : { 'class':'btn btn-success', 'text':'Cancel', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.confirm-modal-footer'}
                  ];
                } else if(settings.type == 'materialize') {
                  return [
                          {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'modal', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': this.modalSelector},
                          {'<h4/>': { 'class':'modal-title confirm-modal-title', 'text':'Confirmation'}, 'appendTo': '.confirm-modal-content'},
                          {'<div/>': { 'class':'confirmation-text', 'text': settings.message}, 'appendTo': '.confirm-modal-content'},
                          {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': this.modalSelector},
                          {'<a/>'  : { 'class':'modal-action waves-effect waves-red btn-flat '+this.actionClass.substring(1), 'text':'Confirm', 'href':"#", 'data-ajax': ''}, 'appendTo': '.confirm-modal-footer'},
                          {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Cancel', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.confirm-modal-footer'}
                  ];
                } else {
                  return [
                           {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                           {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': this.modalSelector},
                           {'<div/>': { 'class':'modal-header confirm-modal-header', 'text':'Modal Header'}, 'appendTo': '.confirm-modal-content'},
                           {'<div/>': { 'class':'modal-body confirm-modal-body'}, 'appendTo': '.confirm-modal-content'},
                           {'<p/>'  : { 'class':'confirmation-text', 'text': settings.message}, 'appendTo': '.confirm-modal-body'},
                           {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': '.confirm-modal-content'},
                           {'<a/>'  : { 'class':'modal-btn btn-red '+this.actionClass.substring(1), 'text':'Confirm', 'href':"#", 'data-ajax': ''}, 'appendTo': '.confirm-modal-footer'},
                           {'<a/>'  : { 'class':'modal-btn btn-green amsify-modal-close','text':'Cancel', 'href':"#"}, 'appendTo': '.confirm-modal-footer'}
                  ];
                }
            },
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyConfirm)._init(this, settings);
        });

    };

}(jQuery));