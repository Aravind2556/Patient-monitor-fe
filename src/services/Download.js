export const vibrationDownload = async ({ BeURL, id , type }) => {
    if (type === "vibration"){
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
    else if(type === "heat"){
        try {
            const res = await fetch(`${BeURL}/fetchheattherapy/${id}`, {
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
            a.download = 'Heat Therapy_History.xlsx';
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