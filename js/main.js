$(function () {
    "use strict";
    // Document ready.


    var contentWrapper = $('.content-wrapper');
    var canvas = document.createElement("canvas");
    var mobileMenuApi = undefined;

    /** Init Mobile menu **/
    var mobileMenu = $('#b4c-mobile-menu');
    if (mobileMenu.length !== 0) {
        mobileMenuApi = initMMenu(mobileMenu);
        // Assign back btn text
        $('.mm-btn_prev').text(mobileMenu.data('btn-back'));
        // Must init product category panel manually
        mobileMenuApi.initPanels($('#mm-4'));
    }

    /** Refresh Bootstrap select **/
    $('.selectpicker').selectpicker('refresh');

    /** Init homepage carousel **/
    if (contentWrapper.hasClass('homepage')) {
        var carousel = $('#b4c-carousel');
        initCarousel(carousel[0]);
    }


    /** Init slick sliders **/
    initSlickSliders();

    /** Init inpage navigation **/
    // initInpageNav();

    /** Scroll to anchor if hash is available **/
    var urlHash = location.hash;
    if (urlHash.length !== 0 && $(urlHash).length !== 0) {
        scrollToAnchor(urlHash, 50);
    }

    /** Check Image Banner Lightness to dynamically set text color **/
    // var bannerElements = $('.img-banner-ditap');
    // if (bannerElements.length !== 0) {
    //     checkBannerImagesLightness(bannerElements);
    // }


    /** EVENTS ----------------------------------------------------------------------------------------------------- **/

    /* Reinit on resize / orientation change */
    $(window).on('resize orientationChange', function (event) {
        // No slick sliders on mobiles
        var slickInitialized = $('.content-wrapper').find('.slick-initialized');
        if ($(window).width() > 420 && slickInitialized.length === 0) {
            initSlickSliders();
        }

        // adjustShoppingCartBackdrop();
    });


    /* Page scrolldown button */
    $('.scrollDown').on('click', function (e) {
        e.preventDefault();
        var offset = $(this).data('offset'),
            id = $(this).data('id');
        // Choose offset for mobile
        if ($(this).data('offset-mobile') && $(window).width() < 768) {
            offset = $(this).data('offset-mobile');
        }
        scrollToAnchor(id, offset);
    });

    // /* Scrollspy event to actualize the bootstrap-select active element */
    // $(window).on('activate.bs.scrollspy', function (e, obj) {
    //     if (obj !== undefined) {
    //         var scrollspyActiveId = obj.relatedTarget;
    //         $('.inpage-nav-select .selectpicker').selectpicker('val', scrollspyActiveId);
    //     }
    // });


    // // E-Shop menu toggle backdrop
    // $('.dropdown-eshop-ditap').on('show.bs.dropdown', function () {
    //     $('.ditap-backdrop-overlay').fadeIn(250);
    // }).on('hidden.bs.dropdown', function () {
    //     $('.ditap-backdrop-overlay').fadeOut(250);
    // });
    //
    // // E-Shop submenu toggle
    // $('.btn-eshop-submenu').on("click", function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $(this).parent().toggleClass('show');
    //     $(this).next('.dropdown-menu').toggleClass('show');
    // });
    //
    // // E-Shop category menu close
    // $('.category-submenu .close').on('click', function (e) {
    //     e.stopPropagation();
    //     $('.nav-item.dropdown').removeClass('show');
    //     $('.btn-eshop-submenu').trigger('click');
    // });
    //
    // // Mmenu category menu trigger (mobile)
    // $('.mm-listitem .btn-eshop-submenu').on('click', function (e) {
    //     e.preventDefault();
    //     $(this).parent().find('.mm-btn_next').trigger('click');
    // });

    // // Trigger image zoom on button hover
    // $('.btn-ditap.image-zoom-fast').on('mouseenter mouseleave', function (e) {
    //     imageZoomFast(this, e);
    // });
    //
    // // Trigger image zoom on image banners
    // $('.banner-zoom.image-zoom-slow').on('mouseenter mouseleave', function (e) {
    //     imageZoom(this, e);
    // });
    //
    // $('.banner-zoom.image-zoom-fast').on('mouseenter mouseleave', function (e) {
    //     imageZoomFast(this, e);
    // });
    //
    // // Popover sliders on Diary and Recipe pages
    // $('.btn-ditap-teaser-cart-big').on('click', function (e) {
    //     // Use direct link for mobiles or show product slider card on tablets or desktops
    //     if ($(window).width() > 767) {
    //         e.preventDefault();
    //         var popover = $(this).parent().closest('.vkpopup'),
    //             popoverHidden = $(popover).find('.slider-product-popover').hasClass('hide');
    //         // Show or hide popover slider
    //         if (popoverHidden) {
    //             $(this).addClass('active');
    //             $(popover).find('.popover-intro').addClass('hide');
    //             $(popover).find('.arrow').removeClass('hide');
    //             $(popover).find('.popover-body').removeClass('hide');
    //             $(popover).find('.slider-product-popover').removeClass('hide').slick({
    //                 prevArrow: '<a href="#" class="nav-link icon-link slick-prev"><span class="icon-ditap-arrow arrow-left"></span></a>',
    //                 nextArrow: '<a href="#" class="nav-link icon-link slick-next"><span class="icon-ditap-arrow arrow-right"></span></a>',
    //                 variableWidth: false,
    //                 mobileFirst: true,
    //                 slidesToShow: 1,
    //                 dots: true,
    //                 arrows: true,
    //                 infinite: true
    //             });
    //         } else {
    //             $(this).removeClass('active');
    //             // Hide the popover slider
    //             $(popover).find('.popover-body').addClass('hide');
    //             $(popover).find('.arrow').addClass('hide');
    //             $(popover).find('.slider-product-popover').addClass('hide').slick('unslick');
    //         }
    //     }
    // });
    //
    // // Popover close button
    // $('.popover-intro').find('button.close').on('click', function (e) {
    //     e.preventDefault();
    //     var popover = $(this).parent().closest('.vkpopup');
    //     $(popover).find('.popover-intro').addClass('hide');
    // });

    /** FUNCTIONS -------------------------------------------------------------------------------------------------- **/


    function initMMenu(mmenuElem) {
        return mmenuElem.mmenu({
            // options
            offCanvas: true,
            navbar: {
                title: "<img src=\"B4Components/media/B4Components/logos/logodefault.png\" alt=\"Logo xs\"/>"
            },
            wrappers: ["bootstrap4"],
            extensions: [
                "fullscreen",
                "fx-menu-fade",
                "position-front",
                "theme-white"
            ],
            navbars: [
                {
                    position: "top",
                    content: [
                        "prev",
                        "title",
                        "close"
                    ]
                }
            ]
        }, {
            // configuration
            // clone: true,
            offCanvas: {
                pageSelector: ".content-wrapper"
            }
        }).data("mmenu");
    }

    function initCarousel(carousel) {

        // checkImageLightness($('.carousel-item.active img')[0].src, carousel);
        $(carousel).on("slide.bs.carousel", function (e) {
            // $('.teaser-cards-promo').fadeOut(750);
            var currentIndex = $(e.relatedTarget).index();
            // checkImageLightness($('.carousel-item img')[currentIndex].src, carousel);
            //The animate class gets removed so that it jumps straight back to 0%
            // $(".transition-timer-carousel-progress-bar", this).removeClass("animate").css("width", "0%");
        });

        var percent = 0;
        var bar = $('.transition-timer-carousel-progress-bar');
        var crsl = $('#b4c-carousel');
        var pauseLi = $('#b4c-carousel li');
        var pauseBtn = $('#b4c-carousel .btn-pause');

        function progressBarCarousel() {
            bar.css({width: percent + '%'});
            percent = percent + 0.5;
            if (percent > 100) {
                percent = 0;
                crsl.carousel('next');
            }
        }

        crsl.carousel({
            interval: false,
            pause: true
        }).on('slid.bs.carousel', function () {
        });

        var barInterval = setInterval(progressBarCarousel, 40);
        pauseBtn.hover(
            function () {
                clearInterval(barInterval);
            },
            function () {
                barInterval = setInterval(progressBarCarousel, 40);
            });
        pauseLi.hover(
            function () {
                clearInterval(barInterval);
            },
            function () {
                barInterval = setInterval(progressBarCarousel, 40);
            })
    }


    /* Populate facebook posts */
    populateFacebookUpdates();


    function populateFacebookUpdates() {
        var pageID = "407659309308025",
            // var pageID = "180321762372494",
            accessToken = "EAAFIb7a3cWMBAFC7R6uc1ExB6S5e2Khxu0XUTfZB94hf3aPt4YdbJXGR399jK5Fae0ceZBzWFVsIUFC0EvtSkywqakVjZCEVHlxr3nuLvn5tv1zoV6weQh2OTWbZBLgAscjgCVQfGJZAgmBCgCpaDrY7pGMbjw0gQwfZAmZAPQuZBAZDZD";
        var postsURL = "https://graph.facebook.com/v3.2/" + pageID + "?fields=posts.limit(5)%7Bcreated_time%2Cmessage%2Cfull_picture%2Clink%7D&access_token=" + accessToken;

        $.ajax({
            url: postsURL,
            method: 'GET',
            dataType: "jsonp",
            success: function (data) {
                renderFacebookPosts(data);
            },
            error: function (status) {
                console.log("Facebook data could not be retrieved.  Failed with a status of " + status);
            }
        });
    }

    function renderFacebookPosts(posts) {
        var elems = $('.ds-fb-post').toArray(),
            postsByAdmin = [];
        for (var i = 0; i < posts.posts.data.length; i++) {
            // Only show posts by page admin
            if (posts.posts.data[i].message != null && posts.posts.data[i].full_picture != null) {
                postsByAdmin.push(posts.posts.data[i]);
            }
        }

        for (var j = 0; j <= 2; j++) {
            var pictureId = postsByAdmin[j].full_picture,
                message = postsByAdmin[j].message,
                link = postsByAdmin[j].link,
                createtime = new Date(postsByAdmin[j].created_time);
            $(elems[j]).find('.ds-fb-post-link').attr('href', link);
            $(elems[j]).find('.ds-fb-img').attr('src', pictureId);
            $(elems[j]).find('.ds-fb-post-message .card-title').text(message);
            $(elems[j]).find('.ds-fb-post-date').text(createtime.toLocaleDateString());
        }
    }


    function initFancyBox() {

        var contentWrapper = $('.content-wrapper');

        if (contentWrapper.hasClass('fancy-box-start')) {

            $('[data-fancybox]').fancybox({
                loop: true,
                buttons: ["zoom", "share", "slideShow", "fullScreen", "download", "thumbs", "close"],
                animationEffect: "zoom-in-out"
            });

        }
    }



    /**
     *  Function to scroll to an anchor tag with offset
     *
     * @param <String> hash       Hashtag from the url, e.g. #faq1
     * @param <Number> offset     Offset when scrolling in pixel, e.g. 70
     */
    function scrollToAnchor(hash, offset) {
        $('html, body').animate({
            scrollTop: $(hash).offset().top - offset
        }, 500, function () {
            // Open the accordion tab after scroll finished on shopping guide page
            if (contentWrapper.hasClass('shopping-guide')) {
                openShoppingGuideAccordianTab(hash);
            }
        });
    }



    function doRedirect(redirectLink) {
        window.location.replace(redirectLink);
    }

    // @TODO export to separate file
    function initSlickSliders() {

        var contentWrapper = $('.content-wrapper');

        // Homepage product categories slider
        if (contentWrapper.hasClass('homepage')) {

            // Slick events
            $('.product-category-slider').slick({
                prevArrow: '<a href="#" class="nav-link icon-link slick-prev"><span class="icon-ditap-arrow arrow-left"></span></a>',
                nextArrow: '<a href="#" class="nav-link icon-link slick-next"><span class="icon-ditap-arrow arrow-right"></span></a>',
                variableWidth: true,
                mobileFirst: true,
                arrows: false,
                dots: false,
                responsive: [{

                    // No slick slider on small mobiles
                    breakpoint: 300,
                    variableWidh: false,
                    settings: "unslick" // destroys slick

                }, {

                    // Mobile viewport
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        arrows: false,
                        infinite: true
                    }

                }, {

                    // Tablet viewport
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                        infinite: false
                    }

                }, {

                    // Desktop viewport
                    breakpoint: 996,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: false,
                        infinite: false
                    }
                }, {

                    // Large Desktop viewport
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: false,
                        infinite: false
                    }
                }]
            });
        }

        // About page teaser slider
        if (contentWrapper.hasClass('about-me')) {

            // Init slick slider
            $('.teaser-slider-small-cards').slick({
                prevArrow: '<a href="#" class="nav-link icon-link slick-prev"><span class="icon-ditap-arrow arrow-left"></span></a>',
                nextArrow: '<a href="#" class="nav-link icon-link slick-next"><span class="icon-ditap-arrow arrow-right"></span></a>',
                variableWidth: true,
                mobileFirst: true,
                arrows: false,
                dots: false,
                responsive: [{
                    // No slick slider on small mobiles
                    breakpoint: 300,
                    variableWidh: false,
                    settings: "unslick" // destroys slick

                }, {

                    // Tablet viewport
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false,
                        infinite: false
                    }

                }, {

                    // No slick slider on Desktop viewport
                    breakpoint: 996,
                    settings: "unslick" // destroys slick
                }]
            });
        }

        // Recipe page teaser slider
        if (contentWrapper.hasClass('recipe-class')) {

            // Init slick slider
            $('.teaser-slider-small-cards').slick({
                prevArrow: '<a href="#" class="nav-link icon-link slick-prev"><span class="icon-ditap-arrow arrow-left"></span></a>',
                nextArrow: '<a href="#" class="nav-link icon-link slick-next"><span class="icon-ditap-arrow arrow-right"></span></a>',
                variableWidth: true,
                mobileFirst: true,
                arrows: false,
                dots: false,
                responsive: [{
                    // Mobile viewport
                    breakpoint: 300,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                        infinite: false
                    }


                },
                    {
                        // Mobile viewport
                        breakpoint: 425,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            dots: true,
                            arrows: false,
                            infinite: false
                        }
                    },
                    {

                        // Tablet viewport
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,
                            dots: true,
                            arrows: false,
                            infinite: false
                        }

                    }, {

                        // No slick slider on Desktop viewport
                        breakpoint: 996,
                        settings: "unslick" // destroys slick
                    }]
            });
        }

        // Diary detail product teaser with variable cards
        if (contentWrapper.hasClass('diary-detail')) {

            // Slick Events
            $('.teaser-slider-variable-cards').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                $(this).addClass('sliding');
                $('.slick-arrow.slick-prev').addClass('visible');

                // Init slick slider
            }).slick({
                prevArrow: '<a href="#" class="nav-link icon-link slick-prev"><span class="icon-ditap-arrow arrow-left"></span></a>',
                nextArrow: '<a href="#" class="nav-link icon-link slick-next"><span class="icon-ditap-arrow arrow-right"></span></a>',
                variableWidth: true,
                mobileFirst: true,
                arrows: false,
                dots: false,
                responsive: [{

                    // Mobile viewport
                    breakpoint: 300,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        arrows: false,
                        infinite: false,
                        centerMode: true
                    }
                }, {

                    // Tablet viewport
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false,
                        infinite: false
                    }

                }, {

                    // Desktop viewport
                    breakpoint: 996,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: false,
                        arrows: true,
                        infinite: false
                    }

                }]
            });
        }

        // No search results page product teaser with variable cards and slider only on table viewport
        if (contentWrapper.hasClass('search-no-results')) {

            $('.teaser-slider-variable-cards-variant').slick({
                prevArrow: '<a href="#" class="nav-link icon-link slick-prev"><span class="icon-ditap-arrow arrow-left"></span></a>',
                nextArrow: '<a href="#" class="nav-link icon-link slick-next"><span class="icon-ditap-arrow arrow-right"></span></a>',
                variableWidth: true,
                mobileFirst: true,
                arrows: false,
                dots: false,
                responsive: [{
                    // No slick slider on small mobiles
                    breakpoint: 300,
                    variableWidh: false,
                    settings: "unslick" // destroys slick

                }, {

                    // Tablet viewport
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false,
                        infinite: true
                    }

                }, {

                    // No slick slider on Desktop viewport
                    breakpoint: 996,
                    settings: "unslick" // destroys slick
                }]
            });
        }
    }
});