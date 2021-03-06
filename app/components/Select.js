import React from 'react'
import classnames from 'classnames'
import { button, active } from './Button.css'
import { select } from './Select.css'


export default class Select extends React.Component {
  render() {
    const { selected, options, onChange } = this.props
    return (
      <div className={select}>
        {Object.keys(options).map(key =>
          <a 
            key={key}
            className={classnames(button, {[active]: selected === options[key]})}
            data-value={key}
            onClick={() => selected !== options[key] && onChange(options[key])}
          >
            {key}
          </a>
        )}
      </div>
    );
  }
}
