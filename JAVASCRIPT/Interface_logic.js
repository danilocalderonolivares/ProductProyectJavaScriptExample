var productList = [];
class Interface_logic_Product {

    drawTable() {
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
    iu.deleteProduct(event);
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
