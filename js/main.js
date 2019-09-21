$(document).ready(function(){
// variables
  let links = $('nav ul li a'),
      navHeight = $('nav').outerHeight(),
      slider = $('.reviews-slider'),
      link = $('.reviews-links .link'),
      partners = $('.partners-slider'),
      tariffs = $('.tariffs-changes .link'),
      tblock = $('.tariffs-block'),
      tall = $('.tariffs-all'),
      active = 'active',
      modal = $('[data-toggle=modal]');
// variables
// slick slider
  slider.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: '<a href="#" class="arrow arrow-prev"></a>',
    nextArrow: '<a href="#" class="arrow arrow-next"></a>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  partners.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: '<a href="#" class="arrow arrow-prev"></a>',
    nextArrow: '<a href="#" class="arrow arrow-next"></a>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
// slick slider


let test = document.getElementsByClassName('error')
console.log(test)
  
  
  link.on('click',function(e){
    e.preventDefault();
    const attr = $(this).attr('data-target');
    slider.slick('slickUnfilter');
    link.removeClass(active);
    $(this).addClass(active);
    if (attr === 'communal_services'){
      slider.slick('slickFilter', '.communal_services')
    }
    else if (attr === 'family'){
      slider.slick('slickFilter', '.family')
    }
    else if (attr === 'realty'){
      slider.slick('slickFilter', '.realty')
    }
    else if (attr === 'business'){
      slider.slick('slickFilter', '.business')
    }
    else if (attr === 'health'){
      slider.slick('slickFilter', '.health')
    }
    else if(attr === 'all'){
      slider.slick('slickUnfilter')
    }
  });

  $('.pick').on('click', function(){
    $('.reviews-links').slideToggle()
  });

  tariffs.on('click', function(){
    tariffs.removeClass(active)
    $(this).addClass(active)
    if($(this).hasClass('tariffs-compare-rates')){
      tblock.addClass('compare')
    }
    else{
      tblock.removeClass('compare')
    }
  });

// tariffs
  $(window).resize(function(){
    if ($(window).width() < 798){
      tblock.removeClass('compare')
      tariffs.removeClass(active)
      tall.addClass(active)
    }
  });
// tariffs

// service
  $.getJSON('../services.json', function(data){
    let item = [],
        num = null;
    $.each(data, function(index, val){
      num++
      item.push('<div class="modal-wrapper" id="tab-'+ num +'"><div class="modal-body"><div class="modal-close" data-close="close">&times;</div><h3 class="h3 modal-title">'+ index + '</h3>' + '<img src="' + val.img + '" alt=""><p>'+ val.description + '</p><p>'+ val.text +'</p><p><strong>' + val.user + '</strong></p><p>'+ val.conclusion +'</p></div></div>');
    });
    $('body').append(item)
  });
// service

// modal windows
  modal.on('click',function(e){
    e.preventDefault();
    let modalWindow = $(this).data('modal'),
        modalVideo = $(this).data('video'),
        modalText = $(this).data('text'),
        modalImg = $(this).data('card');
    $(modalWindow).fadeIn().addClass('active-modal');
    $('body').addClass('no-scroll');

    if(modalWindow === '#modal-v'){
      $(modalWindow).find('.modal-video').html(modalVideo);
      $(modalWindow).find('.modal-card').html('<img src="'+ modalImg + '"><p>'+ modalText +'</p>');
    }

  });
  
  $(document).on('click','.modal-close',function(){
    closeWindow()
  });
  
  $(document).on('mouseup','.modal-wrapper',function(e){
    if (!$('.modal-body').is(e.target) && $('.modal-body').has(e.target).length === 0){
      closeWindow()
    }
  });

  function closeWindow(){
    $('.modal-wrapper').removeClass('active-modal').fadeOut();
    $('body').removeClass('no-scroll')
    
    if($(this).has('#modal-v')){
      $('#modal-v').find('iframe').remove();
    }

  };
// modal windows

// menu scroll
  $(links).on('click', scrollTo);
  $('.scroll').on('click', scrollTo);

  $(window).scroll(function(){
    let top = $(this).scrollTop();
    $(links).removeClass('active-link');
    links.each(function(i, el){
      let link = $(el).attr('href'),
      offset = $(link).offset().top - navHeight - 10,
      height = $(link).outerHeight();
      if (top > offset && top < offset + height ){
        $(links).removeClass('active-link');
        $(this).addClass('active-link');
      }
    });
  });
// menu scroll

  function scrollTo(e){
  e.preventDefault();
  let anc = $(this).attr('href'),
      pos = $(anc).offset().top;
      pos = pos - navHeight;
  $('html, body').stop().animate({scrollTop: pos}, 1000);
  };

// ajax form
  // $('button[type=submit]').on('click', function(e){
  //   // e.preventDefault();
  //   let input = $(this).siblings('input[name=name]').val();
  //   if (!input){
  //     console.log("пустой")
  //   }else{
    //     console.log(input)
  //   }
  //   // const form = $(this).parent()
  //   // sendAjax(form)
  // });
  
  // function sendAjax(form){
  //   $.ajax({
    //     url: './send.php',
  //     type: 'POST',
  //     dataType: 'html',
  //     data: form.serialize(),
  //     success: function(resp){
  //       let test = $.parseJSON(resp)
        
  //       console.log(test.name
  //         )
  //     },
  //     error: function(resp){
    //       console.log('no')
    //       console.log(resp)
    //     }
    //   });
    // }
    
    
// ajax form
    
// validate form
  $('form').each(function(){
    $(this).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone:{
          required: true,
          minlength: 10,
          maxlength: 13
        },
        message:{
          maxlength: 300
        }
      },
      messages:{
        name: {
          required: "Введите имя.",
          minlength: "Пожалуйста, введите не менее 2 символов."
        },
        phone:{
          required: "Введите номер телефона.",
          minlength: "Пожалуйста, введите не менее 10 символов.",
          maxlength: "Пожалуйста, введите не более 13 символов."

        },
        message:{
          maxlength: "Длинна сообщения больше 300 символовю"
        }
      },
      submitHandler: function(form){
        submitForm(form)
      }
    });
  });
    
  function submitForm(form){
    $(form).submit(function(e){
      e.preventDefault()
    });
    let name = $(form).children('input[name=name]').val();

    $(form).trigger('reset');
    $('#success-error .modal-content').html('<p><strong>' + name + '</strong>, заявка успешно отправлена </p><img src="./images/success.png" alt="success">');
    $('#success-error').fadeIn().toggleClass('active-modal');
    setTimeout(closeWindow, 1500);
}    
// validate form

});