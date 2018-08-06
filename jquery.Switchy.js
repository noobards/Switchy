(function($) {
    $.fn.Switchy = function(options) {
        
        
        return this.each( function() {
            // Establish our default settings
            var settings = $.extend({}, $.fn.Switchy.defaults, options);
            
            // assigning css class for steps and content
            $(this).find('> ul').addClass('switch-steps');
            $(this).find('> div').addClass('switch-content');
            
            var _steps = $(this).find('.switch-steps');
            var _content = $(this).find('.switch-content');
            
            if(_steps.length > 0 && _content.length > 0)
            {
                
                
                var _listItems = _steps.find('> li');
                var _contentPanes = _content.find('> div');
                
                // assigning css class for the content panes
                _contentPanes.addClass('switch-pane');
                
                applyDimensions(settings.stepsWidth, _steps, _content);
                
                var activeLiSet = false; // flag to check if the active li should be set by javascript - if true, then it means active has been set in HTML
                $.each(_listItems, function(i, o){
                   $(o).attr('data-index', i);
                   if($(o).hasClass('switch-li-active'))
                   {
                       activeLiSet = true;
                   }

                   $(o).on('click', function(){
                        _listItems.removeClass('switch-li-active');
                        $(this).addClass('switch-li-active');

                        var index = jQuery(this).attr('data-index');

                        _contentPanes.removeClass('switch-pane-active');
                        _content.find('div[data-index="'+index+'"]').addClass('switch-pane-active');
                   });
                });
                if(! activeLiSet)
                {
                    _listItems[0].className += ' switch-li-active';
                }
                
                var activePaneSet = false; // flag to check if the active pane should be set by javascript - if true, then it means active has been set in HTML
                $.each(_contentPanes, function(i, o){
                   $(o).attr('data-index', i);
                   if($(o).hasClass('switch-pane-active'))
                   {
                       activePaneSet = true;
                   }
                });
                if(! activePaneSet)
                {
                    _contentPanes[0].className += ' switch-pane-active';
                }
                
                
                /* RESIZE EVENT */
                $(window).on('resize', function(){
                   applyDimensions(settings.stepsWidth, _steps, _content);
                });
            }
            else
            {
               debug("Either the steps or the content container was not found");
            }
            
            
            
        });
    };
    
    // Plugin defaults – added as a property on our plugin function.
    $.fn.Switchy.defaults = {
        stepsWidth: 30
    };
    
    function debug( msg ) {       
       console.log(msg);
    };
    
    function applyDimensions(leftWidth, ul, div) {        
       ul.css('width', leftWidth+'%');
       var stepsHeigth = ul.outerHeight();
       
       var contentWidth = 99 - leftWidth; // keeping a buffer of 1% for borders and other stuff
       div.css('width', contentWidth+'%');
       
       var contentPanes = div.find('> .switch-pane');       
       contentPanes.css('height', stepsHeigth+'px');
   };
    
}(jQuery));