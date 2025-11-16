import { cloneElement } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import { formatOrdinalDate } from "~/lib/utils";
import "react-tooltip/dist/react-tooltip.css";

export default function ActivityCalendar() {
  return (
    <div className="font-semibold border-sky-blue border-3 rounded-xl p-4">
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
        renderBlock={(block, activity) =>
          cloneElement(block, {
            "data-tooltip-id": "react-tooltip",
            "data-tooltip-html": `${activity.count} contributions on ${formatOrdinalDate(activity.date)}.`,
          })
        }
      />
      <Tooltip id="react-tooltip" />
    </div>
  );
}
