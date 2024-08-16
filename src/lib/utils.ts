export const AppConfig = {
  author: "Souvlaki42",
  title: "Souvlaki42",
  description: "My corner of the internet",
  image: "/social.png", // this will be used as the default social preview image
  twitter: "@souvlaki42",
  site:
    import.meta.env.MODE === "production"
      ? "https://souvlaki.me/"
      : "http://localhost:4321", // this is your website URL
};
