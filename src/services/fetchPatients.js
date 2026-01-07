export const fetchAllPatients = async ({ BeURL, setAllPatient }) => {
    try {
        const res = await fetch(`${BeURL}/doctor/patient-detail`, {
            credentials: 'include'
        })

        const data = await res.json()

        if (data.success) {
            setAllPatient(data.patients)
        } else {
            console.warn('Fetch patients - not successful:', data);
            // Don't alert if it's just "Please login" - user might be logging in
            if (!data.message?.includes('login')) {
                alert(data.message)
            }
        }
    }
    catch (err) {
        console.error("Error in fetch patients:", err?.message || err);
        // Only alert if it's not a network error during login
        if (err?.message && !err.message.includes('Failed to fetch')) {
            alert("Failed to fetch patients. Please try again.");
        }
    }
}


export const fetchPatient = async ({ BeURL, setEditPatient, id }) => {
    try {
        const res = await fetch(`${BeURL}/patient-detail/${id}`, {
            method: 'GET',
            credentials: 'include',

        })
        const data = await res.json()
        if (data.success) {
            setEditPatient(data.patinetDetail)
        } else {
            alert(data.message)
        }
    }
    catch (err) {
        console.error("Error in fetch patients:", err);
        alert("Failed to fetch patients", err);
    }
}



export const editPatientList = async ({ BeURL, editPatient, id, setEditPatient }) => {
    try {
        const res = await fetch(`${BeURL}/update-patient/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                fullname: editPatient.fullname,
                email: editPatient.email,
                contact: editPatient.contact,
                age: Number(editPatient.age),
                password: editPatient.password,
                gender: editPatient.gender
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Patient registered successfully");
            setEditPatient(null);
        } else {
            alert(data.message);
        }
    }
    catch (err) {
        console.error("Error in Edit patients:", err);
        alert("Failed to Edit patients", err);
    }
}


export const deletePatient = async ({ BeURL, id }) => {
    try {
        const res = await fetch(`${BeURL}/delete-patient/${id}`, {
            method: 'DELETE',
            credentials: 'include',

        })
        const data = await res.json()
        if (data.success) {
            alert(data.message)
            window.location.reload();

        } else {
            alert(data.message)
        }
    }
    catch (err) {
        console.error("Error in fetch patients:", err);
        alert("Failed to fetch patients", err);
    }
}