import React, { Component } from "react"
import "react-virtualized/styles.css"
// You can import any component you want as a named export from 'react-virtualized', eg
import { Column, Table, AutoSizer, List } from "react-virtualized"
import SearchResult from "./SearchResult"
//https://github.com/bvaughn/react-virtualized/blob/master/source/List/List.example.js

class ResultsList extends Component {
  render() {
    const { results } = this.props
    return (
      <div>
        {results.map((result, resultIdx) => (
          <SearchResult key={resultIdx} question={result} />
        ))}
      </div>
    )
  }
}

export default ResultsList

// import "react-virtualized/styles.css"
// import cn from "classnames"
// import Immutable from "immutable"
// import PropTypes from "prop-types"
// import * as React from "react"
// import styles from "./List.example.css"

// // import AutoSizer from '../AutoSizer';
// // import List from './List';
// import { Column, Table, AutoSizer, List } from "react-virtualized"
// // import {
// //   ContentBox,
// //   ContentBoxHeader,
// //   ContentBoxParagraph,
// // } from '../demo/ContentBox';
// // import {LabeledInput, InputRow} from '../demo/LabeledInput';

// export default class ListExample extends React.PureComponent {
//   // static contextTypes = {
//   //   list: PropTypes.instanceOf(Immutable.List).isRequired,
//   // }

//   constructor(props, context) {
//     super(props, context)

//     this.state = {
//       listHeight: 300,
//       listRowHeight: 50,
//       overscanRowCount: 10,
//       rowCount: props.results.size,
//       scrollToIndex: undefined,
//       showScrollingPlaceholder: false,
//       useDynamicRowHeight: false,
//     }

//     this._getRowHeight = this._getRowHeight.bind(this)
//     this._noRowsRenderer = this._noRowsRenderer.bind(this)
//     this._onRowCountChange = this._onRowCountChange.bind(this)
//     this._onScrollToRowChange = this._onScrollToRowChange.bind(this)
//     this._rowRenderer = this._rowRenderer.bind(this)
//   }

//   render() {
//     const {
//       listHeight,
//       listRowHeight,
//       overscanRowCount,
//       rowCount,
//       scrollToIndex,
//       showScrollingPlaceholder,
//       useDynamicRowHeight,
//     } = this.state

//     return (
//       <div>
//         <div>
//           <label className={styles.checkboxLabel}>
//             <input
//               aria-label="Use dynamic row heights?"
//               checked={useDynamicRowHeight}
//               className={styles.checkbox}
//               type="checkbox"
//               onChange={event =>
//                 this.setState({ useDynamicRowHeight: event.target.checked })
//               }
//             />
//             Use dynamic row heights?
//           </label>

//           <label className={styles.checkboxLabel}>
//             <input
//               aria-label="Show scrolling placeholder?"
//               checked={showScrollingPlaceholder}
//               className={styles.checkbox}
//               type="checkbox"
//               onChange={event =>
//                 this.setState({
//                   showScrollingPlaceholder: event.target.checked,
//                 })
//               }
//             />
//             Show scrolling placeholder?
//           </label>
//         </div>

//         <div>
//           <input
//             label="Num rows"
//             name="rowCount"
//             onChange={this._onRowCountChange}
//             value={rowCount}
//           />
//           <input
//             label="Scroll to"
//             name="onScrollToRow"
//             placeholder="Index..."
//             onChange={this._onScrollToRowChange}
//             value={scrollToIndex || ""}
//           />
//           <input
//             label="List height"
//             name="listHeight"
//             onChange={event =>
//               this.setState({
//                 listHeight: parseInt(event.target.value, 10) || 1,
//               })
//             }
//             value={listHeight}
//           />
//           <input
//             disabled={useDynamicRowHeight}
//             label="Row height"
//             name="listRowHeight"
//             onChange={event =>
//               this.setState({
//                 listRowHeight: parseInt(event.target.value, 10) || 1,
//               })
//             }
//             value={listRowHeight}
//           />
//           <input
//             label="Overscan"
//             name="overscanRowCount"
//             onChange={event =>
//               this.setState({
//                 overscanRowCount: parseInt(event.target.value, 10) || 0,
//               })
//             }
//             value={overscanRowCount}
//           />
//         </div>

//         <div>
//           <AutoSizer disableHeight>
//             {({ width }) => (
//               <List
//                 ref="List"
//                 className={styles.List}
//                 height={listHeight}
//                 overscanRowCount={overscanRowCount}
//                 noRowsRenderer={this._noRowsRenderer}
//                 rowCount={rowCount}
//                 rowHeight={
//                   useDynamicRowHeight ? this._getRowHeight : listRowHeight
//                 }
//                 rowRenderer={this._rowRenderer}
//                 scrollToIndex={scrollToIndex}
//                 width={width}
//               />
//             )}
//           </AutoSizer>
//         </div>
//       </div>
//     )
//   }

//   _getDatum(index) {
//     // const { list } = this.context

//     // return list.get(index % list.size)
//     const { results } = this.props
//     return results.get(index % results.size)
//   }

//   _getRowHeight({ index }) {
//     return this._getDatum(index).size
//   }

//   _noRowsRenderer() {
//     return <div className={styles.noRows}>No rows</div>
//   }

//   _onRowCountChange(event) {
//     const rowCount = parseInt(event.target.value, 10) || 0

//     this.setState({ rowCount })
//   }

//   _onScrollToRowChange(event) {
//     const { rowCount } = this.state
//     let scrollToIndex = Math.min(rowCount - 1, parseInt(event.target.value, 10))

//     if (isNaN(scrollToIndex)) {
//       scrollToIndex = undefined
//     }

//     this.setState({ scrollToIndex })
//   }

//   _rowRenderer({ index, isScrolling, key, style }) {
//     const { showScrollingPlaceholder, useDynamicRowHeight } = this.state

//     if (showScrollingPlaceholder && isScrolling) {
//       return (
//         <div
//           className={cn(styles.row, styles.isScrollingPlaceholder)}
//           key={key}
//           style={style}>
//           Scrolling...
//         </div>
//       )
//     }

//     const datum = this._getDatum(index)

//     let additionalContent

//     if (useDynamicRowHeight) {
//       switch (datum.size) {
//         case 75:
//           additionalContent = <div>It is medium-sized.</div>
//           break
//         case 100:
//           additionalContent = (
//             <div>
//               It is large-sized.
//               <br />
//               It has a 3rd row.
//             </div>
//           )
//           break
//       }
//     }

//     return (
//       <div className={styles.row} key={key} style={style}>
//         <div
//           className={styles.letter}
//           style={{
//             backgroundColor: datum.color,
//           }}>
//           {datum.name.charAt(0)}
//         </div>
//         <div>
//           <div className={styles.name}>{datum.name}</div>
//           <div className={styles.index}>This is row {index}</div>
//           {additionalContent}
//         </div>
//         {useDynamicRowHeight && (
//           <span className={styles.height}>{datum.size}px</span>
//         )}
//       </div>
//     )
//   }
// }
