// AJAX
// For validating the input fields --> email & password.
// If credentials are true, then user is logged in.

// For validating inputs
$(document).ready(function () {

    // Validating Email
    $("#email").on('input', function () {
        // console.log("emailcheck");
        var email, emailReg
        email = $("#email").val(); //get the email from user input
        emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; //regex for email

        if (emailReg.test(email) != true) {
            $("#email").attr("class", "form-control is-invalid");
            $("#loginbuttn").prop('disabled', true);
        }
        else {
            $("#email").attr("class", "form-control");
            $("#loginbuttn").prop('disabled', false);
        }
    })

    // validating Password
    $(document).ready(function () {
        $("#passwrd").on('input', function () {
            // console.log("passwordcheck");
            var checkPasswrd
            checkPasswrd = $("#passwrd").val();
            PasswrdReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
            if (PasswrdReg.test(checkPasswrd) != true) {
                $("#passwrd").attr("class", "form-control is-invalid");
                $("#loginbuttn").prop('disabled', true);
            }
            else {
                $("#passwrd").attr("class", "form-control");
                $("#loginbuttn").prop('disabled', false);
            }
        })
    });



});

//When Login buttton is clicked
$(document).ready(function () {
    $("#loginbuttn").click(function (e) {

        e.preventDefault();
        var email, passwrd;
        email = $("#email").val();
        passwrd = $("#passwrd").val();

        //organize the data properly
        var loginInfo =
            "email=" + email +
            "&passwrd=" + passwrd;

        // start the ajax
        $.ajax({

            //POST method is used
            type: "POST",

            //this is the php file that processes the data
            url: "php/login.php",

            //pass the data 
            data: loginInfo,

            cache: false,

            dataType: "text",

            //success
            success: function (response) {
                console.log("Respone was: ", response);
                if (response.includes("User Found")) {
                    localStorage.setItem("userdata", response)
                    console.log(res)
                }
            },

            // error
            error: function (request, status, error) {
                console.log("Oops error occured: ", request.responseText);
            }
        });

    });
});