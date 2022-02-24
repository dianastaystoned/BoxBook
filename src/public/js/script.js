createPw = document.querySelector("#pswd");
confirmPw = document.querySelector("#confirmPw");
alertIcon = document.querySelector(".errorIcon");
alertText = document.querySelector(".text");
submitBtn = document.querySelector("#submit")

createPw.addEventListener("input", () => {
    let inputValue = createPw.value.trim();
    if (inputValue.length >= 8) {
        confirmPw.removeAttribute("disabled");
        submitBtn.removeAttribute("disabled");
        submitBtn.classList.add("active");
    }else{
        confirmPw.setAttribute("disabled", true);
        submitBtn.setAttribute("disabled", true);
        submitBtn.classList.remove("active");
        confirmPw.value = "";
        alertText.innerText ="Enter a least 8 characters";
        alertText.style.color ="#a6a6a6";
    }
});

submitBtn.addEventListener("keyup", () => {
    if (createPw.value === confirmPw.value) {
        alertText.innerText = "Password match";
        alertIcon.style.display = "none";
        alertText.style.color = "#4070F4";
    }else{
        alertText.innerText = "Password didn't match";
        alertText.style.color = "#D93025";
        alertIcon.style.display = "block";
    }
});