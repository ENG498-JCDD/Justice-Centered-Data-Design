# Data Processing Basics

Let's learn how to group our data as a Map object with either `d3.group()` or `d3.rollup()`, but then convert it back to a flat Array of Objects.

Let's doso via a running case using `d3.group()`, but you could easily swap this out with any variation of `d3.rollup()`.

Let's say you have a table of womens clothing e-commerce reviews:

```js
const reviewsData = FileAttachment("./../data/womens-e-commerce-reviews/Womens-Clothing-E-Commerce-Reviews.csv").csv({typed:true})
```

```js
reviewsData
```

That's a lot of data to review, so let's group the data by the `"Class Name"`, which is simply broader categories of types of clothing.

```javascript
const byClassName = d3.group(
  reviewsData,
  d => d["Class Name"]
)
```

```js
const byClassName = d3.group(
  reviewsData,
  d => d["Class Name"]
)
```

Here's the output InternMap:

```js
byClassName
```

## Query the data by a key with .get()

Now we can query the InternMap() for a particular group with the `.get()` method, such as `"Jackets"`, and retrieve a list of objects:

```javascript
byClassName.get("Jackets")
```

Feel free to change the value in the code to render difference groups. Note how this one-level group means that the value returned is an Array of objects. That insight can help us think about how to create a nice flat Array of objects to use.

```js
byClassName.get("Jackets")
```

## Convert Maps Back to Array of Objects

Let's use [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) to create an Array from another data type like a Map/InternMap.

```javascript
/**
 * Array.from():
 * Create an Array from another data type like a Map/InternMap
 * Takes 2 params:
 *    1. another list-like object, such as a Map
 *    2. Accessor function to do something to that Map object,
 *       i.e., it functions like a built-in .map() function to
 *       iterate over all rows.
**/
Array.from(
  // 1. Let's reduce the data by a specific key in this example
  byClassName.get(className),
  // 2. Reducer function to do something with the data, as desired
  (values) => {
    // Let's just return the entire object that represents a row with props
    // But, you could do lots more, such as only return values of interest,
    // or do something with those values to make new columns, etc.
    return values
  }
)
```

Let's see the available keys to use to reduce the data, based on our rollup grouping above.

<!-- Get available keys, based on our rollup grouping -->
```js
Array.from(
  byClassName,
  ([key, values]) => key
)
```

Let's use the `Class Name` as a key to .get() that data group, but then transform it back the returned values for that key as an Array of Objects.

Check out the notebook's code to update the `Class Name` of interest.

```js
// Change this value to any available "Class Name" key
const className = "Shorts"
const reducedClassName = Array.from(
  byClassName.get(className),
  (values) => {
    return values
  }
)
```

Here's the reduced data, based on the desired `Class Name` value.

```js
reducedClassName
```

## Multiple Nested Groups

How do you work with more than 1 level?

Let's group the data by `Class Name` and `Rating`.

```javascript
const byClassAndRating = d3.group(
  reviewsData,
  d => d["Class Name"],
    d => d["Rating"],
)
```

```js
const byClassAndRating = d3.group(
  reviewsData,
  d => d["Class Name"],
    d => d["Rating"],
)
```

Here's the output. Note the two levels of keys before arriving at the grouped Array of objects for that grouping.

```js
byClassAndRating
```

### Use d3.rollup() for crunching numbers

Don't forget that data processing is about getting the data groups and calculations you need to answer questions.

What if we wanted to learn more about the typical user who reviews certain types of clothing, as well as the variation of that profile, based on available user data, such as the age, positive feedback counts, and the length of their review text. To begin asking questions about the users per clothing class and ratings, let's use d3.rollup() to add descriptive stats about these groupings.

```js
const getReviewTextLengths = (leaf) => {
  return leaf.map(
    (l) => {
      let textLength = 0
      if ((l["Review Text"] != null) && (l["Review Text"] != "")) {
        textLength = l["Review Text"].length
        return textLength
      }
      else {
        return textLength
      }
    }
  )
}

const getPositiveFeedbackCounts = (leaf) => {
  return leaf.map(
    (l) => {
      if (l["Positive Feedback Count"] != null) {
        return l["Positive Feedback Count"]
      }
      else {
        // If null, return 0 to maintain appropriate length
        return 0
      }
    }
  )
}
```

```js
const byClassAndRatingSummaries = d3.rollup(
  reviewsData,
  leaf => {
    // Get the groups rating
    const rating = leaf[0].Rating
    const className = leaf[0]["Class Name"]
    const reviewTextLengths = getReviewTextLengths(leaf)
    const positiveFeedbackCounts = getPositiveFeedbackCounts(leaf)

    // Calc CTs
    const centralTendencies = {
      className: className,
      rating: rating,
      // Add about age
      meanAge: d3.mean(leaf, v => v.Age),
      medianAge: d3.median(leaf, v => v.Age),
      modeAge: d3.mode(leaf, v => v.Age),
      minAge: d3.min(leaf, v => v.Age),
      maxAge: d3.max(leaf, v => v.Age),
      // Add about review text lengths
      meanReviewLength: d3.mean(reviewTextLengths),
      medianReviewLength: d3.median(reviewTextLengths),
      modeReviewLength: d3.mode(reviewTextLengths),
      minReviewLength: d3.min(reviewTextLengths),
      maxReviewLength: d3.max(reviewTextLengths),
      // Add about positive review counts
      meanPosFeedback: d3.mean(positiveFeedbackCounts),
      medianPosFeedback: d3.median(positiveFeedbackCounts),
      modePosFeedback: d3.mode(positiveFeedbackCounts),
      minPosFeedback: d3.min(positiveFeedbackCounts),
      maxPosFeedback: d3.max(positiveFeedbackCounts),
    }
    return centralTendencies
  },
  d => d["Class Name"],
    d => d["Rating"],
)
```

```js
byClassAndRatingSummaries
```


## Get Multiple Levels by chaining .get()

We can retrieve nested groups with chained uses of .get().

The below example will retrieve all data with the `Class Name` of `"Sweaters"` and a rating of `1`.

```javascript
byClassAndRating.get("Sweaters").get(1)
```

Feel free to change the values to see the results.

```js
byClassAndRating.get("Sweaters").get(1)
```

```js
const selectClothingClass = view(
  Inputs.select(
    reviewsData.map((r) => r["Class Name"]),
    {
      label: "Select a type of clothing",
      value: ["Sweaters"],
      multiple: true,
      unique: true,
    }
  )
)

const selectRating = view(
  Inputs.select(
    [1,2,3,4,5],
    {
      label: "Select a rating",
      value: [4],
      multiple: true,
    }
  )
)
```

```js
const selectedClassAndRating = []
for (const className of selectClothingClass) {
  for (const rating of selectRating) {
    selectedClassAndRating.push(byClassAndRatingSummaries.get(className).get(rating))
  }
}
```

```js
selectedClassAndRating
```

```js
Plot.plot({
  marginLeft: 100,
  x: {
    // domain: [0, d3.max(reviewsData, d => d.Age)],
  },
  marks: [
    Plot.rect(
      reviewsData.sort((a,b) => d3.ascending(a.Age, b.Age)),
      {
        x: "Age",
        y: "Class Name",
        fill: "Age",
        tip: true,
        // x: 1,
      }
    )
  ]
})
```


## Convert Map into Array of Objects

Now, we can get creative with our processing by remembering how to use the chained .get() method on our Map.

```javascript
// Change this value to any available "Class Name" key
const className2 = "Jeans"
// Change between 1 and 5 Number value
const rating = 4

// Create an array of objects based on my above keyed options
const reducedClassAndRating = Array.from(
  // Get the reduced data group
  byClassAndRating.get(className2).get(rating),
  // Do something to the data (or not) and return it
  (values) => {
    return values
  }
)
```

```js
// Change this value to any available "Class Name" key
const className2 = "Jeans"
// Change between 1 and 5 Number value
const rating = 4
const reducedClassAndRating = Array.from(
  byClassAndRating.get(className2).get(rating),
  (values) => {
    return values
  }
)
```

<p class="codeblock-caption">
  Reduced array of objects with specific clothing class and rating.
</p>

```js
reducedClassAndRating
```

This is just the basics. If you wanted to create a function that work with a range of Class Name and Rating values, then simply create those lists of desired values, then loop the above pattern through a for loop. You'll need to add some more variable assignments, but this should get you going!

## Calculate Estimates of Location into Flat Array of Objects

1. Take stock of descriptive categories: Age, Rating, Positive Feedback Count
2. Get unique list of all level 2 features.

```js
Array.from(
  byClassAndRating.get(className2),
  ([rating, values]) => {
    const centralTendencies = {
      rating: rating,
      // Add about age
      meanAge: d3.mean(values, v => v.Age),
      medianAge: d3.median(values, v => v.Age),
      modeAge: d3.mode(values, v => v.Age),
      minAge: d3.min(values, v => v.Age),
      maxAge: d3.max(values, v => v.Age),

      // Add about ratings
      meanRating: d3.mean(values, v => v.Rating),
      medianRating: d3.median(values, v => v.Rating),
      modeRating: d3.mode(values, v => v.Rating),
      minRating: d3.min(values, v => v.Rating),
      maxRating: d3.max(values, v => v.Rating),

      // Add about Positive Feedback Count
      meanPFC: d3.mean(values, v => v["Positive Feedback Count"]),
      medianPFC: d3.median(values, v => v["Positive Feedback Count"]),
      modePFC: d3.mode(values, v => v["Positive Feedback Count"]),
      minPFC: d3.min(values, v => v["Positive Feedback Count"]),
      maxPFC: d3.max(values, v => v["Positive Feedback Count"]),
    }
    return centralTendencies
  }
)
// .flatMap(
//   ([rating, ratingValues]) => {
//     return ratingValues
//   }
// )
```