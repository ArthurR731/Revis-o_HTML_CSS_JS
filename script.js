let produtos = [];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];





fetch("produtos.json")


.then(res => res.json())


.then(dados => {


    produtos = dados;


    mostrarProdutos(produtos);


    atualizarCarrinho();


});







function mostrarProdutos(lista){



let grid = document.getElementById("product-grid");


grid.innerHTML="";



lista.forEach(produto=>{



grid.innerHTML += `


<div class="card-produto shadow">


<img src="${produto.imagem}"

class="rounded-xl w-full h-40 object-cover">


<h2 class="text-xl font-bold mt-3">

${produto.nome}

</h2>



<p>

${produto.categoria}

</p>



<p class="text-purple-400 font-bold">

R$ ${produto.preco.toFixed(2)}

</p>



<button

onclick="adicionarCarrinho(${produto.id})"

class="btn-comprar mt-3">


Comprar jogo


</button>



</div>



`;



});


}







function filtrarProdutos(){



let busca = document
.getElementById("busca")
.value
.toLowerCase();



let resultado = produtos.filter(produto=>


produto.nome.toLowerCase().includes(busca)


);



mostrarProdutos(resultado);



}







function adicionarCarrinho(id){



let produto = produtos.find(p=>p.id===id);



carrinho.push(produto);



localStorage.setItem(

"carrinho",

JSON.stringify(carrinho)

);



atualizarCarrinho();



}








function atualizarCarrinho(){


document.getElementById("contador-carrinho")

.innerHTML = carrinho.length;



}







function mostrarCarrinho(){


document

.getElementById("modal-carrinho")

.classList.remove("hidden");



let lista = document.getElementById("carrinho-itens");



lista.innerHTML="";



let total = 0;




carrinho.forEach((produto,index)=>{


total += produto.preco;



lista.innerHTML += `


<div class="flex justify-between">


<span>

${produto.nome}

</span>


<button

onclick="removerItem(${index})"

class="text-red-500">


Remover


</button>


</div>


`;



});





document.getElementById("carrinho-total")

.innerHTML =

"R$ "+total.toFixed(2);



}








function fecharCarrinho(){


document

.getElementById("modal-carrinho")

.classList.add("hidden");


}








function removerItem(index){


carrinho.splice(index,1);



localStorage.setItem(

"carrinho",

JSON.stringify(carrinho)

);



mostrarCarrinho();


atualizarCarrinho();



}








function finalizarCompra(){



alert("Compra realizada com sucesso!");



carrinho=[];



localStorage.removeItem("carrinho");



fecharCarrinho();


atualizarCarrinho();



}