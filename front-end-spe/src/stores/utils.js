import { computed, watch } from "vue";

export const updateWeekDays = (selectedMonth, selectedYear, weekDays) => {
  if (selectedMonth !== null && selectedYear !== null) {
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let startIndex = firstDayOfMonth;

    // Remove Fridays and Saturdays
    let weekDayList = [];
    for (let week = 0; week < 4; week++) {
      let count = 0;
      while (count < 5) {
        if (
          daysOfWeek[startIndex % 7] !== "Fr" &&
          daysOfWeek[startIndex % 7] !== "Sa"
        ) {
          weekDayList.push(daysOfWeek[startIndex % 7]);
          count++;
        }
        startIndex++;
      }
    }

    weekDays.value = weekDayList;
  }
};

export const formattedDates = (selectedMonth, selectedYear, weekDays) => {
  const dates = [];
  const year = selectedYear.value;
  const month = selectedMonth.value;

  if (month !== null && weekDays.value.length > 0) {
    let j = 0;
    for (let index = 0; index < 28; index++) {
      for (let i = 0; i < 5; i++) {
        const day = weekDays.value[i];
        let date = "";
        if (index === 0) {
          date = new Date(
            year,
            month,
            getDateForWeekday(day, month, year) + index
          );
        } else {
          date = new Date(
            year,
            month,
            getDateForWeekday(day, month, year) + index - 1
          );
        }
        dates.push({ day, date: date.toLocaleDateString() });
        j += 7;
      }
      index += 7;
    }
  }

  return dates;
};