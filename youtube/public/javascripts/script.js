/*global $*/
$(document).ready(() => {
    $('#add').click(() => {
        if (!$('#name').val() || !$('#url').val()) {
            window.alert('please enter a url and name to add');
            return;
        }

        var url = $('#url').val();
        if (!isYoutubeUrl(url)) {
            window.alert('please enter a valid youtube url');
            return;
        }
        var video = { name: $('#name').val(), url: url }

        $.getJSON('getVideo', video, (data) => {
            console.log(data);
            if (!$.isEmptyObject(data)) {
                window.alert('Name and/or URL is already taken');
                return;
            }
            else {
                $.post('add', video);
            }
        });
    });

    $('#get').click(() => {
        if (!$('#name').val() && !$('#url').val()) {
            window.alert('please enter a url and/or name to add');
            return;
        }
        var video = { name: $('#name').val(), url: $('#url').val() }
        $.getJSON('getVideo', video, (data) => {
            if ($.isEmptyObject(data)) window.alert('video not found');
            $("#video").attr("src", "https://www.youtube.com/embed/" + extractVideoId(data.url));
        });
    });

    $('#list').click(() => {
        $.getJSON('list', (data) => {
            $('#listContainer').html("");
            if ($.isEmptyObject(data))
                window.alert('database is empty');
            else {
                $('#listContainer').append('<h1>Videos</h1>');
                $.each(data, (k, video) => {
                    console.log(video.name);
                    $('#listContainer').append(video.name + '<br>');
                });
            }
        });
    });

    $('#erase').click(() => {
        $.post('erase');
        $('#listContainer').html("");
        $("#video").attr("src", "");

    });
});

function extractVideoId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match[2];
}

function isYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
        return true;
    }
    return false;
}
