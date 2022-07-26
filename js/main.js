const form = document.getElementById("newItem")
const list = document.getElementById("list")
const items = JSON.parse(localStorage.getItem("items")) || [] // modify the value and return saved data

// use of forEach so that items are kept when refreshing the page--------------------
items.forEach( (element) => { 
    createElement(element)
})
    
form.addEventListener ("submit", (event) => {
    event.preventDefault()
        
    const name = event.target.elements['name']
    const amount = event.target.elements['amount']
    
    const existing = items.find( elemento => elemento.name ===name.value )
    
    const thisItem = {
        'name': name.value,
        'amount': amount.value
    }
    // checks if the item exists and create an id for each------------------------
    if (existing) {
        thisItem.id = existing.id
        
        updateElement(thisItem)
        
        items[items.findIndex(element => element.id === existing.id)] = thisItem
    } else {
        thisItem.id = items[items.length-1] ? (items[items.length-1]).id + 1 : 0;
        
        createElement(thisItem)
        
        items.push(thisItem)
    }
    
    //tranform the object to string
    localStorage.setItem('items', JSON.stringify(items)) 
    
    name.value = "" // assigns empty value to element name
    amount.value = "" //assigns empty value to element amount
    });

    function createElement(item) {
    const newItem = document.createElement('li') //create element list
    newItem.classList.add("item") //add class to element
    
    const numberItem = document.createElement('strong') //create element in HTML
    numberItem.innerHTML = item.amount //assigns element number to const amount
    numberItem.dataset.id = item.id
    newItem.appendChild(numberItem)
    
    newItem.innerHTML += item.name//assigns element name to const name
    
    list.appendChild(newItem)
    
}

function updateElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.amount
}

// function for create a button to delete the item -------------------
function deleteButton(id) {
    const elementButton = document.querySelector("button")
    elementButton.innerText = "TRASH"
    
    elementButton.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })
    return elementButton
}

// function for deleting items in array---------------------
function deleteElement(tag, id) {
    tag.remove()
    
    itens.splice(items.findIndex(element => element.id === id, 1))
    
    localStorage.setItem("items", JSON.stringify(items))
    
}
