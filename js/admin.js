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
                    <span class="list-current-price">${vnd(product.price)}</span>                   
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
        toast({ title: 'Success', message: 'Xóa sản phẩm thành công !', type: 'success', duration: 3000 });
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
        toast({ title: 'Success', message: 'Khôi phục sản phẩm thành công !', type: 'success', duration: 3000 });
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
    document.getElementById("gia-moi").value = products[index].price;
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
            console.log("sửa",szS);
        }else if(selectbtn ==="M"){
            szM= document.querySelector("#ip-quantity-product").value;
            console.log("sửa",szM);
        }else if(selectbtn ==="L"){
            szL = document.querySelector("#ip-quantity-product").value;
            console.log("sửa",szL);
        }else if(selectbtn ==="XL"){
            szXL = document.querySelector("#ip-quantity-product").value;
            console.log("sửa",szXL);
        }

    if(currentText ==="S"){
        document.getElementById("ip-quantity-product").value=szS;
        console.log(products[indexCur].sizeS);
    }else if(currentText ==="M" ){
        document.getElementById("ip-quantity-product").value = szM;
        console.log(products[indexCur].sizeM);

    }else if(currentText ==="L"){
        document.getElementById("ip-quantity-product").value=szL;
        console.log(products[indexCur].sizeL);

    }else if(currentText ==="XL"){
        document.getElementById("ip-quantity-product").value = szXL;
        console.log(products[indexCur].sizeXL);
    }else{
        document.getElementById("ip-quantity-product").value="";

    }

}

let btnUpdateProductIn = document.getElementById("update-product-button");
btnUpdateProductIn.addEventListener("click", (e) => {
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem("products"));
    let idProduct = products[indexCur].id;
    let imgProduct = products[indexCur].img;
    let imgProductHvr = products[indexCur].imghv;
    let titleProduct = products[indexCur].title;
    let curProduct = products[indexCur].price;
    let descProduct = products[indexCur].desc;
    let categoryProduct = products[indexCur].category;
    let sizeSProduct = products[indexCur].sizeS;
    let sizeMProduct = products[indexCur].sizeM;
    let sizeLProduct = products[indexCur].sizeL;
    let sizeXLProduct = products[indexCur].sizeXL;


    let imgProductCur = getPathImage(document.querySelector(".upload-image-preview").src)
    let imgProductHvrCur = getPathImage(document.querySelector(".image-hover").src)
    let titleProductCur = document.getElementById("ten-ao").value;
    let curProductCur = document.getElementById("gia-moi").value;
    let descProductCur = document.getElementById("mo-ta").value;
    let categoryText = document.getElementById("chon-loai-ao").value;

    let selectbtn = document.querySelector(".list-btn-size.active .btn-size").textContent;
    console.log("sửa",selectbtn);

    if(selectbtn ==="S"){
        szS = document.querySelector("#ip-quantity-product").value;
        console.log("sửa",szS);
    }else if(selectbtn ==="M"){
        szM= document.querySelector("#ip-quantity-product").value;
        console.log("sửa",szM);
    }else if(selectbtn ==="L"){
        szL = document.querySelector("#ip-quantity-product").value;
        console.log("sửa",szL);
    }else if(selectbtn ==="XL"){
        szXL = document.querySelector("#ip-quantity-product").value;
        console.log("sửa",szXL);
    }

    let sizeSCur = szS;
    let sizeMCur = szM;
    let sizeLCur = szL;
    let sizeXLCur = szXL; 

    if (imgProductCur != imgProduct|| imgProductHvrCur != imgProductHvr || titleProductCur != titleProduct || curProductCur != curProduct || descProductCur != descProduct || categoryText != categoryProduct || sizeSCur != sizeSProduct || sizeMCur != sizeMProduct || sizeLCur != sizeLProduct || sizeXLCur != sizeXLProduct) {
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
            price: parseInt(curProductCur),
            desc: descProductCur,
            status: 1,
        };
        products.splice(indexCur, 1);
        products.splice(indexCur, 0, productadd);
        localStorage.setItem("products", JSON.stringify(products));
        toast({ title: "Success", message: "Sửa sản phẩm thành công!", type: "success", duration: 3000, });
        setDefaultValue();
        document.querySelector(".add-product").classList.remove("open");
        showProduct();
    } else {
        toast({ title: "warning", message: "Sửa sản phẩm không thành công!", type: "warning", duration: 3000, });
    }
});

let btnAddProductIn = document.getElementById("add-product-button");
btnAddProductIn.addEventListener("click", (e) => {
    e.preventDefault();
    let imgProduct = getPathImage(document.querySelector(".upload-image-preview").src)
    let imgHvrProduct = getPathImage(document.querySelector(".image-hover").src)


    let tenAo = document.getElementById("ten-ao").value;
    let price = document.getElementById("gia-moi").value;
    let moTa = document.getElementById("mo-ta").value;
    let categoryText = document.getElementById("chon-loai-ao").value;
    if(tenAo == "" || price == "" || moTa == "") {
        toast({ title: "Chú ý", message: "Vui lòng nhập đầy đủ thông tin sản phẩm!", type: "warning", duration: 3000, });
    } else {
        if(isNaN(price)) {
            toast({ title: "Chú ý", message: "Giá phải ở dạng số!", type: "warning", duration: 3000, });
        } else {
            let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
            let product = {
                id: createId(products),
                title: tenAo,
                img: imgProduct,
                imghv: imgHvrProduct,
                category: categoryText,
                price: price,
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
            toast({ title: "Success", message: "Thêm sản phẩm thành công!", type: "success", duration: 3000});
            setDefaultValue();
        }
    }
});




function toast({
    title = 'Success',
    message = 'Tạo tài khoản thành công',
    type = 'success', 
    duration = 3000
}){
    const main = document.getElementById('toast');
    if(main){
        const toast = document.createElement('div');
        //Auto remove toast
        const autoRemove = setTimeout(function(){
            main.removeChild(toast);
        },duration+1000);
        //Remove toast when click btn close
        toast.onclick = function(e){
            if(e.target.closest('.fa-regular')){
                main.removeChild(toast);
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
        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `<div class="toast__private" >
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title" >${title}</h3>
            <p class="toast__msg">
                ${message}
            </p>
        </div>

    </div>
    
    <div class="toast__background"style="background-color: ${color};">
    </div>`
    // document.querySelector('.toast__background').classList.add("initial");
    main.appendChild(toast);
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
console.log(orders);
window.onload = showOrder(orders);

// Get Order Details
function getOrderDetails(madon) {
    let orderDetails = localStorage.getItem("orderDetails") ?
        JSON.parse(localStorage.getItem("orderDetails")) : [];
        console.log(orderDetails);
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
            <span class="thanhtien">Thành tiền</span>
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
    let timeStart = document.getElementById("time-start").value;
    let timeEnd = document.getElementById("time-end").value;
    
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
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    document.getElementById("tinh-trang").value = 2;
    document.getElementById("form-search-order").value = "";
    document.getElementById("time-start").value = "";
    document.getElementById("time-end").value = "";
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
        obj.quantity = item.soluong;
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
    let timeStart = document.getElementById("time-start-tk").value;
    let timeEnd = document.getElementById("time-end-tk").value;
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
    showThongKe(result,mode);
}

// Show số lượng sp, số lượng đơn bán, doanh thu
function showOverview(arr){
    document.getElementById("quantity-product").innerText = arr.length;
    document.getElementById("quantity-order").innerText = arr.reduce((sum, cur) => (sum + parseInt(cur.quantity)),0);
    document.getElementById("quantity-sale").innerText = vnd(arr.reduce((sum, cur) => (sum + parseInt(cur.doanhthu)),0));
}

function showThongKe(arr,mode) {
    let orderHtml = "";
    let mergeObj = mergeObjThongKe(arr);
    showOverview(mergeObj);

    switch (mode){
        case 0:
            mergeObj = mergeObjThongKe(createObj());
            showOverview(mergeObj);
            document.getElementById("the-loai-tk").value = "Tất cả";
            document.getElementById("form-search-tk").value = "";
            document.getElementById("time-start-tk").value = "";
            document.getElementById("time-end-tk").value = "";
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
        <td><div class="prod-img-title"><img class="prd-img-tbl" src="${mergeObj[i].img}" alt=""><p>${mergeObj[i].title}</p></div></td>
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
            <button class="btn-delete" id="delete-account" onclick="deleteAcount(${index})"><i class="fa-regular fa-trash"></i></button>
            </td>
        </tr>`
        })
    }
    document.getElementById('show-user').innerHTML = accountHtml;
}

function showUser() {
    let tinhTrang = parseInt(document.getElementById("tinh-trang-user").value);
    let ct = document.getElementById("form-search-user").value;
    let timeStart = document.getElementById("time-start-user").value;
    let timeEnd = document.getElementById("time-end-user").value;

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
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")).filter(item => item.userType == 0) : [];
    showUserArr(accounts);
    document.getElementById("tinh-trang-user").value = 2;
    document.getElementById("form-search-user").value = "";
    document.getElementById("time-start-user").value = "";
    document.getElementById("time-end-user").value = "";
}

window.onload = showUser();

function deleteAcount(phone) {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let index = accounts.findIndex(item => item.phone == phone);
    if (confirm("Bạn có chắc muốn xóa?")) {
        accounts.splice(index, 1)
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
    showUser();
}

let indexFlag;
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
    document.getElementById("user-status").checked = accounts[index].status == 1 ? true : false;
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
        accounts[indexFlag].fullname = document.getElementById("fullname").value;
        accounts[indexFlag].email = document.getElementById("email").value;
        accounts[indexFlag].phone = document.getElementById("phone").value;
        accounts[indexFlag].password = document.getElementById("password").value;
        accounts[indexFlag].status = document.getElementById("user-status").checked ? true : false;
        localStorage.setItem("accounts", JSON.stringify(accounts));
        toast({ title: 'Thành công', message: 'Thay đổi thông tin thành công !', type: 'success', duration: 3000 });
        document.querySelector(".signup").classList.remove("open");
        signUpFormReset();
        showUser();
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
            console.log(user);
            accounts.push(user);
            localStorage.setItem('accounts', JSON.stringify(accounts));
            toast({ title: 'Thành công', message: 'Tạo thành công tài khoản !', type: 'success', duration: 3000 });
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

