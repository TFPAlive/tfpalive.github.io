// Download a file when the page loads
window.addEventListener('load', () => {
    const fileUrl = 'YOUR_FILE_URL_HERE'; // Replace with your file URL
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});