# Alyssa Johnson's JavaScript Midterm

- **Name**: Alyssa Johnson
- **Dataset**: meta-ads

## Overview

I decided to choose the meta-ads dataset because it strongly ties into two topics that interest me: one, advertising, and two, the use of media to incite political violence. I also thought it was really interesting that the data shows which ads were about Israel, since that connects to the ongoing conflict between Israel and Palestine. I also thought the variables (the currency used to purchase the ad, the amount spent on it, the number of impressions it received, etc.) would be fun to work with. 

```js
import {utcParse,utcFormat} from "d3-time-format";
```

## Attach the data


```js
const adData = FileAttachment("./../data/midterm-options/meta-ads/meta-ads-mentioning-israel-after-2015-09-11.csv").csv({typed: true})
```
```js
//The output is an array with 172,800 objects. I can see all the variables mentioned in the readme.md file, including the ad's id, creation time, currency, impressions, URL, and the amount of money spent. 
adData 
```

## Convert Dates

Convert the dates, which are strings, into Date() objects with your own custom
D3.js parser and any formatters. Discuss any particular choices to format the
date data in any new ways.

Again, be sure to output your newly transformed data in executable codeblocks
for easier verification and reviewing.

```js
const parseDateSlash = utcParse("%d/%m/%y")
```

```js
let adDateObjectNew = adData.map(
  (ad) => 
  {ad.ad_creation_time_obj = utcParse("%d/%m/%y")
    return ad
  }
)
```
```js
// This new field is showing up in the console for each object, but instead of a data, I'm seeing f(c), which means function. I'm unsure if this is okay or if I'm doing something wrong. I posted in the help forum. For now, I'll leave this as is unless I get a response or figure this out. 
adDateObjectNew
```

## Grouping #1 - adDataByCountryInternMap (Grouping By Currency)

1. Choose the field to group the data by (I chose 'currency_original' because I wanted to see the different countries the data came from and how much of it came from each place)
2. Declare an intern map to hold the newly grouped data (adDataByCountryInternMap) in an executable codeblock
3. Use d3.group to group the data by the 'currency_original' field
4. Declare the newly grouped data (adDataByCountryInternMap) in a second executable codeblock
5. Leave a multi-line comment in the second codeblock describing the new output

```js
const adDataByCountryInternMap = d3.group(
  adData, 
  (d) => d.currency_original
)
```
```js
/* The output is a Map of 54 different Arrays of objects; each array
* represents a different type of currency, and each object is an item 
* from the dataset (aka each item is an ad). According to this 
* grouping, the most common currencies used were USD (with 99,057
* objects) and ILS/Israeli Sheqels (with 23,980 objects), while the 
* least common currency used was NIO/Nicaraguan Cordoba (with just 1 
* object). I plan to explore this one more in my own time; it's very  
* interesting to see which countries were most involved. */
adDataByCountryInternMap 
```

## Grouping #2 - adDataRollUpMaxSpendAndID (Grouping By Max Spend and Ad Archive ID)

1. Decide which fields to use for grouping the data (I chose the ad_url and ad_archive_id fields because I felt that they would be very helpful fields for someone working with this dataset)
2. Introduce a new Array for grouping the data (adDataRollUpMaxSpendAndID)
3. Use d3.rollup to group and reduce the data with my chosen fields
4. Input my original Array of objects (adData)
5. Reduce the data with D.length
6. Use two arrow functions to group the data by my chosen fields
7. Declare the newly grouped data (adDataRollUpMaxSpendAndID) in a second executable codeblock
8. Describe the new output in the second codeblock with a multi-line comment

```js
let adDataRollUpMaxSpendAndID = d3.rollup(
  adData,
  (D) => D.length,
  (d) => d.ad_url,
    (d) => d.ad_archive_id
)
```

```js
/* The output is a Map with 172800 objects. Each object is an item 
* (ad) from the dataset, and each item's Facebook URL and archive ID 
* are shown. The URL is shown first, and then an arrow function comes 
* next to point to the item's respective archive ID. It's worth 
* noting that the archive IDs are each in Maps of their own, with the
* only object in those Maps being the archive ID. Presumably this is 
* because both fields got a (d) => line and therefore each got their 
* own Map. The fields I used for grouping here were less interesting 
* than the first group, but the rollup method felt more convenient!
*/
adDataRollUpMaxSpendAndID
```

## Reflection

Prompt: What 2-3 insights and 2-3 questions did you glean from your initial work
with the dataset?

### My Insights

1. Grouping data is a lot more convenient than I initially realized! The original data is a bit difficult to make sense of on its own, especially if I'm trying to glean insights from the individual items, but by grouping the data by specific fields, I can access the insights I want more quickly and efficiently. One of the most pressing questions I had about the dataset was which countries were funding the most Meta ads from the set. Through grouping the data by the currency_original field, I was able to quickly answer my question!

2. Datasets can tell a story on their own. I haven't worked much with data before this (aside from the data entry tasks I do for my job), but while I was working with this dataset, I noticed how much I was learning just from the data itself --- context and analysis would be interesting too, but it's not necessarily needed. I was able to use the data to figure out which countries the ads were coming from, how much was spent, how many people the ads reached, etc. 

### My Questions

1. I still have some questions about the date conversion part of this, specifically the part where my object was shown in the console as f(c) instead of an actual date. I'm wondering what I did wrong there and what caused my Data object to output as a function. 

2. I have some curiosities about the dataset itself, which I plan to answer by looking into The Markup's story. I'm interested to know how they procured the dataset (and how data journalists get ahold of datasets like this in general), how each field was useful to them, and what conclusions they drew from it. 