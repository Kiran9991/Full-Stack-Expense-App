
let submitbn = document.getElementById('submit');
let items = document.getElementById('items');

submitbn.addEventListener('click', storeDetails);

function storeDetails(e) {
    e.preventDefault();

    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    
    let expenseDetails = {
        amount,
        description,
        category
    }

    showUserDetails(expenseDetails);

    axios.post('http://localhost:3000/user/add-user', expenseDetails)
    .then((response) => {
        showUserDetails(response.data.newUserDetail);
        console.log(response)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML+`<h4>Something went Wrong</h4>`;
        console.log(err);
    })
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/user/get-users').then((response) => {
        for(let i=0; i<response.data.allUsers.length; i++) {
            showUserDetails(response.data.allUsers[i]);
        }
    }).catch((error) => console.log(error));
})

function showUserDetails(expenseDetails) {
    let li = document.createElement('li');
    li.textContent = expenseDetails.amount + ' - '+expenseDetails.description+' - '+expenseDetails.category;

    let deletebtn = document.createElement('input');
    deletebtn.type = 'button';
    deletebtn.value = 'delete';

    function deleteId(itemId) {
        axios.delete('http://localhost:3000/user/delete-user/'+itemId)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    }

    let editbtn = document.createElement('input');
    editbtn.type = 'button';
    editbtn.value = 'edit';

    function editId(itemId) {
        axios.put('http://localhost:3000/add-user/'+itemId)
        .then((res) => console.log(res))
    }

    li.appendChild(editbtn);
    li.appendChild(deletebtn);

    deletebtn.onclick = () => {
        items.removeChild(li);
        deleteId(expenseDetails.id);
    }

    editbtn.onclick = () => {
        items.removeChild(li);
        editId(expenseDetails.id);
        deleteId(expenseDetails.id);
        document.getElementById('amount').value = expenseDetails.amount;
        document.getElementById('description').value = expenseDetails.description;
        document.getElementById('category').value = expenseDetails.category;
    }
    items.appendChild(li);
}