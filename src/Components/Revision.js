import React, { Component } from 'react'
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import RevisionRow from './RevisionRow'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'


class Revision extends Component {

  render() {

    let rows = [];
    this.props.data.tenses[0].pronouns.forEach((pronoun, id) => {
      rows.push(<RevisionRow key={id} data={this.props.data} pronounIndex={id} />)
    });

    return (
      <div id="revision-view">
        <Table className="table table-striped">
          <Thead>
            <Tr>
              <Th>Pronoun</Th>
              <Th>Present</Th>
              <Th>Imparfait</Th>
              <Th>Passé Composé</Th>
              <Th>Futur</Th>
              <Th>Conditionnel</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows}
          </Tbody>
        </Table>
      </div>
    );
  }
}

Revision.defaultProps = {
  data: [],
  showRevisionTable: false
}

export default Revision
