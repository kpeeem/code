//#helpers+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
define('helpers', ['init'], function (helpers) {
    console.info('helpersModule-LOADED===============================================');
//basic auth helper
    RES.Utils.makeBasicAuth = function (user, password) {
        basicAuth = "Basic " + btoa(user + ":" + password);
        RES.Env.credentials = basicAuth;
        return basicAuth
    };
//Static template helper
    RES.Utils.template = function (id) {
        return _.template($('#' + id).html());
    };
//ajax event loader
    RES.Utils.loader = function (options) {
        $(document).ajaxStart(function () {
            $('.loaderWrapper').addClass('on');
            $("body").css("overflow-y", "hidden");
        }).ajaxStop(function () {
            $('.loaderWrapper').removeClass('on');
            $("body").css("overflow-y", "visible");
        });
    };
//Browser detect
    RES.Utils.browserDetect = function (options) {
        navigator.sayswho = (function () {
            var ua = navigator.userAgent, tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            return M.join(' ');
        });
        $("body").attr("data-browser", navigator.sayswho());
    };
//cookie helper
    RES.Utils.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    //auth check helper
    RES.Utils.authCheck = function () {
        var currentRoute = Backbone.history.getFragment();
        authRoutes = ['auth', 'forgot', 'registration'];
        if (authRoutes.indexOf(currentRoute) == -1) {
            $(document).ajaxError(function (e, xhr, options) {
                if (xhr.status == 403) {
                    window.location.href = "/#auth";
                }
            });
        }
    };

//BackboneSync Overrite
    RES.Utils.BackboneSyncOverrite = function () {
        var oldSync = Backbone.sync;
        Backbone.sync = function (method, model, options) {
            options.beforeSend = function (xhr) {
                if (RES.Env.credentials) {
                    xhr.setRequestHeader('Authorization', RES.Env.credentials);
                }
                xhr.setRequestHeader('X-CSRFToken', RES.Utils.readCookie('csrftoken'));
            };
            console.log("sync:" + method + ": " + model.url);
            return oldSync(method, model, options);
        };
    };
//tagsSeparation for companies page cards
    RES.Utils.tagsSeparation = function () {
        $(".carditem").each(function (cardIndex) {
            var $thisCardItem = $(this);
            $thisCardItem.find(".tags li").each(function (liIndex) {
                if (liIndex > 0) {
                    var $thisLi = $(this);
                    var $previousLi = $($thisCardItem.find(".tags li")[liIndex - 1]);
                    var thisLiOffset = $thisLi.position().top;
                    var previousLiOffset = $previousLi.position().top;
                    if (thisLiOffset > previousLiOffset) $previousLi.addClass("last-in-line");
                    if (liIndex == $thisCardItem.find(".tags li").length - 1) $thisLi.addClass("last-in-line");
                }
            });
        });
    };

//tagsSeparation for companies page cards
    RES.Utils.cacheModulesInDom = function (router) {
        router.on("route", function (route, params) {
            console.log("hide header");
            $('.head-elements').hide();
        });
    };

    RES.Utils.datePicker = function (el, options) {
        console.log(el);
        el.datepicker({
            inline: true,
            changeMonth: true,
            changeYear: true
        });
    };
    
    RES.Utils.dropDownLogic = function() {

        $('a.dropdown').click(function(){
            $(this).toggleClass('active');
            $submenu = $(this).next('.submenu');
            $('.dropdown-component .submenu').not($submenu).hide();
            $submenu.toggle();
        });

        $('.multiselect-category .res-select-custom-header').click(function(){
            $submenu = $(this).next('.res-select-slide');
            // $('.multiselect-category .res-select-custom-header').hide();
            $submenu.toggle();
        });

        $(".dropdown-component .root li").on("click", function (e) {
            var choosenElementValue = e.target.textContent;
            var $dropdown = $(this).parent().parent().siblings(".dropdown");
            $dropdown.text(choosenElementValue).removeClass("active");
            $dropdown.next('.submenu').hide();
        });

        $(document).on('click', function(event) {
            if(!$(event.target).closest('.dropdown-component').length) {
                if($('.dropdown-component').is(":visible")) {
                    $('.dropdown-component .submenu').hide()
                }
            }
        });


    };

    RES.Utils.dropDown = function () {

        $('.dropdown-component .root').each(function(indx){
          var hours = 23; 
          var interval = 1;
          var minutes = 30;

          for(var hoursIt = 0; hoursIt <= hours; hoursIt++){
            for(var intervalIt = 0; intervalIt<=interval; intervalIt++){
              if (intervalIt*minutes == 0){
                var minute = '00';
              }
              else{
                var minute = '30';
              }
              if (hoursIt < 10){
                var hour = '0' + hoursIt;
              }
              else{
                var hour = hoursIt;
              }
              // console.log(hoursIt+':'+minute);
              $(this).append('<li>'+hour+':'+minute+'</li>');
                          
            }
          }
          
        });
        $('.dropdown').click(function(){
            $submenu = $(this).next('.submenu')
            $('.dropdown-component .submenu').not($submenu).hide();
            $submenu.toggle();
            $(this).toggleClass('down up')
        });

        $('.multiselect-category .res-select-custom-header').click(function () {
            $submenu = $(this).next('.res-select-slide')
            // $('.multiselect-category .res-select-custom-header').hide();
            $submenu.toggle();
        });

    };

    RES.Utils.getImageLightness = function (pickImage) {
        function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return [h, s, l];
        }

        var colorThief = new ColorThief();
        var pickColor = pickImage[0];
        var rgbPick = colorThief.getColor(pickColor);
        var pickHSL = rgbToHsl(rgbPick[0], rgbPick[1], rgbPick[2]);
        return pickHSL[2];
    };


    // random background position for element
    RES.Utils.randomBackground = function () {
        $(".randomBackground").each(function (index) {
            // console.log($(this));
            var rand1 = Math.floor(Math.random() * 999 + 1); // Math.random() * (max - min) + min;
            var rand2 = Math.floor(Math.random() * 999 + 1);
            var position = rand1 + "px " + rand2 + "px";
            $(this).css("background-position", position);
        });
    };
    // menu set active url
    RES.Utils.setAcitveUrl = function (element) {
        element.each(function (index) {
            var href = $(this).attr('href');
            var currentUrl = Backbone.history.getFragment();
            if (href == '#' + currentUrl || href + '/' == '#' + currentUrl) {
                $(this).parents('span').addClass('active');
            }
        });
    };

    RES.Utils.showError = function (name, text) {
        $('[name = ' + name + ']').closest('.form-group').addClass('has-error').find('.description span:eq(1)').html(text);
        console.log()
    };

    RES.Utils.showErrors = function (errors) {
        for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
                RES.Utils.showError(key, errors[key])
            }
        }
    };

    RES.Utils.hideError = function (name) {
        $('[name=' + name + ']').closest('.form-group').removeClass('has-error');
    };

    RES.Utils.unescapeHtml = function unescapeHtml(safe) {
         return safe.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    };
    RES.Utils.scrollToTop = function (router) {
        router.on("route", function (route, params) {
            $("html, body").animate({scrollTop: 0}, "fast");
            return false;
        });
    };

    RES.Utils.token = function () {
        if (RES.Env.token == '') {
            RES.Env.token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
            return RES.Env.token;
        } else {
            return RES.Env.token;
        }
    };

    helpers = RES.Utils;
    console.info('helpersModule-LOADED===============================================');
    return helpers;
});
//#helpers-----------------------------------------------------------

