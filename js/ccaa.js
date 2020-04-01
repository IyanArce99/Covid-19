// Variables globales
var comunidad;
var char;
var char2;
var char3;
var casos = [];
var fechas = [];
var fechasEsp = [];
var esp = [];
var espF = [];
var espR = [];
var espU = [];

var muertesComunidad = [];
var recuparadosComunidad = [];
var uciComunidad = [];

var url =
  "https://raw.githubusercontent.com/AlbertoCasasOrtiz/Coronavirus-Spain-Dataset/master/DataSet.json";

function createGraph(comunidad) {
  $('#myChart').removeClass("d-none");
  $.getJSON(url, function(data) {
    $.each(data.InformesDiarios, function(index, value) {
        console.log("c:" + comunidad);
      
      fechas.push(value.Fecha);
      casos.push(value.ComunidadesAutonomas[comunidad].Casos);
      muertesComunidad.push(value.ComunidadesAutonomas[comunidad].Fallecidos);
      recuparadosComunidad.push(value.ComunidadesAutonomas[comunidad].Curados);
      uciComunidad.push(value.ComunidadesAutonomas[comunidad].IngresosUCI);
      console.log(value.ComunidadesAutonomas[comunidad].Fallecidos);
    });

    fechas = fechas.slice(Math.max(fechas.length - 15, 0));
    casos = casos.slice(Math.max(casos.length - 15, 0));
    muertesComunidad = muertesComunidad.slice(Math.max(muertesComunidad.length - 15, 0));
    recuparadosComunidad = recuparadosComunidad.slice(Math.max(recuparadosComunidad.length - 15, 0));
    uciComunidad = uciComunidad.slice(Math.max(uciComunidad.length - 15, 0));
  
     char = new Chart(document.getElementById("myChart").getContext("2d"), {
        type: "line",
        data: {
          labels: fechas,
          datasets: [
            {
              label: "Nº Casos",
              data: casos,
              backgroundColor: [
                "rgb(20,163,132, 0.3)"

              ],
              borderColor: [
                "rgb(20,163,132, 1)"
              ],
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "rgb(20,163,132, 1)",
              pointBorderColor: "rgb(0,0,0, 0)"
            },
            {
              label: "Nº Muertes",
              data: muertesComunidad,
              backgroundColor: [
                "rgb(255,0,0, 0.3)"

              ],
              borderColor: [
                "rgb(255,0,0, 1)"
              ],
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "rgb(255,0,0, 1)",
              pointBorderColor: "rgb(0,0,0, 0)"
            },
            {
              label: "Nº Recuperados",
              data: recuparadosComunidad,
              backgroundColor: [
                "rgb(0,0,255, 0.3)"

              ],
              borderColor: [
                "rgb(0,0,255, 1)"
              ],
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "rgb(0,0,255, 1)",
              pointBorderColor: "rgb(0,0,0, 0)"
            },
            {
              label: "Nº Ingresos UCI",
              data: uciComunidad,
              backgroundColor: [
                "rgb(255, 165, 0, 0.3)"

              ],
              borderColor: [
                "rgb(255, 165, 0, 1)"
              ],
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "rgb(255, 165, 0, 1)",
              pointBorderColor: "rgb(0,0,0, 0)"
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });


});

}

function globalEsp(comunidad) {
  $.getJSON(url, function(data) {
    $.each(data.InformesDiarios, function(index, value) {
      fechasEsp.push(value.Fecha);
      esp.push(value.TotalCasos);
      espF.push(value.TotalFallecidos);
      espR.push(value.TotalCurados);
      espU.push(value.TotalIngresosUCI);
    });

    fechasEsp = fechasEsp.slice(Math.max(fechasEsp.length - 15, 0));
    esp = esp.slice(Math.max(esp.length - 15, 0));
    espF = espF.slice(Math.max(espF.length - 1, 0));
    espR = espR.slice(Math.max(espR.length - 1, 0));
    espU = espU.slice(Math.max(espU.length - 1, 0));


     char2 = new Chart(document.getElementById("esp").getContext("2d"), {
        type: "line",
        data: {
          labels: fechasEsp,
          datasets: [
            {
              label: "Nº Casos",
              data: esp,
              backgroundColor: [
                "rgb(20,163,132, 0.3)"

              ],
              borderColor: [
                "rgb(20,163,132, 1)"
              ],
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: "rgb(20,163,132, 1)",
              pointBorderColor: "rgb(255,0,0, 0)"
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
      // Cargamos otro gráfico
      var piebar = document.getElementById('esp3').getContext('2d');
      char3 = new Chart(piebar, {
        type: 'pie',
        data: {
          datasets: [{
            backgroundColor: ['rgb(61, 214, 208)', 'rgb(88, 114, 145)'],
            data: [espF, espR, espU]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Total fallecidos',
            'Total recuperados',
            'Total ingresos UCI'
        ]
        },
        options: {}
        
      });

});

}

$(document).ready(function() {
  $(document).on("change", "#prov", function(e) {
    $('#casosEsp').hide();
    comunidad = $("#prov").val();
    createGraph(comunidad);
    char.destroy();
    e.preventDefault();
  });
  globalEsp(comunidad);
});
