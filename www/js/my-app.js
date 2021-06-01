  
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
    $$("#limpiar").on('click', resultado); 

    $$(".numsj1").on('click', function(){fnCatNums(this.id, 1)});
    $$(".numsj2").on('click', function(){fnCatNums(this.id, 2)});
    $$(".combsj1").on('click', function(){fnCatCombs(this.id, 1)});
    $$(".combsj2").on('click', function(){fnCatCombs(this.id, 2)});
    $$(".radioNumero").on('click', function(){fnRadioNum(this.value)});
    $$(".radioJuego").on('click', function(){fnRadioJuego(this.value)});
    //$$(".varsheet").on('click',fnVarSheet);

})

/*FUNCIONES*/
tj1 = 0; tj2 = 0; //agregue: total jugador 1 y total jugador 2

var jug1=""; jug2=""; variable=0; pamult=""; radionum = ""; combinacion = "";  j2Selec = 0;
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

    function fnCatNums(tid, js){
        pamult=tid.slice(-1);
        if (js == 1)
        j2Selec = 0
        else
        j2Selec = 1
        console.log("clickeado en "+pamult);
    }

    function fnCatCombs(comb){
        if (js == 1)
        j2Selec = 0
        else
        j2Selec = 1
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
            case "escalera":
                if (radio == "Servido") {
                    console.log(j2Selec)
                    if (j2Selec) {
                        $$("#j2"+"escalera").html(25)
                    }else{
                        $$("#"+"escalera").html(25);
                    }
                    
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

    function resultado() {
        console.log("suma")
        var suma = 0;
        $$('.numsj1').each(function(){
            if ($$(this).text() != "--") {
                suma += parseInt($$(this).text());
                console.log(suma)
            }

        });
        $$('.combsj1').each(function(){
            if ($$(this).text() != "--") {
                suma += parseInt($$(this).text());
                console.log(suma)
            }
               
        });
    }
        
    
    function fnVarSheet() {
        variable=$$(".varsheet").val(this.value);
        console.log("VAR SHEET = "+variable);
    }