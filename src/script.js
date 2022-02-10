
const products = [];

 $("#add_product").click(function(){
    
    var record = {
        pSku:"",
        pName:"",
        pPrice:"",
        pQnty:""
    };

    //fecting values
    var sku = $("#product_sku").val();
    var name = $("#product_name").val();
    var price = $("#product_price").val();
    var qnty = $("#product_quantity").val(); 

    record.pSku = sku;
    record.pName = name;
    record.pPrice = price;
    record.pQnty = qnty;
   
    //checking for duplicate id and push
    if(checkProduct(record)){             
       $(".error").show();
       $(".success").hide();
       
    }
    else{
        products.push(record);
        displayRecord();
        $(".error").hide();
        $(".success").show();
   }
    
});


//check for duplicate id
function checkProduct(record){
    for (let i = 0 ; i < products.length;i++){
        if(products[i].pSku == record.pSku){
           return true;
        }                
    }
   return false;
 }


//display record
 function displayRecord(){
    var row =""; 
    
    row +="<table>\
    <tr>\
        <th>SKU</th>\
        <th>Name</th>\
        <th>Price</th>\
        <th>Quantity</th>\
        <th>Action</th>\
    </tr>";

    $("#product_list").html(row); 

    for (let j=0 ; j< products.length ; j++){
        row +="<tr>\
        <td>"+products[j].pSku+"</td>\
        <td>"+products[j].pName+"</td>\
        <td>"+products[j].pPrice+" $</td>\
        <td>"+products[j].pQnty+"</td>\
        <td><a href='#' class='edit' data-pSku ="+products[j].pSku +">Edit</a>\
        <a href='#' class='delete' data-pSku ="+products[j].pSku +">Delete</a></td>\
        </tr>";
    }
    $("#product_list").html(row+"</table>");
 }


//edit record

$("#product_list").on("click","a.edit",function(){
    
  
    var id =$(this).attr("data-pSku");
    console.log(id);
    //console.log($(this).data("pSku"));

    //putting values into input fields
    for(var i =0;i<products.length;i++){
        if(id==products[i].pSku){
            $("#product_sku").val(products[i].pSku);
            $("#product_name").val(products[i].pName);
            $("#product_price").val(products[i].pPrice);
            $("#product_quantity").val(products[i].pQnty); 
            break;
        }
    }

    //display update button
    $("#update_product").show();
    $("#add_product").hide();

    //updating record
    $("#update_product").click(function(){
    for(var i =0;i<products.length;i++){
        if(id==products[i].pSku){
            products[i].pSku = $("#product_sku").val();
            products[i].pName = $("#product_name").val();
            products[i].pPrice = $("#product_price").val();
            products[i].pQnty = $("#product_quantity").val(); 
            break;
        }
    }
    //display updated table
    displayRecord();

    //display add_product button
    $("#update_product").hide();
    $("#add_product").show();



    });
});



//delete record

$("#product_list").on("click","a.delete",function(){
    var id =$(this).attr("data-pSku");
    //searching and deleting record
    for(var i =0;i<products.length;i++){
        if(id==products[i].pSku){
            products.splice(i,1);
            break;
        }
    }

    //display updated table
    displayRecord();

  
});


//close notifications
$(".close").click(function(){
      $(".success").hide();
      $(".error").hide();
});





    






    


 

  