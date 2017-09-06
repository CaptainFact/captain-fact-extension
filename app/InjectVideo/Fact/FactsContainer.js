import React from 'react'

import Fact from './Fact.js'


export default class FactsContainer extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.comments.size > 0 &&
          <div>
            {this.props.comments.map(comment =>
              <Fact key={comment.id} comment={comment}/>
            )}
          </div>
        }
      </div>
    )
  }
}