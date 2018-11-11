/*global $*/
$(document).ready(() => {
    $('#add').click(() => {
        if (!$('#name').val() || !$('#url').val()) {
            window.alert('please enter a url and name to add');
            return;
        }
        var video = { name: $('#name').val(), url: $('#url').val() }
        $.post('add', video);
    });

    $('#get').click(() => {
        if (!$('#name').val() && !$('#url').val()) {
            window.alert('please enter a url and/or name to add');
            return;
        }
        var video = { name: $('#name').val(), url: $('#url').val() }
        $.getJSON('getVideo', video, (data) => console.log(data));
    });

    $('#erase').click(() => $.post('erase'));
});
