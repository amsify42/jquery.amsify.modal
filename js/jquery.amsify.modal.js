 // Amsify42 Modal 1.0.0
 // http://www.amsify42.com
 (function(AmsifyModal, $, undefined) {
    /**
     * message modal selector
     * @type {String}
     */
    var messageModalSelector    = '#default-message-modal'
    /**
     * confirm modal selector
     * @type {String}
     */
    var confirmModalSelector    = '#default-confirm-modal';
    /**
     * confirm click selector
     * @type {String}
     */
    var confirmClickSelector    = '.amsify-modal-confirm';
    /**
     * confirm text
     * @type {String}
     */
    var confirmText             = 'Are you sure, you want to proceed?';
    /**
     * confirm button submitting text
     * @type {String}
     */
    var confirmClickText        = 'Submitting...';
    /**
     * default load modal selector
     * @type {String}
     */
    var loadModalSelector       = '#default-load-modal'
    /**
     * default load click selector
     * @type {String}
     */
    var loadClickSelector       = '.amsify-modal-load';
    /**
     * default type
     * @type {String}
     */
    var defaultType             = '';

    /**
     * amsifyMessageModal for message
     * @param  object config
     */
    $.amsifyMessageModal = function(config) {
      AmsifyModal.setMessageModal(config);
    };

    /**
     * amsifyMessageModal for message
     * @param  {object} config
     */
    $.amsifyShowMessage = function(message, type, title) {
      AmsifyModal.showMessage(message, type, title);
    };

    /**
     * amsifyConfirmModal for confirmation
     * @param  {object} config
     */
    $.amsifyConfirmModal = function(config) {
      AmsifyModal.setConfirmModal(config);
    };

    /**
     * amsifyLoadModal for loading content
     * @param  {object} config
     */
    $.amsifyLoadModal = function(config) {
      AmsifyModal.setLoadModal(config);
    };

    /**
     * init the plugin with global settings
     * @param  {object} config
     */
    AmsifyModal.init = function(config) {
      setConfig(config); 
      var defaultModal = new AmsifyModal.Modal;
          defaultModal.set();
    };

    /**
     * run the plugin with each instance settings
     * @param {object} config
     */
    AmsifyModal.set = function(config) {
        var newModal = new AmsifyModal.Modal();
            newModal.set(config);
    };

    /**
     * This is like class which can be instantiated multiple times with each setting rules
     */
    AmsifyModal.Modal = function() {
        AmsifyModal.Modal.prototype.set = function(config) {
          if(config !== undefined) {
            AmsifyModal.setMessageModal(config);
            AmsifyModal.setConfirmModal(config);
            AmsifyModal.setLoadModal(config);
          } else {
            AmsifyModal.setMessageModal();
            AmsifyModal.setConfirmModal();
            AmsifyModal.setLoadModal();
          }
          AmsifyHelper.bodyLoaderIEfix('modal');
        };
    };

    /**
     * set message modal
     * @param {object} config
     */
    AmsifyModal.setMessageModal = function(config) {
        setMessage(config);  
    };

    /**
     * set confirm modal
     * @param {object} config
     */
    AmsifyModal.setConfirmModal = function(config) {
        setConfirm(config);  
    };

    /**
     * set load modal
     * @param {object} config
     */
    AmsifyModal.setLoadModal = function(config) {
        setLoad(config);
    };

    /**
     * set load modal
     * @param {object} config
     */
    AmsifyModal.showMessage = function(message, type, title) {
      $('.message-text').html(message);
      if(title !== undefined) {
        $('.message-modal-title').html(title)
      }
      if(type == 'bootstrap') {
        $(messageModalSelector).modal('show');
      } else if(type == 'materialize') {
        $(messageModalSelector).modal('open');
      } else {
        AmsifyModal.show(messageModalSelector);
      }
    };



/**
 * 
 ************ Message Modal Section ************
 *
 **/

    /**
     * set message with config
     * @param {object} config
     */
    function setMessage(config) {
        var modalSelector     = messageModalSelector;
        var type              = defaultType;
        if(config !== undefined) {
            if(config.messageModal !== undefined) { modalSelector = config.messageModal; }
        }
        setMessageModal(modalSelector, config);
    };

    /**
     * set Message Modal
     * @param {selector} modalSelector
     * @param {object}   config
     */
    function setMessageModal(modalSelector, config) {
        if(AmsifyHelper.detectIE()) {
          if($(modalSelector).html() === undefined) {
            appendModal(modalSelector, 'message', config);
          }   
        } else if(!$(modalSelector).length) {
          appendModal(modalSelector, 'message', config);
        }
    };


/**
 * 
 ************ Confirm Modal Section ************
 *
 **/

    /**
     * set confirm
     * @param {object} config
     */
    function setConfirm(config) {
        var modalSelector     = confirmModalSelector;
        var confirmSelector   = confirmClickSelector;
        var text              = confirmText;
        var type              = defaultType;
        if(config !== undefined) {
            if(config.confirmModal !== undefined) {
              modalSelector = config.confirmModal;
            }
            if(config.confirmSelector !== undefined) {
              confirmSelector = config.confirmSelector;
            }
            if(config.confirmText !== undefined) {
              text = config.confirmText;
            }
            if(config.type !== undefined) {
                type = config.type;
            }
        }
        setConfirmLink(modalSelector, confirmSelector, text, type, config);
        setConfirmActionLink(modalSelector, type, config);
    };

     /**
      * set confirm link
      * @param {selector} modalSelector
      * @param {selector} confirmSelector
      * @param {string}   text
      * @param {string}   type
      * @param {object}   config
      */
    function setConfirmLink(modalSelector, confirmSelector, text, type, config) {

        if(AmsifyHelper.detectIE()) {
          if($(modalSelector).html() === undefined) {
            appendModal(modalSelector, 'confirm', config);
          }   
        } else if(!$(modalSelector).length) {
          appendModal(modalSelector, 'confirm', config);
        }
        
        if(type == 'materialize') {
            $('.modal').modal();
            $(document).on('click', confirmSelector, function(){

                setActionButton(this, modalSelector, '.confirm-action-link');
                $(modalSelector).find('.confirmation-text').text(text);
                $(modalSelector).modal('open');

                $(modalSelector).modal({
                  complete  : function() {
                    $(modalSelector).find('#confirm-id').val(0);
                    $(modalSelector).find('.confirm-action-link').attr('data-href','');
                    $(modalSelector).find('.confirmation-text').text('');
                    $('.progress').addClass('hidden');
                  }
                });
          });
        } else if(type == 'bootstrap') {
            $(document).on('click', confirmSelector, function(){
                setActionButton(this, modalSelector, '.confirm-action-link');
                $(modalSelector).find('.confirmation-text').text(text);
                $(modalSelector).modal('show');

                $(modalSelector).on('hide.bs.modal', function(e) {
                    $(modalSelector).find('#confirm-id').val(0);
                    $(modalSelector).find('.confirm-action-link').attr('data-href','');
                    $(modalSelector).find('.confirmation-text').text('');
                    $('.progress').addClass('hidden');
                });
          });
        }
        else {
          $(document).on('click', confirmSelector, function(){
              setActionButton(this, modalSelector, '.confirm-action-link');
              $(modalSelector).find('.confirmation-text').text(text);
              AmsifyModal.show(modalSelector);
          });
        }
    };

    /**
     * set confirm action link
     * @param {selector} modalSelector
     * @param {string}   type
     * @param {object}   config
     */
    function setConfirmActionLink(modalSelector, type, config) {
        $(document).on('click', modalSelector+' .confirm-action-link', function(e){
            e.preventDefault();
            $('.progress').removeClass('hidden');

            if($(this).attr('data-href')) {
              $(this).addClass('disabled').prop('disabled', 1).html(confirmClickText);
              window.location = $(this).attr('data-href');
            }
            else if($(this).attr('data-ajax')) {
              AmsifyModal.callAjax(this, type, 'confirm', config);
            }
        });
    };

/**
 * 
 ************ Load Modal Section ************
 *
 **/

    /**
     * set load
     * @param {object} config
     */
    function setLoad(config) {
        var modalSelector     = loadModalSelector;
        var clickSelector     = loadClickSelector;
        var text              = confirmText;
        var type              = defaultType;
        if(config !== undefined) {
            if(config.loadModal !== undefined) {
              modalSelector = config.loadModal;
            }
            if(config.loadClick !== undefined) {
              clickSelector = config.loadClick;
            }
            if(config.confirmText !== undefined) {
              text = config.confirmText;
            }
            if(config.type !== undefined) {
              type = config.type;
            }
        }
        setLoadLink(modalSelector, clickSelector, text, type, config);
        setLoadActionLink(modalSelector, type, config);
    };

    /**
     * set load link
     * @param {selector} modalSelector
     * @param {selector} clickSelector
     * @param {string}   text
     * @param {string}   type
     * @param {object}   config
     */
    function setLoadLink(modalSelector, clickSelector, text, type, config) {
        if(AmsifyHelper.detectIE()) {
          if($(modalSelector).html() === undefined) {
            appendModal(modalSelector, 'load', config);
          }   
        } 
        else if(!$(modalSelector).length) {
          appendModal(modalSelector, 'load', config);
        }

        if(type == 'materialize') {
            $('.modal').modal();
            $(document).on('click', clickSelector, function(){
              var thisClickSelector = this;
              var targetMethod      = $(this).data('href');
              $('.modal-body-loader').show();
              $(modalSelector).modal('open');
              $(modalSelector).modal({
                complete  : function() {
                  $('#default-modal-Label').html('');
                  $('.default-modal-content').html('');
                  $('.modal-body-loader').hide();
                }
              });

              var ajaxConfig = {};
              ajaxConfig['afterSuccess'] = function(data) {
                  $('#default-modal-Label').html(data['title']);
                  $('.default-modal-content').html(data['html']);
                  $('.modal-body-loader').hide();
                  setActionButton(thisClickSelector, modalSelector, '.confirm-action-form');
              };
              ajaxConfig['complete'] = function(data) {
                  AmsifyHelper.callback(config, 'afterLoad', $(thisClickSelector), 'after-load');
              };
              AmsifyHelper.callAjax(targetMethod, {}, ajaxConfig, 'GET');
          });
        } else if(type == 'bootstrap') {
            $(document).on('click', clickSelector, function(){
                var thisClickSelector = this;
                var targetMethod      = $(this).data('href');
                $('.modal-body-loader').show();
                $(modalSelector).modal('show');
                
                var ajaxConfig = {};
                ajaxConfig['afterSuccess'] = function(data) {
                    $('#default-modal-Label').html(data['title']);
                    $('.default-modal-content').html(data['html']);
                    $('.modal-body-loader').hide();
                    setActionButton(thisClickSelector, modalSelector, '.confirm-action-form');
                };
                ajaxConfig['complete'] = function(data) {
                    AmsifyHelper.callback(config, 'afterLoad', $(thisClickSelector), 'after-load');
                };
                AmsifyHelper.callAjax(targetMethod, {}, ajaxConfig, 'GET');
            });

            $(modalSelector).on('hidden.bs.modal', function(e) {
              $('#default-modal-Label').html('');
              $('.default-modal-content').html('');
              $('.modal-body-loader').hide();
            });    
        } else {
          $(document).on('click', clickSelector, function(){
              var thisClickSelector = this;
              var targetMethod      = $(this).data('href');
              $('.modal-body-loader').show();
              AmsifyModal.show(modalSelector);
              
              var ajaxConfig = {};
              ajaxConfig['afterSuccess'] = function(data) {
                  $('#default-modal-Label').html(data['title']);
                  $('.default-modal-content').html(data['html']);
                  $('.modal-body-loader').hide();
                  setActionButton(thisClickSelector, modalSelector, '.confirm-action-form');
              };
              ajaxConfig['complete'] = function(data) {
                  AmsifyHelper.callback(config, 'afterLoad', $(thisClickSelector), 'after-load');
              };
              AmsifyHelper.callAjax(targetMethod, {}, ajaxConfig, 'GET');
          });
        }
    };

    /**
     * [setLoadActionLink description]
     * @param {[type]} modalSelector [description]
     * @param {[type]} type          [description]
     * @param {[type]} config        [description]
     */
    function setLoadActionLink(modalSelector, type, config) {
      $(document).on('click', modalSelector+' .confirm-action-form', function(e){
          e.preventDefault();
          $('.progress').removeClass('hidden');
          if($(this).attr('data-ajax')) {
            AmsifyModal.callAjax(this, type, 'load', config);
          } else {
            $(this).parent('form').submit();
          }
      });
    };


/**
 * 
 ************ Other Common Functionalities ************
 *
 **/

    /**
     * set section button
     * @param {selector} linkSelector
     * @param {selector} modalSelector
     * @param {selector} selector
     */
    function setActionButton(linkSelector, modalSelector, selector) {
      if($(linkSelector).attr('data-href')) {
        $(modalSelector).find(selector).attr('data-href',$(linkSelector).attr('data-href'));
      }
      if($(linkSelector).attr('data-ajax')) {
        $(modalSelector).find(selector).attr('data-ajax',$(linkSelector).attr('data-ajax'));
        if($(linkSelector).attr('data-type')) {
          $(modalSelector).find(selector).attr('data-type',$(linkSelector).attr('data-type'));
        } else {
          $(modalSelector).find(selector).attr('data-type','delete');
        }
        if($(linkSelector).attr('data-content')) {
          $(modalSelector).find(selector).attr('data-index',$(linkSelector).closest('div').index());
          $(modalSelector).find(selector).attr('data-content',$(linkSelector).attr('data-content'));
        } else {
          $(modalSelector).find(selector).attr('data-index',$(linkSelector).closest('tr').index());
          $(modalSelector).find(selector).attr('data-content', 'table');
        }
        if($(linkSelector).attr('data-ajax-redirect')) {
          $(modalSelector).find(selector).attr('data-ajax-redirect',$(linkSelector).attr('data-ajax-redirect'));
        }  
      }
    };

    /**
     * call ajax
     * @param  {selector} submitSelector
     * @param  {string}   type
     * @param  {selector} modal
     * @param  {object}   config
     */
    AmsifyModal.callAjax = function(submitSelector, type, modal, config) {
        var defaulText    = $(submitSelector).html();
        $(submitSelector).addClass('disabled').prop('disabled', 1).html(confirmClickText);
        var rowIndex      = $(submitSelector).attr('data-index');
        var operationType = $(submitSelector).attr('data-type');
        var content       = $(submitSelector).attr('data-content');
        var modalSelector = confirmModalSelector;

        if(modal == 'load') {
            modalSelector = loadModalSelector;          
        }
        if(config !== undefined) {
          if(config.loadModal !== undefined) {
            modalSelector = config.loadModal;
          }
        }

        var ajaxAction  = $(submitSelector).attr('data-ajax');
        var params      = AmsifyHelper.getFormData($(submitSelector).parent('form'), true);
        var ajaxConfig  = {};
        console.info(modal, $(submitSelector).data());
        ajaxConfig['afterSuccess'] = function(data) {
            if($(submitSelector).attr('data-ajax-redirect')) {
                window.location = $(submitSelector).attr('data-ajax-redirect');
            } else {
              // Hide modal
              hideModal(modalSelector, type);
              // Perform operation based on its type  
              AmsifyTable.tableOperation(operationType, content, rowIndex, data['html']);
              $(submitSelector).removeClass('disabled').prop('disabled', 0).html(defaulText);
            }
        };
        ajaxConfig['afterResponseError'] = function(data) {
            $(submitSelector).removeClass('disabled').prop('disabled', 0).html(defaulText);
        };
        
        AmsifyHelper.callAjax(ajaxAction, params, ajaxConfig);
    };


    /**
     * hide modal based on type
     * @param  {selector} modalSelector
     * @param  {string}   type
     */
    function hideModal(modalSelector, type) {
      if(type == 'bootstrap') {
        $(modalSelector).modal('hide');
      } else if(type == 'materialize') {
        $(modalSelector).modal('close');
      } else {
        AmsifyModal.hide(modalSelector);
      }
    };

    /**
     * show modal based on type
     * @param  {selector} modalSelector
     * @param  {string}   type
     */
    function showModal(modalSelector, type) {
      if(type == 'bootstrap') {
        $(modalSelector).modal('show');
      } else if(type == 'materialize') {
        $(modalSelector).modal('open');
      } else {
        AmsifyModal.show(modalSelector);
      }
    };

    /**
     * append modal based on type
     * @param  {selector} modalSelector
     * @param  {string}   name
     * @param  {object}   config
     */
    function appendModal(modalSelector, name, config) {
        var modal = {};
        if(name == 'confirm') {
          modal = prepareConfirmModal(modalSelector, config);
        } else if(name == 'load') {
          modal = prepareLoadModal(modalSelector, config);
        } else if(name == 'message') {
          modal = prepareMessageModal(modalSelector, config);
        }
        AmsifyHelper.addHTML(modal);
    };

    /**
     * create object of message modal structure
     * @param  {selector} modalSelector
     * @param  {object}   config
     * @return {object}
     */
    function prepareMessageModal(modalSelector, config) {
        var type = defaultType;
        if(config !== undefined) {
          if(config.type !== undefined) {
            type = config.type;
          }
        }
        if(type == 'bootstrap') {
          return [
                  {'<div/>': { 'id': modalSelector.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                  {'<div/>': { 'class':'modal-dialog message-modal-dialog'}, 'appendTo': modalSelector},
                  {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': '.message-modal-dialog'},
                  {'<div/>': { 'class':'modal-header message-modal-header'}, 'appendTo': '.message-modal-content'},
                  {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.message-modal-header'},
                  {'<h4/>': { 'class':'modal-title message-modal-title', 'text':'Message'}, 'appendTo': '.message-modal-header'},
                  {'<div/>': { 'class':'modal-body message-modal-body message-text'}, 'appendTo': '.message-modal-content'},
                  {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': '.message-modal-content'},
                  {'<a/>'  : { 'class':'btn btn-success', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.message-modal-footer'}
          ];
        } else if(type == 'materialize') {
          return [
                  {'<div/>': { 'id': modalSelector.substring(1), 'class':'modal', }, 'prependTo': 'body'},
                  {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': modalSelector},
                  {'<h4/>': { 'class':'modal-title message-modal-title', 'text':'Message'}, 'appendTo': '.message-modal-content'},
                  {'<div/>': { 'class':'message-text'}, 'appendTo': '.message-modal-content'},
                  {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': modalSelector},
                  {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.message-modal-footer'}
          ];
        } else {
          return [
                   {'<div/>': { 'id': modalSelector.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                   {'<div/>': { 'class':'modal-content message-modal-content'}, 'appendTo': modalSelector},
                   {'<div/>': { 'class':'modal-header message-modal-header message-modal-title', 'text':'Message'}, 'appendTo': '.message-modal-content'},
                   {'<div/>': { 'class':'modal-body message-modal-body'}, 'appendTo': '.message-modal-content'},
                   {'<p/>'  : { 'class':'message-text', 'text':'Are you sure?'}, 'appendTo': '.message-modal-body'},
                   {'<div/>': { 'class':'modal-footer message-modal-footer'}, 'appendTo': '.message-modal-content'},
                   {'<a/>'  : { 'class':'modal-btn btn-green amsify-modal-close','text':'Close', 'href':"#"}, 'appendTo': '.message-modal-footer'}
          ];
        }
    };

    /**
     * create object of confirm modal structure
     * @param  {selector} modalSelector
     * @param  {object}   config
     * @return {object}
     */
    function prepareConfirmModal(modalSelector, config) {
        var type = defaultType;
        if(config !== undefined) {
          if(config.type !== undefined) {
            type = config.type;
          }
        }
        if(type == 'bootstrap') {
          return [
                  {'<div/>': { 'id': modalSelector.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                  {'<div/>': { 'class':'modal-dialog confirm-modal-dialog'}, 'appendTo': modalSelector},
                  {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': '.confirm-modal-dialog'},
                  {'<div/>': { 'class':'modal-header confirm-modal-header'}, 'appendTo': '.confirm-modal-content'},
                  {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.confirm-modal-header'},
                  {'<h4/>': { 'class':'modal-title confirm-modal-title', 'text':'Confirmation'}, 'appendTo': '.confirm-modal-header'},
                  {'<div/>': { 'class':'modal-body confirm-modal-body confirmation-text'}, 'appendTo': '.confirm-modal-content'},
                  {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': '.confirm-modal-content'},
                  {'<a/>'  : { 'class':'btn btn-warning danger confirm-action-link', 'text':'Confirm', 'href':"#"}, 'appendTo': '.confirm-modal-footer'},
                  {'<a/>'  : { 'class':'btn btn-success', 'text':'Cancel', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.confirm-modal-footer'}
          ];
        } else if(type == 'materialize') {
          return [
                  {'<div/>': { 'id': modalSelector.substring(1), 'class':'modal', }, 'prependTo': 'body'},
                  {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': modalSelector},
                  {'<h4/>': { 'class':'modal-title confirm-modal-title', 'text':'Confirmation'}, 'appendTo': '.confirm-modal-content'},
                  {'<div/>': { 'class':'confirmation-text'}, 'appendTo': '.confirm-modal-content'},
                  {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': modalSelector},
                  {'<a/>'  : { 'class':'modal-action waves-effect waves-red btn-flat confirm-action-link', 'text':'Confirm', 'href':"#"}, 'appendTo': '.confirm-modal-footer'},
                  {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Cancel', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.confirm-modal-footer'}
          ];
        } else {
          return [
                   {'<div/>': { 'id': modalSelector.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                   {'<div/>': { 'class':'modal-content confirm-modal-content'}, 'appendTo': modalSelector},
                   {'<div/>': { 'class':'modal-header confirm-modal-header', 'text':'Modal Header'}, 'appendTo': '.confirm-modal-content'},
                   {'<div/>': { 'class':'modal-body confirm-modal-body'}, 'appendTo': '.confirm-modal-content'},
                   {'<p/>'  : { 'class':'confirmation-text', 'text':'Are you sure?'}, 'appendTo': '.confirm-modal-body'},
                   {'<div/>': { 'class':'modal-footer confirm-modal-footer'}, 'appendTo': '.confirm-modal-content'},
                   {'<a/>'  : { 'class':'modal-btn btn-red confirm-action-link', 'text':'Confirm', 'href':"#"}, 'appendTo': '.confirm-modal-footer'},
                   {'<a/>'  : { 'class':'modal-btn btn-green amsify-modal-close','text':'Cancel', 'href':"#"}, 'appendTo': '.confirm-modal-footer'}
          ];
        }
    };


    /**
     * create object of load modal structure
     * @param  {selector} modalSelector
     * @param  {object}   config
     * @return {object}
     */
    function prepareLoadModal(modalSelector, config) {
        var type = defaultType;
        if(config !== undefined) {
          if(config.type !== undefined) { type = config.type; }
        }
        if(type == 'bootstrap') {
          return [
                {'<div/>': { 'id': modalSelector.substring(1), 'class':'modal fade', }, 'prependTo': 'body'},
                {'<div/>': { 'class':'modal-dialog modal-lg load-modal-dialog'}, 'appendTo': modalSelector},
                {'<div/>': { 'class':'modal-content load-modal-content'}, 'appendTo': '.load-modal-dialog'},
                {'<div/>': { 'class':'modal-header load-modal-header'}, 'appendTo': '.load-modal-content'},
                {'<button/>': { 'type':'button', 'data-dismiss':'modal', 'aria-hidden':'true', 'class':'close'}, 'appendTo': '.load-modal-header'},
                {'<h4/>':  { 'id': 'default-modal-Label', 'class':'modal-title load-modal-title', 'text':''}, 'appendTo': '.load-modal-header'},
                {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                {'<div/>': { 'class':'modal-body load-modal-body default-modal-content'}, 'appendTo': '.load-modal-content'},
                {'<div/>': { 'class':'modal-footer load-modal-footer'}, 'appendTo': '.load-modal-content'},
                {'<a/>'  : { 'class':'btn btn-success', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.load-modal-footer'},
          ];
        } else if(type == 'materialize') {
          return [
                    {'<div/>': { 'id': modalSelector.substring(1), 'class':'modal modal-fixed-footer', }, 'prependTo': 'body'},
                    {'<div/>': { 'class':'modal-content load-modal-content'}, 'appendTo': modalSelector},
                    {'<h4/>':  { 'id': 'default-modal-Label', 'class':'modal-title load-modal-title', 'text':''}, 'appendTo': '.load-modal-content'},
                    {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                    {'<div/>': { 'class':'default-modal-content'}, 'appendTo': '.load-modal-content'},
                    {'<div/>': { 'class':'modal-footer load-modal-footer'}, 'appendTo': modalSelector},
                    {'<a/>'  : { 'class':'modal-action modal-close waves-effect waves-green btn-flat', 'text':'Close', 'href':"#", 'data-dismiss':'modal'}, 'appendTo': '.load-modal-footer'}
          ];
        } else {
          return [
                 {'<div/>': { 'id': modalSelector.substring(1), 'class':'amsify-modal'}, 'prependTo': 'body'},
                 {'<div/>': { 'class':'modal-content modal-large load-modal-content'}, 'appendTo': modalSelector},
                 {'<div/>': { 'id': 'default-modal-Label', 'class':'modal-header load-modal-header', 'text':'Modal Header'}, 'appendTo': '.load-modal-content'},
                 {'<div/>': { 'class':'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                 {'<div/>': { 'class':'modal-body load-modal-body'}, 'appendTo': '.load-modal-content'},
                 {'<p/>'  : { 'class':'default-modal-content'}, 'appendTo': '.load-modal-body'},
                 {'<div/>': { 'class':'modal-footer load-modal-footer'}, 'appendTo': '.load-modal-content'},
                 {'<a/>'  : { 'class':'modal-btn btn-green amsify-modal-close','text':'Close', 'href':"#"}, 'appendTo': '.load-modal-footer'},
          ];
        }
    };


/**
 * 
 ************ Amsify Modal Functionalities ************
 *
 **/
    /**
     * show amsify modal
     * @param  {selector} modalSelector
     */
    AmsifyModal.show = function(modalSelector) {
        $(modalSelector).css({'display' : 'block', 'visibility' : 'visible'});
        setAmsifyModal();
    };

    /**
     * hide amsify modal
     * @param  {selector} modalSelector
     */
    AmsifyModal.hide = function(modalSelector) {
        $(modalSelector).css({'display' : 'none', 'visibility' : 'none'});
        setAmsifyModal();
    };

    /**
     * set amsify modal
     * @param  {selector} modalSelector
     */
    function setAmsifyModal() {
       $(document).on('click', '.amsify-modal-close', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            AmsifyModal.hide('.amsify-modal');
        });
    };

/**
 * 
 ************ Configuration section ************
 *
 **/
    /**
     * set the global config based on options passed
     * @param {object} config
     */
    function setConfig(config) {
      if(config !== undefined) {
          if(config.hasOwnProperty('type')) {
            defaultType = config.type;
          }
          if(config.hasOwnProperty('confirmSelector')) {
            confirmClickSelector = config.confirmSelector;
          }
          if(config.hasOwnProperty('confirmText')) {
            confirmText = config.confirmText;
          }
      }
    };

}(window.AmsifyModal = window.AmsifyModal || {}, jQuery));
