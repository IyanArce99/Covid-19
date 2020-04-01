// Sacamos los datos del JSON
$.getJSON('https://corona.lmao.ninja/countries/spain', function(data) {
        
        var cases = `${data.cases}`
        var recover = `${data.recovered}`
        var deaths = `${data.deaths}`
                    
        $("#totalCases").html(cases);
        $("#totalHealed").html(recover);
        $("#totalDeaths").html(deaths);


        $('.Count').each(function () {
                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                  duration: 1000,
                  easing: 'swing',
                  step: function () {
                    $this.text(Math.ceil(this.Counter));
                  }
                });
              });

});

// Variables globales
var comunidad;
var url;


// Declaramos las funciones
    function giveHelp () {
            $('.choose').toggle("slow");
            $('.choose2').hide();

            // Metemos la funcionalidad para twitter
            $(document).on('change', '#busqueda_provincia', function(event) {
                comunidad = $("#busqueda_provincia option:selected").text();
                var msg_gh = `SE AGRADECE DIFUSION: Necesito AYUDA ya que me encuentro en el foco de riesgo por culpa del CORONAVIRUS en ${comunidad}. Gracias a @Elcovid19Es`;
                var msg_ghR = msg_gh.replace(" ", "%20");
                const msg = `${msg_ghR}`;
                url = `https://twitter.com/intent/tweet?hashtags=QuedateEnCasa,Covid19,Coronavirus,AplausoSanitario&text=${msg}`;
                $('#solicitarayuda').click(function (e) { 
                        e.preventDefault();
                        window.location.href = url;      
                });
           });
    }

    function sendHelp () {
            $('.choose2').toggle("slow");
            $('.choose').hide();
            
        // Metemos la funcionalidad para twitter
        $(document).on('change', '#busqueda_provincia2', function(event) {
                comunidad = $("#busqueda_provincia2 option:selected").text(); 
                var msg_sh = `SE AGRADECE DIFUSION: Me presento voluntario para ayudar a cualquier persona que este en el foco de riesgo por el Coronavirus en ${comunidad}. Gracias a @Elcovid19Es`;
                var msg_shR = msg_sh.replace(" ", "%20");
                const msg = `${msg_shR}`;
                url = `https://twitter.com/intent/tweet?hashtags=QuedateEnCasa,Covid19,Coronavirus,AplausoSanitario&text=${msg}`;
                $('#servolunt').click(function (e) { 
                        e.preventDefault();
                        window.location.href = url;      
                                });
                           });
    }
