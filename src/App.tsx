import { FaDiscord, FaEnvelope, FaGithub, FaSpotify, FaTwitter } from "react-icons/fa";

export default function App() {
  return (
    <>
      <section id="home">
        <h1 className="flex flex-col text-5xl font-outfit text-primary-text justify-center h-screen ml-12 leading-tight font-normal">
          <span className="font-roman">
            Hello, I am <span className="text-hover-text">Souvlaki42</span>
          </span>
          <br />
          <span>Full Stack Developer / Designer</span>
          <span>Tech Enthusiast, Student, Gamer</span>
          <div className="text-4xl mt-8 flex">
            <a href="https://twitter.com/souvlaki42"><FaTwitter className="text-icon"/></a>
            <a href="https://discord.com/users/812342041119031306"><FaDiscord className="text-icon"/></a>
            <a href="https://open.spotify.com/user/31ljep3hwenevbpitf3gze6qziau"><FaSpotify className="text-icon"/></a>
            <a href="https://github.com/Souvlaki42"><FaGithub className="text-icon"/></a>
            <a href="mailto:souvlaki42@souvlaki.me"><FaEnvelope className="text-icon"/></a>
            <span className="text-primary-text font-outfit text-3xl">&copy; {new Date().getFullYear()} Souvlaki42</span>
          </div>
        </h1>
      </section>
    </>
  );
}
