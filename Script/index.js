// console.log("Connected")

document.getElementById("sign-btn").addEventListener("click",()=>{

    const usernameInput = document.getElementById("username-input");
    const username = usernameInput.value;

    const passInput = document.getElementById("password-input");
    const password = passInput.value;

    if(username === "admin" && password === "admin123"){
        alert("Login Successful");
        window.location.assign("/home.html");
    }else{
        alert("Login Failed");
        return;
    }

})