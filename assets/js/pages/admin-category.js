
let validateCategory = new Validate(
    {
        container: "#category_form_add",
        btnClassSubmit: 'btn_category_save',
        rules: {
            category_name: {
                required: true
            }
        },
        messages: {
            category_name_required: 'Danh muc khong duoc de trong'
        },
        success: function() {
            console.log('success');
        }
    }
);