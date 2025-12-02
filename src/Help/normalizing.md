# Normalizing Values in Datasets

Sometimes data are messy. The reasons are many, but you should be aware that you should watch out for odd and varied values within columns, so you can normalize your values accordingly.

Here's a case of police stop data within Wake County. Let's say after we group our data by the available feature of `location`, I realize that there are some odd redundancies and errors for the same part of Wake County vary, due to human error.

<p class="figure-caption cc-image">
  Grouped police stop data by <code>.location</code> feature.
</p>

![](./../assets/images/help/messy-data-nc-police-stop-locations-1.png)

Note how Raleigh alone appears as five different values:

1. `"RA, Wake County"`
2. `"Raleigh, Wake County"`
3. `"RALEIGH, Wake County"`
4. `"RALEGH, Wake County"`
5. `"RALEOIGH, Wake County"`

Another set of issues, after looking more closely at locations: they're not all at the same level. Sometimes the data use township names and other times they use city names.

Due to these two issues, my normalization solution must decide how to replace and make existing values consistent through a replacement method. In this case, I learned that a goal to map the data within the county would be easiest at the township level, so I will normalize the data by township, which means I need to verify which cities in the data reside within which townships.

Once I have all of the info to normalize the data, I can use a customized Map(), wherein:

- **Keys** == the messy value, and
- **Values** == Township value of which to replace the messy value

<p class="codeblock-caption cc-image">
  Custom Map() of messy values as keys to the appropriate normalized value.
</p>

```javascript
const LOCATIONS = new Map(
  [
    ["RA, Wake County", "RALEIGH"],
    ["Raleigh, Wake County", "RALEIGH"],
    ["RALEIGH, Wake County", "RALEIGH"],
    ["RALEGH, Wake County", "RALEIGH"],
    ["RALEOIGH, Wake County", "RALEIGH"],
    ["CA, Wake County", "CARY"],
    ["CR, Wake County", "CARY"],
    ["CY, Wake County", "CARY"],
    ["C, Wake County", "CARY"],
    ["CARY, Wake County", "CARY"],
    ["Cary, Wake County", "CARY"],
    ["WF, Wake County", "WAKE FOREST"],
    ["ROLESVILLE, Wake County", "WAKE FOREST"],
    ["MV, Wake County", "CEDAR FORK"],
    ["GR, Wake County", "SAINT MARY'S"],
    ["GARNER, Wake County", "SAINT MARY'S"],
    ["WD, Wake County", "MARKS CREEK"],
    ["Q, Wake County", "MIDDLE CREEK"],
    ["FV, Wake County", "MIDDLE CREEK"],
    ["AP, Wake County", "WHITE OAK"],
    ["APEX, Wake County", "WHITE OAK"],
    ["HS, Wake County", "HOLLY SPRINGS"],
    ["KD, Wake County", "SAINT MATTHEWS"],
    ["KNIGHTDALE, Wake County", "SAINT MATTHEWS"],
    ["P, Wake County", "PANTHER BRANCH"],
    ["ZB, Wake County", "LITTLE RIVER"],
    ["D, Wake County", "Durham"],
    ["`, Wake County", "UNKNOWN"],
    ["J, Wake County", "UNKNOWN"],
    ["WS, Wake County", "UNKNOWN"],
    ["a, Wake County", "UNKNOWN"],
    [", Wake County", "UNKNOWN"],
    ["nan, Wake County", "UNKNOWN"],
    ["24, Wake County", "UNKNOWN"],
  ]
)
```

<!-- Declare/instantiate LOCATIONS -->
```js
const LOCATIONS = new Map(
  [
    ["RA, Wake County", "RALEIGH"],
    ["Raleigh, Wake County", "RALEIGH"],
    ["RALEIGH, Wake County", "RALEIGH"],
    ["RALEGH, Wake County", "RALEIGH"],
    ["RALEOIGH, Wake County", "RALEIGH"],
    ["CA, Wake County", "CARY"],
    ["CR, Wake County", "CARY"],
    ["CY, Wake County", "CARY"],
    ["C, Wake County", "CARY"],
    ["CARY, Wake County", "CARY"],
    ["Cary, Wake County", "CARY"],
    ["WF, Wake County", "WAKE FOREST"],
    ["ROLESVILLE, Wake County", "WAKE FOREST"],
    ["MV, Wake County", "CEDAR FORK"],
    ["GR, Wake County", "SAINT MARY'S"],
    ["GARNER, Wake County", "SAINT MARY'S"],
    ["WD, Wake County", "MARKS CREEK"],
    ["Q, Wake County", "MIDDLE CREEK"],
    ["FV, Wake County", "MIDDLE CREEK"],
    ["AP, Wake County", "WHITE OAK"],
    ["APEX, Wake County", "WHITE OAK"],
    ["HS, Wake County", "HOLLY SPRINGS"],
    ["KD, Wake County", "SAINT MATTHEWS"],
    ["KNIGHTDALE, Wake County", "SAINT MATTHEWS"],
    ["P, Wake County", "PANTHER BRANCH"],
    ["ZB, Wake County", "LITTLE RIVER"],
    ["D, Wake County", "Durham"],
    ["`, Wake County", "UNKNOWN"],
    ["J, Wake County", "UNKNOWN"],
    ["WS, Wake County", "UNKNOWN"],
    ["a, Wake County", "UNKNOWN"],
    [", Wake County", "UNKNOWN"],
    ["nan, Wake County", "UNKNOWN"],
    ["24, Wake County", "UNKNOWN"],
  ]
)
```

## How to Use a Custom Map() to Normalize Values

```js
const ncPoliceStops = FileAttachment("./../data/other/policestops-with-townships.csv").csv({typed:true})
```

Now that I wrote a custom map of values, I can use it in a function that will perform the following task:

1. Use JS Map()'s `.get()` method that uses the incoming messy value at .location as a key.
2. Return the normalized township name that is keyed to the messy value. If the key does not find any values in the `Map()`, I will return `"NOT_FOUND"`, so I can isolate any new issues that I may have missed.

<p class="codeblock-caption cc-image">
  Function that will use my custom Map() to return a normalized value for each row of data.
</p>

<!-- Create functions to test and return desired normed value for row's property -->
```javascript
/** normalizeLocation()
 * Normalize .location values and
 * map unknown or empty inputs as "UNKNOWN"
**/ 
const normalizeLocation = (d) => {
  /**
   * Use .get() to retrieve the keyed varied value
   * linked to a value that will normalize it.
   * EXAMPLES:
   *  - Incoming value of `"RALEOIGH, Wake County"`
   *    will return a normed value of `"RALEIGH"`
   *  - Incoming value of `"RA, Wake County"`
   *    will return a normed value of `"RALEIGH"`
  **/
  const newNormal = LOCATIONS.get(d)

  if ( (newNormal != null) || (newNormal != "") ) {
    return newNormal
  }
  else {
    return "NOT_FOUND"
  }

}
```

```js
const normalizeLocation = (d) => {
  const newNormal = LOCATIONS.get(d)
  if ( (newNormal != null) || (newNormal != "") ) {
    return newNormal
  }
  else { return "NOT_FOUND" }
}
```

Once I define my normalizing function, I can use it within a .map() function, so it runs when I wish to create a new keyed property in my dataset, as seen in the example code below. Note how I retain the original property.

<p class="codeblock-caption cc-image">
  Calling my function within a .map() that creates a new normalized keyed property, but retains the original as well.
</p>

```javascript
const ncPoliceStopsNormalized = ncPoliceStops.map(
  (d) => ({
    original_location: d.location,
    // Call normalizeLocation() and pass the original location value,
    // which will be used as a key in our Map(). The function
    // returns the desired normed value set in our Map()
    township_name: normalizeLocation(d.location),
  })
)
```

## Normalize by Population

Normalizing can also mean that you account for the ratio of a particular column/feature of values in a dataset to make more fair comparisons. For example, if we wanted to answer questions about police traffic stops across race and other demographics about a particular population, then we should not rely solely on simple absolute frequencies to tell the story.

```js
const raleighPop = 131023
const raleighPopRatios = new Map([
  ["white", 0.591*raleighPop],
  ["black", 0.219*raleighPop],
  ["hispanic", 0.096*raleighPop],
  ["native", 0.003*raleighPop],
  ["asian/pacific islander", 0.044*raleighPop],
  ["unknown", null],
])
```

```js
const raleighStopsByRace = d3.rollups(
  ncPoliceStops,
  (leaves) => {
    // Adjust for population
    if (leaves[0].race != "unknown") {
      return {
        race: leaves[0].race,
        stopFreq: leaves.length,
        normalizedStopFreq: leaves.length / raleighPopRatios.get(leaves[0].race),
      }
    }
    else {
      return {
        race: leaves[0].race,
        stopFreq: leaves.length,
        normalizedStopFreq: null,
      }
    }
  },
  (d) => d.race,
)

const raleighStopsByRaceMap = d3.rollup(
  ncPoliceStops,
  (leaves) => {
    // Adjust for population
    if (leaves[0].race != "unknown") {
      return {
        race: leaves[0].race,
        stopFreq: leaves.length,
        normalizedStopFreq: leaves.length / raleighPopRatios.get(leaves[0].race),
      }
    }
    else {
      return {
        race: leaves[0].race,
        stopFreq: leaves.length,
        normalizedStopFreq: null,
      }
    }
  },
  (d) => d.race,
)
```

```js
const flatStopsByRace = raleighStopsByRace.flatMap(
  ([race, racesList]) => {
    return racesList
  }
)

const SOR_MEDIAN = d3.median(flatStopsByRace, (d) => d.normalizedStopFreq)
const SOR_THRESHOLD = 0.001
```

Take the following case, where the absolute frequencies suggest, visually, how `black` and `white` racial categories are relatively equal.

```js
Plot.plot({
  title: "Frequency of Police Stops per Race in Raleigh",
  marks: [
    Plot.barY(
      flatStopsByRace,
      {
        x: "race",
        y: "stopFreq",
        fill: "race",
        sort: {x: "-y"}
      }
    )
  ]
})
```

However, according to the [Census](https://censusreporter.org/profiles/06000US3718392612-raleigh-township-wake-county-nc/), whites account for 59.1% of Raleigh's 131,023 total population, while people who are Black account for only 21.9% of Raleigh. This particular ratio is relatively consistent across neighboring counties. That said, we can use these ratios to normalize the police stop frequencies with the following formula:

>
> `Normalized Frequency of Police Stops` =
>
> `AF of Police Stops by Race` / (`AF of Raleigh's Population` x `Percentage of Racial Demographic`)
>

With this formula, we can then create a JS `Map()` of the appropriate keyed values for the feature of interest. In this case, we can map the racial categories to the population ratio to use in a normalizing procedure:

```javascript
// Figures as per Census:
// https://censusreporter.org/profiles/06000US3718392612-raleigh-township-wake-county-nc/
const raleighPop = 131023
const raleighPopRatios = new Map([
  ["white", 0.591*raleighPop],
  ["black", 0.219*raleighPop],
  ["hispanic", 0.096*raleighPop],
  ["native", 0.003*raleighPop],
  ["asian/pacific islander", 0.044*raleighPop],
  ["unknown", null],
])
```

Then, we can use the `raleighPopRatios` Map() in a d3.rollups() pattern to output the data grouped by race with normalized frequencies:

```javascript
// Group by race
const raleighStopsByRace = d3.rollups(
  ncPoliceStops,
  (leaves) => {
    /** Adjust for population
     *  If .race is not the unknown category, use formula.
    **/
    if (leaves[0].race != "unknown") {
      return {
        race: leaves[0].race,
        stopFreq: leaves.length,
        // Use the normalizing formula and mapped ratio value by race
        normalizedStopFreq: leaves.length / raleighPopRatios.get(leaves[0].race),
      }
    }
    else {
      return {
        race: leaves[0].race,
        stopFreq: leaves.length,
        // We can't account for the "unknown" race value in the data,
        // so set it to null.
        normalizedStopFreq: null,
      }
    }
  },
  (d) => d.race,
)

// Flatten the rolledup Map
const flatStopsByRace = raleighStopsByRace.flatMap(
  ([race, racesList]) => {
    return racesList
  }
)
```

Now, let's plot the normalized results, based on the local racial demographic ratio profile of Raleigh.

After normalizing the frequencies per race, we can now communicate the following about police stops in Raleigh:

<div class="grid grid-cols-2">
  <div class="card">
    <h3>Black population vs. White</h3>
    <p>
      Stopped ${raleighStopsByRaceMap.get("black").normalizedStopFreq / raleighStopsByRaceMap.get("white").normalizedStopFreq}x more than whites
    </p>
  </div>
  <div class="card">
    <h3>Hispanic population vs. White</h3>
    <p>
      Stopped ${raleighStopsByRaceMap.get("hispanic").normalizedStopFreq / raleighStopsByRaceMap.get("white").normalizedStopFreq}x more than whites
    </p>
  </div>
</div>

```js
Plot.plot({
  title: "Normalized Frequency of Police Stops per Race in Raleigh",
  marks: [
    Plot.barY(
      flatStopsByRace,
      {
        x: "race",
        y: "normalizedStopFreq",
        fill: "race",
        sort: {x: "-y"}
      }
    )
  ]
})
```

The results change dramatically and paint a different picture, if we adjust the frequencies in relation to a ratio appropriate for the column of values. We can also now conduct other measures, such as central tendencies:

- **MAX `normalizedStopFreq`**: ${d3.max(flatStopsByRace, (d) => d.normalizedStopFreq)}
- **MIN `normalizedStopFreq`**: ${d3.min(flatStopsByRace, (d) => d.normalizedStopFreq)}
- **AVG MEAN `normalizedStopFreq`**: ${d3.mean(flatStopsByRace, (d) => d.normalizedStopFreq)}
- **MEDIAN `normalizedStopFreq`**: ${SOR_MEDIAN}
- **MODE `normalizedStopFreq`**: ${d3.mode(flatStopsByRace, (d) => d.normalizedStopFreq)}
