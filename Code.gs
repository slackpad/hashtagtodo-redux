function rollForwardIncompleteTodos() {
  const calendars = CalendarApp.getAllCalendars();
  const now = new Date();

  const start = new Date();
  start.setDate(now.getDate() - 5);

  calendars.forEach(calendar => {
    if (!calendar.isMyPrimaryCalendar() && !calendar.isOwnedByMe()) return;

    const events = calendar.getEvents(start, now);
    events.forEach(event => {
      const title = event.getTitle();
      const color = event.getColor();

      if (title.includes('#todo')) {
        if (color === CalendarApp.EventColor.GRAY) return;

        const eventStart = event.getStartTime();
        const eventEnd = event.getEndTime();
        if (eventEnd > now) return;

        const newStart = new Date(eventStart);
        const newEnd = new Date(eventEnd);
        newStart.setDate(newStart.getDate() + 1);
        newEnd.setDate(newEnd.getDate() + 1);

        event.setTime(newStart, newEnd);
        event.setColor(CalendarApp.EventColor.ORANGE);
        console.log(`Moved: ${title} → ${newStart.toDateString()} in ${calendar.getName()}`);
      }
    });
  });
}

function markNewTodosAsTracked() {
  const calendars = CalendarApp.getAllCalendars();
  const now = new Date();

  const future = new Date();
  future.setDate(future.getDate() + 30);

  calendars.forEach(calendar => {
    if (!calendar.isMyPrimaryCalendar() && !calendar.isOwnedByMe()) return;

    const events = calendar.getEvents(now, future);
    events.forEach(event => {
      const title = event.getTitle();
      const color = event.getColor();

      if (title.includes('#todo') &&
          color !== CalendarApp.EventColor.ORANGE &&
          color !== CalendarApp.EventColor.GRAY) {
        event.setColor(CalendarApp.EventColor.ORANGE);
        console.log(`Marked as tracked: ${title} (${calendar.getName()})`);
      }
    });
  });
}

function createOrUpdateTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  const has = fn => triggers.some(t => t.getHandlerFunction() === fn);

  if (!has('rollForwardIncompleteTodos')) {
    ScriptApp.newTrigger('rollForwardIncompleteTodos')
             .timeBased().everyHours(1).create();
  }

  if (!has('markNewTodosAsTracked')) {
    ScriptApp.newTrigger('markNewTodosAsTracked')
             .timeBased().everyMinutes(5).create();
  }
}
