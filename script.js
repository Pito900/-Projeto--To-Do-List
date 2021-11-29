document. querySelector("body").style.backgroundColor = "white"
//Aqui estou criando uma função para anexar as tarefas na lista
function addTask() {
    document.querySelector("#criar-tarefa").addEventListener("click", function(){
        if(document.querySelector('#texto-tarefa').value.length > 0) { //O value é para acessarmos oque foi imputado e o length é para vermos se ta vazio
            const itemLi = document.createElement("li")
            itemLi.className = "itensLista"
            itemLi.innerText = document.querySelector('#texto-tarefa').value
            document.querySelector('#lista-tarefas').appendChild(itemLi) //Aqui estamos guardando o item da lista, criada no momento anterior
            document.querySelector('#texto-tarefa').value = ''
        } else {
            alert('Error: Digite algo!');
        }
    }) 
}
addTask()

function bkTaskColor () {
            document.querySelector("#lista-tarefas").addEventListener("click", function(event){
                let itemClicado = event.target //Aqui estou pegando qualquer target dentro da lista de tarefas
                let itemAnterior = document.querySelector(".greyColor") //aqui estou pegando o primeiro grey color
                if (itemAnterior === null){ //se n tivermos nenhum grey color temos q colocar grey color
                    itemClicado.classList.add("greyColor")
                } else if (itemClicado.classList.contains("greyColor")) {//Coloquei isso para poder retirar a seleção de um item
                    itemClicado.classList.remove("greyColor")    
                }else { //dps do primeiro clique o modelo vai seguir pelo else..removendo o greycolor e colocando
                itemAnterior.classList.remove("greyColor") //removendo selected de quem tem selected
                itemClicado.classList.add("greyColor") // colocando selected em quem n tinha selected
                }
            })

}

bkTaskColor ()

function riscar() {
    document.querySelector("#lista-tarefas").addEventListener("dblclick", function (event){
        let itemAlvo = event.target
        let atributo = itemAlvo.getAttribute('class') //Aqui ele retorna as classes do itemAlvo em linha
        if (atributo.includes("completed")){
            itemAlvo.classList.remove("completed")
        } else {
            itemAlvo.classList.add("completed")
        }
    })
}

riscar()


function clear () {
    let biloto = document.createElement("button")
    biloto.id = "apaga-tudo";
    biloto.innerText = "Limpar Tudo"
    document.querySelector("#utilidades").appendChild(biloto)
    document.querySelector("#apaga-tudo").addEventListener("click", function(){
            const listaGeral = document.querySelectorAll(".itensLista")
            const listaPai = document.querySelector("#lista-tarefas")
            for (i=0; i<listaGeral.length;i++){
                listaPai.removeChild(listaGeral[i]);
        }    
    })
}

clear()

function clearCompleted(){
    const bilotoComp = document.createElement("button")
    bilotoComp.id = "remover-finalizados"
    bilotoComp.innerText = "Limpar Completos"
    document.querySelector("#utilidades").appendChild(bilotoComp)
    document.querySelector("#remover-finalizados").addEventListener("click" , function(){
        const listaComp = document.querySelectorAll(".completed")
        const listaPai = document.querySelector("#lista-tarefas")
        for(i = 0; i<listaComp.length;i++){
            listaPai.removeChild(listaComp[i])
        }
    })
}

clearCompleted()


function removeSec(){
    const rSele= document.createElement("button");
    rSele.id = "remover-selecionado";
    rSele.innerText = "Deleta o Selecionado"
    document.querySelector("#utilidades").appendChild(rSele)
    document.querySelector("#remover-selecionado").addEventListener("click", function(){
        const selected = document.querySelector(".greyColor")
        const listaPai = document.querySelector("#lista-tarefas")
        if(selected.getAttribute("class").includes(".greyColor") != null){
            listaPai.removeChild(selected)
        }
    })
}
removeSec()


function saveTask() {
    const savePoint =  document.createElement("button")
    savePoint.id = "salvar-tarefas";
    savePoint.innerText = "Salvar Lista"
    document.querySelector("#utilidades").appendChild(savePoint) //Até aqui eu criei o botão
    //Agora vou começar o processo de salvar a lista no localStorage
    const listaPai = document.querySelector("#lista-tarefas")
    document.querySelector("#salvar-tarefas").addEventListener("click", function(){
        localStorage.setItem('tarefa', listaPai.innerHTML); //Aqui estou salvando todo o html da listaPai em um objeto tarefa
        })

window.onload = function () { //Essa função ocorre dps que toda a página html é carregada. Quando a página é carregada a lista vem zerada, dai coloquei ela para carregar a lista
  listaPai.innerHTML = localStorage.getItem('tarefa'); //Só peguei todo o html carregado e coloquei nela
};
}
saveTask()

function moverSelected(){
    const pCima = document.createElement("button")
    pCima.id ="mover-cima"
    pCima.innerText = "Subir"
    document.querySelector("#upDown").appendChild(pCima)
//Agora Vou fazer um mecanismo para reorganizar a lista (mudar de lugar os itens)
    document.querySelector("#mover-cima").addEventListener("click", function(){
        const listaPai = document.querySelector("#lista-tarefas")
        if (document.querySelector(".greyColor")) { //Só entra aqui se algo selecionado..Assim some o erro que estava ocorrendo 
            if (document.querySelector(".greyColor").previousElementSibling === null){
                alert("impossível subir mais!")
            } else{
                listaPai.insertBefore(document.querySelector(".greyColor"), document.querySelector(".greyColor").previousElementSibling);        
            }
        }
    })
    //Criando o botão para descer
    const pBaixo= document.createElement("button");
    pBaixo.id = "mover-baixo";
    pBaixo.innerText = "Descer"
    document.querySelector("#upDown").appendChild(pBaixo)
    //Agora Vou fazer um mecanismo para reorganizar a lista (mudar de lugar os itens)
    document.querySelector("#mover-baixo").addEventListener("click", function(){
        const listaPai = document.querySelector("#lista-tarefas")
        if (document.querySelector(".greyColor")){
            if(document.querySelector(".greyColor").nextElementSibling === null) {
                alert("impossível descer mais!")
            } else {
                listaPai.insertBefore(document.querySelector(".greyColor").nextElementSibling, document.querySelector(".greyColor"))
            }
        }
    })

}

moverSelected()
