import {Observable} from "rxjs"
// import {Observable} from "rxjs/Observable";
// import '.rxjs/add/operator/map';
// import '.rxjs/add/operator/filter';

// let numbers = [1,2,3,4,5]
let numbers = []
let source = Observable.from(numbers)



class MyObserver{

    next(value){
        console.log(value);
    }

    error(err){
        console.error(err);
    }

    complete(){
        console.log("complete");
    }
    
}

class MouseCapture{

    getXandYposition(e:MouseEvent) : XandYCordoniates {
        return {
            x:e.clientX,
            y:e.clientY
        }
    }

    filterXandYCordoniates(cordoniates:XandYCordoniates) : boolean{
        return cordoniates.x < 500 ? true :false;
        
    }
}

interface XandYCordoniates{
    x:number;
    y:number;
}

var observer = new MyObserver();
var mouseCapture = new MouseCapture();

let eventCaptureByES6 = Observable.fromEvent(document,"mousemove")
                              .map((e:MouseEvent) =>{
                                  return {
                                      x:e.clientX,
                                      y:e.clientY
                                  }
                              });

let eventCapture = Observable.fromEvent(document,"mousemove")
                              .map((e:MouseEvent) => mouseCapture.getXandYposition(e))
                              .filter(value=>mouseCapture.filterXandYCordoniates(value));

eventCapture.subscribe(observer.next,observer.error,observer.complete);


source.subscribe(observer.next,observer.error,observer.complete);   // By passing function  Method III

source.subscribe(
    value => console.log(value),          //By ES6 Method II
    err => console.error(err),
    () => console.log("complete")
);

source.subscribe(new MyObserver());  // By passing class  Method I
console.log("Hi there lets go ..");

