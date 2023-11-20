window.addEventListener("scroll", function() {
  var menu = document.querySelector(".headbox");
  var scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    menu.classList.add("scrolled");
  } else {
    menu.classList.remove("scrolled");
  }
});


function showForm() {
  // var userform = document.getElementById('modal');
  // userform.style.display = "block";
    document.getElementById('modal').style.display = 'block';
    // document.getElementById('login').style.display = 'block';
  }
  function closeForm()
  {
    document.getElementById('modal').style.display = "none";
  }
  function showLoginForm() {
    document.getElementById('login').style.display = "block";
    document.getElementById('signup').style.display = "none";


  }
  function showSignupForm() {
    document.getElementById('signup').style.display = "block";
    document.getElementById('login').style.display = "none";


  }
  function showRSLogin(){
    customAlert('Đăng nhập thành công');
  }
  function showRSSignUp(){
    customAlert('Đăng nhập kí thành công');
  }
  function customAlert(mess) {
      document.getElementById("customalert").style.backgroundColor = '#2fb47d';
      document.getElementById("customalert").innerHTML = mess;
      var x = document.getElementById("customalert");
      x.className = "show";
     setTimeout(function () { x.className = x.classList.remove("show"); }, 3500);
      

    
  }

function showSearch(){
    let sb = document.getElementsByClassName('sizebar');
    document.getElementById("container-search").style.display="block";
    let a= sb.length;
    for(let i=0; i<a;i++){
        sb.item(i).style.display="block ";
    }
  }
  
  function closeSearch(){
   
    document.getElementById("container-search").style.display="none";
  }
