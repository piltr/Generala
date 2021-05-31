  
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

    //JUGADOR 1
    $$(".numsj1").on('click', function(){fnCatNums(this.id)});
    //$$(".combsj1").on('click', function(){fnCatCombs(this.id)});
    //JUGADOR 2
    $$(".numsj2").on('click', function(){fnCatNums(this.id)});
    //$$(".combsj1").on('click', function(){fnCatCombs(this.id)});
    //AMBOS
    $$(".radioNumero").on('click', function(){fnRadioNum(this.value)});
    $$(".radioJuego").on('click', function(){fnRadioJuego(this.value)});


})

/*FUNCIONES*/
tj1 = 0; tj2 = 0; //agregue: total jugador 1 y total jugador 2
puntosamostrar=0; combi=0; jugador="";

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
        jugador=tid.slice(1,2);
        pamult=parseInt(tid.slice(-2));
        switch (pamult) {
            case 7:
            combi=20
            //console.log("ESCALERA");
                break
            case 8:
            combi=30
            //console.log("FULL");
                break
            case 9:
            combi=40
            //console.log("POKER");
                break
            case 10:
            combi=50
            console.log("GENERALA"+combi);
                break
            case 11:
            combi=100
            //console.log("DOBLEGE");
                break
            default:
            console.log("clickeado en "+pamult);
        }
    }

    //function fnCatCombs(comb){


    function fnRadioNum(radio){
        radionum = radio;
        puntosamostrar=pamult*radionum;
        console.log("JUGADOR "+jugador+" PUNTOS: "+puntosamostrar);
        if (jugador==1) {
            fnMostrar(1);
        } else {
            fnMostrar(2)
        };
    }

    function fnRadioJuego(radio){
        k=parseInt(radio);
        switch (k) {
            case 7:
            puntosamostrar=combi+5;
                break
            case 8:
            puntosamostrar=combi;
                break
            default:
            puntosamostrar=0;
        }
        if (jugador==1) {
            fnMostrar(1);
        } else {
            fnMostrar(2)
        };
        console.log(puntosamostrar);        
    }

    function fnMostrar(a) {
        if (a==1) {
            if (puntosamostrar==55 || puntosamostrar==105) {
                    $$("#j"+a+pamult).html("GANADOR");
            } else {
                if (pamult<=9) {
                $$("#j"+a+"0"+pamult).html(puntosamostrar);    
                } else{
                $$("#j"+a+pamult).html(puntosamostrar);        
                }
                    
            }              
        } else {
            if (puntosamostrar==55 || puntosamostrar==105) {
                    $$("#j"+a+pamult).html("GANADOR");
            } else {
                if (pamult<=9) {
                $$("#j"+a+"0"+pamult).html(puntosamostrar);    
                } else{
                $$("#j"+a+pamult).html(puntosamostrar);        
                }
                    
            }            
        }
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