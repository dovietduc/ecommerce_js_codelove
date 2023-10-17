function isLoginAlready() {
    // 1. Lấy tất cả các user trong hệ thống

    const users = JSON.parse(localStorage.getItem('users'));
    const isLoged = users.some(
        function(element){
            return element.status === 'active';
        }
    );
    
    // Nếu user đang loggin trong hệ thống thì chuyển sang -> my-acount.html
    if(isLoged) {
        window.location.href = '/my-account.html';
    }
}


isLoginAlready();