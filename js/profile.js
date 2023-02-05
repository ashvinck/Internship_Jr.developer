// AJAX
// Get User Data from DB

if (localStorage.getItem("token") == null) {
    location.href = "../guvi/login.html"
}
else {
    const getUserData = () => {
        // Retrieving user email from local storage
        var userData = localStorage.getItem("userData")
        var data = JSON.parse(userData)
        var email = data.email;
        updatePar = "email=" + email;
        // getting data from the database and populating the profile.
        $.ajax({
            type: "POST",
            url: "php/get-profile.php",
            data: updatePar,
            cache: false,

            //success
            success: function (response) {
                // Display the user data
                var userData = JSON.parse(response);
                $("#disName").html(userData.name);
                $("#disAge").html(userData.age);
                $("#disPhone").html(userData.phone);
                $("#disAddress").html(userData.address);
                $("#disWork").html(userData.work);
                // console.log(userData)
                // Populate the edit form
                $("#fullname").val(userData.name);
                $("#age").val(userData.age);
                $("#phone").val(userData.phone);
                $("#address").val(userData.address);
                $("#work").val(userData.work);

            },
        });
    }
    getUserData();

    // Form submit function,
    // this is triggered after the user clicks save changes button
    // It takes input from the user and performs various http methods

    $(document).ready(function () {
        $("#editprofile").click(function (e) {

            e.preventDefault();
            // Retrieving user email from local storage
            var userData = localStorage.getItem("userData")
            var data = JSON.parse(userData)
            var email = data.email;

            // Taking input from the user
            var fullname, age, phone, address, work
            fullname = $("#fullname").val();
            age = $("#age").val();
            phone = $("#phone").val();
            address = $("#address").val();
            work = $("#work").val();

            // All fields are required to prevent the form submission
            if (fullname == "" || age == "" || phone == "" || address == "" || work == "") {
                alert("Please fill all fields")
            }
            else {

                //organize the data properly
                var editInfo =
                    "&fullname=" + fullname +
                    "&age=" + age +
                    "&phone=" + phone +
                    "&address=" + address +
                    "&work=" + work +
                    "&email=" + email;


                // Update User Data 
                // Creating a promise to be resolved before sending a get request.
                const updateUserData = () => {
                    return new Promise((resolve, reject) => {
                        $.ajax({

                            //POST method is used
                            type: 'POST',

                            //this is the php file that processes the data
                            url: "php/profile-edit.php",

                            //pass the data 
                            data: editInfo,

                            //success
                            success: function (result) {
                                // console.log("Response was: ", result);
                                alert(result);
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

                // Calling GET request  to update the data after POST request
                updateUserData()
                    .then((data) => {
                        // console.log(data);
                        getUserData();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
        });
    })
};

// Log out function
$(document).ready(function () {
    $("#logoutbuttn").click(function () {
        $.ajax({
            type: "POST",
            url: "php/logout.php",
            cache: false,
            success: function (result) {
                localStorage.clear();
                location.href = "../guvi/login.html"
            }
        });
    })
});
