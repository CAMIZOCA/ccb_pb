  //CREACION DE PROPIEDADES BD

    var databaseOptions = {
      fileName: "appBD",
      version: "1.0",
      displayName: "appBD",
      maxSize: 2024
    };
 
  // Abrir BD
    var database = openDatabase(
      databaseOptions.fileName,
      databaseOptions.version,
      databaseOptions.displayName,
      databaseOptions.maxSize
    );
    
 
  

 
    //CARGA EL TOTAL Y PRIMER CONTENIDO
    var getTotContenido = function( results ){
      database.transaction(
        function( transaction ){
        //alert(tmpCategoria);
          transaction.executeSql(
            (
              "SELECT " +
                "* " +
              "FROM " +
                "CONTENIDO " +
                "WHERE IDCATEGORIA = 0"  + tmpCategoria +
                " ORDER BY " +
                "ID ASC"
            ),
            [],
            function( transaction, results ){
              // Return the girls results set.
              //console.log(results.rows.length);//total registros
              //console.log(results.rows.item(1).DESCRIPCION);
              var tmpMaxContenido = results.rows.length;

              //alert(tmpMaxContenido);
              if(tmpMaxContenido > 0)
              {
                  $("#contenedorNumMaxContenido").html(tmpMaxContenido);
                  $("#contenedorTexto").html(results.rows.item(0).DESCRIPCION);
                  return tmpMaxContenido;
               }             


              //alert('dentro');
              //alert(results.rows);              
              //callback( results );
              
            }
          );
 
        }
      );
    };
 

    //CARGA EL CONTENIDO DEL ID QUE OBTENGA
    var showOneRecords = function(transaction, results){
    database.transaction(
        function( transaction ){        
          transaction.executeSql(
            (
                "SELECT * FROM CONTENIDO WHERE IDCATEGORIA =  " + 
                tmpCategoria +' AND NUMECONTENIDO = ' + 
                tmpContenido + ' '
            ),
            [],
            function( transaction, results ){
              var tmpMaxContenido = results.rows.length;
              $("#contenedorTexto").html(results.rows.item(0).DESCRIPCION);
            }
          );
 
        }
      );
    };
 



function onError(tx, error) {
	alert(error.message);
};



function leerCSV(){

	$.get("recursos/csv/chistes.csv", function(tsvtext){	
	array = jQuery.csv2json(";")(tsvtext); //funcion que genera array

		$.each(array, function() {
			insertRecord(this.ID,this.IDCATEGORIA,this.NUMEROCONTENIDO,this.DESCRIPCION);
			//console.log(this);
		});

	});

}	
	
/*
* FUNCIONES PARA LEER E INSERTAR LOS DATOS EN LA TABLA
* 
*/	
function insertRecord(ID,IDCATEGORIA,NUMEROCONTENIDO,DESCRIPCION) {

database.transaction(
      function( transaction ){                    
            transaction.executeSql("INSERT OR IGNORE INTO CONTENIDO VALUES ("+ID+","+IDCATEGORIA+","+NUMEROCONTENIDO+",'"+DESCRIPCION+"')", [], [], onError);
      }
    ); 
			
};
	
function leerCategoriaCSV(){

    $.get("recursos/csv/categoria.csv", function(tsvtext){ 
    array = jQuery.csv2json(";")(tsvtext); //funcion que genera array
    
        $.each(array, function() {
            insertRecordCategoria(this.ID,this.DESCRIPCION);
            //console.log(this);
        });
    
    //showRecords();    
    });

}   	
	
function insertRecordCategoria(ID,DESCRIPCION) {

database.transaction(
      function( transaction ){        
            transaction.executeSql("INSERT OR IGNORE INTO CATEGORIA VALUES ("+ID+",'"+DESCRIPCION+"')", [], [], onError);
      }
    );            
};	


/*
* CARGAR LOS DATOS DE LAS CATEGORIAS
* 
*/  

function showRecords() {

		ulList.innerHTML = '';
		db.transaction(function(tx) {
			tx.executeSql(selectAllStatement, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0, item = null; i < dataset.length; i++) {
					item = dataset.item(i);
					ulList.innerHTML += '<li data-theme="c" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#page2?id='+item['ID']+'" data-transition="slide" class="ui-link-inherit">' + item['DESCRIPCION']  + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
				
				}
			});		

    });
		
	};
    
//CAPTURAR ID DEL $GET
function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
    params[key] = value;
  });
 
  return params;
}


  function incrementarVar(){
      //getTotContenido();

      if(tmpContenido < tmpMaxContenido){
                                  
          $("#contenedorNumContenido").html(tmpContenido + 1);
            tmpContenido++;
           return false;
      }else{
           $("#contenedorNumContenido").html(1);
            tmpContenido = 1;
           return false;
      }
  }

  function decrementarVar(){
    
      if(tmpContenido > 1){
           $("#contenedorNumContenido").html(tmpContenido - 1);
           tmpContenido--;
           return false;
      }else{
           $("#contenedorNumContenido").html(tmpMaxContenido);
            tmpContenido = tmpMaxContenido;
           return false;
      }
  }



 // Cuando el DOM está listo, los scripts de inicio.
    $(function(){


         //HACER UNA TRANSACCION PARA CREAR LOS PRIMEROS DATOS
            database.transaction(
              function( transaction ){         
                 transaction.executeSql(createContenido, [], leerCSV(), onError);
              }
            );

            // database.transaction(
            //   function( transaction ){         
            //      transaction.executeSql(leerCSV(), [], [], onError);
            //   }
            // );
          
          //getTotContenido();



            $('#buttonNext').click(function() {
                
                    incrementarVar();
                    showOneRecords();
            });
            $('#buttonBack').click(function() {
                    decrementarVar();
                    showOneRecords();
            });
 
    });