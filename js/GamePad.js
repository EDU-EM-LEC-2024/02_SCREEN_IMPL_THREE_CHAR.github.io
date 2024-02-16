class GamePad{
    constructor(param){
        console.log(param);
        //--------------------------
        //04
        //--------------------------
        this.pc = param.pc;

        //--------------------------
        const padHole = document.createElement("div");
        padHole.style.cssText
        ="position:absolute;width:120px;height:120px;bottom:10vh;left:10vw !important;"
        +"background-color:white;border:#353535 solid medium; border-radius:50%;left:50%;";
        const stick = document.createElement("div");
        stick.style.cssText="position:absolute;left:30px;top:30px;width:60px;height:60px; border-radius:50%; background-color:gray;border : 1px solid ;";
        

        //--------------------------
        const btn_01 = document.createElement("div");
        btn_01.innerHTML='😊';
        btn_01.setAttribute('style',"")
        btn_01.style.cssText="position:absolute;right:5vw;bottom:10vh;width:60px;height:60px; border-radius:50%; border : 1px solid; background-color:white;cursor:pointer;font-size:2rem;display:flex;justify-content:center;align-items:center;";
        document.body.appendChild(btn_01);
        
        const smileEl = document.createElement("div");
        smileEl.classList.add('smile');
        smileEl.innerHTML='😊';
        smileEl.style.cssText="width:40px;height:40px;position:absolute;top:43%;left:50%;font-size:0rem;display:flex;justify-content:center;align-items:center;transition:.3s;opacity:.8";
        document.body.appendChild(smileEl);
        btn_01.addEventListener('click',function(){
            smileEl.style.fontSize="2rem";
            setTimeout(()=>{
                smileEl.style.fontSize="0rem";
            },1000)
            
            
            console.log(param.game.player.object);
        })

        const btn_02 = document.createElement("div");
        btn_02.innerHTML='😒';
        btn_02.setAttribute('style',"display:flex;justify-content:center;align-items:center;font-size:2rem !important;")
        btn_02.style.cssText="position:absolute;right:15vw;bottom:20vh;width:60px;height:60px; border-radius:50%; border : 1px solid; background-color:white;cursor:pointer;font-size:2rem;display:flex;justify-content:center;align-items:center;";
        document.body.appendChild(btn_02);

        const sadEl = document.createElement("div");
        sadEl.classList.add('smile');
        sadEl.innerHTML='😒';
        sadEl.style.cssText="width:40px;height:40px;position:absolute;top:43%;left:50%;font-size:0rem;display:flex;justify-content:center;align-items:center;transition:.3s;opacity:.8";    
        document.body.appendChild(sadEl);    
        btn_02.addEventListener('click',function(){
            sadEl.style.fontSize="2rem";
            setTimeout(()=>{
                sadEl.style.fontSize="0rem";
            },1000)
        })
        
        const btn_03 = document.createElement("div");
        btn_03.innerHTML='😍';
        btn_03.setAttribute('style',"display:flex;justify-content:center;align-items:center;font-size:2rem !important;")
        btn_03.style.cssText="position:absolute;right:25vw;bottom:10vh;width:60px;height:60px; border-radius:50%; border : 1px solid; background-color:white;cursor:pointer;font-size:2rem;display:flex;justify-content:center;align-items:center;";
        document.body.appendChild(btn_03);

        const lovelyEl = document.createElement("div");
        lovelyEl.classList.add('smile');
        lovelyEl.innerHTML='😍';
        lovelyEl.style.cssText="width:40px;height:40px;position:absolute;top:43%;left:50%;font-size:0rem;display:flex;justify-content:center;align-items:center;transition:.3s;opacity:.8";    
        document.body.appendChild(lovelyEl);  

        btn_03.addEventListener('click',function(){
            lovelyEl.style.fontSize="2rem";
            setTimeout(()=>{
                lovelyEl.style.fontSize="0rem";
            },1000)
        })
        //--------------------------

        padHole.appendChild(stick);
        document.body.appendChild(padHole);
        

        this.domElement = stick;
        this.maxRadius = 60*60;
        this.game = param.game;
        this.location = {left:this.domElement.offsetLeft, top:this.domElement.offsetTop};
        const pad = this;

        if('ontouchstart' in window){
            this.domElement.addEventListener('touchstart',function(e){
                e.preventDefault();
                pad.touch(e);
                e.stopPropagation();
               
            });
        }
        else
        {
            this.domElement.addEventListener('mousedown',function(e){
                console.log(e);
                e.preventDefault();
                pad.touch(e);
                e.stopPropagation();
            });

        }

        
    }

    getMousePosition(e){
        let Xvalue = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
        let Yvalue = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;
        console.log({x:Xvalue , y:Yvalue});
        return {x:Xvalue , y:Yvalue};
    }
    async touch(event){
        console.log("touch! ");
        event = event || window.event;
        this.offset = this.getMousePosition(event);
        const pad = this;
        if('ontouchstart' in window){
            console.log("touch!  ontouchstart true");
            document.ontouchmove =function(event){event.preventDefault();pad.move(event);};
            document.ontouchend = function(event){event.preventDefault();pad.up(event);};
        }else{
            
            document.onmousemove = function(event){  event.preventDefault();pad.move(event);};
            document.onmouseup =  function(event){  event.preventDefault();pad.up(event);};            
        }

    }
    async move(event){
        const mouse = this.getMousePosition(event);
        console.log("move! ");
        let left = mouse.x - this.offset.x;
        let top = mouse.y - this.offset.y;
        const calLoc = left*left + top*top;
        if(calLoc>this.maxRadius){
            const result = Math.sqrt(calLoc);
            left /= result;
            top /= result;
            left *= 60;
            top *= 60;
        }

        this.domElement.style.top = `${top + this.domElement.clientHeight/2}px`
        this.domElement.style.left = `${left + this.domElement.clientHeight/2}px`
        //--------------------------
        //04 움직이기
        //--------------------------
        const moveF = -(top-this.location.top + this.domElement.clientHeight/2)/60;
        const moveT = -(left - this.location.left + this.domElement.clientWidth/2)/60;
        this.pc.call(this.game,moveF,moveT);
        //--------------------------        
        
    }
    async up(){
        if('ontouchstart' in window){
            document.ontouchmove = null;
            document.touchend = null;
        }else{
            document.onmousemove = null;
            document.onmouseup = null;
        }
        this.domElement.style.top = `${this.location.top}px`;
        this.domElement.style.left = `${this.location.left}px`;
        //--------------------------
        //04 움직이기
        //--------------------------
        this.pc.call(this.game,0,0);

        //--------------------------        
    }

}
