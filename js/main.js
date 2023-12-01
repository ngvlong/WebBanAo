function vnd(price) {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
function menulist() {
  var form = document.getElementById('menulist');
  if (form.style.display === 'none') {
    form.style.display = 'block'; // Hiển thị form nếu nó đang ẩn
  } else {
    form.style.display = 'none'; // Ẩn form nếu nó đang hiển thị
  }
}
function closesmallsreach(){
  var back = document.getElementsByClassName('smallsreachform');
  back[0].style.display = 'none';
}

function sreachform(){
  var widthscreen = document.documentElement.clientWidth;
  if(widthscreen< 600 ){
  var s = document.getElementsByClassName('smallsreachform');
  s[0].style.display = 'flex';
  var inputElement = document.getElementById('smallsreach');
  setTimeout(function() {
      inputElement.focus();
  }, 50);     
}}

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


  function renderProducts(showProduct) {
    let productHtml = '';
    if(showProduct.length == 0) {
        document.getElementById("home-title").style.display = "none";
        productHtml = `<div class="no-result"><div class="no-result-h">Tìm kiếm không có kết quả</div><div class="no-result-p">Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn</div><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div></div>`;
    } else {
        document.getElementById("home-title").style.display = "block";
        showProduct.forEach((product) => {
            productHtml += `<div class="col-product">
            <article class="card-product" >
                <div class="card-header">
                    <a href="#" class="card-image-link" onclick="detailProduct(${product.id})">
                    <img class="card-image" src="${product.img}" alt="${product.title}">
                    </a>
                </div>
                <div class="food-info">
                    <div class="card-content">
                        <div class="card-title">
                            <a href="#" class="card-title-link" onclick="detailProduct(${product.id})">${product.title}</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="product-price">
                            <span class="current-price">${vnd(product.price)}</span>
                        </div>
                    <div class="product-buy">
                        <button onclick="detailProduct(${product.id})" class="card-button order-item"><i class="fa-regular fa-cart-shopping-fast"></i> Đặt hang</button>
                    </div> 
                </div>
                </div>
            </article>
        </div>`;
        });
    }
    document.getElementById('home-products').innerHTML = productHtml;
}
let perPage = 12;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];

function displayList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    renderProducts(productShow);
}

function showHomeProduct(products) {
    let productAll = products.filter(item => item.status == 1)
    displayList(productAll, perPage, currentPage);
    setupPagination(productAll, perPage, currentPage);
}

window.onload = showHomeProduct(JSON.parse(localStorage.getItem('products')))

function setupPagination(productAll, perPage) {
    document.querySelector('.page-nav-list').innerHTML = '';
    let page_count = Math.ceil(productAll.length / perPage);
    for (let i = 1; i <= page_count; i++) {
        let li = paginationChange(i, productAll, currentPage);
        document.querySelector('.page-nav-list').appendChild(li);
    }
}

function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="javascript:;">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.addEventListener('click', function () {
        currentPage = page;
        displayList(productAll, perPage, currentPage);
        let t = document.querySelectorAll('.page-nav-item.active');
        for (let i = 0; i < t.length; i++) {
            t[i].classList.remove('active');
        }
        node.classList.add('active');
        document.getElementById("home-service").scrollIntoView();
    })
    return node;
}