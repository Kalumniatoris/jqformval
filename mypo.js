(function( $ ){
  //var test;



  $.fn.validateText = function(options){
    return this.each(function(){
      var settings = $.extend({
        pattern : "*"
      },options);

      var pattern = settings.pattern;
      var patt = new RegExp(pattern);
      var res = patt.test(this.value);
    //  console.log(res);
      if(!res){

      $(this).blockPForm(true);

    }else{

      $(this).blockPForm(false);

    }

    });
  };

$.fn.validateEmail = function(){
  return this.each(function(){
  //Copyrighty dla regexa:
  //Portions copyright (C) 2006  Ross Kendall - http://rosskendall.com
  //Portions copyright (C) 1993-2005 Cal Henderson - http://iamcal.com
  //Walidacja emaila w jakikolwiek inny sposób niż wysłanie jego jest zle
  // [login."!%$VALID THIS EMAIL "."@gmail.com@a%.fd"@site.org] jest prawidlowym adresem, ale i tak nie widzialem jeszcze
  return $(this).validateText({pattern: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/});
  });
};

  $.fn.validatePassword = function(options){
    return this.each(function(){
      var settings = $.extend({
        mine : 50
      },options);


      var range=0;
      var pass = this.value;
      if(pass.length<1){
        $(this).blockPForm(true,{error:""});
      }
           
      var small=  (/[a-z]/.test(pass));
      var big=    (/[A-Z]/.test(pass));
      var digits= (/\d/.test(pass));
      var drsym=(/[!@#$%^&*()]/.test(pass));
      var oupsym=(/[~`\-_=\+]/.test(pass));
      var oksym=(/[\[\]{}:"'|\\<,>.?/]/.test(pass));
      var oth=(/[^ -~]/.test(pass));
      if(small){range+=26;}
      if(big){range+=26;}
      if(digits){range+=10;}
      if(drsym){range+=10;}
      if(oupsym){range+=6;}
      if(oksym){range+=15;}
      if(oth){range+=32+128;}

      var entropy = pass.length*Math.log2(range);
      //console.log("E:"+entropy);

      if(entropy < settings.mine){
        $(this).blockPForm(true,{error:"Niewystarczajaca entropia, oczekiwano "+settings.mine+" jest <"+Math.ceil(entropy)});
      }else{
        $(this).blockPForm(false,{correct:"Entorpia ok: ~<"+Math.ceil(entropy)});
      }

    });
  };


  $.fn.blockPForm = function(block,options){
    return this.each(function(){
      var settings = $.extend({
        error : "Error, wrong value",
        correct : ""
        },options);

    if(block){

      //console.log($(this));
    //  console.log($(this).parent());
   $(this).next(".info").text(settings.error);
      $(this).parent().css("border","dotted");
      $(this).parent().css("border-color","red");
      $(this).siblings(":submit").disable();
    //  console.log(this.parentNode);
  }else{
    $(this).next(".info").text(settings.correct);
    $(this).parent().css("border","Solid");
    $(this).parent().css("border-color","black");
    $(this).siblings(":submit").enable();
  }



})
  };

  $.fn.disable = function(){
    this.prop("disabled",true);
    return this;
  };

  $.fn.enable = function(){
    this.prop("disabled",false);
    return this;
  };



})(jQuery);
