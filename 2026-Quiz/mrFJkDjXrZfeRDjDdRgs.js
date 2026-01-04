// Download a file when the page loads
window.addEventListener('load', () => {
    const fileUrl = 'https://tfpalive.github.io/2026-Quiz/xassiqjwbearjwhqdbywhntyiia.png'; // Replace with your file URL
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});