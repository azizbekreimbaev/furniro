console.log("Users frontend javascript file");

$(function () {
    $('.member-status').on("change", function (e) {
        const id = e.target.id;
        console.log(id);

        const memberStatus = $(`#${id}.member-status`).val();
        console.log(memberStatus);

        // Axious updateUser


        axios.post("/admin/user/edit", {
            _id: id, memberStatus: memberStatus
        }).then((response) => {

            console.log(response);
            const result = response.data;
            console.log(result);

            if (result.data) {
                console.log("User Updated");

                $(".member-status").blur()

            } else alert("User update Failed")


        }).catch((err) => {
            console.log(err);
            alert("User update Failed")
        });

    })
})