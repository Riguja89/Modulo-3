'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){
    if(typeof executor!= 'function'){
       throw new TypeError('The argument or executor  is not a function' );
    }

    this._state='pending';
    this._handlerGroups=[];

    this._internalResolve = (data)=>{
       if(this._state=='pending'){
        this._value=data;
        this._state='fulfilled';

        if(this._handlerGroups.length!=0){
                this._handlerGroups.forEach((e)=>{ 
                if(typeof e.successCb=='function') e.successCb(this._value)
                if(typeof e.errorCb=='function') e.errorCb(this._value)
        });
        this._handlerGroups.splice(0, this._handlerGroups.length);// borra el array de handles despues de usarlos
        }

       }
        
    };
    this._internalReject= (rason)=>{
        if(this._state=='pending'){
        this._value=rason
        this._state='rejected';

        if(this._handlerGroups.length!=0){
            this._handlerGroups.forEach((e)=>{ 
            if(typeof e.successCb=='function') e.successCb(this._value)
            if(typeof e.errorCb=='function') e.errorCb(this._value)
    });
        this._handlerGroups.splice(0, this._handlerGroups.length); // borra el array de handles despues de usarlos
    }

        }
        
    };

    const resolve= (data)=>{
       this._internalResolve(data)
    };
    const reject=(rason)=>{
        this._internalReject(rason)
    };   

    executor(resolve,reject);

  
    
    this.then=function(s1,e1){
        if(typeof s1 != 'function') s1=null;
        if(typeof e1 != 'function') e1=null;
        this._handlerGroups.push({successCb: s1,errorCb: e1})
            
        this._callHandlers(s1,e1);
    };

   

    this._callHandlers=function(s,e){

        if(this._state=='fulfilled'){
        if(typeof s == 'function'){
            s(this._value)
        }   
     }else if(this._state=='rejected'){  
     if(typeof e == 'function'){
        e(this._value)
    } 
    }
    }

    this.catch = function(f){
        this.then(null,f)
    }
   
}

const executor= new $Promise();

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
