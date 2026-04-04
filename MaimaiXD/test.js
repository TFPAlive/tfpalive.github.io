// Inject otohime script into the page
const otohimeScript = document.createElement("script");
otohimeScript.src = "https://otohi.me/go.js";

document.body.appendChild(otohimeScript);

document.body.setAttribute("data-otohime-token", "6ac0bcdec6fe4cddbabd0acdbbc76346");
