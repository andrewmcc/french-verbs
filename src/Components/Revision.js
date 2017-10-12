import React, { Component } from 'react'
import RevisionRow from './RevisionRow'

class Revision extends Component {

  render() {

    var rows = [];
    this.props.data.tenses[0].pronouns.map((pronoun, id) => {
      rows.push(<RevisionRow key={id} data={this.props.data} pronounIndex={id} />);
    });

    return (
      <div id="revision-view">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Present</th>
              <th>Imparfait</th>
              <th>Passé Composé</th>
              <th>Futur</th>
              <th>Conditionnel</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

Revision.defaultProps = {
  data: [],
  showRevisionTable: false
}

export default Revision
