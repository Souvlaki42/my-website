let urlPrefix = "";
const backBtn = document.querySelector("[data-back-btn]");
if (backBtn) backBtn.href = `${window.location.protocol}//${window.location.hostname}:${window.location.port === "80" || window.location.port === "443" ? "" : window.location.port}`;
execute = async () => {
		const response = await fetch("https://api.npoint.io/5c3b59ca8257e0ee5272").then((res) => res.json()).catch((err) => console.log(err));
		const maintenanceMode = response.souvlaki42.maintenanceMode;

		if (window.location.hostname !== "souvlaki42.github.io") {
			urlPrefix = ".html";
		}
		if (maintenanceMode) {
			if (window.location.href !== `${window.location.protocol}//${window.location.hostname}:${window.location.port === "80" || window.location.port === "443" ? "" : window.location.port}/down${urlPrefix}`) {
			window.location.href = `down${urlPrefix}`;
		}
	}
}
execute();