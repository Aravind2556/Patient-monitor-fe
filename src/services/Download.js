export const vibrationDownload = async ({ BeURL, id, isDownload, type }) => {


    if (type === "vibration" && isDownload) {

        try {
            const res = await fetch(`${BeURL}/fetchVibration/${id}?isDownload=${isDownload}`, {
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
        }
        catch (err) {
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

            // Check if response is actually an Excel file
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // Backend returned JSON (likely an error), not Excel
                const data = await res.json();
                alert(data.message || 'No heat therapy data available for download');
                return;
            }

            const blob = await res.blob();

            // Verify blob is not empty or too small
            if (blob.size < 100) {
                alert('No heat therapy data available for this patient');
                return;
            }

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
            console.error("Error in downloading heat therapy excel:", err);
            alert("Failed to download Excel file: " + err.message);
        }
    }
    else if (type === "compress") {
        try {
            const res = await fetch(`${BeURL}/fetchcompressor/${id}?type=${type}`,{
                method: "GET",
                credentials: "include",
            });
            const contentType = res.headers.get("content-type") || "";
            //If JSON response → no data / error → STOP download
            if (contentType.includes("application/json")) {
                const data = await res.json();
                alert(data.message);
                return;
            }
            
            if (!res.ok) {
                throw new Error("Download failed");
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "Compression_History.xlsx";
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Excel download error:", err);
            alert("Failed to download Excel");
        }
    }


}