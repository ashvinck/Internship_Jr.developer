// AJAX
// For validating the input fields --> email,passwords and confirmPassword.
// For checking if user email is already registered or not.
// If everything is alright, the data is posted to the database.


// For validating email
$(document).ready(function () {
    $("#email").on('input', function () {

        // console.log("emailcheck");

        var email, emailReg
        email = $("#email").val(); //get the email from user input
        emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; //regex for email

        if (emailReg.test(email) != true) {
            $("#email").attr("class", "form-control is-invalid");
            $("#registerbtn").prop('disabled', true);
        }
        else {
            $("#email").attr("class", "form-control");
            $("#registerbtn").prop('disabled', false);

        }

    })
});

// For validating password field and choosing a strong password
$(document).ready(function () {
    $("#passwrd").on('input', function () {

        console.log("passwordcheck");

        var checkPasswrd
        checkPasswrd = $("#passwrd").val();
        PasswrdReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
        if (PasswrdReg.test(checkPasswrd) != true) {
            $("#passwrd").attr("class", "form-control is-invalid");
            $("#registerbtn").prop('disabled', true);
        }
        else {
            $("#passwrd").attr("class", "form-control");
            $("#registerbtn").prop('disabled', false);

        }

    })
});


// For checking password and repeat password blanks are same
$(document).ready(function () {
    $("#rpasswrd").on('input', function () {

        console.log("errorcheck");

        var passwrd, rpasswrd
        passwrd = $("#passwrd").val();
        rpasswrd = $("#rpasswrd").val();

        if (passwrd != rpasswrd) {
            $("#rpasswrd").attr("class", "form-control is-invalid");
            $("#registerbtn").prop('disabled', true);
        }
        else {
            $("#rpasswrd").attr("class", "form-control");
            $("#registerbtn").prop('disabled', false);

        }

    })
});


// For checking whether a user already exists with the given email
// $(document).ready(function () {
//     $("#email").on('input', function (e) {
//         e.preventDefault();

//         var email = $("#email").val();
//         dataObj = "email=" + email;

//         $.ajax({

//             type: "POST",
//             url: "php/email_dup_check.php",
//             data: dataObj,
//             cache: false,
//             success: function (result) {
//                 result = Number(result);

//                 if (result) {
//                     $("#error-feedback").html("Username already exists");
//                     $("#registerbtn").prop('disabled', true);
//                 }
//                 else if (!result) {
//                     $("#error-feedback").html("");
//                     $("#subReg").prop('disabled', false);
//                 }
//             }
//         });
//     });
// });


//When Register buttton is clicked
$(document).ready(function () {
    $("#registerbtn").click(function (e) {

        e.preventDefault();
        var email, passwrd, rpasswrd;
        email = $("#email").val();
        passwrd = $("#passwrd").val();
        rpasswrd = $("#rpasswrd").val();


        if (email == "" || passwrd == "" || rpasswrd == "") {
            alert("Please fill all fields")
        }
        else {
            //organize the data properly
            var registerInfo =
                "&email=" + email +
                "&passwrd=" + passwrd;

            //disabled all the text fields
            $('.text').attr('disabled', 'true');

            // console.log(registerInfo);

            // start the ajax
            $.ajax({

                //POST method is used
                type: 'POST',

                //this is the php file that processes the data
                url: "php/register.php",

                //pass the data 
                data: registerInfo,

                cache: false,

                //success
                success: function (response) {
                    if (response === "User Data inserted successfully") {
                        alert("User Registration Successfull. Please Login")
                        location.href = "../guvi/login.html"
                    }
                    else {
                        console.log("Error: ", response);
                        alert("Error");
                    }
                },

                // error
                error: function (request, status, error) {
                    console.log("There was an error: ", request.responseText);
                }
            });
        }
    });
});




