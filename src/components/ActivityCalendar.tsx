import { GitHubCalendar } from "react-github-calendar";

export default function ActivityCalendar() {
  return (
    <div className="font-semibold border-sky-blue hover:border-light-blue border-3 rounded-xl p-2">
      <GitHubCalendar
        username="Souvlaki42"
        weekStart={1}
        errorMessage="Something went wrong when fetching GitHub activity. Please try again later."
        theme={{
          light: [
            "var(--color-surface)",
            "var(--color-indigo)",
            "var(--color-light-blue)",
            "var(--color-sea-blue)",
            "var(--color-parchment)",
          ],
          dark: [
            "var(--color-surface-dark)",
            "var(--color-indigo-dark)",
            "var(--color-sky-blue)",
            "var(--color-sea-blue)",
            "var(--color-parchment-dark)",
          ],
        }}
      />
    </div>
  );
}
