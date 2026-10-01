( function( $ ) {

    "use strict";

    function isTouchEnabled() {
    return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));
    }

    $(document).ready(function () {
        $("path[id^=\"usmap_\"]").each(function (i, e) {
            addEvent($(e).attr('id'));
        });
    });

    function addEvent(id, relationId) {
        var _obj = $('#' + id);
        var _Textobj = $('#' + id + ',' + '#' + us_map_config[id]['title']);
        var _abb = $('#' + us_map_config[id]['title']);
        $('#usmapwrapper').css({'opacity': '1'});

        if(us_map_config['default']['usshowvisns'] === true) {
            $('#usvisns').css({'fill': us_map_config['default']['usvisns']});
            $('#usvisns').css({'opacity': '1'});
        } else {
            $('#usvisns').css({'opacity': '0'});
        }

        if(us_map_config['default']['usshowlakes'] === true) {
            $('#uslakes path').css({'stroke': us_map_config['default']['usbrdrclr']});
            $('#uslakes').css({'fill': us_map_config['default']['uslakesfill']});
            $('#uslakes').css({'visibility': 'visible'});
        } else {
            $('#uslakes').css({'visibility': 'hidden'});
        }

        if(us_map_config['default']['usshowalaska'] === true) {
            $('#usmap_2' + ',' + '#usvn_2').css({'visibility': 'visible'});
        } else {
            $('#usmap_2' + ',' + '#usvn_2').css({'visibility': 'hidden'});
        }

        if(us_map_config['default']['usshowhawaii'] === true) {
            $('#usmap_11' + ',' + '#usvn_11').css({'visibility': 'visible'});
        } else {
            $('#usmap_11' + ',' + '#usvn_11').css({'visibility': 'hidden'});
        }

        if(us_map_config['default']['usshowdc'] === true) {
            $('#usmap_51' + ',' + '#usvn_51').css({'visibility': 'visible'});
        } else {
            $('#usmap_51' + ',' + '#usvn_51').css({'visibility': 'hidden'});
        }

        if(us_map_config['default']['uscallouts'] === true) {
            $('#uscallouts').css({'visibility': 'hidden'});
        } else {
            $('#uscallouts').css({'visibility': 'visible'});
        }

        _obj.attr({'fill': us_map_config[id]['upclr'], 'stroke': us_map_config['default']['usbrdrclr']});

        _Textobj.attr({'cursor': 'default'});

        if (us_map_config[id]['enbl'] === true) {
            if (isTouchEnabled()) {
                var touchmoved;
                _Textobj.on('touchend', function (e) {
                    if (touchmoved !== true) {
                        _Textobj.on('touchstart', function (e) {
                            let touch = e.originalEvent.touches[0];
                            let x = touch.pageX - 10, y = touch.pageY + (-15);

                            let $usmtip = $('#tipusmap');
                            let usmaptipw = $usmtip.outerWidth(),
                                usmaptiph = $usmtip.outerHeight();

                            x = (x + usmaptipw > $(document).scrollLeft() + $(window).width()) ? x - usmaptipw - (20 * 2) : x
                            y = (y + usmaptiph > $(document).scrollTop() + $(window).height()) ? $(document).scrollTop() + $(window).height() - usmaptiph - 10 : y

                            if (us_map_config[id]['targt'] !== 'none') {
                                _obj.css({'fill': us_map_config[id]['dwnclr']});
                            }
                            $usmtip.show().html(us_map_config[id]['hover']);
                            $usmtip.css({left: x, top: y})
                        })
                        _Textobj.on('touchend', function () {
                            _obj.css({'fill': us_map_config[id]['upclr']});
                            if (us_map_config[id]['targt'] === '_blank') {
                                window.open(us_map_config[id]['url']);
                            } else if (us_map_config[id]['targt'] === '_self') {
                                window.parent.location.href = us_map_config[id]['url'];
                            }
                            $('#tipusmap').hide();
                        })
                    }
                }).on('touchmove', function (e) {
                    touchmoved = true;
                }).on('touchstart', function () {
                    touchmoved = false;
                });
            }
            _Textobj.attr({'cursor': 'pointer'});

            _Textobj.on('mouseenter', function () {
                $('#tipusmap').show().html(us_map_config[id]['hover']);
                _obj.css({'fill': us_map_config[id]['ovrclr']});
                _abb.css({'fill': us_map_config['default']['usvisnshover']});
            }).on('mouseleave', function () {
                $('#tipusmap').hide();
                _obj.css({'fill': us_map_config[id]['upclr']});
                _abb.css({'fill': us_map_config['default']['usvisns']});
            });
            if (us_map_config[id]['targt'] !== 'none') {
                _Textobj.on('mousedown', function () {
                    _obj.css({'fill': us_map_config[id]['dwnclr']});
                });
            }
            _Textobj.on('mouseup', function () {
                _obj.css({'fill': us_map_config[id]['ovrclr']});
                if (us_map_config[id]['targt'] === '_blank') {
                    window.open(us_map_config[id]['url']);
                } else if (us_map_config[id]['targt'] === '_self') {
                    window.parent.location.href = us_map_config[id]['url'];
                }
            });
            _Textobj.on('mousemove', function (e) {
                let x = e.pageX + 10, y = e.pageY + 15;

                let $mus = $('#tipusmap');
                let usmaptipw = $mus.outerWidth(), usmaptiph = $mus.outerHeight();

                x = (x + usmaptipw > $(document).scrollLeft() +
                    $(window).width()) ? x - usmaptipw - (20 * 2) : x
                y = (y + usmaptiph > $(document).scrollTop() + $(window).height()) ?
                    $(document).scrollTop() + $(window).height() - usmaptiph - 10 : y

                $mus.css({left: x, top: y})
            })
        }
        else {
            _abb.css({'fill-opacity':'0.5'});
        }
    }
})(jQuery);
