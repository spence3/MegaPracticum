const loginURL = '/api/v1/login'
const createUser = '/api/v1/add-user'

// $(function(){
//     $(function loginUser(){
//         $('form').on('submit', function(event){
//             event.preventDefault()
//             let loginData = {
//                 userName: $('#userName').val(),
//                 password: $('#password').val()
//             }
            
//             $.ajax({
//                 url: loginURL,
//                 method: 'POST',
//                 data: JSON.stringify(loginData),
//                 contentType: 'application/json',
//                 success: function(response){
//                     console.log('successfully logged in', response)
//                 },
//                 error: function(error){
//                     console.error('Error: ', error)
//              