const from = document.getElementById('from');

if (!from) {
    alert("¡ERROR CRÍTICO!: No se encontró ningún elemento con el id='from' en tu HTML. Revisa que tu formulario tenga id='from'");
} else {
    from.addEventListener('submit', (e) => {
        e.preventDefault(); // Detiene la recarga de la página

        try {
            // Obtenemos los valores de forma segura
            const nombres = document.getElementById('nombres')?.value?.trim() || "No especificado";
            const telefono = document.getElementById('Nro')?.value?.trim() || "No especificado";
            const email = document.getElementById('email')?.value?.trim() || "No especificado";
            const presupuesto = document.getElementById('presupuesto')?.value?.trim() || "No especificado";
            const cuartos = document.getElementById('recamaras')?.value?.trim() || "No especificado";
            const casa = document.getElementById('option')?.value?.trim() || "No especificado";
            const planes = document.getElementById('planes')?.value?.trim() || "No especificado";

            // Creamos el mensaje
            const texto = `hola mitzi soy: ${nombres}, mi numero es: ${telefono}, mi correo es: ${email}, mi presupuesto es: ${presupuesto}, las recamaras que necesito: ${cuartos}, la casa que me interesa es: ${casa}, planeo pagar la casa con: ${planes}`;
            const textoCodificado = encodeURIComponent(texto);
            
            const numeroWhatsApp = "527341411000"; 
            const esCelular = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

            let url;
            if (esCelular) {
                url = `whatsapp://send?phone=${numeroWhatsApp}&text=${textoCodificado}`;
            } else {
                url = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;
            }

            // Esto nos dirá en la consola del navegador si la URL se armó bien
            console.log("Redirigiendo a:", url);

// --- CÓDIGO NUEVO PARA EL CRM ---
            const datosCRM = {
                nombre: nombres,
                telefono: telefono,
                email: email,
                presupuesto: presupuesto,
                cuartos: cuartos,
                casa: casa,
                planes: planes
            };
            
            fetch("_LA_URL_DE_LA_API_DE_EL_CRM_", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosCRM)
            })
            .then(() => console.log("Enviado al CRM"))
            .catch(err => console.error("Error CRM:", err))
            .finally(() => {
                // Redirección forzada (Movida dentro de finally para que espere al fetch)
                window.location.assign(url);
            });
            // ---------------------------------
        } catch (error) {
            // Si algo se rompe adentro, te avisará con una ventana flotante
            alert("Ocurrió un error en el código: " + error.message);
        }
    });
}
