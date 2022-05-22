

// $("#sub").submit(function () {
//     var product = []
//     var x = $('.form-control')
//     for (var i = 0; i < x.length; i++) {
//         product.push([i].value)
//         console.log(product.push([i].value), "************")
//     }
// })

var currentInvoice ;

$.get('readFloor',(res)=>{

var floorDet = []

console.log(res,":::::::::::::")
temp = ``
res.map((ele)=>{
    $.each(ele,(key,val)=>{

        floorDet.push(key)

        temp += `<option value="${key}">${key}</option>`

    
    })
    
})
$('#selectFloor').append(temp)



$('#selectFloor').on('change', ()=>{
    $('#invoice_table').html('')
    console.log(floorDet,"::::::::::")
    var currentFloor = $( "select#selectFloor option:selected" ).val()
    var curfloorID = floorDet.indexOf(currentFloor)
    var floor_name =res[curfloorID][currentFloor]['details']
    currentInvoice = res[curfloorID][currentFloor]
    console.log(res[curfloorID][currentFloor]['details'])
    var tbody = ''
    for (var i = 0; i < floor_name.length; i++) {
    
        tbody += `<tr>
        <td>${floor_name[i]['areaNumber']}</td>
        <td>${floor_name[i]['dimension']['width']}</td>
        <td>${floor_name[i]['dimension']['length']}</td>
        <td>${floor_name[i]['dimension']['quantity']}</td>
        <td><input type="text" id="${floor_name[i]['areaNumber']}-net"  value="0"/></td>
        <td><button class="btn btn-success btn-sm" onclick="addProduct(${floor_name[i]['areaNumber']})">ADD</button></td>
        </tr>`
    }
    $('#invoice_table').append(tbody)
    
    
    // var html = '<table class="table table-bordered mt-5" id="invoice_table"><thead><tr class="text-center"><th scope="col-3">#</th><th scope="col-2">Product name</th><th scope="col-2">Height</th><th scope="col-3">width</th><th scope="col-3">Quantity</th><th scope="col-3">Delete</th></tr></thead><tbody class="text-center"><tr><td>1</td><td>1</td><td>395</td><td>278</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><tr><td>2</td><td>2</td><td>454</td><td>277</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><tr><td>3</td><td>3</td><td>515</td><td>276</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><tr><td>4</td><td>4</td><td>398</td><td>303</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><tr><td>6</td><td>5</td><td>454</td><td>305</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr></tbody></table><button type="submit" id="sub" class="btn btn-primary" style="float:right"> Submit </button>';
    
    $("#add").click(function () {

        $.ajax({
            type: "POST",
            url: "uploadInvoice",
            async: false,
            data: {invoice:JSON.stringify(currentInvoice)},
            complete: function (data) {
                alert('Successfully uploaded')
            }
        });


    });
    
    // $(document).on('click', '.remove', function () {
    //     $(this).parents('tr').remove();
    // });


    


})


$('#selectFloor').trigger('change')
})

function addProduct(id){
    console.log(id,currentInvoice,"????????")
    var productQ = $(`#${id}-net`).val()

    currentInvoice['details'].map((ele,inx)=>{
        if(ele.areaNumber == id && currentInvoice['details'][inx]['dimension']['quantity'] >= productQ){
            currentInvoice['details'][inx]['dimension']["quantityR"] = productQ
        }
        else{
            alert('Enter less number of units')
            $(`#${id}-net`).val(0)
        }
    })

    console.log(currentInvoice,"finalize")
}