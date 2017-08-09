$(function(){
    var $root = $('html, body');
    $('.scroll').click(function() {
        $root.animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });

    var $body = $('body'),
        $window = $(window),
        $document = $(document);

    var top = $('#top'),
        top_offset = top.offset(),
        scroll_button = $('#scroll-btn');

    $document.scroll(function(){
        var $this = $(this)
            scrollTop = $this.scrollTop();

        if(scrollTop > top_offset.top){
            top.addClass('scrolled');
            scroll_button.addClass('up').attr('href', '#hero');
        }else{
            top.removeClass('scrolled');
            scroll_button.removeClass('up').attr('href', '#owner');
        }
    });

    var iphone_slides = $('.iphone-slides');
    if(iphone_slides.length){

        iphone_slides.glide({
            type: 'carousel',
            autoplay: false,
            keyboard: false
        });

        var info_slides = $('.info-slides');
        info_slides.glide({
            type: 'carousel',
            autoplay: false,
            keyboard: false
        });

        $('.bullet').click(function(){
            var $this = $(this),
                id = $this.closest('ul').attr('id');
                id = id.replace('-bullets', ''),
                index = $this.index();
            syncFromIphone(id, index);
        });

        iphone_slides.on('swipeEnd.glide', function(){
            var id = $(this).attr('id');
                id = id.replace('-iphone', '');
            syncFromIphone(id);
        });

        info_slides.on('swipeEnd.glide', function(){
            var id = $(this).attr('id');
                id = id.replace('-info', '');
            syncFromInfo(id);
        });

        function syncFromIphone(id, index) {
            var iphone = $('#'+id+'-iphone'),
                bullets = $('#'+id+'-bullets'),
                info = $('#'+id+'-info'),
                iphone_api = iphone.data('glide_api'),
                info_api = info.data('glide_api'),
                current_slide = iphone_api.current();

            if(index != null) current_slide = index + 1;

            bullets.find('.bullet').eq(current_slide - 1).addClass('active').siblings().removeClass('active');
            info_api.go('='+current_slide);
        }

        function syncFromInfo(id) {
            var iphone = $('#'+id+'-iphone'),
                bullets = $('#'+id+'-bullets'),
                info = $('#'+id+'-info'),
                iphone_api = iphone.data('glide_api'),
                info_api = info.data('glide_api'),
                current_slide = info_api.current();

            bullets.find('.bullet').eq(current_slide - 1).addClass('active').siblings().removeClass('active');
            iphone_api.go('='+current_slide);
            info_api.go('='+current_slide);
        }
    }

    var fields_slides = $('#fields-slides');
    if(fields_slides.length){
        fields_slides.glide({
            type: 'carousel',
            autoplay: false,
            keyboard: false
        });
    }

    // Modal
    var modal = $('.modal');
    if(modal.length){
        var layer = $('.layer'),
            trigger = $('.trigger-modal');

        function open_modal(id){
            var modal = $('#'+id);
            layer.fadeIn();
            modal.fadeIn();
        }

        function close_modal(){
            layer.fadeOut();
            modal.fadeOut();
        }

        trigger.click(function(){
            var $this = $(this),
                id = $this.data('modal');
            open_modal(id);
            return false;
        });

        $body.on('click', '.close-modal', function(){
            close_modal();
        });

    }

    // Map
    var map = new GMaps({
        el: '#map',
        lat: 25.655498,
        lng: -100.300231
    });

    var snazzy = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6195a0"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": "0"
                },
                {
                    "saturation": "0"
                },
                {
                    "color": "#f5f5f2"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "-3"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#bae5ce"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fac9a9"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#787878"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#0a00ff"
                },
                {
                    "saturation": "-77"
                },
                {
                    "gamma": "0.57"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#43321e"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#ff6c00"
                },
                {
                    "lightness": "4"
                },
                {
                    "gamma": "0.75"
                },
                {
                    "saturation": "-68"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#eaf6f8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c7eced"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "-49"
                },
                {
                    "saturation": "-53"
                },
                {
                    "gamma": "0.79"
                }
            ]
        }
    ];

    map.addStyle({
        styledMapName:"Flat Pale",
        styles: snazzy,
        mapTypeId: "flat_pale"
    });

    map.setStyle("flat_pale");

    map.addMarker({
        lat: 25.650121,
        lng: -100.301389,
        title: 'Cancha 1',
        icon: "img/marker.png"
    });

    map.addMarker({
        lat: 25.654376,
        lng: -100.296497,
        title: 'Cancha 2',
        icon: "img/marker.png"
    });

    map.addMarker({
        lat: 25.659521,
        lng: -100.305681,
        title: 'Cancha 3',
        icon: "img/marker.png"
    });

    map.addMarker({
        lat: 25.653448,
        lng: -100.295596,
        title: 'Cancha 4',
        icon: "img/marker.png"
    });

    map.addMarker({
        lat: 25.650431,
        lng: -100.305939,
        title: 'Cancha 5',
        icon: "img/marker.png"
    });

    // Filters
    var filters = $('.filter');
    filters.find('span').click(function(){
        var $this = $(this),
            filter = $this.closest('.filter');
        filter.toggleClass('active');
    });

    var user = $('.user');
    user.click(function(){
        $(this).toggleClass('active');
    });

    var ionSimple = $('.ion-simple');
    ionSimple.ionRangeSlider({
        type: "single"
    });

});
