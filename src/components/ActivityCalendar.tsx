import { GitHubCalendar } from "react-github-calendar";

export default function ActivityCalendar() {
  return (
    <div className="font-semibold border-sky-blue hover:border-light-blue border-3 rounded-xl p-2">
      <GitHubCalendar
        username="Souvlaki42"
        weekStart={1}
        errorMessage="Something went wrong when fetching GitHub activity. Please try again later."
        theme={{
          dark: [
            "var(--color-surface-dark)",
            "var(--color-surface)",
            "var(--color-sky-blue)",
            "var(--color-light-blue)",
            "var(--color-isabelline)",
          ],
        }}
      />
    </div>
  );
}
