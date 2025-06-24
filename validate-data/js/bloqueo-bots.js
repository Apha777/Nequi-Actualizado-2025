let getIP = '';
let getCountry = '';
let isChecking = false; // Variable para evitar verificaciones múltiples

document.addEventListener('DOMContentLoaded', async function() {
    // Evitar verificaciones múltiples
    if (isChecking) {
        return;
    }
    isChecking = true;

    const blockedBots = ["python-requests", "curl", "wget", "bot", "spider", "crawler"];
    const userAgent = navigator.userAgent.toLowerCase();
    const loader = document.getElementById("loaderp-full");
    
    // Mostrar loader mientras verificamos
    if (loader) {
        loader.style.display = "flex";
    }

    // 1. Primera verificación: Detección de bots por User-Agent
    if (blockedBots.some(bot => userAgent.includes(bot))) {
        console.warn("Bot detectado por User-Agent. Bloqueando acceso...");
        redirectToBlockedPage();
        return;
    }

    // 2. Segunda verificación: Detección por país
    try {
        // Obtener IP
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error("Error obteniendo IP");
        
        getIP = await ipResponse.json();
        //console.log("IP detectada:", getIP.ip);

        // Obtener información del país
        const countryResponse = await fetch(`https://ip.guide/${getIP.ip}`);
        if (!countryResponse.ok) throw new Error("Error obteniendo país");
        
        getCountry = await countryResponse.json();
        //console.log("País detectado:", getCountry.location?.country);

        // Ocultar loader
        if (loader) {
            loader.style.display = "none";
        }

        // Verificar si es Colombia
        if (getCountry.location?.country === 'Colombia') {
            console.log("✅Acceso permitido");
            // Continuar con la carga normal de la página
        } else {
            console.warn("❌Bloqueando acceso...");
            redirectToBlockedPage();
        }

    } catch (error) {
        console.error('Error obteniendo datos de IP/país:', error);
        
        // En caso de error, bloquear acceso por seguridad
        if (loader) {
            loader.style.display = "none";
        }
        
        redirectToBlockedPage();
    }
});

// Función para redirigir a página de acceso restringido
function redirectToBlockedPage() {
    // Redirigir a la página de acceso restringido sin parámetros
    document.querySelector('body').innerHTML = '';
    window.location.replace('acceso-restringido.php');
}
