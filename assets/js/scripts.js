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

});
