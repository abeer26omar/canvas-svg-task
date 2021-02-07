var name = [0,0,0,0];
var num = document.querySelectorAll('input[type="number"]');
var color = document.querySelectorAll('input[type="color"]');
var check = document.querySelectorAll('input[type="checkbox"]');


var piechart = document.getElementById("pie");
var doughnutchart = document.getElementById('doughnut');

piechart.width = 300;
piechart.height = 300;

doughnutchart.width = 300;
doughnutchart.height = 300

var ctx = piechart.getContext("2d");
function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

var Piechart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.data = options.data;

    this.holesize = options.holesize;
    this.draw = function () {
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.data) {
            var val = parseInt(this.data[categ]);
            total_value += val;
        }
        var start_angle = 0;
        for (categ in this.data) {
            val = this.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;

            drawPieSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                Math.min(this.canvas.width / 2, this.canvas.height / 2),
                start_angle,
                start_angle + slice_angle,
                this.colors[color_index % this.colors.length]
            );
            start_angle += slice_angle;
            color_index++;
        }

        if (this.options.holesize) {
            drawPieSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                this.options.holesize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
                0,2 * Math.PI,
                "#F6F4F4"
            )
        }
    }
}
document.getElementById('draw').addEventListener('click', function () {
    var ch = 0;
    for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
            ++ch;
        }
    }
    if (ch == 0) {
        document.getElementById('p1').innerHTML = "you must choose choice";
    }
    else {
        document.getElementById('p1').innerHTML = "";

        if (document.getElementById('pieChart').checked) {

            var myPiechart = new Piechart(
                {
                    canvas: piechart,
                    data: [num[0].value, num[1].value, num[2].value, num[3].value],
                    colors: [color[0].value, color[1].value, color[2].value, color[3].value]
                }
            );
            myPiechart.draw();
        }
        if (document.getElementById('doughnutChart').checked) {
            var mydoughnutchart = new Piechart(
                {
                    canvas: doughnutchart,
                    data: [num[0].value, num[1].value, num[2].value, num[3].value],
                    colors: [color[0].value, color[1].value, color[2].value, color[3].value],
                    holesize: 0.5
                }
            );
            mydoughnutchart.draw();
        }
        if (document.getElementById('lineChart').checked)
            {drawpolyline();}
        if(document.getElementById('barchart').checked)
        {
            drawBarChart();
        }
    }
});

//line chart

function drawpolyline(){
    var name = document.getElementsByClassName('name');
    var [course1,course2,course3,course4]=[
        document.getElementById('course1'),
        document.getElementById('course2'),
        document.getElementById('course3'),
        document.getElementById('course4')];
    var poly=document.getElementById('poly');
    course1.textContent=`${name[0].value}`;
    course2.textContent=`${name[1].value}`;
    course3.textContent=`${name[2].value}`;
    course4.textContent=`${name[3].value}`;

    var points=`80,${220-(num[0].value*2)} 120,${220-(num[1].value*2)} 160,${220-(num[2].value*2)} 200,${220-(num[3].value*2)}`;
    poly.setAttribute('points',points);
    console.log(name[0].value);
    console.log(name[1].value);
    console.log(name);
}
function drawBarChart(){
    var name = document.getElementsByClassName('name');
    var [course1,course2,course3,course4]=[
        document.getElementById('course1bar'),
        document.getElementById('course2bar'),
        document.getElementById('course3bar'),
        document.getElementById('course4bar')];
    var poly=document.getElementsByClassName('rect');
    course1.textContent=`${name[0].value}`;
    course2.textContent=`${name[1].value}`;
    course3.textContent=`${name[2].value}`;
    course4.textContent=`${name[3].value}`;
    for(let i=0;i<4;i++)
    {
        poly[i].setAttribute('y',(220-(num[i].value*2)));
        poly[i].setAttribute('height',(num[i].value*2));
        poly[i].style.fill=`${color[i].value}`;
    }
}
