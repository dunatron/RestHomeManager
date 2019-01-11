## Line Report

This is the straight line reporting reusable component.

It has two main props `rowProps` and `data`

```
rowProps
```

rowProps is an array of objects and is your config. each object is a line on the report.

```
data
```

#### How does it work

essentially we will loop over the `data` conf as these are our columns. Inside each column we loop over the `rowProps` config which will render something for every object. it does this by knowing what its type and key || keys are.

#### Props

###### data conf

```js
const data = [
  {
    columnTitle: "Equipment",
    values: {
      balBegin: 463.38,
      additions: 120,
      interestExpense: 180,
    },
  },
  {
    columnTitle: "Vehicles",
    values: {
      balBegin: 109.36,
      additions: 12000,
      interestExpense: 700,
    },
  },
]
const rowProps = [
  {
    name: "ROU ASSET CARRYING VALUE ROLL FORWARD",
    type: "header",
  },
  {
    name: "BALANCE AT THE BEGINNING OF THE PERIOD",
    key: "rouStartBalance",
    type: "h1",
    emptyVal: 0,
  },
  {
    name: "Additions",
    key: "rouAdditions",
    type: "p",
    cellClasses: "missing bold",
    keyClasses: "red",
    emptyVal: 0,
  },
  {
    name: "deprication",
    key: "rouDepreciation",
    type: "p",
    emptyVal: 0,
  },
]

<LineReport
  id={1}
  name="ROU ASSET CARRYING VALUE ROLL FORWARD"
  maxHeight={1200}
  data={data}
  rowProps={rowProps}
  reportWidth={1200}
  keyPanelWidth={400}
  colWidth={180}
  collapsed={false}
/>

```

## IMPORTANT NOTE

sometimes the backend is incosistent in it's data or how it expects the front end to display it.
For example the MATURITY ANALYSIS - CONTRACTUAL UNDISCOUNTED CASH FLOWS Report.
Instead of dynamically creating the columns we have specific columns(Low value, short Term, etc).

I will think about how to explain/write this clean later for now.
Sometimes data sent back has a different key than we would expect i.e it could be one of these. We can handle that too.
Instead of using `key` prop in your `REPORT_ROW_PROPS` you should use `keys` which is an array.

###### NOTE:

this will use the first key found for the cell value.if none are found it will use `emptyVal` prop.

```js
const EXEMPT_ROW_PROPS = [
  {
    name: "MATURITY ANALYSIS - CONTRACTUAL UNDISCOUNTED CASH FLOWS",
    type: "header",
  },
  {
    name: "Less than 3 months",
    keys: ["maMonths2", "maSTMonths2", "maLVMonths2"],
    type: "p",
    emptyVal: 0,
  },
```

## Component examples

###### LineReport

```js

{
  id: Unique, // This must be unique or suffer the consequences 😈
  name: String // name of the report,
  maxHeight:1200, // used for the css transition. make it the same or greater than your reports height
  data: [] // data conf
  rowProps:[]// rowProp conf
  reportWidth: 1200, // width of the report
  keyPanelWidth: 400, // width of the first panel(key column)
  colWidth: 180, // width of each column
  collapsed: Boolean // if this report should be collapsed by default
}

<LineReport
  id={1}
  name="ROU ASSET CARRYING VALUE ROLL FORWARD"
  maxHeight={1200}
  data={disclosureReport}
  rowProps={DISCLOSURE_ROW_PROPS}
  reportWidth={1200}
  keyPanelWidth={400}
  colWidth={180}
  collapsed={false}
/>
```

###### LineExportButton

```js
<LineExportButton
  name="CSV - Maturity Analysis Report"
  icon="csv"
  onClick={() =>
    // see functions for LineCsvExport
    LineCsvExport(
      EXEMPT_ROW_PROPS,
      mobx.toJS(exemptReport),
      "CSV - Maturity Analysis Report"
    )
  }
/>
```

## Functions

When exporting you can use the `LineCsvExport` function if you generated the report using the LineReport.

###### LineCsvExport

Takes 3 params. your `rowProps` conf, `data` conf and a name for the file

```js
LineCsvExport(rowProps, data, "CSV - Maturity Analysis Report")
```
