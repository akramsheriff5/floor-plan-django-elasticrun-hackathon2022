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
$('#invoice_table').append(tbody)


var html = '<table class="table table-bordered mt-5" id="invoice_table"><thead><tr class="text-center"><th scope="col-3">#</th><th scope="col-2">Product name</th><th scope="col-2">Height</th><th scope="col-3">width</th><th scope="col-3">Quantity</th><th scope="col-3">Delete</th></tr></thead><tbody class="text-center"><tr><td>1</td><td>1</td><td>395</td><td>278</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><tr><td>2</td><td>2</td><td>454</td><td>277</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><tr><td>3</td><td>3</td><td>515</td><td>276</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><tr><td>4</td><td>4</td><td>398</td><td>303</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><tr><td>6</td><td>5</td><td>454</td><td>305</td><td><input type="number" placeholder="Quantity" class="form-control w-75 text-center d-inline"></td><td><button class="btn btn-danger remove"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr></tbody></table><button type="submit" id="sub" class="btn btn-primary" style="float:right"> Submit </button>';

$("#add").click(function () {
    $('#tabList').append(html);
});

$(document).on('click', '.remove', function () {
    $(this).parents('tr').remove();
});

// $("#sub").submit(function () {
//     var product = []
//     var x = $('.form-control')
//     for (var i = 0; i < x.length; i++) {
//         product.push([i].value)
//         console.log(product.push([i].value), "************")
//     }
// })