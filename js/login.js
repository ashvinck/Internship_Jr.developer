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
        var email, passwrd, info;
        email = $("#email").val();
        passwrd = $("#passwrd").val().split("").reverse().join("");

        info = btoa(email + ":" + passwrd);


        //organize the data properly
        var loginInfo =
            "&info=" + info;

        // console.log(loginInfo);
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
                if (response === "User not found") {
                    alert("User not found!");
                }
                else {
                    try {
                        console.log(JSON.parse(response));
                        localStorage.setItem("userData", response);
                        localStorage.setItem("token", loginInfo);
                        location.href = "../guvi/profile.html"
                    }
                    catch (err) {
                        console.log('error occured');
                        alert('Unable to connect to server');
                    }
                }
            },

            // error
            error: function (request, status, error) {
                console.log("Oops error occured: ", request.responseText);
            }
        });

    });
});