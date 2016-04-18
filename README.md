#ng-static-daterange

version 1.0

基于angular 1.x 和 bootstrap 3 选择固定时间段插件
---
for user choose static date range


## Demo

Watch the Tree component in action on the [demo page](http://plnkr.co/edit/2q2k0t?p=preview).

## Requirements
Angular 1.x and Bootstrap 3 

## Usage

### Download
- Using [bower](http://bower.io/) to install it. `bower install ng-static-daterange`
- Using npm to install it . `npm install ng-static-daterange` 

### Code
Add the sortable module as a dependency to your application module:

```js
var myAppModule = angular.module('MyApp', ['ngStaticDateRange'])
```

```HTML View or Templates
<p ng-static-date-range on-range-change="dateRangeChanged($dateRange)" range-model="dateRange" format="yyyy/MM/dd" class="form-group"></p>
```

#### Attributes
##### on-range-change
like ng-change,when date range are changeed 


##### range-model
binding model,will init to {startDate: xxx, endDate: xxx},both startDate and endDate are Date type.

##### range-count
how many days the static range are.

##### format
format of date range to display .

