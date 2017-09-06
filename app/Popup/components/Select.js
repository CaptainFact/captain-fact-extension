import React from 'react'
import classnames from 'classnames'
import { button, active } from '../../Common/components/Button.css'
import { select } from './Select.css'
import titleCase from 'voca/title_case'


export default class Select extends React.Component {
  render() {
    const { selected, options, onChange } = this.props
    return (
      <div className={select}>
        {Object.keys(options).map(key =>
          <a  key={key}
              className={classnames(button, {[active]: selected === options[key]})}
              onClick={() => selected !== options[key] && onChange(options[key])}>
            {titleCase(key)}
          </a>
        )}
      </div>
    );
  }
}
