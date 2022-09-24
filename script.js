execute = async () => {
	const response = await fetch("https://api.npoint.io/5c3b59ca8257e0ee5272").then((res) => res.json()).catch((err) => console.log(err));
	const maintenanceMode = response.souvlaki42.maintenanceMode;
	let urlPrefix = "";
	if (window.location.hostname !== "souvlaki42.github.io") {
		urlPrefix = ".html";
	}
	if (maintenanceMode) {
		window.location.href = `down${urlPrefix}`;
	}
}

execute();