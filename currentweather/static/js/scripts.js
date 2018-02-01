// Place your javascript stuff here
$(document).ready(function(){
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    
    $('#alert').click(function() {
        var email = "tmalarkey14@gmail.com";
        var csrftoken = Cookies.get('csrftoken');
        alert('Alert! Bad Weather!')
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
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
});
