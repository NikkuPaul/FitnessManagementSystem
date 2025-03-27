document.addEventListener('DOMContentLoaded', function() {
    const workoutForm = document.getElementById('workoutForm');
    const editForm = document.getElementById('editForm');
    const workoutsTable = document.getElementById('workoutsTable');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const readModal = new bootstrap.Modal(document.getElementById('readModal'));
    let currentEditId = null;

    // Load workouts on page load
    loadWorkouts();

    // Add new workout
    workoutForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const workout = {
            name: document.getElementById('workoutName').value,
            description: document.getElementById('workoutDescription').value,
            duration: parseInt(document.getElementById('workoutDuration').value),
            difficulty: document.getElementById('workoutDifficulty').value
        };

        fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        })
            .then(response => response.json())
            .then(data => {
                loadWorkouts();
                workoutForm.reset();
            })
            .catch(error => console.error('Error:', error));
    });

    // Load all workouts
    function loadWorkouts() {
        fetch('/api/workouts')
            .then(response => response.json())
            .then(workouts => {
                workoutsTable.innerHTML = '';
                workouts.forEach(workout => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${workout.name}</td>
                        <td>${workout.duration} min</td>
                        <td>${workout.difficulty}</td>
                        <td>
                            <button class="btn btn-sm btn-info view-btn" data-id="${workout.id}">View</button>
                            <button class="btn btn-sm btn-primary edit-btn" data-id="${workout.id}">Edit</button>
                            <button class="btn btn-sm btn-danger delete-btn" data-id="${workout.id}">Delete</button>
                        </td>
                    `;
                    workoutsTable.appendChild(row);
                });

                // Add event listeners to buttons
                addButtonEventListeners();
            });
    }

    // Add event listeners to all buttons
    function addButtonEventListeners() {
        // View button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const workoutId = this.getAttribute('data-id');
                fetch(`/api/workouts/${workoutId}`)
                    .then(response => response.json())
                    .then(workout => {
                        document.getElementById('readName').textContent = workout.name;
                        document.getElementById('readDescription').textContent = workout.description || 'No description';
                        document.getElementById('readDuration').textContent = `${workout.duration} minutes`;
                        document.getElementById('readDifficulty').textContent = workout.difficulty;
                        readModal.show();
                    });
            });
        });

        // Edit button
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentEditId = this.getAttribute('data-id');
                fetch(`/api/workouts/${currentEditId}`)
                    .then(response => response.json())
                    .then(workout => {
                        document.getElementById('editId').value = workout.id;
                        document.getElementById('editName').value = workout.name;
                        document.getElementById('editDescription').value = workout.description;
                        document.getElementById('editDuration').value = workout.duration;
                        document.getElementById('editDifficulty').value = workout.difficulty;
                        editModal.show();
                    });
            });
        });

        // Delete button
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const workoutId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this workout?')) {
                    fetch(`/api/workouts/${workoutId}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            if (response.ok) {
                                loadWorkouts();
                            }
                        });
                }
            });
        });
    }

    // Save edited workout
    document.getElementById('saveChanges').addEventListener('click', function() {
        const workout = {
            name: document.getElementById('editName').value,
            description: document.getElementById('editDescription').value,
            duration: parseInt(document.getElementById('editDuration').value),
            difficulty: document.getElementById('editDifficulty').value
        };

        fetch(`/api/workouts/${currentEditId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        })
            .then(response => {
                if (response.ok) {
                    editModal.hide();
                    loadWorkouts();
                }
            })
            .catch(error => console.error('Error:', error));
    });
});