  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {path: '/index/',url: 'index.html',},
      {path: '/juego/',url: 'juego.html',},
      {path: '/fin/',url: 'fin.html',},
      {path: '/fin2/',url: 'fin2.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
// Esto esta completamente al p.. o me parece?
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    $$("#iniciar").on('click', fnajugar);
})

$$(document).on('page:init', '.page[data-name="juego"]', function (e) {
    console.log("JUgador 1: "+jug1+"/Jugador 2: "+jug2);
    $$("#nombre1p2").html(jug1);
    $$("#nombre2p2").html(jug2);
    $$("#fin").on('click', fnfin);

    //agregue el id limpiar al boton y programe la funcion
    $$("#resultado").on('click', function(){resultado(1)});
    $$("#limpiar").on('click', limpiar);

    $$(".numsj1").on('click', function(){fnCatNums(this.id, 1)});
    $$(".numsj2").on('click', function(){fnCatNums(this.id, 2)});
    $$(".combsj1").on('click', function(){fnCatCombs(this.id)});
    $$(".combsj2").on('click', function(){fnCatCombs(this.id)});
    $$(".radioNumero").on('click', function(){fnRadioNum(this.value)});
    $$(".radioJuego").on('click', function(){fnRadioJuego(this.value)});

})

$$(document).on('page:init', '.page[data-name="fin"]', function (e) {
    $$("#nombrej1_fin").html(jug1+":");
    $$("#nombrej2_fin").html(jug2+":");
    $$("#puntajej1_fin").html(tj1+" puntos");
    $$("#puntajej2_fin").html(tj2+" puntos");
    $$("#gano").html(gano+"!");
    $$("#nueva").on('click', fnfin);
})

$$(document).on('page:init', '.page[data-name="fin2"]', function (e) {
    $$("#gano_generala").html(gano+" !");
    $$("#nueva").on('click', fnfin);
})

/*FUNCIONES*/
tj1 = 0; tj2 = 0; //agregue: total jugador 1 y total jugador 2

var jug1=""; jug2=""; variable=0; pamult=""; radionum = ""; combinacion = ""; j2Selec = 0; gano = "";
    function fnajugar() {
        jug1=$$("#nombre1p1").val();
        if (jug1=="") {jug1="Jugador 1"};
        jug2=$$("#nombre2p1").val();
        if (jug2=="") {jug2="Jugador 2"};
        mainView.router.navigate('/juego/');
    }

    function limpiar() {
        $$(".numsj1").html("--");
        $$(".numsj2").html("--");
        $$(".combsj1").html("--");
        $$(".combsj2").html("--");
    }

    function fnfin() {
        mainView.router.navigate('/index/');
        tj1=0;
        tj2=0;
        gano="";
    }

    function fnCatNums(tid, js){
        pamult=tid.slice(-1);
        if (js == 1)
        j2Selec = 0
        else
        j2Selec = 1
        console.log("clickeado en "+pamult);
    }

    function fnCatCombs(comb){
        combinacion = comb;
        console.log("combinacion realizada " + combinacion)
    }

    function fnRadioNum(radio){
        radionum = radio;
        console.log("opcion de dado " + pamult + ". Dado por Cantidad de veces: " + pamult*radionum);
        if (j2Selec) {
            $$("#j2"+pamult).html(pamult*radionum);
        }else{
            $$("#j1"+pamult).html(pamult*radionum);
        }
    }

    function fnRadioJuego(radio){
        if (radio == "Tachar") {
                $$("#"+combinacion).html(0);
        } else {
            switch (combinacion) {
            case "escalera1":
            case "escalera2":
                if (radio == "Servido") {
                    $$("#"+combinacion).html(25);
                } else {
                    $$("#"+combinacion).html(20);
                };
            break;
            case "full1":
            case "full2":
                if (radio == "Servido") {
                    $$("#"+combinacion).html(35);
                } else {
                    $$("#"+combinacion).html(30);
                };
            break;
            case "poker1":
            case "jpoker2":
                if (radio == "Servido") {
                    $$("#"+combinacion).html(45);
                } else {
                    $$("#"+combinacion).html(40);
                };
            break;
            case "generala1":
            case "generala2":
                if (radio == "Servido") {
                    if (combinacion.slice(-1)==1) {
                        gano = jug1;
                    } else {
                        gano = jug2;
                    };
                    mainView.router.navigate('/fin2/');
                } else {
                    $$("#"+combinacion).html(50);
                };
            break;
            case "generala21":
            case "generala22":
                if (radio == "Servido") {
                    if (combinacion.slice(-1)==1) {
                        gano = jug1;
                    } else {
                        gano = jug2;
                    };
                    mainView.router.navigate('/fin2/');
                } else {
                    $$("#"+combinacion).html(100);
                };
            break;
            };
        };
    }

    function resultado(jd) {
        $$('.numsj'+jd).each(function(){
            if ($$(this).text() != "--") {
                tj1 += parseInt($$(this).text());
            };
        });
        $$('.combsj' + jd).each(function(){
            if ($$(this).text() != "--") {
                tj1 += parseInt($$(this).text());
            };
        });
        $$('.numsj'+(jd+1)).each(function(){
            if ($$(this).text() != "--") {
                tj2 += parseInt($$(this).text());
            };
        });
        $$('.combsj' + (jd+1)).each(function(){
            if ($$(this).text() != "--") {
                tj2 += parseInt($$(this).text());
            };
        });
        console.log(jug1 + " = " + tj1);
        console.log(jug2 + " = " + tj2);

        if (tj1 > tj2) {
            gano = jug1;
        } else if (tj1 < tj2) {
            gano = jug2;
        } else {
            gano = "Hubo un empate!";
        };
        mainView.router.navigate('/fin/');
    }
        
    
