// AJAX


// Get User Data from DB
const getUserData = () => {
    // getting data from the database and populating the profile.
    $.ajax({
        type: "GET",
        url: "php/get-profile.php",

        //success
        success: function (response) {
            // Display the user data
            var userData = JSON.parse(response);
            $("#disName").html(userData.name);
            $("#disdob").html(userData.dob);
            $("#disAge").html(userData.age);
            $("#disPhone").html(userData.phone);
            $("#disAddress").html(userData.address);
            $("#disWork").html(userData.work);
            // console.log(userData)
            // Populate the edit form
            $("#fullname").val(userData.name);
            $("#dob").val(userData.dob);
            $("#age").val(userData.age);
            $("#phone").val(userData.phone);
            $("#address").val(userData.address);
            $("#work").val(userData.work);

        },

        // error
        error: function (request, status, error) {
            console.log("There was an error: ", request.responseText);
        }
    });
}
getUserData();

// Form submit function,
// this is triggered after the user clicks save changes button
// It takes input from the user and performs various http methods

$(document).ready(function () {
    $("#editprofile").click(function (e) {

        e.preventDefault();

        // Taking input from the user
        var fullname, dob, age, phone, address, work
        fullname = $("#fullname").val();
        dob = $("#dob").val();
        age = $("#age").val();
        phone = $("#phone").val();
        address = $("#address").val();
        work = $("#work").val();

        // All fields are required to prevent the form submission
        if (fullname == "" || dob == "" || age == "" || phone == "" || address == "" || work == "") {
            alert("Please fill all fields")
        }
        else {

            //organize the data properly
            var editInfo =
                "&fullname=" + fullname +
                "&dob=" + dob +
                "&age=" + age +
                "&phone=" + phone +
                "&address=" + address +
                "&work=" + work;

            //disabled all the text fields
            $('.text').attr('disabled', 'true');


            // console.log(editInfo);

            // Post function 
            const postUserData = () => {
                return new Promise((resolve, reject) => {
                    // start the ajax
                    $.ajax({

                        //POST method is used
                        type: 'POST',

                        //this is the php file that processes the data
                        url: "php/profile.php",

                        //pass the data 
                        data: editInfo,

                        cache: false,

                        //success
                        success: function (result) {
                            // console.log("Response was: ", result);
                            if (result) {
                                // Toggles the value of button-action html element
                                // to switch between post and put methods
                                $('#id').val(id);
                                $('#button_action').val('update');
                                $('#action').val('update');
                            }
                            resolve(result);
                        },

                        // error
                        error: function (request, status, error) {
                            console.log("There was an error: ", request.responseText);
                            reject(request);
                        }
                    });
                });
            }

            // Update User Data 
            const updateUserData = () => {
                return new Promise((resolve, reject) => {
                    $.ajax({

                        //POST method is used
                        type: 'POST',

                        //this is the php file that processes the data
                        url: "php/profile-edit.php",

                        //pass the data 
                        data: editInfo,

                        cache: false,

                        //success
                        success: function (result) {
                            console.log("Response was: ", result);
                            resolve(result);
                        },

                        // error
                        error: function (request, status, error) {
                            console.log("There was an error: ", request.responseText);
                            reject(request);
                        }
                    });
                })
            }


            // To determine to post or update the user data
            // If button_action === insert POST operation is commenced
            // Otherwise (button_action === update) UPDATE operation is commenced
            res = $('#button_action').val();
            // console.log(res);

            if (res === "insert") {
                postUserData()
                    .then((data) => {
                        console.log(data);
                        getUserData();
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
            else {
                updateUserData()
                    .then((data) => {
                        console.log(data);
                        getUserData();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        };
    });
});