async function addUsers() {
    try {
        event.preventDefault();
        let name = event.target.value.name;
        let email = event.target.value.email;
        let phone = event.target.value.phone;

        let User = {
            name,
            email,
            phone
        }

        const response = await axios.post("http://localhost:3000/user/add-user", User);
        printUsers(response.data);

        // cleaning the input after submission successfully done

        event.target.name.value = '';
        event.target.email.value = '';
        event.target.phone.value = '';

        console.log(response);
    }
    catch (err) {
        console.log('Error:', err.message);
    }

}

window.addEventListener("DOMContentLoded", async () => {
    try {
        const response = await axios.post("http://localhost:3000/user/add-user", User);
        console.log(response);

        for (let i = 0; i < response.data.length; i++) {
            printUsers(response.data[i]);
        }
    }
    catch (err) {
        console.log('Error:', err.message);
    }
});

async function printUsers(User) {
    const parentElement = document.getElementById('users');
    const childElement = document.createElement('li');

    childElement.innerHTML = `name:${User.name} <br> email: ${User.email} <br> phone: ${User.phone} <br>`;

    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.style.fontWeight = 'bold';

    deleteButton.onclick = async () => {
        try {
            await axios.delete(`http://localhost:3000/user/delete-user/${User.id}`);
            // Assuming the delete request is successful, remove the user from the frontend
            parentElement.removeChild(childElement);
        } catch (error) {
            console.log('Error deleting user:', error.message);
            // Handle the error gracefully, e.g., display an error message to the user
            // You might want to add a more user-friendly error handling mechanism here
        }
    };

    const editButton = document.createElement('input');
    editButton.type = 'button';
    editButton.value = 'Edit';
    editButton.style.fontWeight = 'bold';

    editButton.onclick = async () => {
        // Assuming you have input fields with ids 'name', 'email', and 'num'
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const numInput = document.getElementById('num');

        // Set input values to the current user's details
        nameInput.value = User.name;
        emailInput.value = User.email;
        numInput.value = User.number;



        parentElement.removeChild(childElement);

        const updateButton = document.createElement('input');
        updateButton.type = 'button';
        updateButton.value = 'Update';
        updateButton.style.fontWeight = 'bold';

        updateButton.onclick = async () => {
            const updatedUserData = {
                name: nameInput.value,
                email: emailInput.value,
                number: numInput.value
            };

            try {
                await axios.put(`http://localhost:3000/user/edit-user/${User.id}`, updatedUserData);
                // Assuming the above request is successful, you may want to update the displayed user details
                // by adding a new child element with the updated information.
                printUser(updatedUserData);
            } catch (error) {
                console.log('Error:', error.message);
            }
        };

        childElement.appendChild(updateButton);
    };

    parentElement.appendChild(childElement);
    childElement.appendChild(deleteButton);
    childElement.appendChild(editButton);


}