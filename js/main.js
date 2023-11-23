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

  function showdetail(){
    document.getElementById("div_detail").style.display="grid";
  }

  function closedetail(){
    document.getElementById("div_detail").style.display="none";
  }

  function choose_side(){
    var a = document.getElementById("div_size");
    var b = a.getElementsByClassName("size");
    for (var i=0;i<b.length;i++){
      b[i].addEventListener("click", function() {
      var c = document.getElementsByClassName("active");
      c[0].className=c[0].className.replace(" active", "");
      this.className+=" active";
      });
    }
  } 


  function handlePlus(){
    let amountElement = document.getElementById("amount");
    let amount = amountElement.value;
    let render = (amount) =>{
      amountElement.value=amount
    }
      amount++;
      render(amount);
      amountElement.addEventListener('input',() => {
        amount = amountElement.value;
        amount = parentInt(amount);
      });
  }

  function handleMinus(){
    let amountElement = document.getElementById("amount");
    let amount = amountElement.value;
    let render = (amount) =>{
      amountElement.value=amount
    }
      if(amount>1){
        amount--;
      } render(amount);
      amountElement.addEventListener('input',() => {
        amount = amountElement.value;
        amount = parentInt(amount);
      });
  }