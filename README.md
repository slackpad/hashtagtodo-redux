![HashTagTodo Logo](logo.png)

# HashtagTodo (Google Apps Script Edition)

**HashtagTodo** is a lightweight task-tracking system built entirely on Google Calendar and Apps Script.

Mark events as `#todo` in your calendar, and this script will:
- **Track** them visually (color-coded as tangerine)
- **Roll them forward** each day until they're marked complete
- **Mark them done** when you change their color to graphite
- Run across **all calendars you own**

This is a port of the original [`hashtagtodo`](https://github.com/slackpad/hashtagtodo) project.

---

## How It Works

1. Add `#todo` anywhere in your calendar event title.
2. The script highlights the event in **tangerine** to show it's being tracked.
3. If it's not marked **graphite**, it gets rolled forward one day when it becomes overdue.
4. You mark it done simply by **changing the event color to graphite**.
5. That’s it!

The script runs in the background:
- Every **hour**, checking for stale `#todo`s to roll forward
- Every **5 minutes**, scanning for new `#todo`s and marking them orange

---

## Setup Instructions

### 1. Create the Script

- Go to [Google Apps Script](https://script.new)
- Copy and paste the code from `Code.gs`
- Save the project

### 2. Authorize & Install Triggers

- Run the function: `createOrUpdateTriggers`
- Authorize the script when prompted
- You're done!

The script will now run automatically and maintain your `#todo`s.

---

## Example

- You create an event: `Weekly plan #todo`
- Script colors it **tangerine**
- You forget to do it — script bumps it to the next day
- You finally do it — change color to **graphite**
- Script leaves it alone forever. Done.

---

## Notes

- Events must contain `#todo` in the title
- Color changes (graphite = done, tangerine = tracked) are how the system knows what to do
- Runs hourly by default — you can adjust the timing in the triggers

---

## License

MIT — use it, remix it, make it yours.

---

## Credits

Inspired by the original [HashtagTodo](https://github.com/slackpad/hashtagtodo) project by [@slackpad](https://github.com/slackpad).

Port was mostly vibe coded by ChatGPT-4o.
