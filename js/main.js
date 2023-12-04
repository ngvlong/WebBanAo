function vnd(price) {
  try{
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  catch (e){
    return "";
  }
}
let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("slide-img");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); 
}
showSlides();

function formatDate(date) {
  let fm = new Date(date);
  let yyyy = fm.getFullYear();
  let mm = fm.getMonth() + 1;
  let dd = fm.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "/" + mm + "/" + yyyy;
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

function createId(arr) {
  let id = arr.length+1;
  let check = arr.find((item) => item.id == id);
  while (check != null) {
      id++;
      check = arr.find((item) => item.id == id);
  }
  return id;
}

function showForm() {
  document.getElementById('modal').style.display = 'block';
  showLoginForm()
}

function resetForm(form) {
  var inputFields = form.querySelectorAll('input');
  inputFields.forEach(function (input) {
      input.value = '';
  });
}

function showLoginForm() {
    resetForm(formSignup);
    document.getElementById('login').style.display = 'block';
    document.getElementById('signup').style.display = 'none';
}

function showSignupForm() {
    resetForm(formLogin);
    document.getElementById('signup').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}

function closeForm() {
    resetForm(formLogin);
    document.getElementById('modal').style.display = 'none';
}


function Message(message, status) {
  var messageElement = document.getElementById('message');
  messageElement.innerHTML = message;
  messageElement.className = status;

  messageElement.style.display = 'block';

  setTimeout(function () {messageElement.style.display = 'none';}, 1000);
}
//#endregion

var formLogin = document.getElementById('login');
var formSignup = document.getElementById('signup');
// Ẩn/hiện mật khẩu
function showPassword(formID) {
  var passwordFields = formID.querySelectorAll('input[type="password"]');
  var showIcon = formID.querySelector('#showIcon');
  var hideIcon = formID.querySelector('#hideIcon');


  showIcon.addEventListener('click', function() {
    passwordFields.forEach(passwordField => passwordField.type = 'password');
      showIcon.style.display = 'none';
      hideIcon.style.display = 'block';
  });

  hideIcon.addEventListener('click', function() {
      passwordFields.forEach(passwordField => passwordField.type = 'text');
      showIcon.style.display = 'block';
      hideIcon.style.display = 'none';
  });
}
showPassword(formLogin);
showPassword(formSignup);

// Định dạng đăng kí và đăng nhập
function Validator(options){

  var accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];

    function validate(inputElement, rule){
      var errorMess = rule.test(inputElement.value);
      var errorElement = inputElement.parentElement.querySelector('.message');

        if(errorMess){
          errorElement.innerText = errorMess;
          inputElement.parentElement.classList.add('invalid')
        }
        else{
          errorElement.innerText = '';
          inputElement.parentElement.classList.remove('invalid')
        }

        return !errorMess;
    }

    var elementForm = document.querySelector(options.form)
    if (elementForm) {
      elementForm.onsubmit = function (e) {
        e.preventDefault();
    
        var isFormValid = true;
        let newAccount = {};
    
        options.rules.forEach(function (rule) {
          var inputElement = elementForm.querySelector(rule.selector);
          var isValid = validate(inputElement, rule);
          let fullNameUser, phoneUser, emailUser,passwordUser;
    
          if (!isValid) {
            isFormValid = false;
          } else {
            var inputValue = inputElement.value.trim();
    
            switch (rule.selector) {
              case '#usernameSignUp':
                fullNameUser = inputValue;
                break;
              case '#passwordSignUp':
                passwordUser = inputValue;
                break;
              case '#emailSignUp':
                emailUser = inputValue;
                break;
              case '#phoneSignUp':
                phoneUser = inputValue;
                break;  
            }
            newAccount = {
              id:createId(accounts),
              fullname: fullNameUser,
              phone: phoneUser,
              password: passwordUser,
              address: '',
              email: emailUser,
              status: 1,
              join: new Date(),
              cart: [],
              userType: 0
             }
          }
        });
    
        if (isFormValid) {
          accounts.push(newAccount);
          localStorage.setItem('accounts', JSON.stringify(accounts));
          Message('Đăng kí thành công!', 'success')
        } else {
          console.log('Có lỗi khi đăng ký tài khoản!');
        }
      };
      options.rules.forEach(function (rule){

        var inputElement = elementForm.querySelector(rule.selector);
        var errorElement = inputElement.parentElement.querySelector('.message');

        if(inputElement){
          // Event người dùng blur ra ngoài input
          inputElement.onblur = function(){
              validate(inputElement, rule);
          }

          // Event người dùng nhập vào input
          inputElement.oninput = function(){
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
          }
        }else{
          console.log('có lỗi')
        }
      })
    }
}
Validator.isRequited = function(selector){
  return {
    selector: selector,
    test: function (value){
      return value.trim() ? undefined : 'Trường này không được bỏ trống';
    }
  }
}

Validator.isUsername = function(selector){
    return {
      selector: selector,
      test: function (value){
        return (value.length >= 6 && value.length <= 20) ? undefined : 'Tài khoản có ít nhất 6 - 20 kí tự';
      }
    }
}

Validator.isEmail = function(selector){
   return {
      selector: selector,
      test: function (value){
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? undefined : 'Trường này phải là Email'
      }
    }
}

Validator.checkLength = function(selector){
  return {
     selector: selector,
     test: function (value){
       return (value.length >= 8 && value.length <= 32) ? undefined : 'Mật khẩu có ít nhất 8 - 32 kí tự';
     }
   }
}

Validator.checkPass = function(selector, password){
return {
   selector: selector,
   test: function (value){
     return value === password() ? undefined : 'Mật khẩu không khớp'
   }
 }
}

// function createAdmin() {
// const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
// const admin = {
// email: "admin@gmail.com",
// password: "admin",
// };

// let accountCreated = false;

// if (!accounts.length) {
// accounts.push(admin);
// accountCreated = true;
// } else {
// const existingAdmin = accounts.find((account) => account.fullname === "admin");
// if (!existingAdmin) {
//  accounts.push(admin);
//  accountCreated = true;
//  }
// }

// localStorage.setItem("accounts", JSON.stringify(accounts));

// if (accountCreated) {
// console.log("Tạo/Thêm tài khoản admin thành công");
// }
// }
// const creatAdmin = document.querySelector("#btnAccount");
// creatAdmin.addEventListener("click", createAdmin);
document.querySelector('#login #btnlogin').addEventListener('click', checkLogin);

var storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

var emailUserNow ="";

function checkLogin() {
  var loginUsername = document.getElementById("emailLogin");
  var loginPassword = document.getElementById("passwordLogin");
  var enteredUsername = loginUsername.value;
  var enteredPassword = loginPassword.value;
  var matchingAccount = storedAccounts.find(account => account.email === enteredUsername);
  var isAdmin = enteredUsername === "ngvlong202@gmail.com";

  if(matchingAccount && matchingAccount.password === enteredPassword)
      if(isAdmin){
        window.location.href = "admin.html";
        emailUserNow = matchingAccount.email;
      }
      else if (matchingAccount && matchingAccount.password === enteredPassword) {
        sessionStorage.setItem('currentUser', JSON.stringify(enteredUsername));
        emailUserNow = matchingAccount.email;
        Message('Đăng nhập thành công', 'success');
        closeForm();
        replaceButtonWithAvatar(matchingAccount);
        showDropdown();
        let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
        showOrder(orders);
     } else {
      Message('Đăng nhập không thành công, hãy kiểm tra tài khoản hoặc mật khẩu!', 'error');
  }
}

function replaceButtonWithAvatar(account) {
  var loginButton = document.getElementById('btnAccount');

  var container = document.createElement('div');
  container.classList.add('avatar-container');

  var avatar = document.createElement('button');
  avatar.classList.add('avatar', 'dropbox');
  avatar.innerHTML =` <i class="fa-regular fa-user"></i>`+ account.fullname;
  avatar.setAttribute('id', 'custom-avatar');

  container.appendChild(avatar);
  loginButton.parentNode.replaceChild(container, loginButton);

  avatar.addEventListener('click', showDropdown);
}

function showDropdown() {
  var container = document.querySelector('.avatar-container');
  var existingDropdown = container.querySelector('.dropdown-account');
  if (!existingDropdown) {
      var dropdownMenu = document.createElement('div');
      dropdownMenu.classList.add('dropdown-account');
      dropdownMenu.innerHTML = `
          <ul>
              <li><a href="#" onclick="toggleAccountContainer()">Thông tin tài khoản</a></li>
              <li><a href="#" onclick="logout()">Đăng xuất</a></li>
          </ul>
      `;

      container.appendChild(dropdownMenu);
      document.addEventListener('click', closeDropdown);
  }
}

function closeDropdown(event) {
  var container = document.querySelector('.avatar-container');
  if (container && !container.contains(event.target)) {
      var dropdownContainer = container.querySelector('.dropdown-account');
      if (dropdownContainer) {
          dropdownContainer.remove();
          document.removeEventListener('click', closeDropdown);
      }
  }
}

function logout() {
var container = document.querySelector('.avatar-container');
var btnAccount = document.createElement('div');
btnAccount.classList.add('headerright-click')
btnAccount.setAttribute('id', 'btnAccount');
btnAccount.innerHTML = '<button onclick="showForm()"> Đăng nhập</button>';

container.replaceWith(btnAccount);
}

function toggleAccountContainer() {
const accountContainer = document.querySelector(".account-container");
accountContainer.style.display = accountContainer.style.display === "none" ? "flex" : "none";
}

const menuItems = document.querySelectorAll('.account-menu ul li a');
const contentSections = document.querySelectorAll('.account-content');
for (let contentSection of contentSections) {
contentSection.style.display = 'none';
}
const defaultContentId = '#account-info';
for (let menuItem of menuItems) {
menuItem.addEventListener('click', (event) => {
  event.preventDefault();
  const targetContentId = event.target.getAttribute('href').replace('#', '');
  for (let contentSection of contentSections) {
    if (contentSection.id !== targetContentId) {
      contentSection.style.display = 'none';
    }
  }
  document.getElementById(targetContentId).style.display = 'block';
  if (targetContentId === defaultContentId) {
    document.getElementById(defaultContentId).style.display = 'block';
  }
});
}

const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
const datalogin = storedUser || {};
function updateAccountInfo() {
const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
const currentUser = storedAccounts.find(account => account.email === datalogin);

const nameInput = document.querySelector('#account-info #name');
const emailInput = document.querySelector('#account-info #email');
const birthdayInput = document.querySelector('#account-info #birthday');
const phoneInput = document.querySelector('#account-info #phone');
const addressInput = document.querySelector('#account-info #address');

const name = nameInput.value;
const email = emailInput.value;
const birthday = birthdayInput.value;
const phone = phoneInput.value;
const address = addressInput.value;

if (currentUser) {
  currentUser.name = name;
  currentUser.email = email;
  currentUser.birthday = birthday;
  currentUser.phone = phone;
  currentUser.address = address;
} 

localStorage.setItem('accounts', JSON.stringify(storedAccounts));
Message('Cập nhật thông tin tài khoản thành công!', 'success');
}

const accountInfoLink = document.querySelector('a[href="#account-info"]');
accountInfoLink.addEventListener('click', getCurrentAccountInfo);
function getCurrentAccountInfo() {
const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
const currentUser = storedAccounts.find(account => account.email === datalogin);

const nameInput = document.querySelector('#account-info #name');
const emailInput = document.querySelector('#account-info #email');
const birthdayInput = document.querySelector('#account-info #birthday');
const phoneInput = document.querySelector('#account-info #phone');
const addressInput = document.querySelector('#account-info #address');

if (currentUser) {
  nameInput.value = currentUser.name;
  emailInput.value = currentUser.email;
  birthdayInput.value = currentUser.birthday;
  phoneInput.value = currentUser.phone;
  addressInput.value = currentUser.address;
}
}

const changePasswordForm = document.querySelector('#change-password');
const oldPasswordInput = changePasswordForm.querySelector('input[name="old_password"]');
const newPasswordInput = changePasswordForm.querySelector('input[name="new_password"]');
const confirmPasswordInput = changePasswordForm.querySelector('input[name="confirm_password"]');
const submitButton = changePasswordForm.querySelector('button[type="submit"]');

submitButton.addEventListener('click', (event) => {
event.preventDefault();
changePassword(oldPasswordInput, newPasswordInput, confirmPasswordInput);
});
function changePassword(oldPasswordInput, newPasswordInput, confirmPasswordInput) {
const errorMessages = [];
var isValid = true;
const currentUser = storedAccounts.find(account => account.fullname === datalogin);

for (const input of [oldPasswordInput, newPasswordInput, confirmPasswordInput]) {
  const inputElement = input;

  if (!inputElement.validity.valid) {
    errorMessages.push(inputElement.validationMessage);
    inputElement.classList.add('invalid');
    isValid = false;
  }

  switch (inputElement) {
    case oldPasswordInput:
      const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
      if (oldPasswordInput.value !== currentUser.password) {
        errorMessages.push("Mật khẩu cũ không chính xác");
        inputElement.classList.add('invalid');
        isValid = false;
      }
      break;
    case newPasswordInput:
      if (newPasswordInput.value !== confirmPasswordInput.value) {
        errorMessages.push("Xác nhận mật khẩu không khớp");
        confirmPasswordInput.classList.add('invalid');
        isValid = false;
      }
      break;
    default:
      break;
  }
}

if (isValid) {
  currentUser.password = newPasswordInput.value;
  localStorage.setItem('accounts', JSON.stringify(storedAccounts));

  Message('Đổi mật khẩu thành công.', 'success');

  submitButton.disabled = true;
}else{
  Message('Đổi mật khẩu không thành công.', 'error');
}
}


function showOrder(arr) {
  let orderHtml = "";
  console.log(emailUserNow);
  console.log(arr);
  var hisOrder = "";
  if(emailUserNow != ""){
    hisOrder = arr.filter((item) =>{return item.khachhang === emailUserNow});
  }
  console.log(hisOrder);
  if(hisOrder.length == 0 || emailUserNow == "") {
      orderHtml = `<td colspan="6">Không có dữ liệu</td>`
  } else {
    hisOrder.forEach((item) => {
          let status = item.trangthai == 0 ? `<span class="status-no-complete">Chưa xử lý</span>` : `<span class="status-complete">Đã xử lý</span>`;
          let date = formatDate(item.thoigiandat);
          orderHtml += `
          <tr>
          <td>${item.id}</td>
          <td>${item.tennguoinhan}</td>
          <td>${date}</td>
          <td>${vnd(item.tongtien)}</td>                               
          <td>${status}</td>
          <td class="control">
          <button class="btn-detail" id="" onclick="detailOrder('${item.id}')"><i class="fa-regular fa-circle-info"></i></button>
          </td>
          </tr>      
          `;
 
      });
  }
  document.getElementById("showOrder").innerHTML = orderHtml;
}



  function showdetail(){
    document.getElementById("div_detail").style.display="grid";
  }

  function closedetail(){
    document.getElementById("div_detail").style.display="none";
let detaildiv = document.getElementsByClassName("detail")[0];
    detaildiv.innerHTML = "";
  }

  function choose_size(){
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
  document.querySelector(".filter-btn").addEventListener("click",(e) => {
    e.preventDefault();
    document.querySelector(".advanced-search").classList.toggle("open");
    document.getElementById("home-title").scrollIntoView();
})

document.querySelector(".form-search-input").addEventListener("click",(e) => {
    e.preventDefault();
    document.getElementById("home-title").scrollIntoView();
})

function closeSearchAdvanced() {
    document.querySelector(".advanced-search").classList.toggle("open");
}

let minPriceTemp = 0;
let maxPriceTemp = 1000000;
function sliderPrice() {
    var minPrice = 0;
    var maxPrice = 1000000;
    
    $("#max-price").val(vnd(maxPrice));
    $("#min-price").val(vnd(minPrice));

    
    $("#price-range").slider({
      range: true,
      min: 0,
      max: 1000000,
      values: [minPrice, maxPrice],
      slide: function(event, ui) {
        $("#min-price").val(vnd(ui.values[0]));
        $("#max-price").val(vnd(ui.values[1]));
        minPriceTemp = ui.values[0];
        maxPriceTemp = ui.values[1];

      }
    });
    
    // $("#min-price").val($("#price-range").slider("values", 0));
    // $("#max-price").val($("#price-range").slider("values", 1));
}
sliderPrice();

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
                    <img class="card-image-hover" src="${product.imghv}" alt="${product.title}">
                    </a>
                </div>
                <div class="food-info">
                    <div class="card-content">
                        <div class="card-title">
                            <a href="#" class="card-title-link" onclick="detailProduct(${product.id})">${product.title.toUpperCase()}</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="product-price">
                            <span class="old-price">${vnd(product.price)}</span>
                            <span class="current-price">${vnd(product.newprice)}</span>
                        </div>
                    <div class="product-buy">
                        <button onclick="detailProduct(${product.id})" class="card-button order-item"><i class="fa-regular fa-cart-shopping-fast"></i>Xem sản phẩm</button>
                    </div> 
                </div>
                </div>
            </article>
        </div>`;
        });
    }
    document.getElementById('home-products').innerHTML = productHtml;
    const currentPrice = document.querySelectorAll(".current-price");
    const oldPrice = document.querySelectorAll(".old-price");
    for (let i = 0; i < oldPrice.length; i++) {
    if(currentPrice[i].textContent != ""){
    oldPrice[i].classList.add("active");

      }
    }
}
let perPage = 12;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];
var productAll = JSON.parse(localStorage.getItem('products')).filter(item => item.status == 1);
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
        document.getElementById("home-title").scrollIntoView();
    })
    return node;
}
function showCategory(category) {
  // document.getElementById('trangchu').classList.remove('hide');
  // document.getElementById('account-user').classList.remove('open');
  // document.getElementById('order-history').classList.remove('open');
  let productSearch = productAll.filter(value => {
      return value.category.toString().toUpperCase().includes(category.toUpperCase());
  })
  let currentPageSeach = 1;
  displayList(productSearch, perPage, currentPageSeach);
  setupPagination(productSearch, perPage, currentPageSeach);
  document.getElementById("home-title").scrollIntoView();
}

let productsave =JSON.parse(localStorage.getItem("products"));

function findProductByID(productid){
  for (let i = 0; i < productsave.length; i++){
    if (productid != productsave[i].id) continue;

    return productsave[i];
  }

  return null;
}

function detailProduct(id){
  let divdetail = document.getElementById('div_detail');
  divdetail.style.display='grid';

  let product = findProductByID(id);
  

  let detailcontainer = document.getElementsByClassName('detail')[0];
 

  detailcontainer.innerHTML += (`
    <button class="close_detail" onclick="closedetail()">+</button>
      <div class="title-container">
        <h1 class="title">${product.title}</h1>
      </div>
      <div class="detail-container">
        <div class="img-container">
          <img src="${product.img}" alt="" id="img_main">
          <div class="swap-img-container">
              <img class="idtruoc" src="${product.img}" onclick="swap_img(this)"/>
              <img class="idsau" src="${product.imghv}"  onclick="swap_img(this)"/>
          </div>
        </div>
        <div class="detail-content">
          <div class="div_type">
            <span class="type">Phân loại:</span>
            <span class="nametype">${product.category}</span>
          </div>
          <div class="div_price">
            <h1 class="price">${vnd(product.price)}</h1>
          </div>
          <div id="div_size"> 
              <span class="size active">S</span>
              <span class="size">M</span>
              <span class="size">L</span>
              <span class="size">XL</span>
          </div>
          <div id="table-size"> 
          <span class="btn-img-size" onclick="showTbSize()">Tham khảo bảng size</span>
          </div>
          <div id="div_quantity">
          <span class="lb-quantity">Số lượng:</span>
            <button class="quantity" id="quantity-down" onclick="handleMinus()">-</button>
            <input id="amount" name="amount" type="text" value="1"/>
            <button class="quantity " id="quantity-up" onclick="handlePlus()">+</button>
          </div> 
           
          <div class="div_describe"> 
          <span class="lb-describe">Mô tả sản phẩm:</span>`
           + writeDescribe(product.desc) + 
           `</div>
           <div class="box-ctl"> 
                <button class="div_cart" >THÊM VÀO GIỎ HÀNG</button>
                <button class="div_buy" >MUA NGAY</button>
           </div>
          </div>
      </div>
  `)
  choose_size();
}

function swap_img(reviewimg){
  swap_img_noneb();
  reviewimg.style.border="solid 2px black";
  let a = reviewimg.getAttribute('src');
  document.getElementById("img_main").setAttribute('src',a);
}

function swap_img_noneb(){
  document.getElementsByClassName('idtruoc')[0].style.border="none";
  document.getElementsByClassName('idsau')[0].style.border="none";
}

function writeDescribe(describe){
  let desarray = getDescription(describe);
  let destext = "";

  for (let i = 0; i < desarray.length; i++){
    destext += `<span>${desarray[i]}</span>`;
  }

  return destext;
}

function getDescription(describe){
  let describearray = describe.split('\n ');

  return describearray;
}
function showTbSize(){
     let tbSize = document.getElementById("show-imgSize");

     tbSize.style.display="flex";
}
document.addEventListener("DOMContentLoaded", function () {
  var showImageBtn = document.getElementById("showImageBtn");
  var imageModal = document.getElementById("imgModal");
  var tbSize = document.getElementById("show-imgSize");



  // Đóng modal khi click ra ngoài modal
  window.addEventListener("click", function (event) {
    if (imageModal && (event.target == imageModal || !imageModal.contains(event.target))) {
      closeImageModal();
    }
  });

  // Hàm đóng modal
  function closeImageModal() {
    tbSize.style.display= "none";
    document.body.style.overflow = "auto";
  }
});

let productfilter = productsave;
let filterName = [];

function checkFilter(filterchoice){
  let flag = false;
    for (let i = 0; i < filterName.length; i++){
      if (filterchoice != filterName[i]) continue;

      filterName.splice(i, 1);
      flag = true;
    }

    if (flag) productfilter = productsave;
}

function filtProduct(){
  for (let i = 0; i < filterName.length; i++){
    switch (filterName[i]){
      case "price":
        filterProductPrice();
        break;
    
      case "cagetory":
        searchProducts();
        break;

      case "asc":
        ascProducts();
        break;

        case "desc":
          descProducts();
          break;  
      }
  }
}

function Filter(filterchoice){
    checkFilter(filterchoice);
    filterName.push(filterchoice);
    filtProduct();
}

function filterProductPrice(){

    let tempProduct = [];
    let minprice = toPrice(document.getElementById("min-price").value);
    let maxprice = toPrice(document.getElementById("max-price").value);
    for (let i=0; i< productfilter.length;i++){
        if(productfilter[i].price >= minprice && productfilter[i].price <= maxprice){
            tempProduct.push(productfilter[i]);
        }
    } productfilter = tempProduct;
    renderProducts(productfilter); 
}

function toPrice(text){
  let price = "";
  for (let i = 0; i < text.length; i++){
    let a = text[i];
    if (!parseFloat(a) && a != '0') continue;
    price += text[i];
  }
  return parseFloat(price);
}

function searchProducts(){

    let tempProduct = [];
    let optionvalue = document.getElementById("advanced-search-category-select").value;
    if (optionvalue=="Tất cả") {
      renderProducts(productfilter);
      return ;
    }
    for (let i=0 ; i<productfilter.length; i++){
      if(optionvalue == productfilter[i].category){
        tempProduct.push(productfilter[i]);
      }
      
    } 
    productfilter = tempProduct;
    renderProducts(productfilter);

}

function ascProducts(){
  productfilter.sort((a,b) => a.price - b.price);
  renderProducts(productfilter);
}

function descProducts(){
  productfilter.sort((a,b) => b.price - a.price);
  renderProducts(productfilter);
}

function resetProducts(){
  filterName =[];
  productfilter = productsave;
  renderProducts(productsave);
  document.getElementById("advanced-search-category-select").value="Tất cả";
}

