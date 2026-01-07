export const vibrationDownload = async ({ BeURL, id, type }) => {
    if (type === "vibration") {
        try {
            const res = await fetch(`${BeURL}/fetchVibration/${id}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error('Failed to download Excel');
            }

            const blob = await res.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Vibration_History.xlsx';
            document.body.appendChild(a);
            a.click();

            // Cleanup
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Error in downloading vibration excel:", err);
            alert("Failed to download Excel file");
        }
    }
    else if (type === "heat") {
        try {
            // Request Excel by passing download=excel according to backend contract
            const res = await fetch(`${BeURL}/fetchheattherapy/${id}?download=excel`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error('Failed to download Excel');
            }

            const blob = await res.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // Match backend filename (optional; browser will use header if present)
            a.download = 'HeatTherapy_History.xlsx';
            document.body.appendChild(a);
            a.click();

            // Cleanup
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Error in downloading vibration excel:", err);
            alert("Failed to download Excel file");
        }
    }
    else if (type === "compress") {
        try {
            const res = await fetch(`${BeURL}/fetchcompressor/${id}?type=${type}`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error('Failed to download Excel');
            }

            const blob = await res.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Compression_History.xlsx';
            document.body.appendChild(a);
            a.click();

            // Cleanup
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Error in downloading vibration excel:", err);
            alert("Failed to download Excel file");
        }
    }

}