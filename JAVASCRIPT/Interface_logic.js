var productList = [];
var cont = 0;

class Interface_logic_Product {

    drawTable() {
        cont ++;
        console.log(cont);
        var serchButton = document.createElement('div');
        if (productList.length === 1 || cont === 1) {
            serchButton.innerHTML = `<input type="text" 
                                            id="myInput" 
                                            onkeyup = "findProduct()"
                                            placeholder="Search for names..">`;
            document.getElementById('titleCard').appendChild(serchButton);
        }
        if (cont >= 7) {
            document.getElementById('tableContainer').classList.add("scrollable");
        }
       
        var tbodyContet = document.createElement('tr');
        var products = this.getProductList();
        

        for (let index = 0; index < products.length; index++) {

            tbodyContet.innerHTML = `<td class="table-active">
                                        ${products[index].Name}
                                      </td>
                                      <td class="table-active">
                                        ${products[index].Price}
                                      </td>
                                      <td class="table-active">
                                        ${products[index].Description}
                                      </td>
                                      <td id="deleteBtnSpace">
                                        <button class="btn btn-outline-danger" id="deleteProduct" value=" ${index}" onclick="deleteElement(this)">Delete</button>
                                      </td>
                                      `;


        }


        document.getElementById('tableBody').appendChild(tbodyContet);
        this.resetForm();
        this.showMessage('Product added successfully', 'success');
       
    }
    deleteProduct(element) {

        element.parentElement.parentElement.remove();
        cont --;
        console.log(cont);
        if (cont <= 6) {
            document.getElementById('tableContainer').classList.remove("scrollable");
        }
        if (cont === 0) {
            document.getElementById('myInput').remove();
        }
        this.showMessage('Product deleted successfully', 'danger');

        

    }
    showMessage(message,ccssStyle) {
        var div = document.createElement('div');
        div.className = `alert alert-${ccssStyle} mt-3`;
        div.appendChild(document.createTextNode(message));
        var container= document.querySelector('.container');
        var app = document.querySelector('#App');
        container.insertBefore(div,app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },2000);
    }
    saveInLocalStorage(productList) {
        localStorage.setItem('ProductList', JSON.stringify(productList));
    }
    getProductList() {

        var storageList = localStorage.getItem('ProductList');
        productList = JSON.parse(storageList);
        return productList;


    }

    resetForm() {
        document.getElementById('product-form').reset();
    }
    iuFindProduct(){
        
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("productist");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
     
    }
}
var iu = new Interface_logic_Product();
document.getElementById('btnAddProduct').addEventListener('click', function (e) {
    var inputlist = [];
    var name = document.getElementById('Name').value;
    var price = document.getElementById('Price').value;
    var description = document.getElementById('Description').value;
    inputlist.push(name, price, description);
    if (validateForm(inputlist) === false){
        var product = new Product(name, price, description);
        e.preventDefault();
        productList.push(product);
        var iu = new Interface_logic_Product();
        iu.saveInLocalStorage(productList);
        iu.drawTable(productList);

    }

});
function deleteElement(event) {
    
     swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                iu.deleteProduct(event);
               
            } else {
                swal("Your product was not deleted!");
            }
        });

}
function findProduct(){
    
    iu.iuFindProduct();
}
function validateForm(inputlist) {
    var result = false;

    for (i = 0; i < inputlist.length; i++) {
        if (inputlist[i].length === 0) {
            result = true;
        }

    }
    return result;

}
