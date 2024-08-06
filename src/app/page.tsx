import { WaveStars } from "@/components/WaveStars";

export default function Home() {
	return (
		<>
			<main>
				<WaveStars />
				<h1 className="absolute bottom-[60vh] w-full translate-y-1/2 text-center text-2xl font-extrabold text-white">
					Souvlaki42
				</h1>
			</main>
		</>
	);
}
