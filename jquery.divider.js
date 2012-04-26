// jquery.divider.js
// @weblinc, @jsantell (c) 2012
// Dependencies: jQuery UI (draggable)

;(function( $ ) {
  $.fn.divider = function ( userSettings ) {
    var
      options    = $.extend( {}, $.fn.divider.defaults, userSettings ),
      isVertical = options.direction === 'vertical';

    this.css('position', 'relative');

    return this.each(function () {
      var
        $container = $( this ),
        $cntrls    = $(),
        ORIGIN     = isVertical ? 'left'  : 'top',
        DIMENSION  = isVertical ? 'width' : 'height',
        $panels    = $container.find( options.panels ).css({
          position : 'absolute',
          top      : '0px',
          left     : '0px'
        }),
        $cntrlTemplate = options.controller instanceof jQuery ?
          options.controller :
          $('<div />', { 'class' : options.controller });

      if ( options.handle ) {
        $cntrlTemplate = $cntrlTemplate.append(
          options.handle instanceof jQuery ?
            options.handle :
            $('<div />', { 'class' : options.handle })
        );
      }

      $panels.each(function ( i ) {
        if ( ~~$( this ).css( 'z-index' ) < $panels.length - i ) {
          $( this )
            .css ( 'z-index', $panels.length - i )
            .data( 'divider-index', i );
        }
      });

      for ( var i = 0, j = $panels.length; i < j - 1; i++ ) {
        $cntrls = $cntrls.add(( $cntrlTemplate ).clone()
          .css( ORIGIN, options.position.length === j - 1 ?
              options.position[ i ] :
              (( $container[ DIMENSION ]() / j ) * ( i + 1 )))
          .appendTo( $container )
          .data( 'divider-index', $cntrls.length )
          .data( 'divider-orig-position', $cntrls.length ));
      }

      $cntrls.css({
        zIndex   : ~~$panels.first().css( 'z-index' ) + 1,
        position : 'absolute'
      }).draggable({
        axis        : isVertical ? 'x' : 'y',
        containment : $container,
        cursor      : 'pointer',
        drag        : slidePanels
      });

      function slidePanels ( e, ui ) {
        var
          $cntrl    = $( this ),
          index     = $cntrl.data( 'divider-index' ),
          pos       = ui.position[ ORIGIN ],
          before    = getDividerRelativeTo( $( this ), -1 ),
          after     = getDividerRelativeTo( $( this ),  1 ),
          beforePos = before ? parseInt( before.css( ORIGIN ), 10 ) + before[ DIMENSION ]() : null,
          afterPos  = after  ? parseInt( after.css ( ORIGIN ), 10 ) -  after[ DIMENSION ]() : null;

        if ( before && pos < beforePos ) { pos = beforePos; }
        if ( after  && pos > afterPos  ) { pos = afterPos; }

        // Additional check to ensure that the handle doesn't go out of bounds from an additional element handle
        var maxBounds = $container[ DIMENSION ]() - $cntrl[ DIMENSION ]();
        if ( pos < 0 ) { pos = 0; }
        if ( pos > maxBounds ) { pos = maxBounds; }

        ui.position[ ORIGIN ] = pos;

        updatePanel( index, pos );
      }

      function updatePanel ( index, pos ) {
        $panels.filter(function () {
          return $( this ).data( 'divider-index' ) === index;
        }).css( isVertical ? 'width' : 'height' , pos );
      }


      function getDividerRelativeTo ( $divider, diff ) {
        var
          index = $divider.data( 'divider-index' ),
          $newDivider = $cntrls.slice( index + diff, index + diff + 1 );
        return $newDivider.length ? $newDivider : null;
      }

      // Initialize panels
      $cntrls.each(function ( e, i ) {
        var
          $this = $( this ),
          index = $this.data( 'divider-index' ),
          pos   = $this.css( ORIGIN );
         updatePanel( index, pos );
      });

    });
  };

  $.fn.divider.defaults = {
    panels     : '.panels',
    controller : 'controller',
    direction  : 'vertical',
    position   : [],
    handle     : false
  };

})( jQuery );
