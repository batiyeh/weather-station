// Place your javascript stuff here
$(document).ready(function(){
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    
    $('#email-btn').click(function() {
        var email = "tmalarkey14@gmail.com";
        var csrftoken = Cookies.get('csrftoken');
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                // Check if the HTTP method requires a csrf token before adding the header
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });

        $.ajax({
            type: "POST",
            url: '/testAlert', // This is the url to the django view in urls.py
            dataType: 'json',
            data: {
               email: email
            },
            success: function (data) {
                console.log(data);
            }
        });

    });

    $('#loginForm').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'verifyLogin',
            data: {
                email: $('#email').val(),
                password: $('#password').val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (data) {
                console.log(data.responseJSON);
                location.href = "/currentweather";
            },
            error: function (data) {
                console.log(data.responseJSON);
            },
            failure: function (data) {
                console.log(data.responseJSON);
            }
        });
    });

    $('#createForm').submit(function (e) {
        //on submit, POST data from page
        e.preventDefault();
        //stops page from refreshing

        $.ajax({
            type: 'POST',
            url: 'create',
            data: {
                email: $('#email').val(),
                phone: $('#phone').val(),
                password: $('#password').val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (data) {
                console.log(data.responseJSON);
            },
            error: function (data) {
                console.log(data.responseJSON);
            },
            failure: function (data) {
                console.log(data.responseJSON);
            }
        });
    });
});
