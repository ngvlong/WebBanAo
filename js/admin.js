// function checkLogin() {
//     let currentUser = JSON.parse(localStorage.getItem("currentuser"));
//     if(currentUser == null || currentUser.userType == 0) {
//         document.querySelector("body").innerHTML = `<div class="access-denied-section">
//             <img class="access-denied-img" src="./assets/upload 2.png" alt="">
//         </div>`
//     } else {
//         document.getElementById("name-acc").innerHTML = currentUser.fullname;
//     }
// }
// window.onload = checkLogin();


const menuIconButton = document.querySelector(".menu-icon-btn");
const sidebar = document.querySelector(".sidebar");
menuIconButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// log out admin user

// let toogleMenu = document.querySelector(".profile");
// let mune = document.querySelector(".profile-cropdown");
// toogleMenu.onclick = function () {
//     mune.classList.toggle("active");
// };

// let slideIndex = 0;

// function showSlides() {
//     let slides = document.getElementsByClassName("card-single");
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {
//         slideIndex = 1;
//     }
//     slides[slideIndex - 1].style.display = "block";
//     setTimeout(showSlides, 2000); 
// }

// showSlides();
// tab for section
const sidebars = document.querySelectorAll(".sidebar-list-item.tab-content");
const sections = document.querySelectorAll(".section");

for(let i = 0; i < sidebars.length; i++) {
    sidebars[i].onclick = function () {
        document.querySelector(".sidebar-list-item.active").classList.remove("active");
        document.querySelector(".section.active").classList.remove("active");
        sidebars[i].classList.add("active");
        sections[i].classList.add("active");
    };
}

const closeBtn = document.querySelectorAll('.section');

for(let i=0;i<closeBtn.length;i++){
    closeBtn[i].addEventListener('click',(e) => {
        sidebar.classList.add("open");
    })
}

// Get amount product
function getAmoumtProduct() {
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    return products.length;
}

// Get amount user
function getAmoumtUser() {
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
    return accounts.filter(item => item.userType == 0).length;
}

// Get amount user
function getMoney() {
    let tongtien = 0;
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    orders.forEach(item => {
        tongtien += item.tongtien
    });
    return tongtien;
}

// document.getElementById("amount-user").innerHTML = getAmoumtUser();
// document.getElementById("amount-product").innerHTML = getAmoumtProduct();
// document.getElementById("doanh-thu").innerHTML = vnd(getMoney());

// Doi sang dinh dang tien VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
// Phân trang 
let perPage = 10;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];

function displayList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    showProductArr(productShow);
}

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
    node.innerHTML = `<a href="#">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.addEventListener('click', function () {
        currentPage = page;
        displayList(productAll, perPage, currentPage);
        let t = document.querySelectorAll('.page-nav-item.active');
        for (let i = 0; i < t.length; i++) {
            t[i].classList.remove('active');
        }
        node.classList.add('active');
    })
    return node;
}

// Hiển thị danh sách sản phẩm 
let sL ;
function showProductArr(arr) {
    let productHtml = "";
    if(arr.length == 0) {
     
        productHtml = `<div class="no-result"><div class="no-result-i"><i class="fa-light fa-circle-exclamation"></i></div><div class="no-result-h">Không có sản phẩm để hiển thị</div></div>`;
    } else {
        arr.forEach(product => {
            let totalQuantity = parseInt(product.sizeS) + parseInt(product.sizeM) + parseInt(product.sizeL) + parseInt(product.sizeXL);
            let btnCtl = product.status == 1 ? 
            `<button class="btn-delete" onclick="deleteProduct(${product.id})"><i class="fa-regular fa-trash"></i></button>` :
            `<button class="btn-delete" onclick="changeStatusProduct(${product.id})"><i class="fa-light fa-square-plus"></i></button>`;
            
            productHtml += `
            <div class="list">
                    <div class="list-left">
                    <img src="${product.img}" alt="">
                    <div class="list-info">
                        <h4>${product.title.toUpperCase()}</h4>

                        <span class="list-category">${product.category}</span>
                        <div id ="list-quantity" class= "list-quantity">
                               <label for="quantity" class="form-label-quantity">Số lượng</label>
                               <span class="quantity-prd" id="uantity-prd">${totalQuantity}</span>
                            <span class="form-message"></span>
                        </div>
                        <p class="list-note">${product.desc}</p>
                    
                    </div>
                    </div>
                <div class="list-right">
                    <div class="list-price">
                    <span class="list-old-price"> ${vnd(product.price)}</span>               
                    <span class="list-current-price">${vnd(product.newprice)}</span>     
                    </div>
                    <div class="list-control">
                    <div class="list-tool">
                        <button class="btn-edit" onclick="editProduct(${product.id})"><i class="fa-light fa-pen-to-square"></i></button>
                        ${btnCtl}
                    </div>  
                                       
                </div>
                <div class="rate">
                <i id="star1" class="fa-solid fa-star"></i> 
                <i id="star2" class="fa-solid fa-star"></i> 
                <i id="star3" class="fa-solid fa-star"></i> 
                <i id="star4" class="fa-solid fa-star"></i> 
                <i id="star5" class="fa-solid fa-star"></i> 
                </div>
                </div> 
            </div>`;
           
        });
    }
    
    document.getElementById("show-product").innerHTML = productHtml;

    const currentPrice = document.querySelectorAll(".list-current-price");
    const oldPrice = document.querySelectorAll(".list-old-price");
    console.log(currentPrice);
    for (let i = 0; i < oldPrice.length; i++) {
    if(currentPrice[i].textContent != ""){
    oldPrice[i].classList.add("active");
    console.log(currentPrice[i].textContent);
      }
    }

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

function showProduct() {
    let selectOp = document.getElementById('the-loai').value;
    let valeSearchInput = document.getElementById('form-search-product').value;
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

    if(selectOp == "Tất cả") {
        result = products.filter((item) => item.status == 1);
    } else if(selectOp == "Đã xóa") {
        result = products.filter((item) => item.status == 0);
    } else {
        result = products.filter((item) => item.category == selectOp);
    }

    result = valeSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valeSearchInput.toString().toUpperCase());
    })
    result = result.filter(item => {
        const itemPrice = parseInt(item.price);
        const minPrice = parseInt(minPriceTemp);
        const maxPrice = parseInt(maxPriceTemp);
        
        return itemPrice >= minPrice && itemPrice <= maxPrice;
        
    });

    displayList(result, perPage, currentPage);
    setupPagination(result, perPage, currentPage);
}

function cancelSearchProduct() {
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")).filter(item => item.status == 1) : [];
    document.getElementById('the-loai').value = "Tất cả";
    document.getElementById('form-search-product').value = "";
    minPriceTemp = 0;
    maxPriceTemp = 1000000;
    sliderPrice();

    displayList(products, perPage, currentPage);
    setupPagination(products, perPage, currentPage);
}
window.onload = showProduct();


function createId(arr) {
    let id = arr.length+1;
    let check = arr.find((item) => item.id == id);
    while (check != null) {
        id++;
        check = arr.find((item) => item.id == id);
    }
    return id;
}

///Lọc sản phẩm theo tiền

function filterProductPrice(){
    let selectOp = document.getElementById('the-loai').value;
    let valeSearchInput = document.getElementById('form-search-product').value;
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

    if(selectOp == "Tất cả") {
        result = products.filter((item) => item.status == 1);
    } else if(selectOp == "Đã xóa") {
        result = products.filter((item) => item.status == 0);
    } else {
        result = products.filter((item) => item.category == selectOp);
    }

    result = valeSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valeSearchInput.toString().toUpperCase());
    })
    result = result.filter(item => {
        const itemPrice = parseInt(item.price);
        const minPrice = parseInt(minPriceTemp);
        const maxPrice = parseInt(maxPriceTemp);
        
        return itemPrice >= minPrice && itemPrice <= maxPrice;
        
    });


    displayList(result, perPage, currentPage);
    setupPagination(result, perPage, currentPage);

}
window.onload = filterProductPrice();


// Xóa sản phẩm 
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let index = products.findIndex(item => {
        return item.id == id;
    })
    if (confirm("Bạn có chắc muốn xóa?") == true) {
        products[index].status = 0;
        advertise({ title: 'Success', message: 'Xóa sản phẩm thành công !', type: 'success', duration: 3000 });
    }
    localStorage.setItem("products", JSON.stringify(products));
    showProduct();
}

function changeStatusProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let index = products.findIndex(item => {
        return item.id == id;
    })
    if (confirm("Bạn có chắc chắn muốn hủy xóa?") == true) {
        products[index].status = 1;
        advertise({ title: 'Success', message: 'Khôi phục sản phẩm thành công !', type: 'success', duration: 3000 });
    }
    localStorage.setItem("products", JSON.stringify(products));
    showProduct();
}

var indexCur= 0;
var szS = "",szM= "",szL="",szXL="";
function editProduct(id) {
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    let index = products.findIndex(item => {
        return item.id == id;
    })

    indexCur = index;
    document.querySelectorAll(".add-product-e").forEach(item => {
        item.style.display = "none";
    })
    document.querySelectorAll(".edit-product-e").forEach(item => {
        item.style.display = "block";
    })
    document.querySelector(".add-product").classList.add("open");
    //
    document.querySelector(".upload-image-preview").src = products[index].img;
    document.querySelector(".image-hover").src = products[index].imghv;
    document.getElementById("ten-ao").value = products[index].title.toUpperCase();
    document.getElementById("gia-cu").value = products[index].price;
    document.getElementById("gia-moi").value = products[index].newprice;
    document.getElementById("mo-ta").value = products[index].desc;
    document.getElementById("chon-loai-ao").value = products[index].category;
    document.getElementById("ip-quantity-product").value = products[index].sizeS;

    let selectbtn = document.querySelector(".list-btn-size.active").textContent;

    szS = products[index].sizeS;
    szM = products[index].sizeM;
    szL = products[index].sizeL;
    szXL= products[index].sizeXL;

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

    if(selectbtn ==="S"){
        szS = selectbtn;
    }else if(selectbtn ==="M"){
       szM = selectbtn;
    }else if(selectbtn ==="L"){
       szL = selectbtn;
    }else if(selectbtn ==="XL"){
        szXL = selectbtn;
    }
}

function getPathImage(path) {
    let patharr = path.split("/");
    return "./assets/image/" + patharr[patharr.length - 1];
}


const btnsize = document.querySelectorAll(".list-btn-size.row-size");
const listiconout = document.querySelectorAll(".icon-out");
let btnsimp;
for(let i = 0; i < btnsize.length; i++) {
    btnsize[i].onclick = function () {
        let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
        let selectbtn = document.querySelector(".list-btn-size.active .btn-size").textContent;


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

    };
}
function showQuantity(button){

    let currentText = button.textContent;

    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

    let selectbtn = document.querySelector(".list-btn-size.active .btn-size").textContent;

        if(selectbtn ==="S"){
            szS = document.querySelector("#ip-quantity-product").value;

        }else if(selectbtn ==="M"){
            szM= document.querySelector("#ip-quantity-product").value;

        }else if(selectbtn ==="L"){
            szL = document.querySelector("#ip-quantity-product").value;

        }else if(selectbtn ==="XL"){
            szXL = document.querySelector("#ip-quantity-product").value;

        }

    if(currentText ==="S"){
        document.getElementById("ip-quantity-product").value=szS;

    }else if(currentText ==="M" ){
        document.getElementById("ip-quantity-product").value = szM;

    }else if(currentText ==="L"){
        document.getElementById("ip-quantity-product").value=szL;

    }else if(currentText ==="XL"){
        document.getElementById("ip-quantity-product").value = szXL;

    }else{
        document.getElementById("ip-quantity-product").value="";

    }

}

let btnUpdateProductIn = document.getElementById("update-product-button");
btnUpdateProductIn.addEventListener("click", (e) => {
    e.preventDefault();
    const outprice =  document.querySelectorAll(".list-old-price");
    let products = JSON.parse(localStorage.getItem("products"));
    let idProduct = products[indexCur].id;
    let imgProduct = products[indexCur].img;
    let imgProductHvr = products[indexCur].imghv;
    let titleProduct = products[indexCur].title;
    let priceProduct = products[indexCur].price;
    let newpriceProduct = products[indexCur].newprice;
    let descProduct = products[indexCur].desc;
    let categoryProduct = products[indexCur].category;
    let sizeSProduct = products[indexCur].sizeS;
    let sizeMProduct = products[indexCur].sizeM;
    let sizeLProduct = products[indexCur].sizeL;
    let sizeXLProduct = products[indexCur].sizeXL;
    console.log(products[indexCur].imghv);


    let imgProductCur = decodeURIComponent(getPathImage(document.querySelector(".upload-image-preview").src))
    let imgProductHvrCur = decodeURIComponent(getPathImage(document.querySelector(".image-hover").src))
    let titleProductCur = document.getElementById("ten-ao").value;
    let priceProductCur = document.getElementById("gia-cu").value;
    let newpriceProductCur = document.getElementById("gia-moi").value;
    if(newpriceProductCur == ""){
        outprice[indexCur-1].classList.remove("active");
    }
    let descProductCur = document.getElementById("mo-ta").value;
    let categoryText = document.getElementById("chon-loai-ao").value;

    let selectbtn = document.querySelector(".list-btn-size.active .btn-size").textContent;

    if(selectbtn =="S"){
        szS = document.querySelector("#ip-quantity-product").value;

    }else if(selectbtn ==="M"){
        szM= document.querySelector("#ip-quantity-product").value;

    }else if(selectbtn ==="L"){
        szL = document.querySelector("#ip-quantity-product").value;

    }else if(selectbtn ==="XL"){
        szXL = document.querySelector("#ip-quantity-product").value;

    }

    var sizeSCur = szS;
    let sizeMCur = szM;
    let sizeLCur = szL;
    let sizeXLCur = szXL; 
    if(titleProductCur ==""|| priceProductCur =="" || descProductCur =="")
    {
        advertise({ title: "Chú ý", message: "Vui lòng nhập đầy đủ thông tin sản phẩm!", type: "warning", duration: 3000, });
    }else if(isNaN(priceProductCur)) {
        advertise({ title: "Chú ý", message: "Giá phải ở dạng số!", type: "warning", duration: 3000, });
    }else if(isNaN(newpriceProductCur) && newpriceProductCur != "") {
        advertise({ title: "Chú ý", message: "Giá khuyến mãi phải ở dạng số!", type: "warning", duration: 3000, });
    }
    else{
        if(newpriceProductCur != "") {
            if(parseInt(newpriceProductCur) >= parseInt(priceProductCur) ){
                 advertise({ title: "Chú ý", message: "Giá khuyến mãi không hợp lệ!", type: "warning", duration: 3000, });
                }
            else{
                if (imgProductCur != imgProduct|| imgProductHvrCur != imgProductHvr || titleProductCur != titleProduct || priceProductCur != priceProduct || newpriceProductCur != newpriceProduct || descProductCur != descProduct || categoryText != categoryProduct || parseInt(sizeSCur,10) != parseInt(sizeSProduct,10) || parseInt(sizeMCur) != parseInt(sizeMProduct) || parseInt(sizeLCur) != parseInt(sizeLProduct) || parseInt(sizeXLCur) != parseInt(sizeXLProduct)) {

                    let productadd = {
                        id: idProduct,
                        title: titleProductCur,
                        img: imgProductCur,
                        imghv: imgProductHvrCur,
                        sizeS: sizeSCur,
                        sizeM: sizeMCur,
                        sizeL: sizeLCur,
                        sizeXL: sizeXLCur,
                        category: categoryText,
                        price: parseInt(priceProductCur),
                        newprice: newpriceProductCur,
                        desc: descProductCur,
                        status: 1,
                    };
                    console.log(productadd);
                    products.splice(indexCur, 1);
                    products.splice(indexCur, 0, productadd);
                    localStorage.setItem("products", JSON.stringify(products));
                    advertise({ title: "Successsss", message: "Sửa sản phẩm thành công!", type: "success", duration: 3000, });
                    setDefaultValue();
                    document.querySelector(".add-product").classList.remove("open");
                    showProduct();
                } else {
                    advertise({ title: "warning", message: "Sửa sản phẩm không thành công!", type: "warning", duration: 3000, });
                    setDefaultValue();
                    document.querySelector(".add-product").classList.remove("open");
                    showProduct();
                }
            }
        }
       
    }
    
});

let btnAddProductIn = document.getElementById("add-product-button");
btnAddProductIn.addEventListener("click", (e) => {
    e.preventDefault();
    let imgProduct = getPathImage(document.querySelector(".upload-image-preview").src)
    let imgHvrProduct = getPathImage(document.querySelector(".image-hover").src)


    let tenAo = document.getElementById("ten-ao").value;
    let price = document.getElementById("gia-cu").value;
    let newprice = document.getElementById("gia-moi").value;
    let moTa = document.getElementById("mo-ta").value;
    let categoryText = document.getElementById("chon-loai-ao").value;
    if(tenAo == "" || price == "" || moTa == "") {
        advertise({ title: "Chú ý", message: "Vui lòng nhập đầy đủ thông tin sản phẩm!", type: "warning", duration: 3000, });
    } else {
        if(isNaN(price)) {
            advertise({ title: "Chú ý", message: "Giá phải ở dạng số!", type: "warning", duration: 3000, });
        } else {
            let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
            let product = {
                id: createId(products),
                title: tenAo,
                img: imgProduct,
                imghv: imgHvrProduct,
                category: categoryText,
                price: price,
                newprice: newprice,
                sizeS: szS,
                sizeM: szM,
                sizeL: szL,
                sizeXL: szXL,
                desc: moTa,
                status:1
            };
            products.unshift(product);
            localStorage.setItem("products", JSON.stringify(products));
            showProduct();
            document.querySelector(".add-product").classList.remove("open");
            advertise({ title: "Success", message: "Thêm sản phẩm thành công!", type: "success", duration: 3000});
            setDefaultValue();
        }
    }
});




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
        advertise.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
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

document.querySelector(".modal-close.product-form").addEventListener("click",() => {
    setDefaultValue();
})

function setDefaultValue() {

    indexCur = 0;
    document.querySelector(".upload-image-preview").src = "./assets/upload 2.png";
    document.querySelector(".image-hover").src = "./assets/upload 2.png";
    document.getElementById("ten-ao").value = "";
    document.getElementById("gia-cu").value = "";
    document.getElementById("gia-moi").value = "";
    document.getElementById("mo-ta").value = "";
    document.getElementById("chon-loai-ao").value = "Áo Thun";
    document.getElementById("ip-quantity-product").value="";
    szS = "";
    szM = "";
    szL = "";
    szXL ="";
    const btnsize = document.querySelectorAll(".list-btn-size.row-size");

    for(let i = 0; i < btnsize.length; i++) {
    document.querySelector(".list-btn-size.active").classList.remove("active");
    btnsize[0].classList.add("active");
    }

}

// Open Popup Modal
let btnAddProduct = document.getElementById("btn-add-product");
btnAddProduct.addEventListener("click", () => {
    document.querySelectorAll(".add-product-e").forEach(item => {
        item.style.display = "block";
    })
    document.querySelectorAll(".edit-product-e").forEach(item => {
        item.style.display = "none";
    })
    document.querySelector(".add-product").classList.add("open");
});

// Close Popup Modal
let closePopup = document.querySelectorAll(".modal-close");
let modalPopup = document.querySelectorAll(".modal");

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].onclick = () => {
        modalPopup[i].classList.remove("open");
    };
}

// On change Image
function uploadImage(input) {

            const imagePreview = document.querySelector(".upload-image-preview");
            const file = input.files[0];
            if (file) {
                const flname = "./assets/image/"+ file.name;
                imagePreview.src =  flname;

                // Lấy đường dẫn ảnh và làm gì đó với nó, ví dụ: in ra console.
                console.log("Đường dẫn ảnh:", flname);
            }
}
function uploadImageMore(input) {

    const imagePreview = document.querySelector(".image-hover");
    const file = input.files[0];
    if (file) {
        const flname = "./assets/image/"+ file.name;
        imagePreview.src =  flname;

        // Lấy đường dẫn ảnh và làm gì đó với nó, ví dụ: in ra console.
        console.log("Đường dẫn ảnh:", flname);
    }
}

// Đổi trạng thái đơn hàng
function changeStatus(id, el) {
    let orders = JSON.parse(localStorage.getItem("order"));
    let order = orders.find((item) => {
        return item.id == id;
    });
    order.trangthai = 1;
    el.classList.remove("btn-chuaxuly");
    el.classList.add("btn-daxuly");
    el.innerHTML = "Đã xử lý";
    localStorage.setItem("order", JSON.stringify(orders));
    findOrder(orders);
}

// Format Date
function formatDate(date) {
    let fm = new Date(date);
    let yyyy = fm.getFullYear();
    let mm = fm.getMonth() + 1;
    let dd = fm.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
}

// Show order

let timeStart='';
let timeEnd = '';
let dateStart='';
let dateEnd='';
var rstimestart ;

let btnfillterDate = document.querySelectorAll(".btn-fillter-date");
let modalFillterDate = document.querySelector(".modal-fillter-date");
 for (let i = 0; i < btnfillterDate.length; i++){
    btnfillterDate[i].onclick =() =>{
        
        modalFillterDate.classList.add("open");
        if(i == 0) {
            document.getElementById('fillter-date').style.right = '23%';
            document.getElementById('btn-acp-date-cus').style.display='block';
            document.getElementById('btn-acp-date-od').style.display='none';
            document.getElementById('btn-acp-date-tk').style.display='none';
        }else if(i == 1) {
            document.getElementById('fillter-date').style.right = '9.4%';
            document.getElementById('btn-acp-date-od').style.display='block';
            document.getElementById('btn-acp-date-cus').style.display='none';
            document.getElementById('btn-acp-date-tk').style.display='none';
        }else if(i == 2) {
            document.getElementById('fillter-date').style.right = '27.8%';
            document.getElementById('btn-acp-date-tk').style.display='block';
            document.getElementById('btn-acp-date-od').style.display='none';
            document.getElementById('btn-acp-date-cus').style.display='none';
        }
  };
}


let closeBTN = document.querySelectorAll(".fillter-close");
let closeFiltDate = document.querySelectorAll(".modal-fillter-date");

for (let i = 0; i < closeBTN.length; i++) {
    closeBTN[i].onclick = () => {
        closeFiltDate[i].classList.remove("open");
    };
}


document.addEventListener("DOMContentLoaded", function() {
    var daySelect = document.getElementById("daystart");
    var monthSelect = document.getElementById("monthstart");
    var yearSelect = document.getElementById("yearstart");


    // Tạo danh sách tháng từ 1 đến 12
    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        monthSelect.add(option);
    }
    monthSelect.value = 1;

    // Tạo danh sách năm từ 2015 đến nay
    var currentYear = new Date().getFullYear();
    for (var i = currentYear; i >= 2015; i--) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.add(option);
    }
    yearSelect.value = '2015';

    var daysInMonth = new Date(2015, 1, 0).getDate();
    for (var i = 1; i <= daysInMonth; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        daySelect.add(option);
    }
    daySelect.value = 1;

    document.getElementById("result-time-start-cus").textContent  = daySelect.value+'/'+monthSelect.value+'/'+yearSelect.value;
    document.getElementById("result-time-start-od").textContent  = daySelect.value+'/'+monthSelect.value+'/'+yearSelect.value;
    rstimestart = daySelect.value+'/'+monthSelect.value+'/'+yearSelect.value;

    // Thêm sự kiện onchange cho các select

    monthSelect.addEventListener("change", updateDayOptions);
    yearSelect.addEventListener("change", updateDayOptions);

    // Hàm cập nhật danh sách ngày
    function updateDayOptions() {
        var selectedMonth = monthSelect.value;
        var selectedYear = yearSelect.value;

        // Xóa danh sách ngày hiện tại


        // Tạo danh sách ngày phù hợp với tháng và năm
        var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        for (var i = 1; i <= daysInMonth; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            daySelect.add(option);
        }
        
        // Cập nhật kết quả
        updateResult();
    }

    // Thêm sự kiện onchange cho ngày
    daySelect.addEventListener("change", updateResult);

    // Hàm cập nhật kết quả
    function updateResult() {
        var daySelect = document.getElementById("daystart");
        var monthSelect = document.getElementById("monthstart");
        var yearSelect = document.getElementById("yearstart");
        var selectedDay = daySelect.value;
        var selectedMonth = monthSelect.value;
        var selectedYear = yearSelect.value;

        if (selectedDay && selectedMonth && selectedYear) {
            var formattedDate = selectedYear + '-' + selectedMonth + '-' + selectedDay;
            rstimestart = selectedDay +'/'+ selectedMonth +'/'+ selectedYear;
            timeStart = formattedDate; 
        } else {
            rstimestart= "";
        }
    }
});
var rstimeend;
document.addEventListener("DOMContentLoaded", function() {
    var daySelect = document.getElementById("dayend");
    var monthSelect = document.getElementById("monthend");
    var yearSelect = document.getElementById("yearend");
    var curDate = new Date();

    // Tạo danh sách tháng từ 1 đến 12
    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        monthSelect.add(option);
    }
    monthSelect.value = curDate.getMonth()+1;

    // Tạo danh sách năm từ 2015 đến nay
    var currentYear = new Date().getFullYear();
    for (var i = currentYear; i >= 2015; i--) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.add(option);
    }
    yearSelect.value = curDate.getFullYear();


    var daysInMonth = new Date(yearSelect.value,monthSelect.value, 0).getDate();
    for (var i = 1; i <= daysInMonth; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        daySelect.add(option);
    }
    daySelect.value= curDate.getDate();

    document.getElementById("result-time-end-cus").textContent  = daySelect.value+'/'+monthSelect.value+'/'+yearSelect.value;
    document.getElementById("result-time-end-od").textContent  = daySelect.value+'/'+monthSelect.value+'/'+yearSelect.value;
    rstimeend = daySelect.value+'/'+monthSelect.value+'/'+yearSelect.value;
    // Thêm sự kiện onchange cho các select
    monthSelect.addEventListener("change", updateDayOptions);
    yearSelect.addEventListener("change", updateDayOptions);

    // Hàm cập nhật danh sách ngày
    function updateDayOptions() {
        var selectedMonth = monthSelect.value;
        var selectedYear = yearSelect.value;

        // Xóa danh sách ngày hiện tại

        // Tạo danh sách ngày phù hợp với tháng và năm
        var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        for (var i = 1; i <= daysInMonth; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            daySelect.add(option);
        }

        // Cập nhật kết quả
        updateResult();
    }

    // Thêm sự kiện onchange cho ngày
    daySelect.addEventListener("change", updateResult);

    // Hàm cập nhật kết quả
    function updateResult() {
        var selectedDay = daySelect.value;
        var selectedMonth = monthSelect.value;
        var selectedYear = yearSelect.value;

        if (selectedDay && selectedMonth && selectedYear) {
            var formattedDate = selectedYear + '-' + selectedMonth + '-' + selectedDay;
            rstimeend =  selectedDay +'/'+ selectedMonth +'/'+ selectedYear;
            timeEnd = formattedDate;
            
        } else {
            rstimeend= "";
        }
    }
});
function ApplyDateCus(){
    let closeBTN = document.querySelectorAll(".fillter-close");
    let closeFiltDate = document.querySelectorAll(".modal-fillter-date");
    document.getElementById("result-time-start-cus").textContent  = rstimestart;
    document.getElementById("result-time-end-cus").textContent  = rstimeend;

    for (let i = 0; i < closeBTN.length; i++) {
        closeFiltDate[i].classList.remove("open");
      }
      showUser();
}
function ApplyDateOd(){
    let closeBTN = document.querySelectorAll(".fillter-close");
    let closeFiltDate = document.querySelectorAll(".modal-fillter-date");
    document.getElementById("result-time-start-od").textContent  = rstimestart;
    document.getElementById("result-time-end-od").textContent  = rstimeend;

    for (let i = 0; i < closeBTN.length; i++) {
        closeFiltDate[i].classList.remove("open");
      }
      findOrder();
}
function ApplyDateTk(){
    let closeBTN = document.querySelectorAll(".fillter-close");
    let closeFiltDate = document.querySelectorAll(".modal-fillter-date");
    // document.getElementById("result-time-start-tk").textContent  = rstimestart;
    // document.getElementById("result-time-end-tk").textContent  = rstimeend;

    for (let i = 0; i < closeBTN.length; i++) {
        closeFiltDate[i].classList.remove("open");
      }
      thongKe();
}


function showOrder(arr) {
    let orderHtml = "";
    if(arr.length == 0) {
        orderHtml = `<td colspan="6">Không có dữ liệu</td>`
    } else {
        arr.forEach((item) => {
            let status = item.trangthai == 0 ? `<span class="status-no-complete">Chưa xử lý</span>` : `<span class="status-complete">Đã xử lý</span>`;
            let date = formatDate(item.thoigiandat);
            orderHtml += `
            <tr>
            <td>${item.id}</td>
            <td>${item.khachhang}</td>
            <td>${date}</td>
            <td>${vnd(item.tongtien)}</td>                               
            <td>${status}</td>
            <td class="control">
            <button class="btn-detail" id="" onclick="detailOrder('${item.id}')"><i class="fa-regular fa-circle-info"></i> Chi tiết</button>
            </td>
            </tr>      
            `;
   
        });
    }
    document.getElementById("showOrder").innerHTML = orderHtml;
}

let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];

window.onload = showOrder(orders);

// Get Order Details
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

// Show Order Detail
function detailOrder(id) {
    document.querySelector(".modal.detail-order").classList.add("open");
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    // Lấy hóa đơn 
    let order = orders.find((item) => item.id == id);
    // Lấy chi tiết hóa đơn
    let ctDon = getOrderDetails(id);
   
    let spHtml = `<div class="modal-detail-left"><div class="order-item-group">`;

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
    
    spHtml += `</div></div>`;
    spHtml += `<div class="modal-detail-right">
        <h4 class="detail-order-info-cust">Thông tin khách hàng</h4>
        <ul class="detail-order-group">
            <li class="detail-order-item">
                <span class="detail-order-item-left"><i class="fa-thin fa-person"></i> Người nhận</span>
               <span class="detail-order-item-right">${order.tenguoinhan}</span>
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
        </ul>
    </div>`;
    document.querySelector(".modal-detail-order").innerHTML = spHtml;

    let classDetailBtn = order.trangthai == 0 ? "btn-chuaxuly" : "btn-daxuly";
    let textDetailBtn = order.trangthai == 0 ? "Chưa xử lý" : "Đã xử lý";
    document.querySelector(
        ".modal-detail-bottom"
    ).innerHTML = `<div class="modal-detail-bottom-left">
        <div class="price-total">
            <span class="thanhtien">Thành tiền:</span>
            <span class="price">${vnd(order.tongtien)}</span>
        </div>
    </div>
    <div class="modal-detail-bottom-right">
        <button class="modal-detail-btn ${classDetailBtn}" onclick="changeStatus('${order.id}',this)">${textDetailBtn}</button>
    </div>`;
}

// Find Order



function findOrder() {
    let tinhTrang = parseInt(document.getElementById("tinh-trang").value);
    let ct = document.getElementById("form-search-order").value;

    
    if (timeEnd < timeStart && timeEnd != "" && timeStart != "") {
        alert("Lựa chọn thời gian sai !");
        return;
    }
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let result = tinhTrang == 2 ? orders : orders.filter((item) => {
        return item.trangthai == tinhTrang;
    });
    result = ct == "" ? result : result.filter((item) => {
        return (item.khachhang.toLowerCase().includes(ct.toLowerCase()) || item.id.toString().toLowerCase().includes(ct.toLowerCase()));
    });

    if (timeStart != "" && timeEnd == "") {
        result = result.filter((item) => {
            return new Date(item.thoigiandat) >= new Date(timeStart).setHours(0, 0, 0);
        });
    } else if (timeStart == "" && timeEnd != "") {
        result = result.filter((item) => {
            return new Date(item.thoigiandat) <= new Date(timeEnd).setHours(23, 59, 59);
        });
    } else if (timeStart != "" && timeEnd != "") {
        result = result.filter((item) => {
            return (new Date(item.thoigiandat) >= new Date(timeStart).setHours(0, 0, 0) && new Date(item.thoigiandat) <= new Date(timeEnd).setHours(23, 59, 59)
            );
        });
    }


    showOrder(result);
}

function cancelSearchOrder(){
    var curDate = new Date();
    var month = curDate.getMonth()+1;
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    document.getElementById("tinh-trang").value = 2;
    document.getElementById("form-search-order").value = "";
    document.getElementById("result-time-start-od").textContent = "1/1/2015";
    document.getElementById("result-time-end-od").textContent = curDate.getDate()+"/"+month+"/"+curDate.getFullYear();
    var monthSelect = document.getElementById("monthstart");
    var yearSelect = document.getElementById("yearstart");
    var daySelect = document.getElementById("daystart");

    daySelect.value= 1;
    monthSelect.value = 1;
    yearSelect.value = '2015';
    
    var monthSelect = document.getElementById("monthend");
    var yearSelect = document.getElementById("yearend");
    var daySelect = document.getElementById("dayend");
    daySelect.value= curDate.getDate();
    monthSelect.value = curDate.getMonth() + 1;
    yearSelect.value = curDate.getFullYear();

    showOrder(orders);
}

// Create Object Thong ke
function createObj() {
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []; 
    let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : []; 
    let result = [];
    orderDetails.forEach(item => {
        // Lấy thông tin sản phẩm
        let prod = products.find(product => {return product.id == item.id;});
        let obj = new Object();
        obj.id = item.id;
        obj.madon = item.madon;
        obj.price = item.price;
        obj.quantity = item.quantity;
        obj.category = prod.category;
        obj.title = prod.title;
        obj.img = prod.img;
        obj.time = (orders.find(order => order.id == item.madon)).thoigiandat;
        result.push(obj);
    });
    return result;
}

// Filter 
function thongKe(mode) {
    let categoryTk = document.getElementById("the-loai-tk").value;
    let ct = document.getElementById("form-search-tk").value;
    
    if (timeEnd < timeStart && timeEnd != "" && timeStart != "") {
        alert("Lựa chọn thời gian sai !");
        return;
    }
    let arrDetail = createObj();
    let result = categoryTk == "Tất cả" ? arrDetail : arrDetail.filter((item) => {
        return item.category == categoryTk;
    });

    result = ct == "" ? result : result.filter((item) => {
        return (item.title.toLowerCase().includes(ct.toLowerCase()));
    });

    if (timeStart != "" && timeEnd == "") {
        result = result.filter((item) => {
            return new Date(item.time) > new Date(timeStart).setHours(0, 0, 0);
        });
    } else if (timeStart == "" && timeEnd != "") {
        result = result.filter((item) => {
            return new Date(item.time) < new Date(timeEnd).setHours(23, 59, 59);
        });
    } else if (timeStart != "" && timeEnd != "") {
        result = result.filter((item) => {
            return (new Date(item.time) > new Date(timeStart).setHours(0, 0, 0) && new Date(item.time) < new Date(timeEnd).setHours(23, 59, 59)
            );
        });
    }    
    console.log(result);
    showThongKe(result,mode);
}

// Show số lượng sp, số lượng đơn bán, doanh thu
function showOverview(arr){
        let orderDetails = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : []; 
    document.getElementById("quantity-product").innerText = arr.length;
    document.getElementById("quantity-order-product").innerText = arr.reduce((sum, cur) => (sum + parseInt(cur.quantity)),0);
    document.getElementById("quantity-order").innerText = orderDetails.length;
    document.getElementById("quantity-sale").innerText = vnd(arr.reduce((sum, cur) => (sum + parseInt(cur.doanhthu)),0));
}

function showThongKe(arr,mode) {
    let orderHtml = "";
    let mergeObj = mergeObjThongKe(arr);
    showOverview(mergeObj);

    switch (mode){
        case 0:
            var curDate = new Date();
            mergeObj = mergeObjThongKe(createObj());
            showOverview(mergeObj);
            document.getElementById("the-loai-tk").value = "Tất cả";
            document.getElementById("form-search-tk").value = "";
            var monthSelect = document.getElementById("monthstart");
            var yearSelect = document.getElementById("yearstart");
            var daySelect = document.getElementById("daystart");
        
            daySelect.value= 1;
            monthSelect.value = 1;
            yearSelect.value = '2015';
            
            var monthSelect = document.getElementById("monthend");
            var yearSelect = document.getElementById("yearend");
            var daySelect = document.getElementById("dayend");
            daySelect.value= curDate.getDate();
            monthSelect.value = curDate.getMonth() + 1;
            yearSelect.value = curDate.getFullYear();
        

            break;
        case 1:
            mergeObj.sort((a,b) => parseInt(a.quantity) - parseInt(b.quantity))
            break;
        case 2:
            mergeObj.sort((a,b) => parseInt(b.quantity) - parseInt(a.quantity))
            break;
    }
    for(let i = 0; i < mergeObj.length; i++) {
        orderHtml += `
        <tr>
        <td>${i + 1}</td>
        <td><div class="prod-img-title"><img class="prd-img-tbl" src="${mergeObj[i].img}" alt=""><p id="title-prod-tk">${mergeObj[i].title.toUpperCase()}</p></div></td>
        <td>${mergeObj[i].category}</td>
        <td>${mergeObj[i].quantity}</td>
        <td>${vnd(mergeObj[i].doanhthu)}</td>
        <td><button class="btn-detail product-order-detail" data-id="${mergeObj[i].id}"><i class="fa-regular fa-eye"></i> Chi tiết</button></td>
        </tr>      
        `;
    }
    document.getElementById("showTk").innerHTML = orderHtml;
    document.querySelectorAll(".product-order-detail").forEach(item => {
        let idProduct = item.getAttribute("data-id");
        item.addEventListener("click", () => {           
            detailOrderProduct(arr,idProduct);
        })
    })
}

showThongKe(createObj())

function mergeObjThongKe(arr) {
    let result = [];
    arr.forEach(item => {
        let check = result.find(i => i.id == item.id) // Không tìm thấy gì trả về undefined

        if(check){
            check.quantity = parseInt(check.quantity)  + parseInt(item.quantity);
            check.doanhthu += parseInt(item.price) * parseInt(item.quantity);
        } else {
            const newItem = {...item}
            newItem.doanhthu = newItem.price * newItem.quantity;
            result.push(newItem);
        }
        
    });
    return result;
}

function detailOrderProduct(arr,id) {
    let orderHtml = "";
    arr.forEach(item => {
        if(item.id == id) {
            orderHtml += `<tr>
            <td>${item.madon}</td>
            <td>${item.title.toUpperCase()}</td>
            <td>${item.quantity}</td>
            <td>${vnd(item.price)}</td>
            <td>${formatDate(item.time)}</td>
            </tr>      
            `;
        }
    });
    document.getElementById("show-product-order-detail").innerHTML = orderHtml
    document.querySelector(".modal.detail-order-product").classList.add("open")
}

// User
let addAccount = document.getElementById('signup-button');
let updateAccount = document.getElementById("btn-update-account")

document.querySelector(".modal.signup .modal-close").addEventListener("click",() => {
    signUpFormReset();
})
function togglePassword() {
    const password = document.getElementById("password");
    const showPassword = document.getElementById("showPassword");
    const hidePassword = document.getElementById("hidePassword");

    if (password.type === "password") {
        password.type = "text";
        showPassword.style.display="block";
        hidePassword.style.display="none";
    } else {
        password.type = "password";
        hidePassword.style.display="block";
        showPassword.style.display="none";
    }
}
function openCreateAccount() {
    document.querySelector(".signup").classList.add("open");
    document.querySelectorAll(".edit-account-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-account-e").forEach(item => {
        item.style.display = "block"
    })
}

function signUpFormReset() {
    document.getElementById('fullname').value = ""
    document.getElementById('email').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('password').value = ""
    document.querySelector('.form-message-name').innerHTML = '';
    document.querySelector('.form-message-email').innerHTML = '';
    document.querySelector('.form-message-phone').innerHTML = '';
    document.querySelector('.form-message-password').innerHTML = '';
}





function showUserArr(arr) {
    let accountHtml = '';
    if(arr.length == 0) {
        accountHtml = `<td colspan="5">Không có dữ liệu</td>`
    } else {
        arr.forEach((account, index) => {
            let tinhtrang = account.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
            accountHtml += ` <tr>
            <td>${index + 1}</td>
            <td>${account.fullname}</td>
            <td>${account.phone}</td>
            <td>${formatDate(account.join)}</td>
            <td>${tinhtrang}</td>
            <td class="control control-table">
            <button class="btn-edit" id="edit-account" onclick='editAccount(${account.id})' ><i class="fa-light fa-pen-to-square"></i></button>
            <button class="btn-delete" id="delete-account" onclick="deleteAcount(${account.id})"><i class="fa-regular fa-trash"></i></button>
            </td>
        </tr>`
        })
    }
    document.getElementById('show-user').innerHTML = accountHtml;
}

function showUser() {
    let tinhTrang = parseInt(document.getElementById("tinh-trang-user").value);
    let ct = document.getElementById("form-search-user").value;


    if (timeEnd < timeStart && timeEnd != "" && timeStart != "") {
        alert("Lựa chọn thời gian sai !");
        return;
    }

    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")).filter(item => item.userType == 0) : [];
    let result = tinhTrang == 2 ? accounts : accounts.filter(item => item.status == tinhTrang);
    

    result = ct == "" ? result : result.filter((item) => {
        return (item.fullname.toLowerCase().includes(ct.toLowerCase()) || item.phone.toString().toLowerCase().includes(ct.toLowerCase()));
    });

    if (timeStart != "" && timeEnd == "") {
        result = result.filter((item) => {
            return new Date(item.join) >= new Date(timeStart).setHours(0, 0, 0);
        });
    } else if (timeStart == "" && timeEnd != "") {
        result = result.filter((item) => {
            return new Date(item.join) <= new Date(timeEnd).setHours(23, 59, 59);
        });
    } else if (timeStart != "" && timeEnd != "") {
        result = result.filter((item) => {

            return (new Date(item.join) >= new Date(timeStart).setHours(0, 0, 0) && new Date(item.join) <= new Date(timeEnd).setHours(23, 59, 59)
            );
        });
    }
    showUserArr(result);
}

function cancelSearchUser() {
    var curDate = new Date();
    var month = curDate.getMonth()+1;
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")).filter(item => item.userType == 0) : [];
    showUserArr(accounts);
    document.getElementById("tinh-trang-user").value = 2;
    document.getElementById("form-search-user").value = "";
    document.getElementById("result-time-start-cus").textContent = "1/1/2015";
    document.getElementById("result-time-end-cus").textContent = curDate.getDate()+"/"+month+"/"+curDate.getFullYear();    var daySelect = document.getElementById("daystart");
    
    var monthSelect = document.getElementById("monthstart");
    var yearSelect = document.getElementById("yearstart");
    var daySelect = document.getElementById("daystart");
    daySelect.value= 1;
    monthSelect.value = 1;
    yearSelect.value = '2015';
    
    var monthSelect = document.getElementById("monthend");
    var yearSelect = document.getElementById("yearend");
    var daySelect = document.getElementById("dayend");
    
    daySelect.value= curDate.getDate();
    monthSelect.value = curDate.getMonth() + 1;
    yearSelect.value = curDate.getFullYear();

}

window.onload = showUser();

function deleteAcount(id) {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let index = accounts.findIndex(item => item.id == id);
    if (confirm("Bạn có chắc muốn xóa?")) {
        accounts[id - 1].status = 0;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
    showUser();
}

let indexFlag;
let sttUs;
function editAccount(id) {
    document.querySelector(".signup").classList.add("open");
    document.querySelectorAll(".add-account-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".edit-account-e").forEach(item => {
        item.style.display = "block"
    })
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let index = accounts.findIndex(item => {
        return item.id == id
    })
    indexFlag = index;
    document.getElementById("fullname").value = accounts[index].fullname;
    document.getElementById("email").value = accounts[index].email;
    document.getElementById("phone").value = accounts[index].phone;
    document.getElementById("password").value = accounts[index].password;
    var statusUs = accounts[index].status;
    if(statusUs == 1){
        document.getElementById("status-acv").classList.add("open");
        document.getElementById("status-nonacv").classList.remove("open");
        sttUs = 1;
    }
    else{
        document.getElementById("status-nonacv").classList.add("open");
        document.getElementById("status-acv").classList.remove("open");
        sttUs = 0;
    }
    var checkAcv = document.getElementById("status-acv");
    var checkNonAcv = document.getElementById("status-nonacv");
    
    checkAcv.onclick = function () {
            checkNonAcv.classList.remove("open");
            checkAcv.classList.add("open");
            sttUs = 1;
        };
    checkNonAcv.onclick = function () {
            checkAcv.classList.remove("open");
            checkNonAcv.classList.add("open");
            sttUs = 0;
        };
    

}
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

updateAccount.addEventListener("click", (e) => {
    e.preventDefault();
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    let fullname = accounts[indexFlag].fullname;
    let email = accounts[indexFlag].email;
    let phone = accounts[indexFlag].phone;
    let password = accounts[indexFlag].password;
    let status = accounts[indexFlag].status;

    let fullNameUser = document.getElementById('fullname').value;
    let emailUser = document.getElementById('email').value;
    let phoneUser = document.getElementById('phone').value;
    let passwordUser = document.getElementById('password').value;

    let fullNameIP = document.getElementById('fullname');
    let emailIP = document.getElementById('email');
    let phoneIP = document.getElementById('phone');
    let passwordIP = document.getElementById('password');
    
    let formMessageName = document.querySelector('.form-message-name');
    let formMessageEmail = document.querySelector('.form-message-email');
    let formMessagePhone = document.querySelector('.form-message-phone');
    let formMessagePassword = document.querySelector('.form-message-password');


    let nameCheck = 0, emailCheck = 0, phoneCheck = 0, passwrCheck = 0;


    if (passwordUser.length == 0) {
        formMessagePassword.innerHTML = 'Vui lòng nhập mật khẩu';
         passwordIP.focus();
    } else if (passwordUser.length < 6) {
        formMessagePassword.innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        passwordIP.focus();
    }else{
        formMessagePassword.innerHTML = '';
        passwrCheck = 1
    }
////////
    if (phoneUser.length == 0) {
        formMessagePhone.innerHTML = 'Vui lòng nhập vào số điện thoại';
        phoneIP.focus();
    } else if (!isValidPhoneNumber(phoneUser)) {
        formMessagePhone.innerHTML = 'Vui lòng nhập đúng định dạng số điện thoại';
        phoneIP.focus();
    }else{
        formMessagePhone.innerHTML = '';
        phoneCheck = 1;
    }
//////////

    if (emailUser.length == 0) {
        formMessageEmail.innerHTML = 'Vui lòng nhập email';
        emailIP.focus();
    }else if(!isValidEmail(emailUser)){
        formMessageEmail.innerHTML = 'Vui lòng nhập email đúng định dạng';
        emailIP.focus();
    }
    else{
        formMessageEmail.innerHTML = '';
        emailCheck = 1
    }
/////////

    if (fullNameUser.length == 0) {
        formMessageName.innerHTML = 'Vui lòng nhập họ và tên';
        fullNameIP.focus();
    } else if (fullNameUser.length < 3) {
        fullNameIP.value = '';
        formMessageName.innerHTML = 'Vui lòng nhập họ và tên lớn hơn 3 kí tự';
        fullNameIP.focus();
    }else{
        formMessageName.innerHTML = '';
        nameCheck = 1;
    }
////////


    if(nameCheck && emailCheck && phoneCheck && passwrCheck){
        if(fullNameUser != fullname || emailUser != email || phoneUser != phone || passwordUser != password || parseInt(sttUs) != parseInt(status) ){
        accounts[indexFlag].fullname = document.getElementById("fullname").value;
        accounts[indexFlag].email = document.getElementById("email").value;
        accounts[indexFlag].phone = document.getElementById("phone").value;
        accounts[indexFlag].password = document.getElementById("password").value;
        accounts[indexFlag].status = sttUs;
        localStorage.setItem("accounts", JSON.stringify(accounts));
        advertise({ title: 'Thành công', message: 'Thay đổi thông tin thành công !', type: 'success', duration: 3000 });
        document.querySelector(".signup").classList.remove("open");
        signUpFormReset();
        showUser();
       }
       else{
        advertise({ title: 'Warning', message: 'Thay đổi thông tin không thành công !', type: 'warning', duration: 3000 });
        document.querySelector(".signup").classList.remove("open");
        signUpFormReset();
        showUser();
       }
    }
})


addAccount.addEventListener("click", (e) => {
    e.preventDefault();
    let fullNameUser = document.getElementById('fullname').value;
    let emailUser = document.getElementById('email').value;
    let phoneUser = document.getElementById('phone').value;
    let passwordUser = document.getElementById('password').value;
        // Check validate
        let fullNameIP = document.getElementById('fullname');
        let emailIP = document.getElementById('email');
        let phoneIP = document.getElementById('phone');
        let passwordIP = document.getElementById('password');
        let formMessageName = document.querySelector('.form-message-name');
        let formMessageEmail = document.querySelector('.form-message-email');
        let formMessagePhone = document.querySelector('.form-message-phone');
        let formMessagePassword = document.querySelector('.form-message-password');

        let accounts = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];

        let checkExistPhone = accounts.some(account => {
            return account.phone == phoneUser;
        })
        let checkExistEmail = accounts.some(account => {
            return account.email == emailUser;
        })

        let nameCheck = 0, emailCheck = 0, phoneCheck = 0, passwrCheck = 0;


        if (passwordUser.length == 0) {
            formMessagePassword.innerHTML = 'Vui lòng nhập mật khẩu';
             passwordIP.focus();
        } else if (passwordUser.length < 6) {
            formMessagePassword.innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
            passwordIP.focus();
        }else{
            formMessagePassword.innerHTML = '';
            passwrCheck = 1
        }
////////
        if (phoneUser.length == 0) {
            formMessagePhone.innerHTML = 'Vui lòng nhập vào số điện thoại';
            phoneIP.focus();
        } else if (!isValidPhoneNumber(phoneUser)) {
            formMessagePhone.innerHTML = 'Vui lòng nhập đúng định dạng số điện thoại';
            phoneIP.focus();
        }else if(checkExistPhone) {
            formMessagePhone.innerHTML = 'Số điện thoại đã tồn tại';
            phoneIP.focus();
        }else{
            formMessagePhone.innerHTML = '';
            phoneCheck = 1;
        }
//////////

        if (emailUser.length == 0) {
            formMessageEmail.innerHTML = 'Vui lòng nhập email';
            emailIP.focus();

        }else if(!isValidEmail(emailUser)){
            formMessageEmail.innerHTML = 'Vui lòng nhập email đúng định dạng';
            emailIP.focus();

        }else if(checkExistEmail){
            formMessageEmail.innerHTML = 'Email đã được sử dụng';
            emailIP.focus();
        }
        else{
            formMessageEmail.innerHTML = '';
            emailCheck = 1
        }
/////////

        if (fullNameUser.length == 0) {
            formMessageName.innerHTML = 'Vui lòng nhập họ và tên';
            fullNameIP.focus();
        } else if (fullNameUser.length < 3) {
            fullNameIP.value = '';
            formMessageName.innerHTML = 'Vui lòng nhập họ và tên lớn hơn 3 kí tự';
            fullNameIP.focus();
        }else{
            formMessageName.innerHTML = '';
            nameCheck = 1;
        }
////////

    if (nameCheck && passwrCheck && emailCheck && phoneCheck) {
        let user = {
            id : createId(accounts),
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
            advertise({ title: 'Thành công', message: 'Tạo thành công tài khoản !', type: 'success', duration: 3000 });
            document.querySelector(".signup").classList.remove("open");
            showUser();
            signUpFormReset();


    }
})

document.getElementById("logout-acc").addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem("currentuser");
    window.location = "/";
})

