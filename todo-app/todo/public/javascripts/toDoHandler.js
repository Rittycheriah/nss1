$(document).ready(function() {
    $('.edit').click(function() {
        var todoItemId = $(this)[0].id;

        window.location.href = '/todo/' + todoItemId;

        // $.ajax({
        //     url: '/todo/' + todoItemId,
        //     method: 'GET',
        //     success: function(response) {

        //     }
        // });
    });
    $('.delete').click(function() {
        var todoItemId = $(this)[0].id;

        $.ajax({
            url: '/todo',
            method: 'DELETE',
            data: {
                todo_id: todoItemId
            },
            success: function(response) {
                $('#todo_' + todoItemId).remove();
            }
        });
    });

});