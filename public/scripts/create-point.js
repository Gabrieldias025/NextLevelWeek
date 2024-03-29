function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //função anonima que esta retornando um valor
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) //função anonima que esta retornando um valor
    .then( cities => {
    
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )

}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities)

//Esta pegando o campo Estado
//document.querySelector("select[name=uf]")
//Sempre Aguardando algum evento
//.addEventListener("change", () => {
//  console.log("mudei")
//} )



// Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// atualizar o campo escondido com os dados selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    // Adicionar ou remorer uma classe com javascript
    // Add
    // Remove
    // Toggle = Adicionar ou Remover

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ',itemId)

    // verificar se existem itens selecionados,
    // se sim pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId // isso sera true or false
        return itemFound
    })

    // se ja estiver selecionado, tirar da seleção
    
    if(alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }   
    
    // console.log('selectedItems: ', selectedItems)
    // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}