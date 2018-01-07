import {Observable} from "rxjs"
// import {Observable} from "rxjs/Observable";
// import '.rxjs/add/operator/map';
// import '.rxjs/add/operator/filter';
import * as $ from "jquery";
import MCanvas from 'mcanvas';

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
// https://developer.mozilla.org/en-US/docs/Web/CSS/font
class ImageEditor{
    
    addTextToImage(){
        var mc = new MCanvas(1000,1500,'black');
        mc.background('./sample.jpg',{
            left:0,
            top:0,
            color:'#000000',
            type:'origin',
        }).
            text('<b>Hi dude</b>Sample Okay va <s>@Coolbro</s>',{
            width:'500',
            align:'left',
            largeStyle:{
                color:'red',
                font:'italic  60px / 20px arial, sans-serif',
                lineheight: ''
            },
            normalStyle:{
                color:'blue',
                font: 'small-caps bold 24px/1 sans-serif',
                lineheight: ''
            },
            smallStyle:{
                color:'yellow'
            },
            pos:{
                x:'center',
                y:'bottom:200'
            },
        }).
        draw( b64 =>{
            $('.placeholder').attr('src',b64);
            // console.log(b64);
        });
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

// eventCapture.subscribe(observer.next,observer.error,observer.complete);

var imgButton = document.querySelector('.api-img');
var imgClick = Observable.fromEvent(imgButton, 'click');
imgClick.subscribe ((e) => {
    new ImageEditor().addTextToImage();
  });

// source.subscribe(observer.next,observer.error,observer.complete);   // By passing function  Method III

// source.subscribe(
//     value => console.log(value),          //By ES6 Method II
//     err => console.error(err),
//     () => console.log("complete")
// );

// source.subscribe(new MyObserver());  // By passing class  Method I
console.log("Hi there lets go ..");

