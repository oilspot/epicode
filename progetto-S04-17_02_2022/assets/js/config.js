$(document).ready(function () {
    $.ajax({
        url: 'assets/js/media.json',
        type: 'get',
        dataType: 'json',
        success: function (data) {

            $.each(data.audio, function (i, el) {
                var titolo = el.title;
                var elemento = el.file;
                
                $('#playlistA').append('<li class="list-group-item"><a id="Afakelink" href="'+elemento+'" onclick="event.preventDefault()">' + titolo + '</a></li>');
                
                
                /*$('#Afakelink').click(audioClick());

                function audioClick(){
                    var player = document.getElementById('audioplayer');
                    
                    $('#audiosrc').attr("src");
                    $('#audiosrc').attr("src", elemento);
                    player.play(); 
                }*/

            }),
            
            

            $.each(data.video, function (i, el) {
                var titolo = el.title;
                var elemento = el.file;
                $('#playlistV').append('<li class="list-group-item"><a id="Vfakelink" href="'+elemento+'" onclick="event.preventDefault()">' + titolo + '</a></li>');

                /*$('#Vfakelink').click(videoClick());

            
            function videoClick(){
                var player = document.getElementById('videoplayer');
                    
                    $('#videosrc').attr("src");
                    $('#videosrc').attr("src", elemento);
                    player.play();
            }*/
        })
        },

        error: function (errore) {
            console.log(errore.status)
        }
    });
})