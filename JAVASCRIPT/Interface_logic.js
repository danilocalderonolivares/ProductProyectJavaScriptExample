
class Interface_logic_Product{
    addProduct(){
        alert("Estoy en agregar");
    }
    deleteProduct(){

    }
    showMessage(){

    }
}
var iu = new Interface_logic_Product();
document.getElementById('btnAddProduct').addEventListener('click', iu.addProduct());