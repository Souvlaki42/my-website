import { cloneElement } from "react";
import GithubCalendar from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import { formatDate } from "~/lib/utils";
import "react-tooltip/dist/react-tooltip.css";

export default function ActivityCalendar() {
  return (
    <div className="font-semibold border-sky-blue border-3 rounded-xl p-4">
      <GithubCalendar
        username="Souvlaki42"
        weekStart={1}
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
            "data-tooltip-html": `${activity.count} contributions on ${formatDate(activity.date)}.`,
          })
        }
      />
      <Tooltip id="react-tooltip" />
    </div>
  );
}
