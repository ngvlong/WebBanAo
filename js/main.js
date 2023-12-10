const body = document.querySelector("body");


function vnd(price) {
  if(price != "" && price != "0")
   return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return "";
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



// Dang nhap & Dang ky

// Chức năng đăng ký
let emailUserNow="";
let signupButton = document.getElementById('btnsignup');
let loginButton = document.getElementById('btnlogin');
signupButton.addEventListener('click', () => {
    event.preventDefault();
    let fullNameUser = document.getElementById('usernameSignUp').value;
    let phoneUser = document.getElementById('phoneSignUp').value;
    let emailUser = document.getElementById('emailSignUp').value;
    let passwordUser = document.getElementById('passwordSignUp').value;
    let passwordConfirmation = document.getElementById('confirm-password').value;

    let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];

    let checkExistPhone = accounts.some(account => {
        return account.phone == phoneUser;
    })
    let checkExistEmail = accounts.some(account => {
        return account.email == emailUser;
    })
    // Check validate
    if (fullNameUser.length == 0) {
        document.querySelector('.message.fullnameSign').innerHTML = 'Vui lòng nhập họ vâ tên';
        document.getElementById('fullname').focus();
    } else if (fullNameUser.length < 3) {
        document.getElementById('fullname').value = '';
        document.querySelector('.message.fullnameSign').innerHTML = 'Vui lòng nhập họ và tên lớn hơn 3 kí tự';
    } else {
        document.querySelector('.message.fullnameSign').innerHTML = '';
    }


    if(emailUser.length == 0){
      document.querySelector('.message.emailSign').innerHTML = 'Vui lòng nhập vào email';
    }else if(!isValidEmail(emailUser)){
      document.querySelector('.message.emailSign').innerHTML = 'Vui lòng nhập vào đúng định dạng email';
    }else if(checkExistEmail){
      document.querySelector('.message.emailSign').innerHTML = 'Email đã được sử dụng';
    }else{
      document.querySelector('.message.emailSign').innerHTML = '';

    }


    if (phoneUser.length == 0) {
        document.querySelector('.message.phoneSign').innerHTML = 'Vui lòng nhập vào số điện thoại';
    } else if (!isValidPhoneNumber(phoneUser)) {
      document.querySelector('.message.phoneSign').innerHTML = 'Vui lòng nhập đúng định dạng email';
    } else if (checkExistPhone) {
        document.querySelector('.message.phoneSign').innerHTML = 'Số điện thoại đã được sử dụng';
        document.getElementById('phoneSignUp').value = '';
    } else {
        document.querySelector('.message.phoneSign').textContent = '';
    }


    if (passwordUser.length == 0) {
        document.querySelector('.message.passwordSign').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passwordUser.length < 6) {
        document.querySelector('.message.passwordSign').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('passwordSignUp').value = '';
    } else {
        document.querySelector('.message.passwordSign').innerHTML = '';
    }


    if (passwordConfirmation.length == 0) {
        document.querySelector('.message.passwordConfir').innerHTML = 'Vui lòng nhập lại mật khẩu';
    } else if (passwordConfirmation !== passwordUser) {
        document.querySelector('.message.passwordConfir').innerHTML = 'Mật khẩu không khớp';
        document.getElementById('confirm-password').value = '';
    } else {
        document.querySelector('.message.passwordConfir').innerHTML = '';
    }

    if (fullNameUser && phoneUser && passwordUser && passwordConfirmation && emailUser) {
        if (passwordConfirmation == passwordUser) {
            let user = {
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
                accounts.push(user);
                localStorage.setItem('accounts', JSON.stringify(accounts));
                localStorage.setItem('currentUser', JSON.stringify(user));
                emailUserNow = emailUser;
                advertise({ title: 'Thành công', message: 'Tạo thành công tài khoản !', type: 'success', duration: 3000 });
                kiemtradangnhap();
                updateAmount();
                closeForm();

        } else {
            advertise({ title: 'Thất bại', message: 'Tạo tài khoản không thành công', type: 'error', duration: 3000 });
        }
    }
}
)

// Dang nhap
loginButton.addEventListener('click', () => {
    event.preventDefault();
    let emailLog = document.getElementById('emailLogin').value;
    let passlog = document.getElementById('passwordLogin').value;
    let accounts = JSON.parse(localStorage.getItem('accounts'));

    if (emailLog.length == 0) {
        document.querySelector('.message.emaillog').innerHTML = 'Vui lòng nhập vào Email';
    } else if (!isValidEmail(emailLog)) {
        document.querySelector('.message.emaillog').innerHTML = 'Vui lòng nhập đúng định đạng email';
        document.getElementById('passwordLogin').value = '';
    } else {
        document.querySelector('.message.emaillog').innerHTML = '';
    }

    if (passlog.length == 0) {
        document.querySelector('.message.passwordlog').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passlog.length < 6) {
        document.querySelector('.message.passwordlog').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('passwordlogin').value = '';
    } else {
        document.querySelector('.message.passwordlog').innerHTML = '';
    }

    if (emailLog && passlog) {
        let vitri = accounts.findIndex(item => item.email == emailLog);
        if (vitri == -1) {
            advertise({ title: 'Error', message: 'Tài khoản của bạn không tồn tại', type: 'error', duration: 3000 });
        } else if (accounts[vitri].password == passlog) {
            if(accounts[vitri].status == 0) {
                advertise({ title: 'Warning', message: 'Tài khoản của bạn đã bị ngưng hoạt động', type: 'warning', duration: 3000 });
            } else {
                localStorage.setItem('currentUser', JSON.stringify(accounts[vitri]));
                advertise({ title: 'Success', message: 'Đăng nhập thành công', type: 'success', duration: 3000 });
                kiemtradangnhap();
                checkAdmin();
                updateAmount();
                emailUserNow = emailLog;
                showOrder();
                closeForm();
            }
        } else {
            advertise({ title: 'Warning', message: 'Sai mật khẩu', type: 'warning', duration: 3000 });
        }
    }
})
function isValidEmail(email) {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
}
function isValidPhoneNumber(phoneNumber) {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
  const phoneRegex = /^[0-9]{10,}$/;

  // Kiểm tra xem số điện thoại có khớp với biểu thức chính quy không
  return phoneRegex.test(phoneNumber);
}


function kiemtradangnhap() {
  let currentUser =  JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser != null) {
      emailUserNow = currentUser.email;
      showOrder();
      document.querySelector("#AccountLogin").innerHTML = ` <button onclick="openAccMenu()" class="text-tk"><i class="fa-regular fa-user"></i>${currentUser.fullname}</button>`;
      document.querySelector('.header-middle-right').innerHTML = `<li><a href="javascript:;" onclick="myAccount()"><i class="fa-light fa-circle-user"></i> Tài khoản của tôi</a></li>
          <li class="border"><a id="logout" href="javascript:;"><i class="fa-light fa-right-from-bracket"></i>Đăng xuất</a></li>`;
      document.querySelector('#logout').addEventListener('click',logOut);
  }
}
function openAccMenu(){
  document.querySelector(".header-middle-right-menu").classList.toggle("open");
}

function myAccount(){
  document.querySelector(".account-container").classList.add("active");
  document.querySelector(".header-middle-right-menu").classList.toggle("open");
}


function logOut() {
  let accounts = JSON.parse(localStorage.getItem('accounts'));
  let user = JSON.parse(localStorage.getItem('currentUser'));
  let vitri = accounts.findIndex(item => item.email == user.email);
  accounts[vitri].cart.length = 0;
  for (let i = 0; i < user.cart.length; i++) {
      accounts[vitri].cart[i] = user.cart[i];
  }
  localStorage.setItem('accounts', JSON.stringify(accounts));
  localStorage.removeItem('currentUser');
  window.location = "/";
}
function checkAdmin() {
  let user = JSON.parse(localStorage.getItem('currentUser'));
  if(user && user.userType == 1) {
      let node = document.createElement(`li`);
      node.innerHTML = `<a href="./admin.html"><i class="fa-light fa-gear"></i> Quản lý cửa hàng</a>`
      document.querySelector('.header-middle-right').prepend(node);
  } 
}

window.onload = kiemtradangnhap();
window.onload = checkAdmin();

const sidebars = document.querySelectorAll(".sidebar-list-item");
const sections = document.querySelectorAll(".account-content");

for(let i = 0; i < sidebars.length; i++) {
    sidebars[i].onclick = function () {
        document.querySelector(".sidebar-list-item.active").classList.remove("active");
        document.querySelector(".account-content.active").classList.remove("active");
        sidebars[i].classList.add("active");
        sections[i].classList.add("active");
    };
}



function showOrder() {
  let orderHtml = "";
  let order = JSON.parse(localStorage.getItem('order'));
  let hisOrder = "";
  if(emailUserNow != ""){
    hisOrder = order.filter((item) =>{return item.khachhang === emailUserNow});
  }

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
              <span class="btn-detail detailicon" id="" onclick="detailOrder('${item.id}')"><i class="fa-light fa-circle-info"></i></span>
          </td>
          </tr> `;
      });
  }
  document.querySelector("#showOrder").innerHTML = orderHtml;

}

function showdetail(){
    document.getElementById("div_detail").style.display="grid";
}

function detailOrder(id) {
  document.querySelector(".detail-order").classList.add("open");
  let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
  let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
  // Lấy hóa đơn 
  let order = orders.find((item) => item.id == id);
  // Lấy chi tiết hóa đơn
  let ctDon = getOrderDetails(id);
 
  let spHtml = `<div class="modal-detail-left"><div class="order-item-group">`;

  let textDetailBtn = order.trangthai == 0 ? "Chưa xử lý" : "Đã xử lý";
  ctDon.forEach((item) => {
      let detaiSP = products.find(product => product.id == item.id);

      spHtml += `<div class="order-product">
          <div class="order-product-left">
              <img src="${detaiSP.img}" alt="">
              <div class="order-product-info">
                  <h4>${detaiSP.title}</h4>
                  <p class="order-product-category">${item.category}</p>
                  <p class="order-product-size">Size: ${item.size}<p>
                  <p class="order-product-quantity">SL: ${item.quantity}<p>
              </div>
          </div>
          <div class="order-product-right">
              <div class="order-product-price">
                  <span class="order-product-current-price">${vnd(item.price)}</span>
              </div> 

              
          </div>
      </div>`;
  });
  
  spHtml += `</div>             
               <div class="modal-detail-bottom-left">
               <div class="price-ship">
                      <span class="">Phí ship:</span>
                      <span class="">${vnd(300000)}</span>
                 </div>
                <div class="price-total">
                      <span class="thanhtien">Thành tiền:</span>
                      <span class="price">${vnd(order.tongtien)}</span>
                   </div>
                </div>
              </div>`;
  spHtml += `<div class="modal-detail-right">
      <h4 class="detail-order-info-cust">Thông tin khách hàng</h4>
      <ul class="detail-order-group">
          <li class="detail-order-item">
              <span class="detail-order-item-left"><i class="fa-thin fa-person"></i> Người nhận</span>
             <span class="detail-order-item-right">${order.tennguoinhan}</span>
          </li>

          <li class="detail-order-item">
              <span class="detail-order-item-left"><i class="fa-light fa-phone"></i> Số điện thoại</span>
              <span class="detail-order-item-right">${order.sdtnhan}</span>
          </li>
          <li class="detail-order-item">
              <span class="detail-order-item-left"><i class="fa-light fa-calendar-days"></i> Ngày đặt hàng</span>
              <span class="detail-order-item-right">${formatDate(order.thoigiandat)}</span>
          </li>
          <li class="detail-order-item">
              <span class="detail-order-item-left"><i class="fa-light fa-truck"></i> Hình thức giao</span>
              <span class="detail-order-item-right">${order.hinhthucgiao}</span>
          </li>


          <li class="detail-order-item tb">
              <span class="detail-order-item-t"><i class="fa-light fa-location-dot"></i> Địa chỉ nhận</span>
              <p class="detail-order-item-b">${order.diachinhan}</p>
          </li>
          <li class="detail-order-item tb">
              <span class="detail-order-item-t"><i class="fa-light fa-note-sticky"></i> Ghi chú</span>
              <p class="detail-order-item-b">${order.ghichu}</p>
          </li>
          <li class="detail-order-item">
              <span class="detail-order-item-left"><i class="fa-light fa-truck"></i>Trạng thái đơn hàng</span>
              <span class="detail-order-item-right">${textDetailBtn}</span>
          </li>
      </ul>
  </div>`;
  document.querySelector(".modal-detail-order").innerHTML = spHtml;


}

function getOrderDetails(madon) {
  let orderDetails = localStorage.getItem("orderDetails") ?
      JSON.parse(localStorage.getItem("orderDetails")) : [];
  let ctDon = [];
  orderDetails.forEach((item) => {
      if (item.madon == madon) {
          ctDon.push(item);
         
      }
  });
  return ctDon;
  
}

function closedetail(){
    document.getElementById("div_detail").style.display="none";
}

function  toggleAccountContainer(){
  document.querySelector(".account-container").classList.remove("active");
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
                <div class="prod-info">
                    <div class="card-content">
                        <div class="card-title">
                            <a href="#" class="card-title-link" onclick="detailProduct(${product.id})">${product.title.toUpperCase()}</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="product-price">
                        <span class="current-price">${vnd(product.newprice)}</span>
                            <span class="old-price">${vnd(product.price)}</span>

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
let indexPrdDetail="";
let sizePrd="";
function detailProduct(id){
  indexPrdDetail = id;
  sizePrd = "S";
  let divdetail = document.getElementById('div_detail');
  divdetail.style.display='grid';

  let product = findProductByID(id);


    document.querySelector("#titleprod").textContent = product.title;
    document.querySelector("#img_main").src = product.img;
    document.getElementById("idtruoc").src = product.img;
    document.getElementById("idsau").src = product.imghv;
    document.getElementById("newprice").textContent = `${vnd(product.newprice)}`;
    document.getElementById("price").textContent =  `${vnd(product.price)}`;
    document.getElementById("detailDesc").textContent = product.desc;
    document.getElementById("nametype").textContent = product.category;
  

    const curPrice = document.getElementById("newprice");
    const olPrice = document.querySelector(".price");
    if(product.newprice != ""){
       olPrice.classList.add("active");
    }else{
      olPrice.classList.remove("active");
    }

      //Cap nhat gia tien khi tang so luong san pham
      // Them san pham vao gio hang
  let productbtn = document.getElementById("btnAddCart");
  productbtn.onclick = function(e) {
    e.stopPropagation();
      if (localStorage.getItem('currentUser')) {
          addCart(product.id);
      } else {
        console.log(productbtn);
          advertise({ title: 'Warning', message: 'Vui lòng đăng nhập để mua hàng !', type: 'warning', duration: 3000 });
      }

  }
}

const btnsize = document.querySelectorAll(".list-btn-size.row-size");
const vlbtnsize = document.querySelectorAll(".btn-size");
const listiconout = document.querySelectorAll(".icon-out");
let btnsimp;
let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

for(let i = 0; i < btnsize.length; i++) {
  let prod = products.find((item) => {return item.id == indexPrdDetail});
    btnsize[i].onclick = function () {
        // let selectbtn = document.q uerySelector(".list-btn-size.active .btn-size").textContent;
        let szS = prod.szS;
        let szM = prod.szM;
        let szL = prod.szL;
        let szXL = prod.szXL;


        if(parseInt(szS) === 0){
            document.getElementById('iconszS').style.display="flex";
        }
        else if(parseInt(szS) != 0){
            document.getElementById('iconszS').style.display="none";
        }

        if(parseInt(szM) === 0){
            document.getElementById('iconszM').style.display="flex";
        }
        else if(parseInt(szM) != 0){
            document.getElementById('iconszM').style.display="none";
        }

        if(parseInt(szL) === 0){
            document.getElementById('iconszL').style.display="flex";
        }
        else if(parseInt(szL) != 0){
            document.getElementById('iconszL').style.display="none";
        }

        if(parseInt(szXL) === 0){
            document.getElementById('iconszXL').style.display="flex";
        }
        else if(parseInt(szXL) != 0){
            document.getElementById('iconszXL').style.display="none";
        }
        document.querySelector(".list-btn-size.active").classList.remove("active");
        btnsize[i].classList.add("active");
        sizePrd = vlbtnsize[i].textContent;
        console.log(vlbtnsize[i].textContent);

    };
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
let btnImgSize = document.querySelector("#img-size-close");
btnImgSize.onclick= function(){
      document.getElementById("show-imgSize").style.display='none';
      document.getElementById("div_detail").style.display="grid";
}
// Them SP vao gio hang
function addCart(index) {
  let currentuser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [];
  console.log(document.querySelector('#amount').value);
  let soluong = document.querySelector('.input-qty').value;

  let size= sizePrd;
  let productcart = {
      id: index,
      size: size,
      quantity: parseInt(soluong),

  }
  let vitri = currentuser.cart.findIndex(item => item.id == productcart.id && item.size == size);
  if (vitri == -1) {
      currentuser.cart.push(productcart);
  } else {
      currentuser.cart[vitri].quantity = parseInt(currentuser.cart[vitri].quantity) + parseInt(productcart.quantity);
  }
  localStorage.setItem('currentUser', JSON.stringify(currentuser));
  updateAmount();
  advertise({ title: 'Success', message: 'Thêm thành công sản phẩm vào giỏ hàng', type: 'success', duration: 3000 });
  closedetail();
  
}

//Show gio hang
function showCart() {
  let indexPrd="";
  let currentuser = JSON.parse(localStorage.getItem('currentUser'));
  if(currentuser !=  null){
      if (currentuser.cart.length != 0) {
          document.querySelector('.gio-hang-trong').style.display = 'none';
          document.querySelector('button.thanh-toan').classList.remove('disabled');
          let productcarthtml = '';
          currentuser.cart.forEach(item => {
              let product = getProduct(item);
              productcarthtml +=`<tr>
                  <td><div class="cart-img-title"><img class="cart-img-tbl" src="${product.img}" alt=""><p>${product.title}</p></div></td>
                  <td>${product.category}</td>
                  <td>${item.size}</td>
                  <td>
                     <span class="cart-item-price price" data-price="${product.price}">
                      ${vnd(parseInt(product.price))}
                      </span>
                  </td>
                  <td>
                       <button class="minus is-form" type="button"  onclick="decreasingNumber(this,${item.id})">-</button>
                       <input class="input-qty" max="100" min="1" name="" type="" value="${item.quantity}">
                       <button class="plus is-form" type="button" onclick="increasingNumber(this,${item.id})">+</button>
                  </td>
                  <td class ="tongtt"></td>                               
                  <td><button class="cart-item-delete" onclick="deleteCartItem(${product.id},this)"><i class="fa-solid fa-trash"></i></button></td>
                  </tr>`
         
         });
          document.getElementById("showProdCart").innerHTML = productcarthtml;
          document.getElementById("transport-fee").innerHTML = `Giao hàng tiết kiệm: <Strong>${vnd(20000)}</Strong>`;
          document.getElementById("speed-ship").innerHTML = `Giao hàng hỏa tốc nội thành: <Strong>${vnd(30000)}</Strong>`
          updateCartTotal();
          updateCart();
          saveAmountCart();
          createProvinceList();
      } else {
          document.querySelector('.gio-hang-trong').style.display = 'flex';
          document.querySelector("#cart-list").innerHTML ="" ;
      }
    }else{
      document.querySelector('.gio-hang-trong').style.display = 'flex';
      document.querySelector("#cart-list").innerHTML ="" ;
    }
  let modalCart = document.querySelector('.modal-cart');
  let containerCart = document.querySelector('.cart-container');
  let themsp = document.querySelector('.them-sp');
  modalCart.onclick = function () {
      closeCart();
  }
  themsp.onclick = function () {
      closeCart();
  }
  containerCart.addEventListener('click', (e) => {
      e.stopPropagation();
  })
}
let temp_price_ship = 30000;
const radioForm = document.getElementById('radioForm');
const radioInputs = radioForm.elements.shippingOption; // Lấy tất cả các input radio có name là 'options'

radioForm.addEventListener('change', function(event) {
  for (const radioInput of radioInputs) {
    if (radioInput.checked) {
      temp_price_ship = radioInput.value;
      updateCartTotal();
    }
  }
});

// Delete cart item
function deleteCartItem(id, el) {
  let cartParent = el.parentNode.parentNode;
  cartParent.remove();
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let vitri = currentUser.cart.findIndex(item => item.id = id)
  currentUser.cart.splice(vitri, 1);

  // Nếu trống thì hiển thị giỏ hàng trống
  if (currentUser.cart.length == 0) {
      document.querySelector('.gio-hang-trong').style.display = 'flex';
      document.querySelector("#cart-list").innerHTML ="" ;
      document.querySelector('button.thanh-toan').classList.add('disabled');
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateCartTotal();
}

//Update cart total
function updateCartTotal() {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(currentUser != null)
  if(currentUser.cart != null){
    document.querySelector('.text-price').innerText = vnd(getCartTotal());
    document.querySelector('#total-bill').innerText = vnd(getCartTotal()+ parseInt(temp_price_ship));
}
}

function updateCart(){
  let total = document.querySelectorAll('.tongtt');
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(currentUser  != null){
  if(currentUser.cart != null){
  if(currentUser.cart.length != 0){
  for(let  i = 0; i < currentUser.cart.length ; i++){
       total[i].innerHTML = `${vnd(getCartProd(currentUser.cart[i].id))}`;
  }
}
}
}
}
// Lay tong tien don hang
function getCartTotal() {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let tongtien = 0;
  if (currentUser != null) {
      currentUser.cart.forEach(item => {
          let product = getProduct(item);
          tongtien += (parseInt(product.quantity) * parseInt(product.price));
      });
  }
  return tongtien;
}
function getCartProd(id){
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let curUser = currentUser.cart.find((item) => {return item.id == id})
  let tongtien = 0;
  if (currentUser != null) {
          let product = getProduct(curUser);
          tongtien = (parseInt(product.quantity) * parseInt(product.price));
  }
  return tongtien;
}
// kết hợp localStorage và item
function getProduct(item) {
  let products = JSON.parse(localStorage.getItem('products'));
  let infoProductCart = products.find(sp => item.id == sp.id)
  let product = {
      ...infoProductCart,
      ...item
  }

  return product;
}

window.onload = updateAmount();
window.onload = updateCartTotal();




// Lay so luong hang

function getAmountCart() {
  let currentuser = JSON.parse(localStorage.getItem('currentUser'))
  let amount = 0;
  currentuser.cart.forEach(element => {
      amount += parseInt(element.quantity);
  });
  return amount;
}

//Update Amount Cart 
function updateAmount() {
  if (localStorage.getItem('currentUser') != null) {
      let amount = getAmountCart();
      // document.querySelector('.count-product-cart').innerText= amount; //chưa sửa
  }
}

// Save Cart Info
function saveAmountCart() {
  let cartAmountbtn = document.querySelectorAll(".cart-item-control .is-form");
  let listProduct = document.querySelectorAll('.cart-item');
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  cartAmountbtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          let id = listProduct[parseInt(index / 2)].getAttribute("data-id");
          let productId = currentUser.cart.find(item => {
              return item.id == id;
          });
          productId.quantity = parseInt(listProduct[parseInt(index / 2)].querySelector(".input-qty").value);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          updateCartTotal();
          updateCart();
        
      })
  });
}

// Open & Close Cart
function openCart() {
  showCart();
  document.querySelector('.modal-cart').classList.add('open');
  body.style.overflow = "hidden";
}

function closeCart() {
  document.querySelector('.modal-cart').classList.remove('open');
  document.querySelector("#cart-list").innerHTML =`<div class ="cart-left">
  <table>
      <thead>
        <tr>
          <td>Sản phẩm</td>
          <td>Phân loại</td>
          <td>Size</td>
          <td>Giá</td>
          <td>Số lượng</td>
          <td>Tạm tính</td>
          <td>Tùy chọn</td>
         </tr>
      </thead>
      <tbody id="showProdCart">
      </tbody>
  </table>
</div>
<div class="cart-right">
<div class="cart-total-price">
   <p class="text-tt">Tạm tính:</p>
   <p class="text-price">0đ</p>
</div>
<div class="cart-ship">
  <p>Giao hàng</p>
  <div>
      <form class="list-ship" id="radioForm">
          <div>
              <input type="radio" name="shippingOption" class="shippingOption" value="transport-fee" >
              <label for="" id="transport-fee">Giao hàng tiết kiệm <strong>${vnd(20000)}</strong></label>
          </div>
          <div>
              <input type="radio" name="shippingOption" class="shippingOption" value="speed-ship" checked>
              <label for="" id="speed-ship">Giao hàng hỏa tốc nội thành: <strong>${vnd(30000)}</strong></label>
          </div>
      </form>
      <p id="ship-to-province">Vận chuyển đến <strong>Hồ Chí Minh</strong></p>
      
      <form action="" id="shippingForm">
          <span class="change-address" onclick="showSectionProv()">Đổi địa chỉ</span>
          <section class="sectionProvince">
              <p>
                  <select name="" id="provinceSelect" class="formProvinces" onchange="selectProv()">
                      <option value="selected" >Chọn tỉnh/thành phố</option>
                  </select>
                  <p>Địa chỉ chi tiết</p>
                  <input type="text" class="detail-address">
              </p>
          </section>
      </form>
  </div>
</div>
<div class="total-price">
    <p>Tổng:</p>
    <p id="total-bill"></p>
</div>
</div>` ;
  body.style.overflow = "auto";
  createProvinceList()
  updateAmount();
}
function increasingNumber(e,id) {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let vitri = currentUser.cart.findIndex((item) =>{return item.id ==id })

  let qty = e.parentNode.querySelector('.input-qty');
  if (parseInt(qty.value) < qty.max) {
      qty.value = parseInt(qty.value) + 1;
      console.log(currentUser.cart[vitri].quantity,vitri);
      currentUser.cart[vitri].quantity =  parseInt(currentUser.cart[vitri].quantity) + 1;

  } else {
      qty.value = qty.max;
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // updateAmount();
  updateCartTotal();
  updateCart();

}

function decreasingNumber(e,id) {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let vitri = currentUser.cart.findIndex((item) =>{return item.id ==id })
  let qty = e.parentNode.querySelector('.input-qty');
  if (qty.value > qty.min) {
      qty.value = parseInt(qty.value) - 1;
      currentUser.cart[vitri].quantity =  parseInt(currentUser.cart[vitri].quantity) - 1;
  } else {
      qty.value = qty.min;
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // updateAmount();
  updateCartTotal();
  updateCart();

}

  function createProvinceList() {
  let provinces = [
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bạc Liêu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cần Thơ',
    'Cao Bằng',
    'Đà Nẵng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Nội',
    'Hà Tĩnh',
    'Hải Dương',
    'Hải Phòng',
    'Hậu Giang',
    'Hòa Bình',
    'Hồ Chí Minh',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái'
  ];

  var provinceSelect = document.querySelector('#provinceSelect');
  var selectProvinceBill = document.querySelector('#selectProvinceBill');

  provinces.forEach(function(province) {
    const optionElement = document.createElement('option');
    optionElement.value = province;
    optionElement.text = province;

    provinceSelect.appendChild(optionElement);
    //tạo một bản sao vì khi thêm vào provincSelect nó sẽ di chuyển không tồn tại trong selectProvinceBill
    const tempOptionElement = optionElement.cloneNode(true);
    selectProvinceBill.appendChild(tempOptionElement);
  });
}


 function showSectionProv(){
     document.querySelector(".sectionProvince").classList.toggle("active");
     
}

let tempProvinceSelect= "Hồ Chí Minh";
function selectProv(){
  let province= document.getElementById('provinceSelect').value;
  tempProvinceSelect = province;
  document.getElementById("ship-to-province").innerHTML=`Vận chuyển đến <strong >${province}</strong>`
}

let temp_price_bill = temp_price_ship;
let nutthanhtoan = document.querySelector('.thanh-toan')
let checkoutpage = document.querySelector('.checkout-page');
nutthanhtoan.addEventListener('click', () => {
    checkoutpage.classList.add('active');
    thanhtoanpage(1);
    closeCart();
    body.style.overflow = "hidden"
})
function updateBillTotal() {
    document.querySelector("#checkout-cart-price-final").innerHTML = vnd(getCartTotal()+ parseInt(temp_price_bill));
}
let priceFinal = document.getElementById("checkout-cart-price-final");
// Trang thanh toan
function thanhtoanpage(option,product) {
    // Xu ly don hang
    switch (option) {
        case 1: // Truong hop thanh toan san pham trong gio
            // Hien thi don hang
            showProductCart();
            document.getElementById("selectProvinceBill").value = tempProvinceSelect;
            // Tinh tien
            document.querySelector("#checkout-cart-total").innerHTML = `${vnd(getCartTotal())}`;
            // Tong tien
           updateBillTotal();

            break;
        case 2: // Truong hop mua ngay
            // Hien thi san pham
            showProductBuyNow(product);
            // Tinh tien
            document.querySelector("#checkout-cart-total").innerHTML = `${vnd(product.quantity * product.price)}`;
            // Tong tien
            priceFinal.innerText = vnd((product.quantity * product.price)+parseInt(temp_price_bill));
            break;
    }

    // Tinh tien
    document.getElementById("transport-fee-bill").innerHTML = `Phí vận chuyển: <Strong>${vnd(20000)}</Strong>`;
    document.getElementById("speed-ship-bill").innerHTML = `Giao hàng hỏa tốc nội thành: <Strong>${vnd(30000)}</Strong>`



    // Su kien khu nhan nut dat hang
    document.querySelector(".complete-checkout-btn").onclick = () => {
        switch (option) {
            case 1:
                xulyDathang();
                break;
            case 2:
                xulyDathang(product);
                break;
        }
    }
}

const radioFormShip = document.getElementById('radioFormShip');
const radioValue = radioFormShip.elements.shippingOps; // Lấy tất cả các input radio có name là 'options'

radioFormShip.addEventListener('change', function(event) {
  for (const radioInput of radioValue) {
    if (radioInput.checked) {
      temp_price_bill = radioInput.value;
      updateBillTotal();
    }
  }
});

function showProductCart() {
  let currentuser = JSON.parse(localStorage.getItem('currentUser'));
  let listOrder = document.getElementById("list-order-checkout");
  let listOrderHtml = '';
  currentuser.cart.forEach(item => {
      let product = getProduct(item);
      listOrderHtml += `<div class="product-total">
    <div class="product-total-left">
      <div class=""><img class="check-out-img" src="${product.img}" alt=""></div>
      <div class="info-prod">
          <div class="name-prod">${product.title}</div>
      </div>
      <div class="sizeProduct">Size ${product.size}</div>
      <div class="count">  x ${product.quantity}</div>
    </div>
    <div class="product-total-right">
      <div class="priceProd">${vnd(product.price)}</div>
    </div>
  </div>`
  })
  listOrder.innerHTML = listOrderHtml;
}

// Hien thi hang mua ngay
function showProductBuyNow(product) {
  let listOrder = document.getElementById("list-order-checkout");
  let listOrderHtml = `<div class="product-total">
    <div class="product-total-left">
      <div class=""><img class="check-out-img" src="${product.img}" alt=""></div>
      <div class="info-prod">
          <div class="name-prod">${product.title}</div>
      </div>
      <div class="sizeProduct">Size ${product.size}</div>
      <div class="count">  x ${product.quantity}</div>
    </div>
    <div class="product-total-right">
      <div class="priceProd">${vnd(product.price)}</div>
    </div>
  </div>`;
  listOrder.innerHTML = listOrderHtml;
}

function dathangngay() {
  let productInfo = document.getElementById("product-detail-content");
  let datHangNgayBtn = productInfo.querySelector(".button-dathangngay");
  datHangNgayBtn.onclick = () => {
      if(localStorage.getItem('currentUser')) {
          let productId = datHangNgayBtn.getAttribute("data-product");
          let soluong = parseInt(productInfo.querySelector(".buttons_added .input-qty").value);
          let notevalue = productInfo.querySelector("#popup-detail-note").value;
          let ghichu = notevalue == "" ? "Không có ghi chú" : notevalue;
          let products = JSON.parse(localStorage.getItem('products'));
          let a = products.find(item => item.id == productId);
          a.quantity = parseInt(quantity);
          a.note = ghichu;
          checkoutpage.classList.add('active');
          thanhtoanpage(2,a);
          closeCart();
          body.style.overflow = "hidden"
      } else {
          advertise({ title: 'Warning', message: 'Chưa đăng nhập tài khoản !', type: 'warning', duration: 3000 });
      }
  }
}

// Close Page Checkout
function closecheckout() {
  checkoutpage.classList.remove('active');
  body.style.overflow = "auto"
}

// Thong tin cac don hang da mua - Xu ly khi nhan nut dat hang
function xulyDathang(product) {
  let diachinhan = document.querySelector("#diachinhan").value +", "+document.querySelector("#selectProvinceBill").value;

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : [];
  let order = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
  let madon = "MĐ"+createId(order);
  let tongtien = 0;
  if(product == undefined) {
      currentUser.cart.forEach(item => {
          item.madon = madon;
          item.price = getpriceProduct(item.id);
          tongtien += item.price * item.quantity;
          orderDetails.push(item);
      });
  } else {
      product.madon = madon;
      product.price = getpriceProduct(product.id);
      tongtien += product.price * product.quantity;
      orderDetails.push(product);
  }   
  
  let tennguoinhan = document.querySelector("#tennguoinhan").value;
  let sdtnhan = document.querySelector("#sdtnhan").value

  if(tennguoinhan == "" || sdtnhan == "" || diachinhan == "") {
      advertise({ title: 'Chú ý', message: 'Vui lòng nhập đầy đủ thông tin !', type: 'warning', duration: 4000 });
  } else {
      let donhang = {
          id: madon,
          khachhang: currentUser.email,
          hinhthucgiao: "hello",
          ghichu: document.querySelector(".note-order").value,
          tennguoinhan: tennguoinhan,
          sdtnhan: sdtnhan,
          diachinhan: diachinhan,
          thoigiandat: new Date(),
          tongtien:tongtien,
          trangthai: 0
      }
  
      order.unshift(donhang);///them một phan tu tạo do dai moi
      if(product == null) {
          currentUser.cart.length = 0;
      }
  
      localStorage.setItem("order",JSON.stringify(order));
      localStorage.setItem("currentUser",JSON.stringify(currentUser));
      localStorage.setItem("orderDetails",JSON.stringify(orderDetails));
      advertise({ title: 'Thành công', message: 'Đặt hàng thành công !', type: 'success', duration: 1000 });
      closecheckout() 
      document.getElementById("head-img").scrollIntoView();
  }
}

function getpriceProduct(id) {
  let products = JSON.parse(localStorage.getItem('products'));
  let sp = products.find(item => {
      return item.id == id;
  })
  return sp.price;
}


function advertise({
  title = 'Success',
  message = 'Tạo tài khoản thành công',
  type = 'success', 
  duration = 3000
}){
  const main = document.getElementById('advertise');
  if(main){
      const advertise = document.createElement('div');
      //Auto remove advertise
      const autoRemove = setTimeout(function(){
          main.removeChild(advertise);
      },duration+1000);
      //Remove advertise when click btn close
      advertise.onclick = function(e){
          if(e.target.closest('.fa-regular')){
              main.removeChild(advertise);
              clearTimeout(autoRemove);
          }
      }
      const colors = {
          success: '#47d864',
          info: '#2f86eb',
          warning: '#ffc021',
          error: '#ff6243'
      }
      const icons = {
          success: 'fa-light fa-check',
          info: 'fa-solid fa-circle-info',
          warning: 'fa-solid fa-triangle-exclamation',
          error: 'fa-solid fa-bug'
      };
      const color = colors[type];
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
      advertise.classList.add('advertise', `advertise--${type}`);
      advertise.style.animation = `slideInTop ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
      advertise.innerHTML = `<div class="advertise__private" >
      <div class="advertise__icon">
          <i class="${icon}"></i>
      </div>
      <div class="advertise__body">
          <h3 class="advertise__title" >${title}</h3>
          <p class="advertise__msg">
              ${message}
          </p>
      </div>

  </div>
  
  <div class="advertise__background"style="background-color: ${color};">
  </div>`
  // document.querySelector('.advertise__background').classList.add("initial");
  main.appendChild(advertise);
  }
}

$(document).ready(function() {
  $('.footer-right span').click(function() {
    var target = $(this).attr('data-target');
    var isVisible = $('.footer-wrapper').is(':visible');

    if (isVisible && !$(this).hasClass('active')) {
      $('.footer-wrapper .about-us, .footer-wrapper .store-locations, .footer-wrapper .return-policy').hide();
      $('.' + target).show();
      $('.footer-right span').removeClass('active');
      $(this).addClass('active');
    } else {
      $('.footer-wrapper, .' + target).toggle();
      $(this).toggleClass('active');
    }
  });
});