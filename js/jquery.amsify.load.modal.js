(function($) {

    $.fn.amsifyLoad = function(options) {

        // Merging default settings with custom
        var settings = $.extend({
            type      : 'bootstrap',
            title     : 'My Form',
            action    : 'action.php',
        }, options);

        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifyLoad = function() {
            this.selector       = null;
            this.modalSelector  = '#amsify-load-modal';
            this.titleClass     = '.load-modal-title';
            this.bodyClass      = '.load-modal-body';
            this.bodyLoader     = '.modal-body-loader';
        };

        AmsifyLoad.prototype = {
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
                  $(_self.modalSelector).find(_self.bodyLoader).show();
                  var title = ($(this).data('title'))? $(this).data('title'): settings.title;
                  $(_self.modalSelector).find(_self.titleClass).html(title);
                  if(settings.type == 'bootstrap') {
                    $(_self.modalSelector).modal('show');
                  } else if(settings.type == 'materialize') {
                    $(_self.modalSelector).modal('open');
                  } else {
                    $(_self.modalSelector).css({'display' : 'block', 'visibility' : 'visible'});
                  }
                  var action      = ($(this).data('ajax'))? $(this).data('ajax'): settings.action;
                  var ajaxConfig  = {
                    afterSuccess : function(data) {
                      if(data.html) $(_self.bodyClass).html(data.html);
                    },
                    complete : function() {
                      $(_self.modalSelector).find(_self.bodyLoader).hide();
                    },
                  };
                  AmsifyHelper.callAjax(action, {}, ajaxConfig, 'GET');
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
             * create object of confirm modal structure
             * @param  {selector} modalSelector
             * @param  {object}   config
             * @return {object}
             */
            prepareModal : function() {
              if(settings.type == 'bootstrap') {
                return [
                      {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                      {'<div/>': { 'class':'modal-dialog modal-lg load-modal-dialog'}, 'appendTo': this.modalSelector},
                      {'<div/>': { 'class':'modal-content load-modal-content'}, 'appendTo': '.load-modal-dialog'},
                      {'<div/>': { 'class':'modal-header load-modal-header'}, 'appendTo': '.load-modal-content'},
                      {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.load-modal-header'},
                      {'<h4/>':  { 'id': 'default-modal-Label', 'class':'modal-title '+this.titleClass.substring(1), 'text':''}, 'appendTo': '.load-modal-header'},
                      {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                      {'<div/>': { 'class':'modal-body default-modal-content '+this.bodyClass.substring(1)}, 'appendTo': '.load-modal-content'},
                      {'<div/>': { 'class':'modal-footer load-modal-footer'}, 'appendTo': '.load-modal-content'},
                      {'<a/>'  : { 'class':'btn btn-success', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.load-modal-footer'},
                ];
              } else if(settings.type == 'materialize') {
                return [
                          {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'modal modal-fixed-footer', }, 'prependTo': 'body'},
                          {'<div/>': { 'class':'modal-content load-modal-content'}, 'appendTo': this.modalSelector},
                          {'<h4/>':  { 'id': 'default-modal-Label', 'class':'modal-title '+this.titleClass.substring(1), 'text':''}, 'appendTo': '.load-modal-content'},
                          {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                          {'<div/>': { 'class':'default-modal-content '+this.bodyClass.substring(1)}, 'appendTo': '.load-modal-content'},
                          {'<div/>': { 'class':'modal-footer load-modal-footer'}, 'appendTo': this.modalSelector},
                          {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.load-modal-footer'}
                ];
              } else {
                return [
                       {'<div/>': { 'id': this.modalSelector.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                       {'<div/>': { 'class':'modal-content modal-large load-modal-content'}, 'appendTo': this.modalSelector},
                       {'<div/>': { 'id': 'default-modal-Label', 'class':'modal-header load-modal-header '+this.titleClass.substring(1), 'text':'Modal Header'}, 'appendTo': '.load-modal-content'},
                       {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                       {'<div/>': { 'class':'modal-body default-modal-content '+this.bodyClass.substring(1)}, 'appendTo': '.load-modal-content'},
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
            (new AmsifyLoad)._init(this, settings);
        });

    };

}(jQuery));