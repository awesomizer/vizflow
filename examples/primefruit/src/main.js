window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	
	'./image/vizflow.png',
	'./image/fruit.png',

] ;
	  
document.audio = [

	// './audio/.wav',

] ;

document.skipIndex = 0 ;

imageLoader.preload ( document.image, function preload_audio() {
  // console.log('main.js: preload_audio') ;
	audioLoader.preload( 
		document.audio, 
		function main_run() {
			// console.log('main.js: main_run') ;
			var div = document.getElementById('loading') ;
			div.style.visibility = 'hidden' ;
			load_game() ;
		} 
	) ;
}) ;