import React, { Component } from 'react'

class RevisionRow extends Component {
  render() {
    var columns = [];
    for (let x = 0; x < this.props.data.tenses.length ; x++) {
      columns.push(<td key={x}>{this.props.data.tenses[x].pronouns[this.props.pronounIndex].answer}</td>);
    }
    return (
      <tr>
        <td>{this.props.data.tenses[0].pronouns[this.props.pronounIndex].pronoun}</td>
        {columns}
      </tr>
    );
  }
}

RevisionRow.defaultProps = {
  data: [],
  pronounIndex: 0
}

export default RevisionRow
