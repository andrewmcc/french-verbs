import React, { Component } from 'react'
import { Tr, Td } from 'react-super-responsive-table'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

class RevisionRow extends Component {
  render() {
    let columns = [];
    for (let x = 0; x < this.props.data.tenses.length ; x++) {
      columns.push(<Td key={x}>{this.props.data.tenses[x].pronouns[this.props.pronounIndex].answer}</Td>)
    }
    return (
      <Tr>
        <Td>{this.props.data.tenses[0].pronouns[this.props.pronounIndex].pronoun}</Td>
        {columns}
      </Tr>
    );
  }
}

RevisionRow.defaultProps = {
  data: [],
  pronounIndex: 0
}

export default RevisionRow
