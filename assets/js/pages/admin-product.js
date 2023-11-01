const selectCate = document.querySelector('.category_wrapper_form');
const formProduct = document.querySelector('#form_save_product');
function showCategoryInProduct() {
    // 1. Lay toan bo danh muc trong local
    const cateAll = JSON.parse(localStorage.getItem('categories')) || [];
    let htmlOption = '<option value="">Chọn danh mục</opttion>';
    cateAll.forEach(
        function(element) {
            htmlOption = htmlOption + `<option value="${element.id}">${element.name}</option>`;
        }
    );

    // 2. đưa options vào trong select
    selectCate.innerHTML = htmlOption;

}

function validateProductSuccess() {
    // 1. Lay ra value cua input và tạo ra object chứa thông tin sản phẩm
    let objValue = {};
    const inputAll = formProduct.querySelectorAll('.form-control-item');
    inputAll.forEach(
        function(element) {
            if(element.name === 'category_wrapper_form') {
                objValue['category_id'] = element.value;
            } else {
                objValue[element.name] = element.value;
            }
        }
    );
    objValue.id = crypto.randomUUID();
    const productType = document.querySelector('.type_product:checked').value;
    objValue.product_type = productType;

    // 2 đưa object vào trong mảng
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productsNew = [objValue, ...products];

    // 3. lưu dữ liệu vào local storage
    localStorage.setItem('products', JSON.stringify(productsNew));
    
}


// Hiển thị danh mục khi load trang lần đầu
showCategoryInProduct();
let validateProduct = new Validate(
    {
        container: "#form_save_product",
        btnClassSubmit: 'btn_save',
        rules: {
            name: {
                required: true
            },
            category_wrapper_form: {
                required: true
            },
            price_product: {
                required: true
            },
            image: {
                required: true
            },
            description: {
                required: true
            }
        },
        messages: {
            name_required: 'Ten khong duoc de trong'
        },
        success: validateProductSuccess
    }
);