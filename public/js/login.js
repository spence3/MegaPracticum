const loginURL = '/api/v1/login'
const createUser = '/api/v1/add-user'

$(function(){
   $(function loginUser(){
        $('form').on('submit', function(event){
            event.preventDefault()
            let createData = {
                id: 1,
                university_Id: 1,
                role: 'Admin',
                first_name: 'root_uvu',
                last_name: 'admin_user',
                password: 'willy'
            }
            
            $.ajax({
                url: createUser,
                method: 'POST',
                data: JSON.stringify(createData),
                contentType: 'application/json',
                success: function(response){
                    console.log('successfully logged in', response)
                },
                error: function(error){
                    console.log('errroororro')
                    console.error('Error: ', error)
                }
                
            })
        })
   })
})




// $(function loginUser(){
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
//                 }
                
//             })
//         })
//    })