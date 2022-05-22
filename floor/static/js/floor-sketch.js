const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const reader = new FileReader();
const img = new Image();

const uploadImage = (e) => {
    reader.onload = () => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
};

const imageLoader = document.getElementById("uploader");
imageLoader.addEventListener("change", uploadImage);


var tagJson = []
var tagCord = []
$("#canvas").click(function (e) {
    getPosition(e);
    var getid = e.target.id;
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    console.log(mouseX + " " + mouseY); //shows coordinates

    $('#form').show();
    $('#form').offset({
        left: mouseX,
        top: mouseY
    });
});

var pointSize = 6;

function getPosition(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // drawCoordinates(x, y);
    tagCord.push({
        x: x,
        y: y
    })
    console.log(tagCord, ":::::::::::::::::::::")
}

function drawCoordinates(x, y, cat) {
    var ctx = document.getElementById("canvas").getContext("2d");

    console.log(x,y,"??????????????????",cat)
    ctx.fillStyle = "blue"; // Red color
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = '15px serif';
    ctx.fillText(tagJson.length, x - 3, y + 5);
}

function redraw() {
    console.log(img, "triggered >>>>>>>>>>>>>>>>>>>>>>", tagCord)
    ctx.drawImage(img, 0, 0);
    // tagJson.pop();
    tagJson.map((ele, inx) => {

        ctx.strokeStyle = 'red';
        ctx.strokeRect(ele['x0'],ele['y0'], ele['x1'],ele['y1']);

        ctx.fillStyle = "blue"; // Red color
        ctx.beginPath();

        
        
        ctx.arc(ele['dimension'].x, ele['dimension'].y, pointSize, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = '15px serif';
        ctx.fillText(inx + 1, ele['dimension'].x - 3, ele['dimension'].y + 5);

        // draw rec
        

    })
    areaOverview()
}


const deleteArea = async (id) => {
    console.log('came>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', tagJson)
    await tagJson.splice(id, 1)
    console.log(tagJson, "::::::::::::")
    await redraw()

}

const categoryTag = (e) => {
    e.preventDefault();
    var recCord = tagCord[tagCord.length - 1];
    console.log(recCord, ":::::::::::::::::::::");
    var cat = $('#cat').val();
    var wid = $('#wid').val();
    var len = $('#len').val();

    tagJson.push({
        'areaNumber': cat,
        'dimension': {
            'width': wid,
            'length': len,
            'x': recCord.x,
            'y': recCord.y,
        },
        'x0':rect.startX,
        'y0':rect.startY,
        'x1':rect.w,
        'y1':rect.h,
    })
    // var centroidx = (rect.startX + rect.startY)/2 
    // var centroidy = (rect.w + rect.h) /2
    // rect.startX, rect.startY, rect.w, rect.h
    areaOverview()
    drawCoordinates(recCord.x, recCord.y, cat)
    redraw()


    $('#tagging_form').trigger('reset')
    $('#form').hide()

    console.log(tagJson, "????????????")

}

const clearCircle = () => {
    var lastCircle = tagCord[tagCord.length - 1]
    var radius = 4
    // ctx.beginPath();
    console.log(lastCircle.x, lastCircle.y, radius, 0, 2 * Math.PI, false);
    // ctx.save();
    // ctx.globalCompositeOperation = 'destination-out';
    // ctx.beginPath();
    // ctx.arc(lastCircle.x, lastCircle.y, radius, 0, 2 * Math.PI, false);
    // ctx.fill();
    // ctx.restore();
    // ctx.arc(lastCircle.x, lastCircle.y, radius, 0, 2 * Math.PI, false);
    // ctx.clip();
    // ctx.clearRect(lastCircle.x - radius - 1, lastCircle.x - radius - 1,
    //     radius * 2 + 2, radius * 2 + 2);

    $('#tagging_form').trigger('reset')
    $('#form').hide()
    tagCord.pop()
    console.log(tagCord, "???????")
    redraw()
};


const areaOverview = () => {

    var temp = ''
    $('#area_list').html('')
    tagJson.map((ele, inx) => {
        $('#area_list').append(`<tr>
                <td>${inx + 1}</td>
                <td>${ele['areaNumber']}</td>
                <td>${ele['dimension']['width']}</td>
                <td>${ele['dimension']['length']}</td>
                <td><button  type="button" onclick="deleteArea(${inx})" class="btn btn-danger btn-sm"> Delete </button></td>
                </tr>`)

    })
    // $('#area_list').append(temp)
    // console.log(temp,"?????????")

}


var finalBound = []
        var rect = {};
        var drag = false;
        var imageObj = null;

        function init() {
            // imageObj = new Image();
            // imageObj.onload = function () {
            //     ctx.drawImage(imageObj, 0, 0);
            // };
            // imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
            canvas.addEventListener('mousedown', mouseDown, false);
            canvas.addEventListener('mouseup', mouseUp, false);
            canvas.addEventListener('mousemove', mouseMove, false);
        }

        function mouseDown(e) {
            rect.startX = e.pageX - this.offsetLeft;
            rect.startY = e.pageY - this.offsetTop;
            drag = true;
        }

        function mouseUp() {
            drag = false;
        }

        function mouseMove(e) {
            if (drag) {
                ctx.clearRect(0, 0, 500, 500);
                ctx.drawImage(img, 0, 0);
                rect.w = (e.pageX - this.offsetLeft) - rect.startX;
                rect.h = (e.pageY - this.offsetTop) - rect.startY;
                ctx.strokeStyle = 'red';
                ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
                console.log(rect,"??????????")
                
            }
        }
        //
        init();