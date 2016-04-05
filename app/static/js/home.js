$( document ).ready(function() {
    var url = window.location.pathname;
    if(url == '/fall/')
    {      
        $.ajax({ //get all the student's fall
            url: '/student_fall_lectures',
            type: 'POST',
            dataType: "json",
            error: function(error) {
                console.log(error);
            },
            success: function(data) {
                $('#courseList').empty();
                $('#courseList').append(HTMLModule.createCourseList(data));
                $('#homeCalendar').append(HTMLModule.createCalendar(data));
            }
        });

    }
    else if(url == '/winter/') //get all the students winter classes
    {
        $.ajax({
            url: '/student_winter_lectures',
            type: 'POST',
            dataType: "json",
            error: function(error) {
                console.log(error);
            },
            success: function(data) {
                $('#courseList').empty();
	           $('#homeCalendar').append(HTMLModule.createCalendar(data));
                $('#courseList').append(HTMLModule.createCourseList(data));
            }
        }); 
    }
    else if(url == '/summer/') //get all the students summer classes
    {
        $.ajax({
            url: '/student_summer_lectures',
            type: 'POST',
            dataType: "json",
            error: function(error) {
                console.log(error);
            },
            success: function(data) {
                $('#courseList').empty();
	           $('#homeCalendar').append(HTMLModule.createCalendar(data));
	           $('#courseList').append(HTMLModule.createCourseList(data));
            }
        }); 
    }

    $('#delete_course').click(function(){
         var selected = [];
         $('input:checkbox', $('#courseList')).each(function() {
           if($(this).is(":checked"))
           {
                selected.push($(this).attr('id'));
           }
         });

         if(selected.length === 0)
         {
             alert('no courses were selected');
         }
         else
         {
           $.each(selected, function(i, id) {
              console.log(id);
              $.ajax({
                  url: '/add_lecture_test',
                  type: 'POST',
                  cache: false,
                  data: {
                       lecture_id: id
                  },
                  error: function(error) {
                console.log(error);
                  },
                  success: function(data) {
                       $('#homeCalendar').empty();
                       $('#homeCalendar').append(HTMLModule.createCalendar(data));
                  }
              });
           });
         }
    });
});
