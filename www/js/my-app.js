  
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
    //$$("#limpiar").on('click', resultado); 
    $$("#calcular").on('click', resultado);

    $$(".numsj1").on('click', function(){fnCatNums(this.id)});
    $$(".combsj1").on('click', function(){fnCatCombs(this.id)});
    $$(".numsj2").on('click', function(){fnCatNums(this.id)});
    $$(".combsj2").on('click', function(){fnCatCombs(this.id)});
    $$(".radioNumero").on('click', function(){fnRadioNum(this.value)});
    $$(".radioNumero").on('click', function(){fnRadioNum2(this.value)});
    $$(".radioJuego").on('click', function(){fnRadioJuego(this.value)});
    $$(".radioJuego").on('click', function(){fnRadioJuego2(this.value)});
    //$$(".varsheet").on('click',fnVarSheet);

})

/*FUNCIONES*/
tj1 = 0; tj2 = 0; //agregue: total jugador 1 y total jugador 2

var jug1=""; jug2=""; variable=0; pamult=""; radionum = ""; combinacion = ""; 
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
    }
    function fnfin() {
        mainView.router.navigate('/index/');
    }

    function fnCatNums(tid){
        pamult=tid.slice(-1);
        console.log("clickeado en "+pamult);
    }

    function fnCatCombs(comb){
        combinacion = comb;
        console.log("combinacion realizada " + combinacion)
    }

    function fnRadioNum(radio){
        radionum = radio;
        console.log("opcion de dado " + pamult + ". Dado por Cantidad de veces: " + pamult*radionum);
        $$("#j1"+pamult).html(pamult*radionum);
    }
    function fnRadioNum2(radio){
        radionum = radio;
        console.log("opcion de dado " + pamult + ". Dado por Cantidad de veces: " + pamult*radionum);
        $$("#j2"+pamult).html(pamult*radionum);
    }




    function fnRadioJuego(radio){
        resultado()
        if (radio == "Tachar") {
            $$("#"+combinacion).html(0);
        } else {
            switch (combinacion) {
            case "escalera":
                if (radio == "Servido") {
                    $$("#"+combinacion).html(25);
                } else {
                    $$("#"+combinacion).html(20);
                };
            break;
            case "full":
                if (radio == "Servido") {
                    $$("#"+combinacion).html(35);
                } else {
                    $$("#"+combinacion).html(30);
                };
            break;
            case "poker":
                if (radio == "Servido") {
                    $$("#"+combinacion).html(45);
                } else {
                    $$("#"+combinacion).html(40);
                };
            break;
            case "generala":
                if (radio == "Servido") {
                    $$("#"+combinacion).html("GANÓ");
                } else {
                    $$("#"+combinacion).html(50);
                };
            break;
            case "generala2":
                if (radio == "Servido") {
                    $$("#"+combinacion).html("GANÓ");
                } else {
                    $$("#"+combinacion).html(100);
                };
            break;
            };
        };
        
    }
    function fnRadioJuego2(radio){
        resultado()
        if (radio == "Tachar") {
            $$("#" + combinacion + ".2").html(0);
        } else {
            switch (combinacion) {
            case "escalera":
                if (radio == "Servido") {
                    $$("#"+combinacion + ".2").html(25);
                } else {
                    $$("#"+combinacion + ".2").html(20);
                };
            break;
            case "full":
                if (radio == "Servido") {
                    $$("#"+combinacion + ".2").html(35);
                } else {
                    $$("#"+combinacion + ".2").html(30);
                };
            break;
            case "poker":
                if (radio == "Servido") {
                    $$("#"+combinacion + ".2").html(45);
                } else {
                    $$("#"+combinacion + ".2").html(40);
                };
            break;
            case "generala":
                if (radio == "Servido") {
                    $$("#"+combinacion + ".2").html("GANÓ");
                } else {
                    $$("#"+combinacion + ".2").html(50);
                };
            break;
            case "generala2":
                if (radio == "Servido") {
                    $$("#"+combinacion + ".2").html("GANÓ");
                } else {
                    $$("#"+combinacion + ".2").html(100);
                };
            break;
            };
        };
        
    }

    function resultado() {
        console.log("suma")
        var sumaJ1 = 0;
        var sumaJ2 = 0;
        $$('.numsj1').each(function(){
            if ($$(this).text() != "--") {
                sumaJ1 += parseInt($$(this).text());
                console.log(sumaJ1)
            }

        });
        $$('.combsj1').each(function(){
            if ($$(this).text() != "--") {
                sumaJ1 += parseInt($$(this).text());
                console.log(sumaJ1)
            }
               
        });
        $$('.numsj2').each(function(){
            if ($$(this).text() != "--") {
                sumaJ2 += parseInt($$(this).text());
                console.log(sumaJ2)
            }

        });
        $$('.combsj2').each(function(){
            if ($$(this).text() != "--") {
                sumaJ2 += parseInt($$(this).text());
                console.log(sumaJ2)
            }
               
        });

        $$("#resJ1").html(sumaJ1);
        $$("#resJ2").html(sumaJ2);

    }
        
    
    function fnVarSheet() {
        variable=$$(".varsheet").val(this.value);
        console.log("VAR SHEET = "+variable);
    }