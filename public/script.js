async function atualizarContador() {
    try {
        const response = await fetch('/api/visits');
        const visitas = await response.text();
        document.getElementById('visit-count').innerText = visitas;
    } catch (error) {
        document.getElementById('visit-count').innerText = 'Erro ao carregar visitas';
    }
}
