function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
  
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
  
        $('.image-title').html(input.files[0].name);
      };
  
      reader.readAsDataURL(input.files[0]);
  
    } else {
      removeUpload();
    }
  }
  
  function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
  }
  $('.image-upload-wrap').bind('dragover', function () {
      $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
      $('.image-upload-wrap').removeClass('image-dropping');
  });


  $('#add_floor').on('click', function(){
    window.location.href = "upload.html";
  })



  var floor_name = [{
    "areaNumber": "1",
    "dimension": {
        "width": "1",
        "length": "1",
        "x": 395,
        "y": 278
    }
},
{
    "areaNumber": "2",
    "dimension": {
        "width": "2",
        "length": "2",
        "x": 454,
        "y": 277
    }
},
{
    "areaNumber": "3",
    "dimension": {
        "width": "2",
        "length": "1",
        "x": 515,
        "y": 276
    }
},
{
    "areaNumber": "4",
    "dimension": {
        "width": "4",
        "length": "4",
        "x": 398,
        "y": 303
    }
},
{
    "areaNumber": "5",
    "dimension": {
        "width": "5",
        "length": "5",
        "x": 454,
        "y": 305
    }
}

]

var tbody = ''
for (var i = 0; i < floor_name.length; i++) {

tbody += `<tr>
<td>${i+1}</td>
<td>${floor_name[i]['areaNumber']}</td>
<td>${floor_name[i]['dimension']['x']}</td>
<td>${floor_name[i]['dimension']['y']}</td>
</tr>`
}
$('#upload_table').append(tbody)