const loginURL = '/login'
const createUser = '/api/v1/add-user'

$(function() {
    $('form').on('submit', function(event) {
        event.preventDefault(); 

        // Gather form data
        let loginData = {
            username: $('#userName').val(),
            password: $('#password').val()
        };

        // Send the AJAX request
        $.ajax({
            url: loginURL,
            method: 'POST',
            data: JSON.stringify(loginData),
            contentType: 'application/json',  // Set the content type as JSON
            success: function(response) {
                console.log('Successfully logged in:', response);
                // Redirect or update the page as needed
                window.location.href = '/test';  // Example redirect after successful login
            },
            error: function(error) {
                console.error('Error:', error.responseText);  // Log the error message
            }
        });
    });
});
