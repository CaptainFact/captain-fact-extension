import React from 'react'
import classnames from 'classnames'
import buttonStyles from './Button.css'
import selectStyles from './Select.css'

export default class Select extends React.Component {
  render() {
    const { selected, options, onChange } = this.props
    return (
      <div className={selectStyles.select}>
        {Object.keys(options).map((key) => (
          <a
            key={key}
            className={classnames(buttonStyles.button, {
              [buttonStyles.active]: selected === options[key],
            })}
            data-value={key}
            onClick={() => selected !== options[key] && onChange(options[key])}
          >
            {key}
          </a>
        ))}
      </div>
    )
  }
}
