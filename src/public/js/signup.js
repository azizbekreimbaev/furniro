console.log("Signup frontend javascript file");

// $(function () {
//     $(".member-nick").click(function () {
//         $(".member-phone").toggle();
//     });
// })


$(function () {
    fileTarget = $(".file-box .upload-hidden");

    let filename;

    fileTarget.on("change", function () {
        if (window.FileReader) {
            const uplaodFile = $(this)[0].files[0];
            const fileType = uplaodFile["type"];
            const validImageType = ["image/jpg", "image/jpeg", "image/png"];
            if (!validImageType.includes(fileType)) {
                alert("please insert only jpeg, jpg, png");
            } else {
                if (uplaodFile) {
                    console.log(URL.createObjectURL(uplaodFile));
                    $(".upload-img-frame").attr("src", URL.createObjectURL(uplaodFile)).addClass("success");
                }
                filename = $(this)[0].files[0].name;
            }

            $(this).siblings(".upload-name").val(filename);
        }
    })
})



function validateSignupForm() {
    const memberNick = $(".member-nick").val();
    const memberPhone = $(".member-phone").val();
    const memberPassword = $(".member-password").val();
    const confirmPassword = $(".confirm-password").val();

    if (memberNick === '' || memberPhone === '' || memberPassword === '' || confirmPassword === '') {
        alert("Please fill out all required inputs")
        return false;
    }
    if (memberPassword !== confirmPassword) {
        alert("Passwords differs, please chech again");
        return false
    }

    const memberImage = $(".member-image").get(0).files[0] ? $(".member-image").get(0).files[0].name : null;
    if (!memberImage) {
        alert("Please insert image");
        return false;
    }


}
