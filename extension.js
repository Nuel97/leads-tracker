// Using the .addEventListener to log items to the console
let myLeads = []
let oldLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
// console.log(leadsFromLocalStorage)


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads) // passing arguments into functions.
}


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i ++) {
        listItems += `
            <li>
               <a 
                 href = '${leads[i]}' 
                 target = '_blank'>
                 ${leads[i]}
                </a> 
            </li>` // Template strings
        // OR
        // const li = document.createElement("li")
        // li.textContent = leads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() { // Listening for double clicks
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) 
    let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

    // console.log(leadsFromLocalStorage)

    render(myLeads)
    // console.log(localStorage.getItem("myLeads")) 
})



