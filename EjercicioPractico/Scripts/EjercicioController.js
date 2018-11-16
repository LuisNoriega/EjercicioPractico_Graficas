var EjercicioController = function () {


    var Incializar = function () {
        var url = '/Chart/LeerExcel';
        Cargar(url, function (data) {
            console.log(data);
            if (data != undefined) {
                var objeto = JSON.parse(data);
                console.log(objeto);
                CrearChartBarras(objeto);
                CrearChartPie(objeto);
                var result = EncontrarValores(objeto);
                $('#Error').html('');
                $('#CalificacionesValoresMayor').append('La Calificacion mayor la obtuvo:' + ' ' + result.NombreMayor + ' con  ' + result.Mayor);
                $('#CalificacionesValoresMenor').append('La Calificacion menor la obtuvo:' + ' ' + result.NombreMenor + ' con  ' + result.Menor);
                $('#CalificacionesValoresPromedio').append('La Calificacion promedio de los alumnos fue :' + ' ' + result.Promedio);
            } else {
                $('#Error').html('Error al cargar archivo verifique la ubicacion en ChartController.cs');
            }
         
       
        });


    }

    var CrearChartBarras = function (Datos) {
        var lstNombres = [];
        var lstCalificaciones = [];
        var popCanvas = document.getElementById("popChart");
        var popCanvas = document.getElementById("popChart").getContext("2d");
        $.each(Datos, function (key, value) {
            lstNombres = lstNombres.concat(value['Nombres'] +' '+ value['Apellido Paterno'] + ' '+ value['Apellido Materno']);
            lstCalificaciones = lstCalificaciones.concat(''+value['Calificacion']);
        })

        console.log(lstNombres);
        console.log(lstCalificaciones);

        var barChart = new Chart(popCanvas, {
            type: 'bar',
            data: {
                labels: lstNombres,
                datasets: [{
                    label: 'Calificacion',
                    data: lstCalificaciones,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(7, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)'
                    ]
                }]
            }
        });
    }
    var Cargar = function (url, Callback) {
        $.get(url, function (data) {
            Callback(data);
        });
    }

    var EncontrarValores = function (datos) {
        var Menor;
        var Mayor = 0;
        var NombreMayor = '';
        var NombreMenor = '';
        var Promedio = 0;
        var cnt = 0;
        $.each(datos, function (key, value) {
            cnt = cnt + 1;
            Promedio = Promedio + value['Calificacion'];
            if (value['Calificacion'] > Mayor) {
                Mayor = value['Calificacion'];
                Menor = Mayor;
                NombreMayor = value['Nombres'] + ' ' + value['Apellido Paterno'] + ' ' + value['Apellido Materno'];
            }
        });

        $.each(datos, function (key, value) {
            if (value['Calificacion'] < Menor) {
                Menor = value['Calificacion'];
                NombreMenor = value['Nombres'] + ' ' + value['Apellido Paterno'] + ' ' + value['Apellido Materno'];
            }
        });
        Promedio = (Promedio / cnt);
        var Resultado = { NombreMayor, Mayor, NombreMenor, Menor, Promedio };
        return (Resultado);

    }


    var CrearChartPie = function (datos) {
        var Grado1 = 0;
        var Grado2 = 0;
        var Grado3 = 0;
        var cnt1 = 0;
        var cnt2 = 0;
        var cnt3 = 0;
        $.each(datos, function (key, value) {
            if (value['Grado'] == 1) {
                Grado1 = Grado1 + value['Calificacion'];
                cnt1 += 1;
            } else {
                if (value['Grado'] == 2) {
                    Grado2 = Grado2 + value['Calificacion'];
                    cnt2 += 1;
                } else {
                    Grado3 = Grado3 + value['Calificacion'];
                    cnt3 += 1;
                }
            }
        });

        Grado1 = (Grado1 / cnt1);
        Grado2 = (Grado2 / cnt2);
        Grado3 = (Grado3 / cnt3);

        var Data = {
            labels: [
                "Promedio grupo 1",
                "Promedio grupo 2",
                "Promedio grupo 3",
            ],
            datasets: [
                {
                    data: [Grado1, Grado2, Grado3],
                    backgroundColor: [
                        "#FF6384",
                        "#63FF84",
                        "#8463FF",
                        "#6384FF"
                    ]
                }]
        };


        var pieChart = document.getElementById("pieChart");
        var myPieChart = new Chart(pieChart, {
                type: 'pie',
                data: Data,
        });
          
    }


    return {
        Incializar: Incializar,
    }
   

}