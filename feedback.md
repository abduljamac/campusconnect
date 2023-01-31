# Abdul Feedback

- Using tabs instead of the 2 spaces makes PR’ing more difficult on `Github`
- `const rootStore = useStore()` should be used in the different components instead of passing properties as props.

```
<DayItem
...
setSelectedDay={rootStore.setSelectedDay}
selectedDay={rootStore.selectedDay}
/>
```

- Deconstructing makes code much more readable

```
const { days, setSelectedDay, selectedDay } = useStore()
...
days.maps(day...)
```

- Don’t do inline functions for more than one call

```
onClick={() => {
	setSelectedDay(day)
	populateTimes()
}}
```

- Code can be simplified

```
let className
	if (!time.available) {
		className = "timeItem disabled"
	} else if (selectedTime === time.time) {
		className = "timeItem selected"
	} else {
		className = "timeItem"
	}
```

can be

```
let className = "timeItem"
if (!time.available) {
	className += " disabled"
} else if (selectedTime === time.time) {
	className += " selected"
}
```

- Should be using `computed` for `timeFilter`

```
get timeFilter() {
  if (!this.selectedPeriod) return this.constantTimes;
  return filterTimes(this.constantTimes, this.selectedPeriod);
}
```

It replaces the need for

```
setSelectedPeriod(period)
let newTime = timeFilter()
setTimes(newTime)
```

- Using a lot of unnecessary values and using `console.log` makes it look like it’s not working and you are debugging as you go.

```
getNumberOfPros = async () => {
	let today = moment()
	console.log(today)
	let numberOfPros = await mockApi.getNumberOfPros(today.date())
	console.log(numberOfPros)
	this.setNumberOfPros(numberOfPros)
}
```

Should be checking per the selected day
