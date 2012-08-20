/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

		
		

	var sqlQuery = "SELECT * FROM CONTENIDO WHERE NUMEROCONTENIDO = 1 AND IDCATEGORIA = " + getLocal() + ";";

	html5sql.process(	    
	    sqlQuery,
	    function(transaction, results, rowsArray){
	      for(var i = 0; i < rowsArray.length; i++){
	        //each row in the rowsArray represents a row retrieved from the database
	        var ID = rowsArray[i].id;
	        var IDCATEGORIA = rowsArray[i].IDCATEGORIA;
	        var NUMEROCONTENIDO = rowsArray[i].NUMEROCONTENIDO;
	        var DESCRIPCION = rowsArray[i].DESCRIPCION;
	        ///console.log("Resultados: "+ID+" - "+IDCATEGORIA+" "+NUMEROCONTENIDO+" "+DESCRIPCION);
	        $("#dataContent").html(DESCRIPCION);
	        //console.log("Retrieved Milestone: "+ID);
	      }
	    },
	    function(error, statement){
	      //hande error here           
	    }
	);

	

	var sqlQuery = "SELECT COUNT(*) TOTAL FROM CONTENIDO WHERE IDCATEGORIA = " + getLocal() + ";";

	html5sql.process(	    
	    sqlQuery,
	    function(transaction, results, rowsArray){
	      for(var i = 0; i < rowsArray.length; i++){	        
	        var TOTAL = rowsArray[i].TOTAL;
	        $("#contenedorNumMaxContenido").html(TOTAL);

	      }
	    },
	    function(error, statement){
	      //hande error here           
	    }
	);

	


	function backContent(){
		

		var sqlQuery = "SELECT * FROM CONTENIDO WHERE NUMEROCONTENIDO = 0" + decrementarVar() + " AND IDCATEGORIA = " + getLocal() + ";";


			html5sql.process(
			    //["SELECT * FROM CONTENIDO;"],
			    sqlQuery,
			    function(transaction, results, rowsArray){
			      for(var i = 0; i < rowsArray.length; i++){
			        //each row in the rowsArray represents a row retrieved from the database
			        var ID = rowsArray[i].id;
			        var IDCATEGORIA = rowsArray[i].IDCATEGORIA;
			        var NUMEROCONTENIDO = rowsArray[i].NUMEROCONTENIDO;
			        var DESCRIPCION = rowsArray[i].DESCRIPCION;
			        console.log("Resultados: "+ID+" - "+IDCATEGORIA+" "+NUMEROCONTENIDO+" "+DESCRIPCION);
			        $("#dataContent").html(DESCRIPCION);
			        //console.log("Retrieved Milestone: "+ID);
			      }
			    },
			    function(error, statement){
			      //hande error here           
			    }
			);


	}



	function nextContent(){
		
		

		var sqlQuery = "SELECT * FROM CONTENIDO WHERE NUMEROCONTENIDO = 0" + incrementarVar() + " AND IDCATEGORIA = " + getLocal() + ";";


			html5sql.process(			    
			    sqlQuery,
			    function(transaction, results, rowsArray){
			      for(var i = 0; i < rowsArray.length; i++){
			        
			        var ID = rowsArray[i].id;
			        var IDCATEGORIA = rowsArray[i].IDCATEGORIA;
			        var NUMEROCONTENIDO = rowsArray[i].NUMEROCONTENIDO;
			        var DESCRIPCION = rowsArray[i].DESCRIPCION;
			        console.log("Resultados: "+ID+" - "+IDCATEGORIA+" "+NUMEROCONTENIDO+" "+DESCRIPCION);
			        $("#dataContent").html(DESCRIPCION);			        
			      }
			    },
			    function(error, statement){
			      //hande error here
			    }
			);


	}

  function incrementarVar(){
		var tmpContenido = $("#contenedorNumContenido").html();
		var tmpMaxContenido = $("#contenedorNumMaxContenido").html();
		//alert(tmpContenido);

     if(parseInt(tmpContenido) < parseInt(tmpMaxContenido)){		
		tmpContenido++;
		//alert('-->'+tmpContenido);
        $("#contenedorNumContenido").html(tmpContenido);
      }else{
		$("#contenedorNumContenido").html(1);	
		//setLocal(1);
		tmpContenido = 1;
      }
      return tmpContenido; 
  }

  function decrementarVar(){
		var tmpContenido = $("#contenedorNumContenido").html();
		var tmpMaxContenido = $("#contenedorNumMaxContenido").html();

    
      if(tmpContenido > 1){           
           tmpContenido--;
           $("#contenedorNumContenido").html(tmpContenido);           
      }else{
           $("#contenedorNumContenido").html(tmpMaxContenido);
          // setLocal(tmpMaxContenido);
           tmpContenido = tmpMaxContenido;
      }
      return tmpContenido; 
  }