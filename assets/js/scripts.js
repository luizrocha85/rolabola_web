$(function(){
    var $body = $('body'),
        $window = $(window),
        $document = $(document);

    var top = $('#top'),
        top_offset = top.offset();

    $document.scroll(function(){
        var $this = $(this)
            scrollTop = $this.scrollTop();

        if(scrollTop > top_offset.top){
            top.addClass('scrolled');
        }else{
            top.removeClass('scrolled');
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
            var id = $(this).closest('ul').attr('id');
                id = id.replace('-bullets', '');
            syncFromIphone(id);
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

        function syncFromIphone(id) {
            var iphone = $('#'+id+'-iphone'),
                bullets = $('#'+id+'-bullets'),
                info = $('#'+id+'-info'),
                iphone_api = iphone.data('glide_api'),
                info_api = info.data('glide_api'),
                current_slide = iphone_api.current();

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
});
