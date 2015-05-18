$(document).ready(function (){
  $(".input-name").change(function(){
    console.log("name changed");
  $(this).validateText({pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/ });
  });

  $(".input-password").change(function(){
    console.log("password changed");
  $(this).validatePassword({mine:25});
  });

  $(".input-email").change(function(){
    $(this).validateEmail();
  });

  $(":submit").hover(function(){
    console.log("");
  });

});
