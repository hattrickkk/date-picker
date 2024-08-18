# Date-picker

### Description

The "date-picker-httrkk" library is a tool that provides an interface for working with dates. It\`s includes three main components: DatePicker, RangePicker and TaskPicker. Widely used in web applications to make date entry easier. You can see demo [here](https://date-picker-demo-one.vercel.app/).

### Installation

```bash
npm i date-picker-httrkk
```

or

```bash
yarn add date-picker-httrkk
```

### How to use

First you need to install the library as described in the installation point, and you also need to have the dependencies already installed:

-   React
-   ReactDOM

After, you need to import the necessary components like this:

```js
import { DatePicker, RangePicker, TaskPicker } from 'date-picker-httrkk'
```

### Usage examples

```jsx
<DatePicker
    hideHolidays
    holidaysColor='#f1e2e2'
    isHighlightWeekends
    maxYear={2300}
    minYear={2000}
    weekStarts='Sunday'
/>
```

or

```jsx
<TaskPicker
    hideHolidays
    holidaysColor='#f1e2e2'
    isHighlightWeekends
    maxYear={2300}
    minYear={2000}
    weekStarts='Sunday'
/>
```

or

```jsx
<RangePicker
    hideHolidays
    holidaysColor='#f1e2e2'
    isHighlightWeekends
    maxYear={2300}
    minYear={2000}
    weekStarts='Sunday'
/>
```

### Arguments

| Argument            | Type              | Description                                                      |
| ------------------- | ----------------- | ---------------------------------------------------------------- |
| hideHolidays        | boolean           | Allows you to show or hide holidays                              |
| holidaysColor       | string            | Allows you to specify the cell background color for the holiday. |
| isHighlightWeekends | boolean           | Allows you to highlight weekends                                 |
| maxYear             | number            | Displays the maximum possible year for date-picker               |
| minYear             | number            | Displays the minimum possible year for date-picker               |
| weekStarts          | 'Monday'/'Sunday' | Allows you to choose to start the week on Monday or Sunday       |

### Technologies

-   [React](https://reactjs.org/docs/getting-started.html)
-   [Typescript](https://www.typescriptlang.org/)
-   [Rollup](https://rollupjs.org/guide/en/)
-   [Storybook](https://storybook.js.org/docs/basics/introduction/)
-   [Prettier](https://prettier.io/)
-   [Eslint](https://eslint.org/docs/user-guide/configuring)
-   [Babel](https://babeljs.io/docs/en/configuration)
-   [Jest](https://jestjs.io/ru/docs/getting-started)
-   [Styled-components](https://www.styled-components.com/docs)
-   [Husky](https://www.npmjs.com/package/husky)
-   [Lint-staged](https://www.npmjs.com/package/lint-staged/v/12.3.2)
