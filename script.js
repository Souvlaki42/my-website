const maintenanceMode = true;
let urlPrefix = "";
if (window.location.hostname !== "souvlaki42.github.io") {
    urlPrefix = ".html";
}
if (maintenanceMode) {
    window.location.href = `down${urlPrefix}`;
}