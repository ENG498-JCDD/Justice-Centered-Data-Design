import {Corpus} from "tiny-tfidf"
import {ascending,descending,max} from "d3-array"

export const queryResults = (query, corpus) => {
  if (query == "") {
    return [{
      Document: "No result",
      Score: "No result",
      Term: "No result",
    }]
  }
  else {
    const results = corpus
      .getResultsForQuery(query).map(
        (d) => ({
          Document: d[0],
          Score: d[1],
          Term: query,
        })
      )
    return results
  }
}

export const getYMax = (queryResults1, queryResults2) => {
  // 1. Use d3.max to get max values from eash result
  const yMaxQuery1 = max(queryResults1, d => d.Score)
  const yMaxQuery2 = max(queryResults2, d => d.Score)

  // 2. Evaluate which value is higher
  let yMax = 0
  if (yMaxQuery1 > yMaxQuery2) {
    yMax = yMaxQuery1
  }
  else if (yMaxQuery1 < yMaxQuery2) {
    yMax = yMaxQuery2
  }

  return yMax
}