console.log("Products frontend javascript file");
console.log("Signup frontend javascript file");

// $(function () {
//     $(".member-nick").click(function () {
//         $(".member-phone").toggle();
//     });
// })


$(function () {


    $("#process-btn").on("click", function () {

        $(".dish-container").slideDown(100, function () {

            $("html, body").animate(
                {
                    scrollTop: $(".dish-container").offset().top - 30
                },
                600
            );

        });

        $("#process-btn").hide();

    });

    $("#cancel-btn").on("click", () => {
        $(".dish-container").slideToggle(100);
        $("#process-btn").css("display", "flex")
    })

    $(".new-product-status").on("change", async function (e) {
        const id = e.target.id;
        const productStatus = $(`#${id}.new-product-status`).val();
        console.log('====================================');
        console.log(id);
        console.log(productStatus);
        console.log('====================================');


        try {


            const response = await axios.post(
                `/admin/product/update/${id}`,
                {
                    productStatus: productStatus
                }
            );
            const result = response.data

            console.log('====================================');
            console.log("Product updated");
            console.log('====================================');
            $('.new-product-status').blur()

        } catch (err) {
            console.error("Product update failed:", err);
            console.error("Backend response:", err.response?.data);
            console.error("HTTP status:", err.response?.status);

            alert(
                err.response?.data?.message ||
                "Product update failed"
            );
        }

    })



})



function validateForm() {

    const productName =
        $(".product-name").val()?.trim();

    const productPrice =
        $(".product-price").val();

    const productLeftCount =
        $(".product-left-count").val();

    const productDesc =
        $(".product-desc").val()?.trim();

    const productStatus =
        $(".product-status").val();


    if (
        !productName ||
        productPrice === "" ||
        productLeftCount === "" ||
        !productStatus
    ) {

        alert(
            "Please fill out all required inputs"
        );

        return false;

    }


    if (Number(productPrice) < 0) {

        alert(
            "Product price cannot be negative"
        );

        return false;

    }


    if (Number(productLeftCount) < 0) {

        alert(
            "Product count cannot be negative"
        );

        return false;

    }


    return true;
}


function previewFileHandler(input, order) {
    const imgClassName = input.className;
    const file = $(`.${imgClassName}`).get(0).files[0];
    const fileType = file['type']
    const validImageType = ["image/jpg", "image/jpeg", "image/png"];
    if (!validImageType.includes(fileType)) {
        alert("please insert only jpeg, jpg, png");
    } else {
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                $(`#image-section-${order}`).attr("src", reader.result);
            }
            reader.readAsDataURL(file);
        }
    }
}
