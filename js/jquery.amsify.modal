 // Amsify42 Modal 1.0.0
 // http://www.amsify42.com
 (function(AmsifyModal, $, undefined) {

    //Private Property
    var initialize              = false;
    var base_url                = window.location.protocol+'//'+window.location.host;
    var _token                  = $('meta[name="_token"]').attr('content');

    var confirmModalSelector    = '#default-confirm-modal'
    var confirmClickSelector    = '.amsify-modal-confirm';
    var confirmText             = 'Are you sure, you want to proceed?';
    var confirmClickText        = 'Submitting...';

    var loadModalSelector       = '#default-load-modal'
    var loadClickSelector       = '.amsify-modal-load';

    var setDefaultConfirm       = true;
    var setDefaultLoad          = true;

    var defaultType             = '';
    

    //Public Property
    AmsifyModal.base_url    = base_url;

    AmsifyModal.Modal = function() {
        AmsifyModal.Modal.prototype.set = function(config) {

          if(config !== undefined) {
            AmsifyModal.setConfirmModal(config);
            AmsifyModal.setLoadModal(config);
          } else {
            if(setDefaultConfirm) {
              AmsifyModal.setConfirmModal();
            }
            if(setDefaultLoad) {
              AmsifyModal.setLoadModal();
            }
          }
        };
    };
   

    //Public Methods
    AmsifyModal.init = function(config) {
      setConfig(config); 
      var defaultModal = new AmsifyModal.Modal;
          defaultModal.set();
    };


    AmsifyModal.set = function(config) {
        var newModal = new AmsifyModal.Modal();
            newModal.set(config);
    };


    AmsifyModal.setConfirmModal = function(config) {

          var type = defaultType;

          if(config !== undefined) {
              if(config.type !== undefined) {
                type = config.type;
              }
          }

          if(type == 'materialize') {
              $('.modal').modal();
              setMaterializeConfirm(config);
          } else if(type == 'bootstrap') {
              setBootstrapConfirm(config);
          } else {
              setAmsifyConfirm(config); 
          }
    };


   AmsifyModal.setLoadModal = function(config) {

        var type = defaultType;

        if(config !== undefined) {
            if(config.type !== undefined) {
              type = config.type;
            }
        }

        if(type == 'materialize') {
            $('.modal').modal();
            setMaterializeLoad(config);
        } else if(type == 'bootstrap') {
            setBootstrapLoad(config);
        } else {
            setAmsifyLoad(config);
        }
    };



    // Set Confirm for Materialize
    function setMaterializeConfirm(config) {

        var modalSelector     = confirmModalSelector;
        var confirmSelector   = confirmClickSelector;
        var text              = confirmText;

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
        }

        if(!$(modalSelector).length) {
            appendModal(modalSelector, 'confirm', config);
        }  

        $(document).on('click', confirmSelector, function(){

              var href  = $(this).data('href');
              $(modalSelector).find('.confirm-action-link').attr('data-href',href);
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

        $(document).on('click', '.confirm-action-link', function(e){
            e.preventDefault();
            $('.progress').removeClass('hidden');
            $(this).addClass('disabled').prop('disabled', 1).html(confirmClickText);
            window.location = $(this).data('href');
        });

    }


    // Set Confirm for Bootstrap
    function setBootstrapConfirm(config) {

        var modalSelector     = confirmModalSelector;
        var confirmSelector   = confirmClickSelector;
        var text              = confirmText;

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
          }

        
        if(!$(modalSelector).length) {
            appendModal(modalSelector, 'confirm', config);
        }  

        $(document).on('click', confirmSelector, function(){

              var href    = $(this).data('href');

              $(modalSelector).find('.confirm-action-link').attr('data-href',href);
              $(modalSelector).find('.confirmation-text').text(text);

              $(modalSelector).modal('show');

              $(modalSelector).on('hide.bs.modal', function(e) {
                  $(modalSelector).find('#confirm-id').val(0);
                  $(modalSelector).find('.confirm-action-link').attr('data-href','');
                  $(modalSelector).find('.confirmation-text').text('');
                  $('.progress').addClass('hidden');
              });

        });

        $(document).on('click', '.confirm-action-link', function(e){
            e.preventDefault();
            $('.progress').removeClass('hidden');
            $(this).addClass('disabled').prop('disabled', 1).html(confirmClickText);
            window.location = $(this).data('href');
        });

    }


    // Set Confirm for Amsify
    function setAmsifyConfirm(config){
       
        var modalSelector     = confirmModalSelector;
        var confirmSelector   = confirmClickSelector;
        var text              = confirmText;

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
          }

        if(!$(modalSelector).length) {
            appendModal(modalSelector, 'confirm', config);
        }  
        
        $(document).on('click', confirmSelector, function(){
              var href    = $(this).data('href');
              $(modalSelector).find('.confirm-action-link').attr('data-href',href);
              $(modalSelector).find('.confirmation-text').text(text);
              AmsifyModal.show(modalSelector);
        });

        $(document).on('click', '.confirm-action-link', function(e){
            e.preventDefault();
            $('.progress').removeClass('hidden');
            $(this).addClass('disabled').prop('disabled', 1).html(confirmClickText);
            window.location = $(this).data('href');
        });  

    };




    //Set load view for Materialize
    function setMaterializeLoad(config) {
    
        var modalSelector     = loadModalSelector;
        var clickSelector     = loadClickSelector;

        if(config !== undefined) {
            if(config.loadModal !== undefined) {
              modalSelector = config.loadModal;
            }
            if(config.loadClick !== undefined) {
              clickSelector = config.loadClick;
            }
        }

        if(!$(modalSelector).length) {
            appendModal(modalSelector, 'load', config);
        }

        $(document).on('click', clickSelector, function(){
          var targetMethod = $(this).data('href');
          $('.modal-body-loader').show();
          $(modalSelector).modal('open');
          $(modalSelector).modal({
            complete  : function() {
              $('#default-modal-Label').html('');
              $('.default-modal-content').html('');
              $('.modal-body-loader').hide();
            }
          });


          $.ajax({
                type    : "GET",
                url     : AmsifyModal.base_url+'/'+targetMethod,
                data    : {_token : _token},
                success : function (data) {
                    $('#default-modal-Label').html(data['title']);
                    $('.default-modal-content').html(data['html']);
                    $('.modal-body-loader').hide();
                }
          });
      });

    };


    //Set load view for Bootstrap
    function setBootstrapLoad(config) {

      var modalSelector     = loadModalSelector;
      var clickSelector     = loadClickSelector;

      if(config !== undefined) {
          if(config.loadModal !== undefined) {
            modalSelector = config.loadModal;
          }
          if(config.loadClick !== undefined) {
            clickSelector = config.loadClick;
          }
      }

      if(!$(modalSelector).length) {
          appendModal(modalSelector, 'load', config);
      }

      $(document).on('click', clickSelector, function(){
        var targetMethod = $(this).data('href');
        $('.modal-body-loader').show();
        $(modalSelector).modal('show');
        $.ajax({
              type    : "GET",
              url     : AmsifyModal.base_url+'/'+targetMethod,
              data    : {_token : _token},
              success : function (data) {
                  $('#default-modal-Label').html(data['title']);
                  $('.default-modal-content').html(data['html']);
                  $('.modal-body-loader').hide();
              }
        });
    });

    $(modalSelector).on('hidden.bs.modal', function(e) {
          $('#default-modal-Label').html('');
          $('.default-modal-content').html('');
          $('.modal-body-loader').hide();
    });

    };

    // Set Load view for Amsify
    function setAmsifyLoad(config){
       
      var modalSelector     = loadModalSelector;
      var clickSelector     = loadClickSelector;

      if(config !== undefined) {
          if(config.loadModal !== undefined) {
            modalSelector = config.loadModal;
          }
          if(config.loadClick !== undefined) {
            clickSelector = config.loadClick;
          }
      }

      if(!$(modalSelector).length) {
          appendModal(modalSelector, 'load', config);
      }

      $(document).on('click', clickSelector, function(){
        var targetMethod = $(this).data('href');
        $('.modal-body-loader').show();
        AmsifyModal.show(modalSelector);
        $.ajax({
              type    : "GET",
              url     : AmsifyModal.base_url+'/'+targetMethod,
              data    : {_token : _token},
              success : function (data) {
                  $('#default-modal-Label').html(data['title']);
                  $('.default-modal-content').html(data['html']);
                  $('.modal-body-loader').hide();
                }
            });
        });
    };



    function appendModal(modalSelector, name, config) {
        var confirmModal = {};
        if(name == 'confirm') {
          confirmModal = prepareConfirmModal(modalSelector, config);
        } else if(name == 'load') {
          confirmModal = prepareLoadModal(modalSelector, config);
        }
        $.each(confirmModal, function(index, element){
          var $object;
          $.each(element, function(key, tag){
            if(key != 'appendTo' && key != 'prependTo') {
              $object = $(key, tag);
            } else {
              $object[key](tag);
            }
          });
        });
    }

    function prepareConfirmModal(modalSelector, config) {

        var type = defaultType;
        if(config !== undefined) {
          if(config.type !== undefined) {
            type = config.type;
          }
        }

        if(type == 'bootstrap') {
          return [
                  {'<div/>': { id: modalSelector.substring(1), class:'modal fade', }, 'prependTo': 'body'},
                  {'<div/>': { class:'modal-dialog confirm-modal-dialog'}, 'appendTo': modalSelector},
                  {'<div/>': { class:'modal-content confirm-modal-content'}, 'appendTo': '.confirm-modal-dialog'},
                  {'<div/>': { class:'modal-header confirm-modal-header'}, 'appendTo': '.confirm-modal-content'},
                  {'<button/>': { type:'button', 'data-dismiss':'modal', 'aria-hidden':'true', class:'close'}, 'appendTo': '.confirm-modal-header'},
                  {'<h4/>': { class:'modal-title confirm-modal-title', text:'Confirmation'}, 'appendTo': '.confirm-modal-header'},
                  {'<div/>': { class:'modal-body confirm-modal-body confirmation-text'}, 'appendTo': '.confirm-modal-content'},
                  {'<div/>': { class:'modal-footer confirm-modal-footer'}, 'appendTo': '.confirm-modal-content'},
                  {'<a/>'  : { class:'btn btn-warning danger confirm-action-link', text:'Confirm', href:"#"}, 'appendTo': '.confirm-modal-footer'},
                  {'<a/>'  : { class:'btn btn-success', text:'Cancel', href:"#", 'data-dismiss':'modal'}, 'appendTo': '.confirm-modal-footer'}
          ];
        }

        else if(type == 'materialize') {
          return [
                  {'<div/>': { id: modalSelector.substring(1), class:'modal', }, 'prependTo': 'body'},
                  {'<div/>': { class:'modal-content confirm-modal-content'}, 'appendTo': modalSelector},
                  {'<h4/>': { class:'modal-title confirm-modal-title', text:'Confirmation'}, 'appendTo': '.confirm-modal-content'},
                  {'<div/>': { class:'confirmation-text'}, 'appendTo': '.confirm-modal-content'},
                  {'<div/>': { class:'modal-footer confirm-modal-footer'}, 'appendTo': modalSelector},
                  {'<a/>'  : { class:'modal-action waves-effect waves-red btn-flat confirm-action-link', text:'Confirm', href:"#"}, 'appendTo': '.confirm-modal-footer'},
                  {'<a/>'  : { class:'modal-action modal-close waves-effect waves-green btn-flat', text:'Cancel', href:"#", 'data-dismiss':'modal'}, 'appendTo': '.confirm-modal-footer'}
          ];
        }

        else {
          return [
                   {'<div/>': { id: modalSelector.substring(1), class:'amsify-modal'}, 'prependTo': 'body'},
                   {'<div/>': { class:'modal-content confirm-modal-content'}, 'appendTo': modalSelector},
                   {'<div/>': { class:'modal-header confirm-modal-header', text:'Modal Header'}, 'appendTo': '.confirm-modal-content'},
                   {'<div/>': { class:'modal-body confirm-modal-body'}, 'appendTo': '.confirm-modal-content'},
                   {'<p/>'  : { class:'confirmation-text', text:'Are you sure?'}, 'appendTo': '.confirm-modal-body'},
                   {'<div/>': { class:'modal-footer confirm-modal-footer'}, 'appendTo': '.confirm-modal-content'},
                   {'<a/>'  : { class:'modal-btn btn-red confirm-action-link', text:'Confirm', href:"#"}, 'appendTo': '.confirm-modal-footer'},
                   {'<a/>'  : { class:'modal-btn btn-green amsify-modal-close',text:'Cancel', href:"#"}, 'appendTo': '.confirm-modal-footer'}
          ];
        }
    }



    function prepareLoadModal(modalSelector, config) {

        var type = defaultType;
        if(config !== undefined) {
          if(config.type !== undefined) {
            type = config.type;
          }
        }

        if(type == 'bootstrap') {
          return [
                {'<div/>': { id: modalSelector.substring(1), class:'modal fade', }, 'prependTo': 'body'},
                {'<div/>': { class:'modal-dialog modal-lg load-modal-dialog'}, 'appendTo': modalSelector},
                {'<div/>': { class:'modal-content load-modal-content'}, 'appendTo': '.load-modal-dialog'},
                {'<div/>': { class:'modal-header load-modal-header'}, 'appendTo': '.load-modal-content'},
                {'<button/>': { type:'button', 'data-dismiss':'modal', 'aria-hidden':'true', class:'close'}, 'appendTo': '.load-modal-header'},
                {'<h4/>':  { id: 'default-modal-Label', class:'modal-title load-modal-title', text:'Confirmation'}, 'appendTo': '.load-modal-header'},
                {'<div/>': { class:'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                {'<div/>': { class:'modal-body load-modal-body default-modal-content'}, 'appendTo': '.load-modal-content'},
                {'<div/>': { class:'modal-footer load-modal-footer'}, 'appendTo': '.load-modal-content'},
                {'<a/>'  : { class:'btn btn-success', text:'Close', href:"#", 'data-dismiss':'modal'}, 'appendTo': '.load-modal-footer'},
          ];
        }

        else if(type == 'materialize') {
          return [
                    {'<div/>': { id: modalSelector.substring(1), class:'modal modal-fixed-footer', }, 'prependTo': 'body'},
                    {'<div/>': { class:'modal-content load-modal-content'}, 'appendTo': modalSelector},
                    {'<h4/>':  { id: 'default-modal-Label', class:'modal-title load-modal-title', text:'Confirmation'}, 'appendTo': '.load-modal-content'},
                    {'<div/>': { class:'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                    {'<div/>': { class:'default-modal-content'}, 'appendTo': '.load-modal-content'},
                    {'<div/>': { class:'modal-footer load-modal-footer'}, 'appendTo': modalSelector},
                    {'<a/>'  : { class:'modal-action modal-close waves-effect waves-green btn-flat', text:'Close', href:"#", 'data-dismiss':'modal'}, 'appendTo': '.load-modal-footer'}
          ];
        }

        else {
          return [
                 {'<div/>': { id: modalSelector.substring(1), class:'amsify-modal'}, 'prependTo': 'body'},
                 {'<div/>': { class:'modal-content modal-large load-modal-content'}, 'appendTo': modalSelector},
                 {'<div/>': { id: 'default-modal-Label', class:'modal-header load-modal-header', text:'Modal Header'}, 'appendTo': '.load-modal-content'},
                 {'<div/>': { class:'modal-body-loader fill-background'}, 'appendTo': '.load-modal-content'},
                 {'<div/>': { class:'modal-body load-modal-body'}, 'appendTo': '.load-modal-content'},
                 {'<p/>'  : { class:'default-modal-content load-modal-content', text:'Model Content'}, 'appendTo': '.load-modal-body'},
                 {'<div/>': { class:'modal-footer load-modal-footer'}, 'appendTo': '.load-modal-content'},
                 {'<a/>'  : { class:'modal-btn btn-green amsify-modal-close',text:'Close', href:"#"}, 'appendTo': '.load-modal-footer'},
          ];
        }
    }


    AmsifyModal.show = function(modalSelector, callback) {
        $(modalSelector).css({'display' : 'block', 'visibility' : 'visible'});
        setAmsifyModal();
    };

    AmsifyModal.hide = function(modalSelector, callback) {
        $(modalSelector).css({'display' : 'none', 'visibility' : 'none'});
        setAmsifyModal();
    };

    function setAmsifyModal() {
       $(document).on('click', '.amsify-modal-close', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            AmsifyModal.hide('.amsify-modal');
        });
    }



  // Setting Configuations
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
        if(config.hasOwnProperty('confirmModal')) {
          setDefaultConfirm = config.confirmModal;
        }
        if(config.hasOwnProperty('loadModal')) {
          setDefaultLoad = config.loadModal;
        }
    }
  };


}(window.AmsifyModal = window.AmsifyModal || {}, jQuery));   
