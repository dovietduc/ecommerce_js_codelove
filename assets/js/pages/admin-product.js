const selectCate = document.querySelector('.category_wrapper_form');
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
    console.log('validate sucess');
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