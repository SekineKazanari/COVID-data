const chart = function (p5){
    let data;
    let estados = [];
    let columnas;
    let textSpace;
    let tamText = 18,txtGrafica;
    let estadisticas = []
    let escala = 280;
    let anchoBarra;
    p5.preload = function () {
        data = p5.loadJSON("json/data.json");
    }  
    p5.setup = function(){
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        estados.push(Object.keys(data['State']))
        columnas = estados[0].length;
        for (let i = 0; i < columnas; i++) {
            estadisticas.push({infectados: data['State'][estados[0][i]].infected,
                        defunciones: data['State'][estados[0][i]].deceased
            });
        }
        txtY = p5.height-200;
        textSpace = (p5.width/32)-5;
        anchoBarra = (textSpace/2);
        txtGrafica = p5.width/106;
    }
    
    p5.draw = function (){
        p5.background(255);
        p5.push()
        p5.textSize(40);
        p5.textAlign(p5.CENTER)
        p5.text("INFECTADOS Y DEFUNCIONES POR ESTADO",p5.width/2,30)
        p5.pop()
        p5.push()
        p5.noStroke()
        p5.textSize(15)
        p5.fill(111, 201, 217)
        p5.rect(130,110,20,20);
        p5.fill(0)
        p5.text("Infectados",160,125);
        p5.fill(245, 66, 66)
        p5.rect(130,145,20,20);
        p5.fill(0)
        p5.text("Defunciones",160,160);
        p5.pop()
        for (let i = 0; i < columnas; i++) {
            p5.push()
            p5.fill(111, 201, 217)
            p5.noStroke()
            p5.translate((i+1.55+tamText/40)*(textSpace),p5.height-170);
            p5.rotate(p5.PI);
            p5.rect(0,0,anchoBarra,estadisticas[i].infectados/escala)
            p5.fill(245, 66, 66)
            p5.rect(anchoBarra,0,anchoBarra,estadisticas[i].defunciones/escala)
            p5.pop()
            p5.push()
            p5.textAlign(p5.LEFT);
            p5.textSize(txtGrafica)
            p5.fill(0)
            p5.translate((i+2.13)*textSpace-5,p5.height-170);
            p5.rotate(-p5.PI/2);
            p5.text(estadisticas[i].infectados,(estadisticas[i].infectados/escala)+5,-anchoBarra/3)
            p5.text(estadisticas[i].defunciones,(estadisticas[i].defunciones/escala)+5,-anchoBarra*1.4)
            p5.pop()
            
            p5.textSize(tamText);
            p5.textAlign(p5.RIGHT);
            p5.push()
            p5.fill(0)
            p5.translate((i+2)*textSpace-5,p5.height-160);
            p5.rotate(-p5.PI/2);
            p5.text(estados[0][i],0,0)
            p5.pop()
            p5.resetMatrix()
        }
     p5.noLoop();
    }
};

const cards = function (p5){
    let data;
    let w;
    let colors = [];
    p5.preload = function () {
        data = p5.loadJSON("json/data.json");
    }  
    p5.setup = function(){
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        console.log(data.negative)
        w = p5.width/8;
        colors = [
            [245, 66, 66],
            [75, 209, 95],
            [245, 150, 66],
            [69, 69, 69]
        ];
    }
    
    p5.draw = function (){ 
        p5.background(255)
        info("Infectados",p5.nfc(data.infected),30,20,w,70,p5.color(colors[0]),255)
        info("Negativos",p5.nfc(data.negative),w+60,20,w,70,p5.color(colors[1]),255)
        info("Sospechosos",p5.nfc(data.suspected),(w*2)+90,20,w,70,p5.color(colors[2]),255)
        info("Defunciones",p5.nfc(data.deceased),(w*3)+120,20,w,70,p5.color(colors[3]),255)
        p5.noLoop();
    }
    function info(title,body,x,y,w,h,color,textColor){
        p5.push()   
        p5.noStroke()
        p5.fill(40,40,40)
        p5.rect(x+5,y+5,w,h,5,5)
        p5.fill(color)
        p5.rect(x,y,w,h,5,5)
        p5.noStroke()
        p5.fill(textColor)
        p5.textSize(15);
        p5.textStyle(p5.BOLD);
        p5.text(title,x+20,y+23)
        p5.textStyle(p5.ITALIC);
        p5.textSize(25);
        p5.text(body,x+20,y+54)
        p5.pop()
    }
}

const grafica = new p5(chart, 'canvas');
const tarjetas = new p5(cards, 'canvas2');


